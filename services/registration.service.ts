import { getSession } from "next-auth/react";
import { toast } from "sonner";

export interface RegistrationResponse {
  success: boolean;
  message: string;
  requiresApproval?: boolean;
}

class RegistrationService {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL;

  async registerToEvent(eventId: string): Promise<RegistrationResponse> {
    try {
      console.log("=== REGISTERING TO EVENT ===");
      console.log("Event ID:", eventId);

      // ✨ Obtener token desde NextAuth
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

  async getMyRegistrations(): Promise<string[]> {
    try {
      const token = await this.getAuthToken();
      if (!token) {
        return [];
      }

      // TODO: Implementar endpoint para obtener inscripciones del usuario
      console.log("Getting user registrations - endpoint not implemented yet");
      return [];
    } catch (error) {
      console.error("Error getting user registrations:", error);
      return [];
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
