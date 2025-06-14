import { getSession } from "next-auth/react";
import { toast } from "sonner";

export interface RegistrationResponse {
  success: boolean;
  message: string;
  requiresApproval?: boolean;
}

class RegistrationService {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL;

  // ✨ Método para obtener las inscripciones del usuario
  async getMyRegistrations(): Promise<string[]> {
    try {
      console.log("=== GETTING USER REGISTRATIONS ===");

      const token = await this.getAuthToken();
      if (!token) {
        console.log("No auth token found, returning empty array");
        return [];
      }

      const url = `${this.baseUrl}/UserActions/inscriptions`;
      console.log("Fetching user registrations from:", url);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("User registrations response status:", response.status);

      if (!response.ok) {
        if (response.status === 401) {
          console.warn("User not authenticated, returning empty array");
          return [];
        }

        if (response.status === 404) {
          console.log("No registrations found for user");
          return [];
        }

        throw new Error(`Error al obtener inscripciones: ${response.status}`);
      }

      const registrations = await response.json();
      console.log("User registrations received:", registrations);

      // Asegurar que devolvemos un array
      if (Array.isArray(registrations)) {
        return registrations;
      } else {
        console.warn("Unexpected registration response format:", registrations);
        return [];
      }
    } catch (error) {
      console.error("Error fetching user registrations:", error);
      // En caso de error, devolver array vacío para no romper la UI
      return [];
    }
  }

  // ✨ Método helper para verificar si el usuario está registrado a un evento específico
  async isUserRegisteredToEvent(eventId: string): Promise<boolean> {
    try {
      const registrations = await this.getMyRegistrations();
      const isRegistered = registrations.includes(eventId);

      console.log("=== CHECK USER REGISTRATION ===");
      console.log("Event ID:", eventId);
      console.log("User registrations:", registrations);
      console.log("Is registered:", isRegistered);

      return isRegistered;
    } catch (error) {
      console.error("Error checking user registration:", error);
      return false;
    }
  }

  async registerToEvent(eventId: string): Promise<RegistrationResponse> {
    try {
      console.log("=== REGISTERING TO EVENT ===");
      console.log("Event ID:", eventId);

      const token = await this.getAuthToken();
      if (!token) {
        throw new Error("Debes iniciar sesión para inscribirte a un evento");
      }

      const url = `${this.baseUrl}/UserActions/inscribe`;
      console.log("Registration URL:", url);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(eventId),
      });

      console.log("Registration response status:", response.status);

      if (!response.ok) {
        let errorMessage = "Error al inscribirse al evento";

        try {
          const errorData = await response.text();
          console.error("Registration error response:", errorData);

          switch (response.status) {
            case 400:
              errorMessage = "Datos de inscripción inválidos";
              break;
            case 401:
              errorMessage = "Tu sesión ha expirado, inicia sesión nuevamente";
              break;
            case 403:
              errorMessage =
                "No tienes permisos para inscribirte a este evento";
              break;
            case 409:
              errorMessage = "Ya estás inscrito a este evento";
              break;
            case 422:
              errorMessage = "El evento no está disponible para inscripciones";
              break;
            default:
              errorMessage = `Error del servidor (${response.status})`;
          }

          if (errorData) {
            try {
              const parsedError = JSON.parse(errorData);
              if (parsedError.message) {
                errorMessage = parsedError.message;
              }
            } catch {
              if (errorData.length < 200) {
                errorMessage = errorData;
              }
            }
          }
        } catch (parseError) {
          console.error("Error parsing error response:", parseError);
        }

        throw new Error(errorMessage);
      }

      const responseData = await response.text();
      console.log("Registration success response:", responseData);

      return {
        success: true,
        message: "Inscripción exitosa",
        requiresApproval: false,
      };
    } catch (error) {
      console.error("Registration error:", error);

      if (error instanceof Error) {
        throw error;
      }

      throw new Error("Error desconocido al inscribirse al evento");
    }
  }

  async unregisterFromEvent(eventId: string): Promise<RegistrationResponse> {
    try {
      console.log("=== UNREGISTERING FROM EVENT ===");
      console.log("Event ID:", eventId);

      const token = await this.getAuthToken();
      if (!token) {
        throw new Error("Debes iniciar sesión para cancelar tu inscripción");
      }

      // TODO: Implementar endpoint de cancelación cuando esté disponible
      throw new Error("Funcionalidad de cancelación no disponible aún");
    } catch (error) {
      console.error("Unregistration error:", error);

      if (error instanceof Error) {
        throw error;
      }

      throw new Error("Error desconocido al cancelar inscripción");
    }
  }

  // ✨ Método actualizado para usar NextAuth
  private async getAuthToken(): Promise<string | null> {
    try {
      console.log("=== GETTING TOKEN FROM NEXTAUTH ===");

      const session = await getSession();
      console.log("NextAuth session:", {
        exists: !!session,
        hasUser: !!session?.user,
        hasAccessToken: !!session?.accessToken,
        userEmail: session?.user?.email,
      });

      if (!session) {
        console.log("❌ No NextAuth session found");
        return null;
      }

      if (!session.accessToken) {
        console.log("❌ No accessToken in NextAuth session");
        console.log("Session keys:", Object.keys(session));
        return null;
      }

      const token = session.accessToken as string;
      console.log("✅ Found NextAuth token, length:", token.length);
      console.log("✅ Token preview:", token.substring(0, 50) + "...");

      return token;
    } catch (error) {
      console.error("❌ Error getting NextAuth token:", error);
      return null;
    }
  }

  // ✨ Método actualizado para verificar autenticación
  async isUserAuthenticated(): Promise<boolean> {
    try {
      const session = await getSession();
      const isAuth = !!(session && session.accessToken);

      console.log("=== NEXTAUTH AUTHENTICATION CHECK ===");
      console.log("Has session:", !!session);
      console.log("Has accessToken:", !!(session && session.accessToken));
      console.log("Is authenticated:", isAuth);

      return isAuth;
    } catch (error) {
      console.error("Error checking NextAuth authentication:", error);
      return false;
    }
  }
}

export const registrationService = new RegistrationService();
