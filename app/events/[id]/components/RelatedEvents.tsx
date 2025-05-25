import { FeaturedEventsCard } from "@/components/ui/events/featured_events/featured_events_card";
import { motion } from "framer-motion";
import { memo } from "react";
import { ArrowRight, Sparkles, TrendingUp, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

type RelatedEventsProps = {
  events: any[];
};

const RelatedEvents = memo(({ events }: RelatedEventsProps) => {
  if (!events.length) return null;

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
      className="bg-gradient-to-br from-gray-900/80 via-gray-800/50 to-gray-900/80 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-8 md:p-12 relative overflow-hidden"
    >
      {/* Elementos decorativos */}
      <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-cyan-500/10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-purple-500/10 blur-3xl"></div>

      <div className="relative z-10">
        {/* Header mejorado */}
        <div className="text-center mb-12">
          <motion.div
            variants={fadeIn}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-400 px-3 py-1 rounded-full text-sm font-semibold mb-6 border border-purple-500/20"
          >
            <Sparkles className="h-4 w-4" />
            Eventos Recomendados
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Descubre Más
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
              {" "}
              Experiencias
            </span>
          </h2>

          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Eventos cuidadosamente seleccionados que podrían interesarte basados
            en tus preferencias
          </p>
        </div>

        {/* Grid de eventos mejorado */}
        <motion.div
          variants={staggerChildren}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10"
        >
          {events.slice(0, 3).map((event, index) => (
            <motion.div
              key={event.id}
              variants={fadeIn}
              className="group relative"
            >
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden hover:border-cyan-500/30 transition-all duration-300 hover:transform hover:scale-105">
                {/* Imagen del evento */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  {/* Badge de tendencia */}
                  {index === 0 && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500/90 to-pink-500/90 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      Trending
                    </div>
                  )}

                  {/* Precio */}
                  <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-lg font-semibold">
                    ${event.price}
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-6">
                  {/* Categorías */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {event.categories
                      .slice(0, 2)
                      .map((category: string, catIndex: number) => (
                        <span
                          key={catIndex}
                          className="bg-cyan-500/10 text-cyan-400 px-2 py-1 rounded-lg text-xs border border-cyan-500/30"
                        >
                          {category}
                        </span>
                      ))}
                  </div>

                  {/* Título */}
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors line-clamp-2">
                    {event.name}
                  </h3>

                  {/* Información básica */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-400 text-sm">
                      <svg
                        className="h-4 w-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {new Date(event.date).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "short",
                      })}
                    </div>

                    <div className="flex items-center text-gray-400 text-sm">
                      <svg
                        className="h-4 w-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {event.location}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center text-gray-400">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{event.attendees || "120+"} asistentes</span>
                      </div>
                      <div className="flex items-center text-amber-400">
                        <Star className="h-4 w-4 mr-1 fill-current" />
                        <span>4.8</span>
                      </div>
                    </div>
                  </div>

                  {/* Botón de acción */}
                  <Link href={`/events/${event.id}`}>
                    <Button
                      className="w-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 text-cyan-400 border border-cyan-500/30 hover:border-cyan-400/50 rounded-xl transition-all duration-300"
                      variant="outline"
                    >
                      Ver detalles
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA para ver más eventos */}
        <motion.div variants={fadeIn} className="text-center">
          <Link href="/events">
            <Button className="h-12 px-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
              Ver todos los eventos
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
});

RelatedEvents.displayName = "RelatedEvents";

export default RelatedEvents;
