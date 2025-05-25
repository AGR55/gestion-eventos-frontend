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
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Star,
  Share2,
  Heart,
  Ticket,
  ArrowLeft,
  Shield,
  Zap,
  CheckCircle,
  AlertTriangle,
  Info,
  TrendingUp,
  Globe,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { getEventDateInfo } from "@/lib/date-utils";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6 },
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6 },
  },
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

  const [isFavorite, setIsFavorite] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  // Renderizado mejorado para estado de carga
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="relative">
            <div className="w-20 h-20 border-4 border-cyan-400/30 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-t-cyan-400 rounded-full animate-spin"></div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6"
          >
            <h3 className="text-white text-lg font-semibold mb-2">
              Cargando evento
            </h3>
            <p className="text-gray-400">
              Preparando una experiencia increíble...
            </p>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // Renderizado mejorado para evento no encontrado
  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-4 text-center"
        >
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-24 h-24 rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 flex items-center justify-center mx-auto mb-8 border border-red-500/30"
            >
              <AlertTriangle className="h-12 w-12 text-red-400" />
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Evento No Encontrado
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              El evento que buscas no existe o ha sido removido. ¿Te gustaría
              explorar otros eventos increíbles?
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => router.push("/events")}
                className="h-12 px-6 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-xl"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Ver Todos los Eventos
              </Button>

              <Button
                onClick={() => router.push("/")}
                variant="outline"
                className="h-12 px-6 border-gray-600 text-gray-300 hover:bg-gray-700/50 rounded-xl"
              >
                Ir al Inicio
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Manejador mejorado para añadir al carrito
  const onAddToCart = () => {
    const result = handleAddToCart();
    if (result?.success) {
      toast.success(result.message, {
        description: result.description,
        action: {
          label: "Ver carrito",
          onClick: () => router.push("/cart"),
        },
      });
    }
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(
      isFavorite ? "Removido de favoritos" : "Añadido a favoritos",
      {
        description: isFavorite
          ? "Ya no recibirás actualizaciones de este evento"
          : "Te notificaremos sobre actualizaciones importantes",
      }
    );
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.name,
        text: `¡Mira este increíble evento: ${event.name}!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("¡Enlace copiado!", {
        description: "El enlace del evento se copió al portapapeles",
      });
    }
  };

  // Obtener información de fecha de forma segura
  const dateInfo = getEventDateInfo(event.date);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Breadcrumb mejorado */}
      <div className="bg-gray-800/30 backdrop-blur-sm border-b border-gray-700/50 mt-16">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link
              href="/"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
            >
              Inicio
            </Link>
            <span className="text-gray-600">/</span>
            <Link
              href="/events"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
            >
              Eventos
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-white font-medium truncate max-w-[200px]">
              {event.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section Completamente Rediseñado */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={event.image}
            alt={event.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-gray-900/40"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-transparent to-gray-900/90"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            className="max-w-4xl"
          >
            {/* Status Badge */}
            <motion.div variants={fadeIn} className="mb-6">
              <div className="flex items-center gap-3">
                <Badge
                  className={`${
                    event.state === "upcoming"
                      ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border-green-500/30"
                      : event.state === "live"
                      ? "bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-400 border-red-500/30"
                      : "bg-gradient-to-r from-gray-500/20 to-gray-600/20 text-gray-400 border-gray-500/30"
                  } px-3 py-1 text-sm font-semibold border backdrop-blur-sm`}
                >
                  <div className="w-2 h-2 rounded-full bg-current mr-2 animate-pulse"></div>
                  {event.state === "upcoming"
                    ? "Próximamente"
                    : event.state === "live"
                    ? "En Vivo"
                    : "Finalizado"}
                </Badge>

                {/* Badge de tiempo relativo */}
                {dateInfo.isValid && (
                  <Badge
                    variant="outline"
                    className="bg-amber-500/10 text-amber-400 border-amber-500/30"
                  >
                    <Clock className="h-3 w-3 mr-1" />
                    {dateInfo.relativeTime}
                  </Badge>
                )}
              </div>
            </motion.div>

            {/* Categorías */}
            <motion.div variants={fadeIn} className="flex flex-wrap gap-2 mb-6">
              {event.categories.map((category: string, index: number) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/20 transition-colors"
                >
                  {category}
                </Badge>
              ))}
            </motion.div>

            {/* Título del evento */}
            <motion.h1
              variants={fadeIn}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            >
              {event.name}
            </motion.h1>

            {/* Información básica mejorada */}
            <motion.div
              variants={fadeIn}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            >
              <div className="flex items-center gap-3 bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
                <div className="p-2 bg-cyan-500/20 rounded-lg">
                  <Calendar className="h-5 w-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Fecha</p>
                  <p className="text-white font-semibold capitalize">
                    {dateInfo.formattedDate}
                  </p>
                  {!dateInfo.isValid && (
                    <p className="text-amber-400 text-xs">⚠ Verificar fecha</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
                <div className="p-2 bg-emerald-500/20 rounded-lg">
                  <Clock className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Hora</p>
                  <p className="text-white font-semibold">
                    {dateInfo.formattedTime}
                  </p>
                  {dateInfo.isValid && dateInfo.daysUntil >= 0 && (
                    <p className="text-emerald-400 text-xs">
                      {dateInfo.isToday
                        ? "¡Hoy!"
                        : dateInfo.isTomorrow
                        ? "Mañana"
                        : `En ${dateInfo.daysUntil} días`}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <MapPin className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Ubicación</p>
                  <p className="text-white font-semibold">{event.location}</p>
                </div>
              </div>
            </motion.div>

            {/* Alerta si la fecha no es válida */}
            {!dateInfo.isValid && (
              <motion.div
                variants={fadeIn}
                className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-8"
              >
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <div>
                    <p className="text-amber-400 font-medium text-sm">
                      Fecha por confirmar
                    </p>
                    <p className="text-gray-300 text-xs">
                      El organizador actualizará la fecha próximamente
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Acciones rápidas */}
            <motion.div variants={fadeIn} className="flex flex-wrap gap-4">
              <Button
                onClick={onAddToCart}
                disabled={dateInfo.isPast}
                className={`h-14 px-8 font-bold text-lg rounded-xl shadow-lg transition-all duration-300 ${
                  dateInfo.isPast
                    ? "bg-gray-600/50 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white hover:shadow-cyan-500/25"
                }`}
              >
                <Ticket className="mr-2 h-5 w-5" />
                {dateInfo.isPast
                  ? "Evento Finalizado"
                  : `Comprar Entradas - $${event.price}`}
              </Button>

              <Button
                onClick={handleFavorite}
                variant="outline"
                className={`h-14 px-6 rounded-xl border-2 transition-all duration-300 ${
                  isFavorite
                    ? "bg-red-500/20 border-red-500/50 text-red-400 hover:bg-red-500/30"
                    : "bg-gray-800/50 border-gray-600/50 text-gray-300 hover:bg-gray-700/50"
                }`}
              >
                <Heart
                  className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`}
                />
              </Button>

              <Button
                onClick={handleShare}
                variant="outline"
                className="h-14 px-6 bg-gray-800/50 border-gray-600/50 text-gray-300 hover:bg-gray-700/50 rounded-xl"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats flotantes mejoradas */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="absolute bottom-6 right-6 hidden lg:block"
        >
          <div className="bg-gray-900/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 min-w-[200px]">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Asistentes</span>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-cyan-400" />
                  <span className="text-white font-semibold">
                    {event.attendees || "250+"}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Entradas</span>
                <div className="flex items-center gap-2">
                  <Ticket className="h-4 w-4 text-emerald-400" />
                  <span className="text-white font-semibold">
                    {event.tickets || "50"} disponibles
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Valoración</span>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-amber-400 fill-current" />
                  <span className="text-white font-semibold">4.9</span>
                </div>
              </div>

              {dateInfo.isValid && !dateInfo.isPast && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Tiempo</span>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-purple-400" />
                    <span className="text-white font-semibold text-xs">
                      {dateInfo.relativeTime}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Resto del contenido permanece igual */}
      <div className="container mx-auto px-4 py-12">
        {/* Información de confianza */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                icon: Shield,
                text: "Compra segura",
                color: "text-green-400",
              },
              {
                icon: CheckCircle,
                text: "Evento verificado",
                color: "text-cyan-400",
              },
              {
                icon: Zap,
                text: "Entrega instantánea",
                color: "text-purple-400",
              },
              { icon: Globe, text: "Soporte 24/7", color: "text-amber-400" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50"
              >
                <item.icon className={`h-5 w-5 ${item.color}`} />
                <span className="text-white font-medium text-sm">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Grid principal con información del evento */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="grid lg:grid-cols-3 gap-12 mb-16"
        >
          {/* Columna principal */}
          <div className="lg:col-span-2 space-y-12">
            <EventBasicInfo
              event={event}
              onTicketSelect={handleTicketSelection}
            />

            <EventDetailTabs
              event={event}
              selectedTicket={selectedTicket}
              onTicketSelect={handleTicketSelection}
            />
          </div>

          {/* Sidebar */}
          <motion.div variants={slideInRight} className="space-y-8">
            <EventGallery
              mainImage={event.image}
              gallery={event.gallery}
              eventName={event.name}
            />

            {/* Widget de compra mejorado */}
            <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/50 to-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-8 sticky top-6">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-400 px-3 py-1 rounded-full text-sm font-semibold mb-4 border border-cyan-500/20">
                  <Sparkles className="h-4 w-4" />
                  {dateInfo.isPast ? "Evento Finalizado" : "Oferta Especial"}
                </div>
                <div className="text-3xl font-bold text-white mb-2">
                  ${event.price}
                  <span className="text-lg text-gray-400 font-normal ml-2">
                    por persona
                  </span>
                </div>
                {!dateInfo.isPast ? (
                  <p className="text-green-400 text-sm font-medium">
                    ⚡ Últimas 12 entradas disponibles
                  </p>
                ) : (
                  <p className="text-gray-400 text-sm">
                    Este evento ya ha finalizado
                  </p>
                )}
              </div>

              <Button
                onClick={onAddToCart}
                disabled={dateInfo.isPast}
                className={`w-full h-14 font-bold text-lg rounded-xl shadow-lg transition-all duration-300 mb-4 ${
                  dateInfo.isPast
                    ? "bg-gray-600/50 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white hover:shadow-cyan-500/25"
                }`}
              >
                <Ticket className="mr-2 h-5 w-5" />
                {dateInfo.isPast ? "Evento Finalizado" : "Reservar Ahora"}
              </Button>

              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Confirmación instantánea</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Cancelación gratuita hasta 24h antes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Soporte al cliente 24/7</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Eventos relacionados */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <RelatedEvents events={relatedEvents} />
        </motion.section>
      </div>
    </div>
  );
}
