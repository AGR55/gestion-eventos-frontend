"use client";

import { motion } from "framer-motion";
import { EventCard } from "@/components/events/event_card";
import { useEvents } from "@/hooks/useEvents";
import { Loader2, AlertCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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

export function FeaturedEventsSection() {
  const { events, isLoading, error } = useEvents({
    initialPageSize: 6, // Mostrar 6 eventos destacados
    autoFetch: true,
  });

  // ✨ Estado de carga
  if (isLoading) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="flex flex-col items-center justify-center py-16"
      >
        <Loader2 className="h-12 w-12 text-cyan-400 animate-spin mb-4" />
        <p className="text-gray-400 text-lg">Cargando eventos destacados...</p>
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
          Error al cargar eventos
        </h3>
        <p className="text-gray-400 text-center mb-6 max-w-md">
          {error.message || "No se pudieron cargar los eventos destacados"}
        </p>
        <Button
          onClick={() => window.location.reload()}
          variant="outline"
          className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
        >
          Intentar de nuevo
        </Button>
      </motion.div>
    );
  }

  // ✨ Estado sin eventos
  if (!events || events.length === 0) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="text-center py-16"
      >
        <div className="w-24 h-24 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="h-12 w-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">
          No hay eventos disponibles
        </h3>
        <p className="text-gray-400 mb-6">
          En este momento no hay eventos destacados para mostrar
        </p>
        <Link href="/events">
          <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
            Ver todos los eventos
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      {/* ✨ Grid de eventos destacados */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={stagger}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {events.slice(0, 6).map((event, index) => (
          <motion.div key={event.id} variants={fadeIn} className="w-full">
            <EventCard event={event} />
          </motion.div>
        ))}
      </motion.div>

      {/* ✨ Botón para ver más eventos */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="text-center pt-8"
      >
        <Link href="/events">
          <Button
            size="lg"
            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
          >
            Ver todos los eventos
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
