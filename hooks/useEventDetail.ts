import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { eventsService } from "@/services/events.service";
import { useRegistration } from "@/hooks/useRegistration";
import { Event } from "@/types/types";
import { toast } from "sonner";

export default function useEventDetail() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.id as string;

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [relatedEvents, setRelatedEvents] = useState<Event[]>([]);
  const [loadingRelated, setLoadingRelated] = useState(false);

  // ✨ Usar el hook de inscripción
  const {
    isRegistering,
    isRegistered,
    isAuthenticated,
    checkingRegistration, // ✨ Nuevo estado
    showModal,
    modalType,
    initiateRegistration,
    confirmAction,
    closeModal,
    refreshRegistrationStatus, // ✨ Nueva función
  } = useRegistration({
    eventId,
    onRegistrationSuccess: () => {
      console.log("Registration successful, refreshing status");
      // ✨ Refrescar estado después de inscripción exitosa
      refreshRegistrationStatus();
    },
    onRegistrationError: (error) => {
      console.error("Registration error in event detail:", error);
    },
  });

  // ✨ Función para obtener eventos relacionados
  const fetchRelatedEvents = async (currentEvent: Event) => {
    if (!currentEvent.category?.id) {
      console.log("No category ID found, skipping related events fetch");
      return;
    }

    try {
      setLoadingRelated(true);
      console.log(
        "Fetching related events for category:",
        currentEvent.category.id
      );

      const related = await eventsService.getRelatedEventsWithFallback(
        currentEvent.id,
        currentEvent.category.id,
        3
      );

      setRelatedEvents(related);
      console.log("Related events fetched:", related.length);
    } catch (error) {
      console.error("Error fetching related events:", error);
      setRelatedEvents([]);
    } finally {
      setLoadingRelated(false);
    }
  };

  useEffect(() => {
    const fetchEvent = async () => {
      if (!eventId) {
        console.error("No event ID provided");
        setError(new Error("ID de evento no válido"));
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        console.log("=== FETCHING EVENT DETAIL ===");
        console.log("Event ID:", eventId);

        const eventData = await eventsService.getEventById(eventId);

        console.log("✅ Event data received successfully:", {
          id: eventData.id,
          title: eventData.title,
          isPublished: eventData.isPublished,
          hasCategory: !!eventData.category,
          categoryId: eventData.category?.id,
          categoryName: eventData.category?.name,
        });

        setEvent(eventData);

        // ✨ Obtener eventos relacionados después de cargar el evento
        await fetchRelatedEvents(eventData);
      } catch (error) {
        console.error("❌ Error in fetchEvent:", error);

        const errorInstance =
          error instanceof Error
            ? error
            : new Error("Error desconocido al obtener el evento");

        setError(errorInstance);
        setEvent(null);

        toast.error("Error al cargar el evento", {
          description: errorInstance.message,
          duration: 4000,
        });
      } finally {
        setLoading(false);
        console.log("=== FETCH EVENT DETAIL COMPLETE ===");
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleRegistration = async () => {
    if (!event) {
      toast.error("No se puede procesar la acción en este momento");
      return;
    }

    console.log("=== HANDLE REGISTRATION ===");
    console.log("Event data:", {
      id: event.id,
      title: event.title,
      price: event.price,
      requireAcceptance: event.requireAcceptance,
      isRegistered,
      isAuthenticated,
    });

    initiateRegistration();
  };

  const refreshEvent = async () => {
    if (!eventId) return;

    try {
      setLoading(true);
      const eventData = await eventsService.getEventById(eventId);
      setEvent(eventData);
      setError(null);

      // ✨ Refrescar eventos relacionados también
      await fetchRelatedEvents(eventData);

      // ✨ Refrescar estado de inscripción
      await refreshRegistrationStatus();
    } catch (error) {
      console.error("Error refreshing event:", error);
      const errorInstance =
        error instanceof Error ? error : new Error("Error al actualizar");
      setError(errorInstance);
    } finally {
      setLoading(false);
    }
  };

  return {
    event,
    loading,
    error,
    // ✨ Eventos relacionados
    relatedEvents,
    loadingRelated,
    // Estados de inscripción
    isRegistering,
    isRegistered,
    isAuthenticated,
    checkingRegistration, // ✨ Nuevo estado
    // Estados del modal
    showModal,
    modalType,
    // Acciones
    handleRegistration,
    confirmAction,
    closeModal,
    refreshEvent,
    refreshRegistrationStatus, // ✨ Nueva función
    router,
  };
}
