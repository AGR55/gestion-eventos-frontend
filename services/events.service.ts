import {
  PaginationParams,
  EventsResponse,
  Event,
  EventFilters,
} from "@/types/types";

class EventsService {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL;

  async getEvents(
    params: PaginationParams,
    filters?: EventFilters
  ): Promise<EventsResponse> {
    try {
      const searchParams = new URLSearchParams();

      // Parámetros de paginación
      searchParams.append("PageNumber", params.pageNumber.toString());
      searchParams.append("PageSize", params.pageSize.toString());

      // Filtros opcionales
      if (filters) {
        if (filters.categoryId) {
          searchParams.append("categoryId", filters.categoryId);
        }
        if (filters.search) {
          searchParams.append("search", filters.search);
        }
        if (filters.dateFrom) {
          searchParams.append("dateFrom", filters.dateFrom);
        }
        if (filters.dateTo) {
          searchParams.append("dateTo", filters.dateTo);
        }
        if (filters.priceMin !== undefined) {
          searchParams.append("priceMin", filters.priceMin.toString());
        }
        if (filters.priceMax !== undefined) {
          searchParams.append("priceMax", filters.priceMax.toString());
        }
        if (filters.isPublished !== undefined) {
          searchParams.append("isPublished", filters.isPublished.toString());
        }
      }

      const url = `${this.baseUrl}/Public/event?${searchParams.toString()}`;
      console.log("Fetching events from:", url);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        let errorMessage = `Error ${response.status}: ${response.statusText}`;
        try {
          const errorData = await response.text();
          if (errorData) {
            console.error("Error response:", errorData);
            errorMessage += ` - ${errorData}`;
          }
        } catch (parseError) {
          console.error("Error parsing error response:", parseError);
        }
        throw new Error(errorMessage);
      }

      // ✨ Parsear la respuesta
      const data = await response.json();
      console.log("Raw API response:", data);

      // ✨ Normalizar la estructura según el formato del servidor
      let normalizedData: EventsResponse;

      if (this.isValidEventResponse(data)) {
        // Formato estándar de paginación
        normalizedData = data;
      } else if (this.isCustomEventResponse(data)) {
        // ✨ Formato personalizado del servidor (events.data)
        normalizedData = {
          pageNumber: data.events.pageNumber || 1,
          pageSize: data.events.pageSize || 12,
          totalPages: data.events.totalPages || 1,
          totalRecords: data.events.totalRecords || 0,
          data: data.events.data || [],
          hasPrevious: data.events.hasPrevious || false,
          hasNext: data.events.hasNext || false,
        };
      } else if (Array.isArray(data)) {
        // Array directo
        normalizedData = {
          pageNumber: params.pageNumber,
          pageSize: params.pageSize,
          totalPages: 1,
          totalRecords: data.length,
          data: data,
          hasPrevious: false,
          hasNext: false,
        };
      } else {
        // Estructura completamente desconocida
        console.error("Unexpected API response structure:", data);
        throw new Error("Formato de respuesta inesperado del servidor");
      }

      // ✨ Asegurar que data.data existe y es un array
      if (!Array.isArray(normalizedData.data)) {
        console.error(
          "Normalized data.data is not an array:",
          normalizedData.data
        );
        normalizedData.data = [];
      }

      // ✨ PRESERVAR la información de paginación original del servidor
      const originalPagination = {
        pageNumber: normalizedData.pageNumber,
        pageSize: normalizedData.pageSize,
        totalPages: normalizedData.totalPages,
        totalRecords: normalizedData.totalRecords,
        hasPrevious: normalizedData.hasPrevious,
        hasNext: normalizedData.hasNext,
      };

      // ✨ Mapear eventos para asegurar estructura consistente
      normalizedData.data = normalizedData.data.map((event) => ({
        ...event,
        // Proporcionar valores por defecto para campos que podrían ser null
        category: event.category || {
          id: "",
          name: "Sin categoría",
          active: true,
        },
        organizer: event.organizer || {
          id: "",
          userName: "Organizador desconocido",
          email: "",
          balance: 0,
        },
        imageUrl:
          `http://localhost:8080${event.imageUrl}` ||
          "/api/placeholder/400/300",
      }));

      // ✨ Solo filtrar eventos eliminados o inactivos (filtros de seguridad)
      // NO filtrar por isPublished aquí, el servidor debe manejar eso
      const originalDataLength = normalizedData.data.length;
      normalizedData.data = normalizedData.data.filter((event) => {
        return event && event.active === true && !event.deletedAt;
      });

      // ✨ Solo actualizar paginación si realmente filtramos algo
      const filteredOutCount = originalDataLength - normalizedData.data.length;
      if (filteredOutCount > 0) {
        console.log(`Filtered out ${filteredOutCount} inactive/deleted events`);
        // Solo ajustar el total de registros si filtramos eventos
        normalizedData.totalRecords = Math.max(
          0,
          normalizedData.totalRecords - filteredOutCount
        );
        normalizedData.totalPages = Math.ceil(
          normalizedData.totalRecords / normalizedData.pageSize
        );
      } else {
        // ✨ Restaurar la información de paginación original si no filtramos nada
        normalizedData.pageNumber = originalPagination.pageNumber;
        normalizedData.pageSize = originalPagination.pageSize;
        normalizedData.totalPages = originalPagination.totalPages;
        normalizedData.totalRecords = originalPagination.totalRecords;
        normalizedData.hasPrevious = originalPagination.hasPrevious;
        normalizedData.hasNext = originalPagination.hasNext;
      }

      console.log("Final processed data:", {
        eventsCount: normalizedData.data.length,
        pagination: {
          pageNumber: normalizedData.pageNumber,
          pageSize: normalizedData.pageSize,
          totalPages: normalizedData.totalPages,
          totalRecords: normalizedData.totalRecords,
          hasPrevious: normalizedData.hasPrevious,
          hasNext: normalizedData.hasNext,
        },
      });

      return normalizedData;
    } catch (error) {
      console.error("Error fetching events:", error);

      if (error instanceof Error) {
        throw new Error(`Failed to fetch events: ${error.message}`);
      }

      throw new Error("Unknown error occurred while fetching events");
    }
  }

  // ✨ Método para validar el formato estándar
  private isValidEventResponse(data: any): data is EventsResponse {
    return (
      data &&
      typeof data === "object" &&
      typeof data.pageNumber === "number" &&
      typeof data.pageSize === "number" &&
      typeof data.totalPages === "number" &&
      typeof data.totalRecords === "number" &&
      Array.isArray(data.data) &&
      typeof data.hasPrevious === "boolean" &&
      typeof data.hasNext === "boolean"
    );
  }

  // ✨ Método para validar el formato personalizado del servidor
  private isCustomEventResponse(data: any): boolean {
    return (
      data &&
      typeof data === "object" &&
      data.events &&
      typeof data.events === "object" &&
      Array.isArray(data.events.data) &&
      typeof data.events.pageNumber === "number" &&
      typeof data.events.pageSize === "number"
    );
  }

  async getEventById(id: string): Promise<Event> {
    try {
      console.log(`=== FETCHING SINGLE EVENT ===`);
      console.log(`Event ID: ${id}`);

      // ✨ Usar el endpoint correcto
      const url = `${this.baseUrl}/Public/event/${id}`;
      console.log(`Fetching from: ${url}`);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(`Response status: ${response.status}`);
      console.log(`Response ok: ${response.ok}`);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Evento con ID ${id} no encontrado`);
        } else if (response.status === 500) {
          throw new Error(`Error del servidor al obtener el evento`);
        } else {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
      }

      const eventData = await response.json();
      console.log("Raw event data from API:", eventData);

      // ✨ Validar que los datos recibidos sean válidos
      if (!eventData || !eventData.id) {
        throw new Error("Datos de evento inválidos recibidos del servidor");
      }

      // ✨ Normalizar el evento para asegurar estructura consistente
      const normalizedEvent: Event = {
        id: eventData.id,
        createdAt: eventData.createdAt,
        updatedAt: eventData.updatedAt,
        deletedAt: eventData.deletedAt || null,
        active: eventData.active ?? true,
        title: eventData.title || "Sin título",
        description: eventData.description || "Sin descripción",
        imageUrl: eventData.imageUrl || "/api/placeholder/1200/600",
        address: eventData.address || "Ubicación no especificada",
        date: eventData.date,
        duration: eventData.duration || 1,
        isPublished: eventData.isPublished ?? false,
        requireAcceptance: eventData.requireAcceptance ?? false,
        limitParticipants: eventData.limitParticipants || 0,
        price: eventData.price || 0,

        // ✨ Asegurar que category y organizer tengan la estructura correcta
        category: eventData.category || {
          id: "",
          name: "Sin categoría",
          active: true,
        },
        organizer: eventData.organizer || {
          id: "",
          userName: "Organizador desconocido",
          email: "",
          balance: 0,
        },
      };

      console.log("✅ Normalized event data:", normalizedEvent);
      return normalizedEvent;
    } catch (error) {
      console.error(`❌ Error fetching event ${id}:`, error);

      if (error instanceof Error) {
        throw error;
      }

      throw new Error(`Error desconocido al obtener el evento: ${error}`);
    }
  }

  // ✨ Métodos auxiliares mejorados
  async getFeaturedEvents(limit: number = 6): Promise<Event[]> {
    try {
      // ✨ También obtener de featuredEvents si está disponible
      const response = await fetch(
        `${this.baseUrl}/Public/event?PageNumber=1&PageSize=${limit}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch featured events");
      }

      const data = await response.json();
      console.log("Featured events raw response:", data);

      // ✨ Intentar usar featuredEvents si existe, sino usar events normales
      let featuredEvents: Event[] = [];

      if (data.featuredEvents && Array.isArray(data.featuredEvents)) {
        featuredEvents = data.featuredEvents.slice(0, limit);
      } else {
        // Usar el método normal de getEvents
        const eventsResponse = await this.getEvents({
          pageNumber: 1,
          pageSize: limit,
        });
        featuredEvents = eventsResponse.data.slice(0, limit);
      }

      return featuredEvents;
    } catch (error) {
      console.error("Error fetching featured events:", error);
      return [];
    }
  }

  async getEventsByCategory(
    categoryId: string,
    params: PaginationParams
  ): Promise<EventsResponse> {
    return this.getEvents(params, { categoryId });
  }

  async searchEvents(
    query: string,
    params: PaginationParams
  ): Promise<EventsResponse> {
    return this.getEvents(params, { search: query });
  }

  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(
        `${this.baseUrl}/Public/event?PageNumber=1&PageSize=1`
      );
      return response.ok;
    } catch (error) {
      console.error("Connection test failed:", error);
      return false;
    }
  }
}

export const eventsService = new EventsService();
