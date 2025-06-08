"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import useEventDetail from "@/hooks/useEventDetail";
import { EventHeader } from "./components/EventHeader";
import EventInfo from "./components/EventInfo";
import EventActions from "./components/EventActions";
import RelatedEvents from "./components/RelatedEvents";
import { ArrowLeft, AlertTriangle, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getEventDateInfo } from "@/lib/date-utils";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function EventDetailPage() {
  const {
    event,
    loading,
    error,
    relatedEvents, // ✨ Agregar
    loadingRelated, // ✨ Agregar
    isRegistering,
    isRegistered,
    isAuthenticated,
    showModal,
    modalType,
    handleRegistration,
    confirmAction,
    closeModal,
    router,
  } = useEventDetail();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-12 h-12 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Cargando evento...</p>
        </motion.div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-4 text-center"
        >
          <AlertTriangle className="h-16 w-16 text-red-400 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-white mb-4">
            Evento No Encontrado
          </h1>
          <p className="text-gray-300 mb-8">
            El evento que buscas no existe o ha sido removido.
          </p>
          <Button
            onClick={() => router.push("/events")}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Ver Eventos
          </Button>
        </motion.div>
      </div>
    );
  }

  const dateInfo = getEventDateInfo(event.date);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Breadcrumb */}
      <div className="bg-gray-800/30 backdrop-blur-sm border-b border-gray-700/50 pt-16">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/events" className="text-gray-400 hover:text-cyan-400">
              Eventos
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-white font-medium truncate">
              {event.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0">
          <Image
            src={`http://localhost:8080${
              event.imageUrl || "/api/placeholder/1200/600"
            }`}
            alt={event.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-gray-900/40"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="max-w-4xl"
          >
            <EventHeader event={event} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4">
                <p className="text-gray-400 text-sm">Fecha y hora</p>
                <p className="text-white font-semibold">
                  {dateInfo.formattedDate} - {dateInfo.formattedTime}
                </p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4">
                <p className="text-gray-400 text-sm">Ubicación</p>
                <p className="text-white font-semibold">{event.address}</p>
              </div>
            </div>

            <EventActions
              event={event}
              dateInfo={dateInfo}
              onRegistration={handleRegistration} // ✨ Cambiar prop
              isRegistering={isRegistering} // ✨ Agregar props
              isRegistered={isRegistered}
              isAuthenticated={isAuthenticated}
            />
          </motion.div>
        </div>
      </section>

      {/* Contenido principal */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Información principal */}
          <div className="lg:col-span-2">
            <EventInfo event={event} dateInfo={dateInfo} />
          </div>

          {/* Sidebar con compra */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 sticky top-6">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-white mb-2">
                  {event.price > 0 ? `$${event.price} CUP` : "GRATIS"}
                </div>
                {event.price > 0 && (
                  <p className="text-gray-400 text-sm">por persona</p>
                )}
              </div>

              <Button
                onClick={handleRegistration} // ✨ Cambiar función
                disabled={
                  dateInfo.isPast || !event.isPublished || isRegistering
                }
                className={`w-full h-12 font-bold rounded-xl mb-4 ${
                  dateInfo.isPast || !event.isPublished
                    ? "bg-gray-600/50 text-gray-400"
                    : isRegistered
                    ? "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                    : "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                }`}
              >
                {isRegistering ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Procesando...
                  </>
                ) : dateInfo.isPast ? (
                  "Evento Finalizado"
                ) : !event.isPublished ? (
                  "No Disponible"
                ) : isRegistered ? (
                  "Cancelar Inscripción"
                ) : event.price > 0 ? (
                  "Inscribirse"
                ) : (
                  "Inscribirse Gratis"
                )}
              </Button>

              <div className="space-y-2 text-sm text-gray-400">
                <p>✓ Confirmación instantánea</p>
                <p>✓ Cancelación hasta 24h antes</p>
                <p>✓ Soporte 24/7</p>
              </div>
            </div>
          </div>
        </div>

        {/* Eventos relacionados - ✨ Actualizar props */}
        <div className="mt-16">
          <RelatedEvents
            events={relatedEvents}
            loading={loadingRelated}
            categoryName={event.category?.name}
          />
        </div>
      </div>

      {/* ✨ Modal de Confirmación */}
      <ConfirmationModal
        isOpen={showModal}
        onClose={closeModal}
        onConfirm={confirmAction}
        event={event}
        isRegistering={isRegistering}
        isAuthenticated={isAuthenticated}
        actionType={modalType}
      />
    </div>
  );
}
