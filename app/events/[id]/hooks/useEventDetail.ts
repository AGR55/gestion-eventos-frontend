import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

const useEventDetail = () => {
  const params = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchEvent = async () => {
      if (params.id) {
        console.log("URL params ID:", params.id);

        try {
          const { events } = await import("@/test-data/events");
          const fetchedEvent = events.find(
            (event) => event.id === Number(params.id)
          );

          if (fetchedEvent) {
            setEvent(fetchedEvent);
          } else {
            console.error("Event not found for ID:", params.id);
            setEvent(null);
          }
        } catch (error) {
          console.error("Error fetching event:", error);
          setEvent(null);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchEvent();
  }, [params.id]);

  const handleTicketSelection = (ticketName: string) => {
    setSelectedTicket(ticketName);
    document
      .getElementById("booking-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAddToCart = () => {
    if (!selectedTicket || !event) return;

    const ticket = event.ticketTypes.find(
      (t: any) => t.name === selectedTicket
    );

    if (ticket) {
      return {
        success: true,
        message: "¡Añadido al carrito!",
        description: `${quantity}x ${selectedTicket} - ${
          ticket.price * quantity
        }€`,
      };
    }

    return { success: false };
  };

  return {
    event,
    loading,
    selectedTicket,
    quantity,
    setQuantity,
    handleTicketSelection,
    handleAddToCart,
    router,
  };
};

export default useEventDetail;
