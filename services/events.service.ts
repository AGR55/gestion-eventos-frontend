import {
  PaginationParams,
  EventsResponse,
  Event,
  EventFilters,
} from "@/types/types";

class EventsService {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL;

  constructor() {
    // ✨ Validar baseUrl en el constructor
    if (!this.baseUrl) {
      console.error("❌ NEXT_PUBLIC_API_URL no está definida");
      throw new Error("API URL no está configurada");
    }

    // ✨ Asegurar que baseUrl no termine con /
    this.baseUrl = this.baseUrl.replace(/\/$/, "");
    console.log("🌐 EventsService initialized with baseUrl:", this.baseUrl);
  }

  async getEvents(
    params: PaginationParams,
    filters?: EventFilters
  ): Promise<EventsResponse> {
    try {
      // ✨ Validar parámetros de entrada
      if (
        !params ||
        typeof params.pageNumber !== "number" ||
        typeof params.pageSize !== "number"
      ) {
        console.error("❌ Invalid pagination params:", params);
        throw new Error("Parámetros de paginación inválidos");
      }

      // ✨ Asegurar valores mínimos
      const safeParams = {
        pageNumber: Math.max(1, params.pageNumber),
        pageSize: Math.max(1, Math.min(100, params.pageSize)), // Límite máximo de 100
      };

      console.log("🔍 Getting events with params:", safeParams);
      console.log("🔍 Filters:", filters);

      const searchParams = new URLSearchParams();

      // Parámetros de paginación
      searchParams.append("PageNumber", safeParams.pageNumber.toString());
      searchParams.append("PageSize", safeParams.pageSize.toString());

      // Filtros opcionales con validación
      if (filters) {
        if (filters.categoryId && typeof filters.categoryId === "string") {
          searchParams.append("categoryId", filters.categoryId);
        }
        if (filters.search && typeof filters.search === "string") {
          searchParams.append("search", filters.search);
        }
        if (filters.dateFrom && typeof filters.dateFrom === "string") {
          searchParams.append("dateFrom", filters.dateFrom);
        }
        if (filters.dateTo && typeof filters.dateTo === "string") {
          searchParams.append("dateTo", filters.dateTo);
        }
        if (typeof filters.priceMin === "number" && filters.priceMin >= 0) {
          searchParams.append("priceMin", filters.priceMin.toString());
        }
        if (typeof filters.priceMax === "number" && filters.priceMax >= 0) {
          searchParams.append("priceMax", filters.priceMax.toString());
        }
        if (typeof filters.isPublished === "boolean") {
          searchParams.append("isPublished", filters.isPublished.toString());
        }
      }

      // ✨ Construir URL de manera segura
      const endpoint = "/Public/event";
      const queryString = searchParams.toString();
      const url = `${this.baseUrl}${endpoint}${
        queryString ? `?${queryString}` : ""
      }`;

      console.log("🌐 Constructed URL:", url);

      // ✨ Validar URL antes de hacer la petición
      try {
        new URL(url);
      } catch (urlError) {
        console.error("❌ Invalid URL constructed:", url);
        console.error("❌ Base URL:", this.baseUrl);
        console.error("❌ Endpoint:", endpoint);
        console.error("❌ Query string:", queryString);
        throw new Error(`URL inválida construida: ${url}`);
      }

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
          pageNumber: data.events.pageNumber || safeParams.pageNumber,
          pageSize: data.events.pageSize || safeParams.pageSize,
          totalPages: data.events.totalPages || 1,
          totalRecords: data.events.totalRecords || 0,
          data: data.events.data || [],
          hasPrevious: data.events.hasPrevious || false,
          hasNext: data.events.hasNext || false,
        };
      } else if (Array.isArray(data)) {
        // Array directo
        normalizedData = {
          pageNumber: safeParams.pageNumber,
          pageSize: safeParams.pageSize,
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

      // ✨ Validar datos de paginación recibidos
      normalizedData.pageNumber = Math.max(1, normalizedData.pageNumber || 1);
      normalizedData.pageSize = Math.max(1, normalizedData.pageSize || 12);
      normalizedData.totalPages = Math.max(1, normalizedData.totalPages || 1);
      normalizedData.totalRecords = Math.max(
        0,
        normalizedData.totalRecords || 0
      );

      // ✨ Asegurar que data.data existe y es un array
      if (!Array.isArray(normalizedData.data)) {
        console.error(
          "Normalized data.data is not an array:",
          normalizedData.data
        );
        normalizedData.data = [];
      }

      // ✨ Mapear eventos para asegurar estructura consistente
      normalizedData.data = normalizedData.data
        .filter((event) => event && typeof event === "object") // Filtrar elementos nulos/inválidos
        .map((event) => ({
          ...event,
          imageUrl: event.imageUrl
            ? `${this.baseUrl.replace("/api", "")}${event.imageUrl}`
            : "/api/placeholder/400/300",
        }));

      // ✨ Solo filtrar eventos eliminados o inactivos
      const activeEvents = normalizedData.data.filter((event) => {
        return event && event.active !== false && !event.deletedAt;
      });

      normalizedData.data = activeEvents;

      console.log("✅ Final processed data:", {
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
      console.error("❌ Error fetching events:", error);

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
        category: eventData.category,
        organizer: eventData.organizer,
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

  // ✨ Agregar este método a la clase EventsService:
  async getRelatedEvents(
    eventId: string,
    categoryId: string,
    limit: number = 3
  ): Promise<Event[]> {
    try {
      console.log("=== FETCHING RELATED EVENTS ===");
      console.log("Event ID:", eventId);
      console.log("Category ID:", categoryId);
      console.log("Limit:", limit);

      // ✨ Obtener eventos de la misma categoría, excluyendo el evento actual
      const response = await this.getEvents(
        { pageNumber: 1, pageSize: limit + 5 }, // Pedir más para compensar el filtrado
        { categoryId, isPublished: true }
      );

      // ✨ Filtrar el evento actual y limitar resultados
      const relatedEvents = response.data
        .filter((event) => event.id !== eventId) // Excluir evento actual
        .slice(0, limit); // Limitar cantidad

      console.log(`✅ Found ${relatedEvents.length} related events`);

      return relatedEvents;
    } catch (error) {
      console.error("❌ Error fetching related events:", error);
      // En caso de error, devolver array vacío para no romper la UI
      return [];
    }
  }

  // ✨ Método alternativo que obtiene eventos aleatorios si no hay suficientes de la misma categoría
  async getRelatedEventsWithFallback(
    eventId: string,
    categoryId: string,
    limit: number = 3
  ): Promise<Event[]> {
    try {
      console.log("=== FETCHING RELATED EVENTS WITH FALLBACK ===");

      // 1. Intentar obtener eventos de la misma categoría
      let relatedEvents = await this.getRelatedEvents(
        eventId,
        categoryId,
        limit
      );

      // 2. Si no hay suficientes, completar con otros eventos publicados
      if (relatedEvents.length < limit) {
        console.log(
          `Only found ${relatedEvents.length} events in same category, fetching additional events`
        );

        const additionalNeeded = limit - relatedEvents.length;
        const fallbackResponse = await this.getEvents(
          { pageNumber: 1, pageSize: additionalNeeded + 10 },
          { isPublished: true }
        );

        // Filtrar eventos ya incluidos y el evento actual
        const usedIds = new Set([eventId, ...relatedEvents.map((e) => e.id)]);
        const additionalEvents = fallbackResponse.data
          .filter((event) => !usedIds.has(event.id))
          .slice(0, additionalNeeded);

        relatedEvents = [...relatedEvents, ...additionalEvents];
      }

      console.log(`✅ Final related events count: ${relatedEvents.length}`);
      return relatedEvents;
    } catch (error) {
      console.error("❌ Error in getRelatedEventsWithFallback:", error);
      return [];
    }
  }
}

export const eventsService = new EventsService();
