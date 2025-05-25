"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authService } from "@/services/auth.service";

interface UseAuthReturn {
  user: any;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithProvider: (provider: "google" | "facebook") => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  verifyEmail: (email: string, code: string) => Promise<boolean>;
  resendVerificationCode: (email: string) => Promise<boolean>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (token: string, newPassword: string) => Promise<boolean>;
}

export const useAuth = (): UseAuthReturn => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const isAuthenticated = status === "authenticated";
  const user = session?.user || null;

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        // Manejar diferentes tipos de errores
        switch (result.error) {
          case "EMAIL_NOT_VERIFIED":
            toast.error("Email no verificado", {
              description: "Por favor verifica tu email antes de continuar.",
            });
            break;
          case "INVALID_CREDENTIALS":
            toast.error("Credenciales inválidas", {
              description: "Email o contraseña incorrectos.",
            });
            break;
          case "ACCOUNT_LOCKED":
            toast.error("Cuenta bloqueada", {
              description: "Tu cuenta ha sido bloqueada. Contacta al soporte.",
            });
            break;
          default:
            toast.error("Error al iniciar sesión", {
              description: "Por favor, intenta nuevamente.",
            });
        }
        return false;
      }

      if (result?.ok) {
        toast.success("¡Bienvenido!", {
          description: "Has iniciado sesión correctamente.",
        });
        return true;
      }

      return false;
    } catch (error) {
      toast.error("Error de conexión", {
        description: "No se pudo conectar con el servidor.",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithProvider = async (provider: "google" | "facebook"): Promise<void> => {
    try {
      await signIn(provider, { callbackUrl: "/" });
    } catch (error) {
      toast.error("Error al iniciar sesión", {
        description: `No se pudo iniciar sesión con ${provider}.`,
      });
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await authService.register({ name, email, password });

      if (response.success) {
        toast.success("¡Registro exitoso!", {
          description: "Revisa tu email para verificar tu cuenta.",
        });
        return true;
      } else {
        toast.error("Error en el registro", {
          description: response.message || "No se pudo crear la cuenta",
        });
        return false;
      }
    } catch (error) {
      toast.error("Error de conexión");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmail = async (email: string, code: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await authService.verifyEmail({ email, code });

      if (response.success) {
        toast.success("¡Email verificado!", {
          description: "Tu cuenta ha sido activada correctamente.",
        });
        return true;
      } else {
        toast.error("Error en la verificación", {
          description: response.message || "Código inválido",
        });
        return false;
      }
    } catch (error) {
      toast.error("Error de conexión");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resendVerificationCode = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await authService.resendVerificationCode(email);

      if (response.success) {
        toast.success("Código reenviado", {
          description: "Revisa tu email para el nuevo código.",
        });
        return true;
      } else {
        toast.error("Error al reenviar");
        return false;
      }
    } catch (error) {
      toast.error("Error de conexión");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await authService.forgotPassword(email);

      if (response.success) {
        toast.success("Email enviado", {
          description: "Revisa tu email para restablecer tu contraseña.",
        });
        return true;
      } else {
        toast.error("Error");
        return false;
      }
    } catch (error) {
      toast.error("Error de conexión");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (token: string, newPassword: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await authService.resetPassword(token, newPassword);

      if (response.success) {
        toast.success("Contraseña actualizada");
        return true;
      } else {
        toast.error("Error");
        return false;
      }
    } catch (error) {
      toast.error("Error de conexión");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    await signOut({ callbackUrl: "/" });
    toast.success("Sesión cerrada", {
      description: "Has cerrado sesión correctamente.",
    });
  };

  return {
    user,
    isLoading: isLoading || status === "loading",
    isAuthenticated,
    login,
    loginWithProvider,
    register,
    verifyEmail,
    resendVerificationCode,
    logout,
    forgotPassword,
    resetPassword,
  };
};
