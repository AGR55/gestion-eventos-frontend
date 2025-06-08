import {
  Category,
  CreateEventRequest,
  CreateEventResponse,
  EventFormValues,
} from "@/types/types";

class EventService {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL;

  async getCategories(): Promise<Category[]> {
    const response = await fetch(`${this.baseUrl}/Public/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    let categoriesArray: Category[] = [];
    if (Array.isArray(data)) {
      categoriesArray = data;
    } else if (data.categories && Array.isArray(data.categories)) {
      categoriesArray = data.categories;
    } else if (data.data && Array.isArray(data.data)) {
      categoriesArray = data.data;
    } else {
      throw new Error("Formato de respuesta inesperado");
    }

    const activeCategories = categoriesArray.filter(
      (category) =>
        category.active &&
        !category.deletedAt &&
        category.name &&
        category.name.trim() !== ""
    );

    activeCategories.sort((a, b) => a.name.localeCompare(b.name));

    return activeCategories;
  }

  // ✨ Función auxiliar para combinar fecha y hora
  private combineDateAndTime(date: string, time: string): string {
    // Combina fecha (YYYY-MM-DD) y hora (HH:MM) en formato ISO
    const dateTime = new Date(`${date}T${time}:00`);
    return dateTime.toISOString();
  }

  // ✨ Función auxiliar mejorada para extraer organizerId del token JWT
  private extractOrganizerIdFromToken(token: string): string {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      console.log("Full JWT payload:", payload);

      // El claim específico que usa tu backend .NET
      const claimType =
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";

      let organizerId = payload[claimType];

      // Si no existe el claim completo, intentar alternativas
      if (!organizerId) {
        // Buscar por otras propiedades comunes
        organizerId =
          payload.sub ||
          payload.nameidentifier ||
          payload.user_id ||
          payload.id ||
          payload.userId;
      }

      if (!organizerId) {
        // Debug: mostrar todas las propiedades disponibles
        console.error("Available JWT claims:", Object.keys(payload));
        console.error("Full payload:", payload);
        throw new Error(
          `No se encontró el ID del organizador. Claims disponibles: ${Object.keys(
            payload
          ).join(", ")}`
        );
      }

      console.log("Successfully extracted organizer ID:", organizerId);
      return organizerId;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Token inválido - error al decodificar JWT");
    }
  }

  async createEvent(
    formData: EventFormValues,
    token: string
  ): Promise<CreateEventResponse> {
    try {
      // ✨ Debug completo del token antes de enviar
      console.log("=== DEBUG TOKEN ===");
      console.log("Token:", token.substring(0, 50) + "...");

      const payload = JSON.parse(atob(token.split(".")[1]));
      console.log("Token payload:", payload);
      console.log(
        "User roles:",
        payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
      );
      console.log("Token expiry:", new Date(payload.exp * 1000));
      console.log("Current time:", new Date());
      console.log("Token valid:", payload.exp * 1000 > Date.now());
      console.log("==================");

      // ✨ Extraer organizerId del token
      const organizerId = this.extractOrganizerIdFromToken(token);

      // ✨ Combinar fecha y hora en formato ISO
      const combinedDateTime = this.combineDateAndTime(
        formData.date,
        formData.time
      );

      // ✨ Preparar el payload JSON según la especificación del backend
      const requestPayload: Omit<CreateEventRequest, "image"> = {
        title: formData.title,
        description: formData.description,
        date: combinedDateTime,
        duration: formData.duration,
        requireAcceptance: formData.requireAcceptance,
        limitParticipants: formData.limitParticipants,
        isPublished: formData.isPublished,
        address: formData.address,
        categoryId: formData.categoryId,
        organizerId: organizerId,
      };

      console.log("Creating event with payload:", requestPayload);
      console.log("API endpoint:", `${this.baseUrl}/Organizer/event`);

      const response = await fetch(`${this.baseUrl}/Organizer/event`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          // ✨ Headers adicionales que podrían ser necesarios
          Accept: "application/json",
        },
        body: JSON.stringify(requestPayload),
      });

      console.log("Response status:", response.status);
      console.log(
        "Response headers:",
        Object.fromEntries(response.headers.entries())
      );

      // ✨ Manejo detallado del error 403
      if (response.status === 403) {
        const errorText = await response.text();
        console.error("403 Forbidden response:", errorText);

        // Posibles causas del 403
        const possibleCauses = [
          "1. Usuario no tiene rol de Organizer",
          "2. Token expirado o inválido",
          "3. Endpoint requiere permisos adicionales",
          "4. CategoryId inválido o no existe",
          "5. Política de autorización específica no cumplida",
        ];

        console.error("Posibles causas del 403:", possibleCauses);

        throw new Error(
          `Acceso denegado (403): ${
            errorText || "Sin permisos para crear eventos"
          }`
        );
      }

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;

        try {
          const errorText = await response.text();
          console.log("Error response text:", errorText);

          if (errorText) {
            try {
              const errorData = JSON.parse(errorText);
              errorMessage =
                errorData.message || errorData.error || errorMessage;
            } catch (parseError) {
              errorMessage = errorText || errorMessage;
            }
          }
        } catch (textError) {
          console.error("Error reading response text:", textError);
        }

        throw new Error(errorMessage);
      }

      const responseData = await response.json();
      console.log("Event created successfully:", responseData);

      return responseData;
    } catch (error) {
      console.error("Error in createEvent:", error);

      if (error instanceof Error) {
        throw error;
      }

      throw new Error("Error desconocido al crear el evento");
    }
  }

  // ✨ Método separado para subir imagen si es necesario
  async uploadEventImage(
    eventId: string,
    imageFile: File,
    token: string
  ): Promise<string> {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await fetch(`${this.baseUrl}/Event/${eventId}/image`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Error al subir la imagen del evento");
    }

    const data = await response.json();
    return data.imageUrl;
  }
}

export const eventService = new EventService();
