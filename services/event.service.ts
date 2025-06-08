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
    imageFile: File | null,
    token: string
  ): Promise<CreateEventResponse> {
    console.log("🔧 SERVICE: createEvent method called");
    console.log("🔧 SERVICE: formData received:", formData);
    console.log("🔧 SERVICE: imageFile received:", imageFile);
    console.log("🔧 SERVICE: token received type:", typeof token);
    console.log("🔧 SERVICE: token truthy:", !!token);

    // ✨ Validación inicial del token
    if (!token || typeof token !== "string") {
      console.error("Token is invalid:", { token, type: typeof token });
      throw new Error(
        "Token de autenticación no válido. Por favor, inicia sesión nuevamente."
      );
    }

    if (token.length < 10) {
      console.error("Token too short:", token);
      throw new Error(
        "Token de autenticación incompleto. Por favor, inicia sesión nuevamente."
      );
    }

    // ✨ Validar estructura básica del JWT
    const tokenParts = token.split(".");
    if (tokenParts.length !== 3) {
      console.error("Invalid JWT structure:", tokenParts.length, "parts");
      throw new Error(
        "Token de autenticación malformado. Por favor, inicia sesión nuevamente."
      );
    }

    // ✨ Debug completo del token antes de enviar
    console.log("=== DEBUG TOKEN ===");
    console.log("Token length:", token.length);
    console.log("Token start:", token.substring(0, 50) + "...");
    console.log("Token parts count:", tokenParts.length);

    let payload;
    try {
      payload = JSON.parse(atob(tokenParts[1]));
    } catch (decodeError) {
      console.error("Error decoding token payload:", decodeError);
      throw new Error(
        "Token de autenticación corrupto. Por favor, inicia sesión nuevamente."
      );
    }

    console.log("Token payload:", payload);
    console.log(
      "User roles:",
      payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
    );
    console.log("Token expiry:", new Date(payload.exp * 1000));
    console.log("Current time:", new Date());
    console.log("Token valid:", payload.exp * 1000 > Date.now());
    console.log("==================");

    // ✨ Verificar que el token no haya expirado
    if (payload.exp && payload.exp * 1000 <= Date.now()) {
      throw new Error("Token expirado. Por favor, inicia sesión nuevamente.");
    }

    // ✨ Extraer organizerId del token
    const organizerId = this.extractOrganizerIdFromToken(token);

    // ✨ Combinar fecha y hora en formato ISO
    const combinedDateTime = this.combineDateAndTime(
      formData.date,
      formData.time
    );

    // ✨ Crear FormData con todos los datos
    const formDataPayload = new FormData();

    // Agregar todos los campos del evento
    formDataPayload.append("title", formData.title);
    formDataPayload.append("description", formData.description);
    formDataPayload.append("date", combinedDateTime);
    formDataPayload.append("duration", formData.duration.toString());
    formDataPayload.append(
      "requireAcceptance",
      formData.requireAcceptance.toString()
    );
    formDataPayload.append(
      "limitParticipants",
      formData.limitParticipants.toString()
    );
    formDataPayload.append("isPublished", formData.isPublished.toString());
    formDataPayload.append("address", formData.address);
    formDataPayload.append("categoryId", formData.categoryId);
    formDataPayload.append("organizerId", organizerId);

    // ✨ Agregar la imagen si existe - CRUCIAL que esté aquí
    if (imageFile) {
      formDataPayload.append("image", imageFile);
      console.log("✅ Image file added to FormData:", {
        name: imageFile.name,
        size: imageFile.size,
        type: imageFile.type,
      });
    } else {
      console.log("ℹ️ No image file to upload");
    }

    // Debug del FormData
    console.log("=== FORMDATA CONTENTS ===");
    for (const [key, value] of formDataPayload.entries()) {
      if (value instanceof File) {
        console.log(
          `${key}: File(${value.name}, ${value.size} bytes, ${value.type})`
        );
      } else {
        console.log(`${key}: ${value}`);
      }
    }
    console.log("========================");

    // ✨ Enviar todo en una sola petición
    const response = await fetch(`${this.baseUrl}/Organizer/event`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        // ✨ NO incluir Content-Type - dejar que el navegador lo establezca con boundary
      },
      body: formDataPayload, // ✨ FormData con datos + imagen
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
            errorMessage = errorData.message || errorData.error || errorMessage;
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
