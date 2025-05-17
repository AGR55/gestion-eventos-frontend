"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { relatedEvents } from "@/test-data/events";
import useEventDetail from "./hooks/useEventDetail";
import { EventHeader } from "./components/EventHeader";
import EventBasicInfo from "./components/EventBasicInfo";
import EventGallery from "./components/EventGallery";
import EventDetailTabs from "./components/EventDetailTabs";
import RelatedEvents from "./components/RelatedEvents";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function EventDetailPage() {
  const {
    event,
    loading,
    selectedTicket,
    quantity,
    setQuantity,
    handleTicketSelection,
    handleAddToCart,
    router,
  } = useEventDetail();

  // Renderizado condicional para estado de carga
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 flex justify-center">
        <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Renderizado condicional para evento no encontrado
  if (!event) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">
          Evento no encontrado
        </h1>
        <p className="text-gray-400 mb-8">
          No pudimos encontrar el evento que estás buscando.
        </p>
        <Button onClick={() => router.push("/events")}>
          Ver todos los eventos
        </Button>
      </div>
    );
  }

  // Manejador para añadir al carrito
  const onAddToCart = () => {
    const result = handleAddToCart();
    if (result?.success) {
      toast.success(result.message, {
        description: result.description,
      });
    }
  };

  return (
    <div className="bg-[#111E27] min-h-screen mt-20">
      <EventHeader eventName={event.name} />

      <div className="container mx-auto px-4 py-8">
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-12"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <EventBasicInfo
              event={event}
              onTicketSelect={handleTicketSelection}
            />

            <EventGallery
              mainImage={event.image}
              gallery={event.gallery}
              eventName={event.name}
            />
          </div>
        </motion.section>

        <section className="mb-12">
          <EventDetailTabs
            event={event}
            selectedTicket={selectedTicket}
            onTicketSelect={handleTicketSelection}
          />
        </section>

        <RelatedEvents events={relatedEvents} />
      </div>
    </div>
  );
}
