import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { eventsService } from "@/services/events.service";
import { Event } from "@/types/types";
import { toast } from "sonner";

export default function useEventDetail() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.id as string;

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

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
        console.log("API Base URL:", process.env.NEXT_PUBLIC_API_URL);

        // ✨ Usar el servicio con el endpoint correcto
        const eventData = await eventsService.getEventById(eventId);

        console.log("✅ Event data received successfully:", {
          id: eventData.id,
          title: eventData.title,
          isPublished: eventData.isPublished,
          hasCategory: !!eventData.category,
          hasOrganizer: !!eventData.organizer,
        });

        setEvent(eventData);
      } catch (error) {
        console.error("❌ Error in fetchEvent:", error);

        const errorInstance =
          error instanceof Error
            ? error
            : new Error("Error desconocido al obtener el evento");

        setError(errorInstance);
        setEvent(null);

        // ✨ Toast informativo para el usuario
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

  const handleAddToCart = () => {
    if (!event) {
      toast.error("No se puede procesar la acción en este momento");
      return;
    }

    console.log("Adding event to cart/registration:", {
      id: event.id,
      title: event.title,
      price: event.price,
      requireAcceptance: event.requireAcceptance,
    });

    // ✨ Lógica mejorada para agregar al carrito o inscribirse
    if (event.price > 0) {
      // Evento de pago - agregar al carrito
      toast.success("Evento agregado al carrito", {
        description: `${event.title} - $${event.price} CUP`,
        duration: 3000,
      });

      // TODO: Integrar con sistema de carrito real
      // cartService.addItem({
      //   eventId: event.id,
      //   title: event.title,
      //   price: event.price,
      //   date: event.date,
      //   imageUrl: event.imageUrl,
      // });
    } else {
      // Evento gratuito - inscripción directa
      if (event.requireAcceptance) {
        toast.success("Solicitud de inscripción enviada", {
          description: `Tu solicitud para ${event.title} está pendiente de aprobación`,
          duration: 4000,
        });
      } else {
        toast.success("¡Inscripción exitosa!", {
          description: `Te has inscrito a ${event.title}`,
          duration: 3000,
        });
      }

      // TODO: Integrar con sistema de inscripciones real
      // registrationService.register({
      //   eventId: event.id,
      //   userId: currentUser.id,
      //   requiresApproval: event.requireAcceptance,
      // });
    }
  };

  const refreshEvent = async () => {
    if (!eventId) return;

    try {
      setLoading(true);
      const eventData = await eventsService.getEventById(eventId);
      setEvent(eventData);
      setError(null);
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
    handleAddToCart,
    refreshEvent, // ✨ Nueva función para refrescar datos
    router,
  };
}
