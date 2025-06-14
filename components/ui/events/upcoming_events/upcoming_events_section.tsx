"use client";

import { motion } from "framer-motion";
import { EventCard } from "@/components/events/event_card";
import { useEvents } from "@/hooks/useEvents";
import { Loader2, AlertCircle, ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function UpcomingEventsSection() {
  const { events, isLoading, error } = useEvents({
    initialPageSize: 12, // Obtener más eventos para filtrar
    autoFetch: true,
  });

  // ✨ Filtrar eventos próximos (solo futuros)
  const upcomingEvents = useMemo(() => {
    if (!events) return [];

    const now = new Date();
    const futureEvents = events
      .filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate > now; // Solo eventos futuros
      })
      .sort((a, b) => {
        // Ordenar por fecha más próxima
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA.getTime() - dateB.getTime();
      })
      .slice(0, 8); // Tomar los 8 más próximos

    console.log("Upcoming events filtered:", {
      totalEvents: events.length,
      futureEvents: futureEvents.length,
      now: now.toISOString(),
    });

    return futureEvents;
  }, [events]);

  // ✨ Estado de carga
  if (isLoading) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="flex flex-col items-center justify-center py-16"
      >
        <Loader2 className="h-12 w-12 text-emerald-400 animate-spin mb-4" />
        <p className="text-gray-400 text-lg">Cargando próximos eventos...</p>
      </motion.div>
    );
  }

  // ✨ Estado de error
  if (error) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="flex flex-col items-center justify-center py-16"
      >
        <AlertCircle className="h-12 w-12 text-red-400 mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">
          Error al cargar próximos eventos
        </h3>
        <p className="text-gray-400 text-center mb-6 max-w-md">
          {error.message || "No se pudieron cargar los próximos eventos"}
        </p>
        <Button
          onClick={() => window.location.reload()}
          variant="outline"
          className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10"
        >
          Intentar de nuevo
        </Button>
      </motion.div>
    );
  }

  // ✨ Estado sin eventos próximos
  if (!upcomingEvents || upcomingEvents.length === 0) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="text-center py-16"
      >
        <div className="w-24 h-24 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
          <Calendar className="h-12 w-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">
          No hay eventos próximos
        </h3>
        <p className="text-gray-400 mb-6">
          {events && events.length > 0
            ? "Todos los eventos mostrados ya han finalizado"
            : "En este momento no hay eventos programados"}
        </p>
        <Link href="/events">
          <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
            Ver todos los eventos
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      {/* ✨ Estadísticas de próximos eventos */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
      >
        <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-xl p-4 text-center border border-emerald-500/20">
          <p className="text-2xl font-bold text-emerald-400">
            {upcomingEvents.length}
          </p>
          <p className="text-gray-400 text-xs">Próximos eventos</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl p-4 text-center border border-blue-500/20">
          <p className="text-2xl font-bold text-blue-400">
            {upcomingEvents.filter((e) => e.price === 0).length}
          </p>
          <p className="text-gray-400 text-xs">Eventos gratuitos</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-4 text-center border border-purple-500/20">
          <p className="text-2xl font-bold text-purple-400">
            {new Set(upcomingEvents.map((e) => e.category?.name)).size}
          </p>
          <p className="text-gray-400 text-xs">Categorías</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl p-4 text-center border border-orange-500/20">
          <p className="text-2xl font-bold text-orange-400">
            {
              upcomingEvents.filter((e) => {
                const eventDate = new Date(e.date);
                const weekFromNow = new Date();
                weekFromNow.setDate(weekFromNow.getDate() + 7);
                return eventDate <= weekFromNow;
              }).length
            }
          </p>
          <p className="text-gray-400 text-xs">Esta semana</p>
        </div>
      </motion.div>

      {/* ✨ Grid de próximos eventos */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={stagger}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {upcomingEvents.map((event, index) => (
          <motion.div key={event.id} variants={fadeIn} className="w-full">
            <EventCard event={event} />
          </motion.div>
        ))}
      </motion.div>

      {/* ✨ Botón para ver más próximos eventos */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="text-center pt-8"
      >
        <Link href="/events?filter=upcoming">
          <Button
            size="lg"
            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25"
          >
            Ver más próximos eventos
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
