"use client";

import { Event } from "@/types/types";
import {
  ArrowRight,
  Calendar,
  MapPin,
  Tag,
  Clock,
  Star,
  Bookmark,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

export const UpcomingEventsCard = ({ event }: { event: Event }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Función para obtener el color de la categoría
  const getCategoryColor = (category: string) => {
    const colors = {
      Música: "from-red-500/20 to-pink-500/20 text-red-400 border-red-500/30",
      Arte: "from-purple-500/20 to-indigo-500/20 text-purple-400 border-purple-500/30",
      Gastronomía:
        "from-orange-500/20 to-red-500/20 text-orange-400 border-orange-500/30",
      Tecnología:
        "from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/30",
      Deportes:
        "from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30",
      default:
        "from-gray-500/20 to-gray-600/20 text-gray-400 border-gray-500/30",
    };
    return colors[category as keyof typeof colors] || colors.default;
  };

  const categoryText =
    Array.isArray(event.categories) && event.categories.length > 0
      ? event.categories[0]
      : typeof event.categories === "string"
      ? event.categories
      : "Evento";

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
    // Aquí puedes agregar lógica para guardar en favoritos
    console.log(
      `${isBookmarked ? "Removed from" : "Added to"} bookmarks:`,
      event.name
    );
  };

  return (
    <motion.div
      className="w-full flex flex-col bg-gradient-to-br from-gray-900/50 via-gray-800/30 to-gray-900/50 backdrop-blur-sm rounded-3xl shadow-lg overflow-hidden border border-gray-700/30 group hover:shadow-xl hover:border-cyan-500/30 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Image section simplificada */}
      <div className="w-full h-[240px] relative overflow-hidden flex-shrink-0">
        <Image
          className="object-cover object-center w-full h-full group-hover:scale-105 transition-transform duration-500"
          src={event.image}
          alt={event.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />

        {/* Overlay simplificado */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60"></div>

        {/* Top overlay elements */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          {/* Category tag */}
          <div
            className={`bg-gradient-to-r ${getCategoryColor(
              categoryText
            )} backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold border shadow-lg`}
          >
            <span className="flex items-center gap-1.5">
              <Tag size={12} />
              {categoryText}
            </span>
          </div>

          {/* Bookmark button funcional */}
          <button
            onClick={handleBookmark}
            className={`p-2 rounded-full backdrop-blur-sm border transition-all duration-300 ${
              isBookmarked
                ? "bg-amber-500/90 border-amber-400/50 text-white"
                : "bg-black/40 border-white/20 text-white hover:bg-white/20"
            }`}
          >
            {isBookmarked ? (
              <Star size={16} fill="currentColor" />
            ) : (
              <Bookmark size={16} />
            )}
          </button>
        </div>

        {/* Bottom overlay elements */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          {/* Date badge */}
          <div className="bg-black/60 backdrop-blur-sm px-3 py-2 rounded-xl text-white text-sm flex items-center gap-2 border border-white/10">
            <Calendar size={16} className="text-cyan-400" />
            <span className="font-medium">{event.date}</span>
          </div>

          {/* Duration badge */}
          {event.duration && (
            <div className="bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg text-white text-xs flex items-center gap-1">
              <Clock size={12} className="text-emerald-400" />
              <span>{event.duration}</span>
            </div>
          )}
        </div>
      </div>

      {/* Content section simplificada */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="font-bold text-xl text-white mb-3 line-clamp-2 h-[60px] leading-tight group-hover:text-cyan-300 transition-colors duration-300">
          {event.name}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-300 text-sm mb-4">
          <div className="p-1 bg-cyan-500/20 rounded-full">
            <MapPin size={14} className="text-cyan-400" />
          </div>
          <span className="truncate font-medium">{event.location}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-400 line-clamp-3 mb-6 leading-relaxed">
          {event.description ||
            "Descubre una experiencia única que te conectará con momentos especiales y nuevas aventuras."}
        </p>

        {/* Action area */}
        <div className="mt-auto space-y-3">
          {/* Quick info row */}
          <div className="flex justify-between items-center text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Disponible
            </span>
            {event.price && (
              <span className="font-semibold text-cyan-400">
                ${event.price}
              </span>
            )}
          </div>

          {/* Botón funcional arreglado */}
          <Link href={`/events/${event.id}`} className="block w-full">
            <button className="w-full flex justify-center items-center py-3 px-6 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-xl transition-all duration-300 group/btn shadow-lg hover:shadow-cyan-500/25 border border-cyan-400/20">
              <span>Ver detalles</span>
              <ArrowRight
                className="ml-2 group-hover/btn:translate-x-1 transition-transform duration-200"
                size={18}
              />
            </button>
          </Link>
        </div>
      </div>

      {/* Border effect simplificado */}
      <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-cyan-500/50 transition-colors duration-300 pointer-events-none" />
    </motion.div>
  );
};
