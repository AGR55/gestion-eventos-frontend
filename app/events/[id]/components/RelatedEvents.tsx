import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, MapPin, DollarSign } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Event } from "@/types/types";
import Image from "next/image";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

interface RelatedEventsProps {
  events: Event[];
  loading?: boolean;
  categoryName?: string;
}

export default function RelatedEvents({
  events,
  loading = false,
  categoryName,
}: RelatedEventsProps) {
  // ✨ Helper para formatear fecha
  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("es-ES", {
        day: "numeric",
        month: "short",
      }),
      time: date.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  // ✨ Si está cargando, mostrar skeleton
  if (loading) {
    return (
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Cargando eventos relacionados...
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="bg-gray-900/50 rounded-xl overflow-hidden border border-gray-700/50 animate-pulse"
            >
              <div className="w-full h-48 bg-gray-700/50"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-700/50 rounded"></div>
                <div className="h-3 bg-gray-700/50 rounded w-3/4"></div>
                <div className="h-6 bg-gray-700/50 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    );
  }

  // ✨ Si no hay eventos, no mostrar la sección
  if (!events || events.length === 0) {
    return (
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-4">
          No hay eventos relacionados disponibles
        </h2>
        <p className="text-gray-400 mb-6">
          {categoryName
            ? `No encontramos otros eventos en la categoría "${categoryName}"`
            : "No encontramos otros eventos similares en este momento"}
        </p>
        <Link href="/events">
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
            Explorar todos los eventos
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </motion.section>
    );
  }

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
      className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">
          {categoryName
            ? `Otros eventos de ${categoryName}`
            : "Eventos que podrían interesarte"}
        </h2>
        <p className="text-gray-400">
          {events.length} evento{events.length !== 1 ? "s" : ""} relacionado
          {events.length !== 1 ? "s" : ""}
        </p>
      </div>

      <motion.div variants={stagger} className="grid md:grid-cols-3 gap-6 mb-8">
        {events.map((event, index) => {
          const eventDate = formatEventDate(event.date);

          return (
            <motion.div
              key={event.id}
              variants={fadeIn}
              className="bg-gray-900/50 rounded-xl overflow-hidden border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 group"
            >
              {/* ✨ Imagen del evento */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={`http://localhost:8080${
                    event.imageUrl || "/api/placeholder/400/300"
                  }`}
                  alt={event.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Overlay con precio */}
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-bold ${
                      event.price > 0
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                    }`}
                  >
                    {event.price > 0 ? `$${event.price} CUP` : "GRATIS"}
                  </span>
                </div>
              </div>

              {/* ✨ Contenido de la tarjeta */}
              <div className="p-4 space-y-3">
                <h3 className="text-white font-semibold text-lg line-clamp-2 group-hover:text-cyan-400 transition-colors">
                  {event.title}
                </h3>

                {/* ✨ Información del evento */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock className="h-4 w-4 text-cyan-400" />
                    <span>
                      {eventDate.date} • {eventDate.time}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin className="h-4 w-4 text-green-400" />
                    <span className="truncate">{event.address}</span>
                  </div>

                  {event.category && (
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full border border-purple-500/30">
                        {event.category.name}
                      </span>
                    </div>
                  )}
                </div>

                {/* ✨ Botón de acción */}
                <div className="pt-2">
                  <Link href={`/events/${event.id}`} className="block">
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full bg-gray-800/50 border-gray-600/50 hover:bg-cyan-500/10 hover:border-cyan-500/50 hover:text-cyan-400 transition-all"
                    >
                      Ver detalles
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* ✨ Botón para ver más eventos */}
      <div className="text-center">
        <Link href="/events">
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
            Ver todos los eventos
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </motion.section>
  );
}
