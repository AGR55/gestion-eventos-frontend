import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { registrationService } from "@/services/registration.service";
import { toast } from "sonner";

interface UseRegistrationOptions {
  eventId: string;
  onRegistrationSuccess?: () => void;
  onRegistrationError?: (error: Error) => void;
}

export function useRegistration({
  eventId,
  onRegistrationSuccess,
  onRegistrationError,
}: UseRegistrationOptions) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ✨ Estados para el modal
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<
    "register" | "unregister" | "login"
  >("register");

  // ✨ Usar NextAuth session
  const { data: session, status } = useSession();

  useEffect(() => {
    // ✨ Verificar autenticación usando NextAuth
    const checkAuth = async () => {
      console.log("=== CHECKING AUTH WITH NEXTAUTH ===");
      console.log("Session status:", status);
      console.log("Session data:", {
        exists: !!session,
        hasUser: !!session?.user,
        hasAccessToken: !!session?.accessToken,
        userEmail: session?.user?.email,
      });

      if (status === "loading") {
        console.log("Session still loading...");
        return;
      }

      const isAuth = !!(session && session.accessToken);
      setIsAuthenticated(isAuth);

      console.log("Authentication result:", isAuth);

      if (isAuth) {
        await checkRegistrationStatus();
      }
    };

    checkAuth();
  }, [session, status, eventId]);

  const checkRegistrationStatus = async () => {
    try {
      const userRegistrations = await registrationService.getMyRegistrations();
      setIsRegistered(userRegistrations.includes(eventId));
    } catch (error) {
      console.error("Error checking registration status:", error);
    }
  };

  // ✨ Función para iniciar el proceso (abre modal)
  const initiateRegistration = () => {
    console.log("=== INITIATE REGISTRATION ===");
    console.log("Event ID:", eventId);
    console.log("Is Authenticated:", isAuthenticated);
    console.log("Is Registered:", isRegistered);
    console.log("Session status:", status);

    if (status === "loading") {
      toast.info("Verificando sesión...");
      return;
    }

    if (!isAuthenticated) {
      setModalType("login");
      setShowModal(true);
      return;
    }

    if (isRegistered) {
      setModalType("unregister");
      setShowModal(true);
      return;
    }

    setModalType("register");
    setShowModal(true);
  };

  // ✨ Función que confirma la acción (ejecuta la petición)
  const confirmAction = async () => {
    console.log("=== CONFIRM ACTION ===");
    console.log("Modal Type:", modalType);

    try {
      setIsRegistering(true);

      if (modalType === "login") {
        // Redirigir a login usando NextAuth
        toast.info("Redirigiendo a inicio de sesión...");
        // Usar la página de auth configurada en NextAuth
        window.location.href =
          "/auth?callbackUrl=" + encodeURIComponent(window.location.href);
        return;
      }

      if (modalType === "unregister") {
        // Cancelar inscripción
        await registrationService.unregisterFromEvent(eventId);
        setIsRegistered(false);

        toast.success("Inscripción cancelada", {
          description: "Has cancelado tu inscripción al evento",
        });

        onRegistrationSuccess?.();
      } else {
        // Inscribirse
        console.log("Attempting to register to event:", eventId);
        const result = await registrationService.registerToEvent(eventId);

        if (result.success) {
          setIsRegistered(true);

          if (result.requiresApproval) {
            toast.success("Solicitud enviada", {
              description:
                "Tu solicitud de inscripción está pendiente de aprobación",
              duration: 4000,
            });
          } else {
            toast.success("¡Inscripción exitosa!", {
              description: "Te has inscrito correctamente al evento",
              duration: 3000,
            });
          }

          onRegistrationSuccess?.();
        }
      }

      // Cerrar modal
      setShowModal(false);
    } catch (error) {
      console.error("Action failed:", error);

      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";

      toast.error(
        modalType === "unregister"
          ? "Error al cancelar inscripción"
          : "Error al inscribirse",
        {
          description: errorMessage,
          duration: 4000,
        }
      );

      onRegistrationError?.(
        error instanceof Error ? error : new Error(errorMessage)
      );
    } finally {
      setIsRegistering(false);
    }
  };

  const closeModal = () => {
    if (!isRegistering) {
      setShowModal(false);
    }
  };

  return {
    isRegistering,
    isRegistered,
    isAuthenticated,
    // ✨ Modal states
    showModal,
    modalType,
    // ✨ Actions
    initiateRegistration,
    confirmAction,
    closeModal,
    // Legacy (mantener compatibilidad)
    registerToEvent: initiateRegistration,
    unregisterFromEvent: initiateRegistration,
    refreshRegistrationStatus: checkRegistrationStatus,
  };
}
