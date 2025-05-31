"use client";

import { CalendarDays, MapPin, ArrowRight, Star } from "lucide-react";
import { Chip } from "../chip";
import Image from "next/image";
import { Event } from "@/types/types";
import { motion } from "framer-motion";
import Link from "next/link";

export const FeaturedEventsCard = ({ event }: { event: Event }) => {
  return (
    <motion.div
      className="w-full sm:w-[480px] h-[360px] rounded-3xl relative overflow-hidden group cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Background image - sin animaciones de escala */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={event.image}
          alt={event.name}
          width={480}
          height={360}
          className="rounded-3xl object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          priority
        />
      </div>

      {/* Overlay simple */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/90 rounded-3xl"></div>

      {/* Top section con badges simplificado */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-20">
        <Chip
          variant="filled"
          color="blue"
          size="sm"
          className="bg-cyan-500/90 backdrop-blur-sm border border-white/20"
        >
          {event.state}
        </Chip>

        <div className="bg-amber-500/95 backdrop-blur-sm p-2 rounded-full border border-amber-300/30">
          <Star className="h-4 w-4 text-white" fill="white" />
        </div>
      </div>

      {/* Content section simplificado */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
        <div className="space-y-3">
          {/* Metadata row */}
          <div className="flex items-center text-xs gap-3 flex-wrap">
            <span className="flex items-center gap-1.5 text-cyan-300 bg-cyan-500/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-cyan-500/30">
              <CalendarDays size={12} />
              {event.date}
            </span>

            <span className="flex items-center gap-1.5 text-emerald-300 bg-emerald-500/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-emerald-500/30">
              <MapPin size={12} />
              {event.location}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight group-hover:text-cyan-300 transition-colors duration-300">
            {event.name}
          </h3>

          {/* Description que aparece en hover - sin animaciones complejas */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-h-0 group-hover:max-h-32 overflow-hidden">
            <p className="text-gray-200 text-sm leading-relaxed mb-3">
              {event.description ||
                "Descubre una experiencia única llena de momentos inolvidables."}
            </p>

            {/* Action buttons simplificados */}
            <div className="flex gap-3">
              <Link href={`/events/${event.id}`} className="flex-1">
                <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-300 flex items-center justify-center gap-2">
                  <span>Ver detalles</span>
                  <ArrowRight size={16} />
                </button>
              </Link>

              <button
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white p-3 rounded-xl transition-colors duration-300"
                aria-label="Guardar evento"
              >
                <Star size={16} />
              </button>
            </div>
          </div>

          {/* CTA por defecto - visible cuando no hay hover */}
          <div className="group-hover:opacity-0 group-hover:max-h-0 transition-all duration-300">
            <Link
              href={`/events/${event.id}`}
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium"
            >
              <span>Más información</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* Border simple en hover */}
      <div className="absolute inset-0 rounded-3xl border border-white/20 group-hover:border-cyan-500/50 transition-colors duration-300" />
    </motion.div>
  );
};
