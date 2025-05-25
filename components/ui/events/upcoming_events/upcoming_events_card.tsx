"use client";

import { Event } from "@/types/types";
import { ArrowRight, Calendar, MapPin, Tag, Clock, Users, Star, Bookmark } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

export const UpcomingEventsCard = ({ event }: { event: Event }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Función para obtener el color de la categoría
  const getCategoryColor = (category: string) => {
    const colors = {
      "Música": "from-red-500/20 to-pink-500/20 text-red-400 border-red-500/30",
      "Arte": "from-purple-500/20 to-indigo-500/20 text-purple-400 border-purple-500/30",
      "Gastronomía": "from-orange-500/20 to-red-500/20 text-orange-400 border-orange-500/30",
      "Tecnología": "from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/30",
      "Deportes": "from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30",
      "default": "from-gray-500/20 to-gray-600/20 text-gray-400 border-gray-500/30"
    };
    return colors[category as keyof typeof colors] || colors.default;
  };

  const categoryText = Array.isArray(event.categories) && event.categories.length > 0
    ? event.categories[0]
    : typeof event.categories === "string"
    ? event.categories
    : "Evento";

  return (
    <motion.div
      className="w-full flex flex-col bg-gradient-to-br from-gray-900/50 via-gray-800/30 to-gray-900/50 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-gray-700/30 group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{
        y: -8,
        rotateY: 2,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(103, 232, 249, 0.1)"
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      {/* Image section with enhanced effects */}
      <div className="w-full h-[240px] relative overflow-hidden flex-shrink-0">
        <motion.div
          animate={{ scale: isHovered ? 1.1 : 1.05 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full h-full"
        >
          <Image
            className="object-cover object-center w-full h-full"
            src={event.image}
            alt={event.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </motion.div>

        {/* Dynamic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60"></div>
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-cyan-900/30 via-transparent to-transparent"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Top overlay elements */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          {/* Category tag with dynamic colors */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className={`bg-gradient-to-r ${getCategoryColor(categoryText)} backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold border shadow-lg`}
          >
            <span className="flex items-center gap-1.5">
              <Tag size={12} />
              {categoryText}
            </span>
          </motion.div>

          {/* Bookmark button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            onClick={(e) => {
              e.preventDefault();
              setIsBookmarked(!isBookmarked);
            }}
            className={`p-2 rounded-full backdrop-blur-sm border transition-all duration-300 ${
              isBookmarked 
                ? "bg-amber-500/90 border-amber-400/50 text-white" 
                : "bg-black/40 border-white/20 text-white hover:bg-white/20"
            }`}
          >
            <motion.div
              animate={{ rotate: isBookmarked ? 360 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isBookmarked ? <Star size={16} fill="currentColor" /> : <Bookmark size={16} />}
            </motion.div>
          </motion.button>
        </div>

        {/* Bottom overlay elements */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          {/* Date badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-black/60 backdrop-blur-sm px-3 py-2 rounded-xl text-white text-sm flex items-center gap-2 border border-white/10"
          >
            <Calendar size={16} className="text-cyan-400" />
            <span className="font-medium">{event.date}</span>
          </motion.div>

          {/* Additional info badges */}
          <div className="flex gap-2">
            {event.duration && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg text-white text-xs flex items-center gap-1"
              >
                <Clock size={12} className="text-emerald-400" />
                <span>{event.duration}</span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 pointer-events-none"
          initial={{ opacity: 0, x: "-100%", rotate: 25 }}
          animate={{
            opacity: isHovered ? 0.1 : 0,
            x: isHovered ? "100%" : "-100%",
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </div>

      {/* Enhanced content section */}
      <div className="p-6 flex flex-col flex-grow relative">
        {/* Glow effect */}
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-b-3xl opacity-0 blur-lg -z-10"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Title with enhanced styling */}
        <motion.h3 
          className="font-bold text-xl text-white mb-3 line-clamp-2 h-[60px] leading-tight"
          animate={{ 
            color: isHovered ? "#67e8f9" : "#ffffff",
            textShadow: isHovered ? "0 0 20px rgba(103, 232, 249, 0.3)" : "none"
          }}
          transition={{ duration: 0.3 }}
        >
          {event.name}
        </motion.h3>

        {/* Location with enhanced styling */}
        <motion.div 
          className="flex items-center gap-2 text-gray-300 text-sm mb-4"
          whileHover={{ scale: 1.02 }}
        >
          <div className="p-1 bg-cyan-500/20 rounded-full">
            <MapPin size={14} className="text-cyan-400" />
          </div>
          <span className="truncate font-medium">{event.location}</span>
        </motion.div>

        {/* Description with better typography */}
        <p className="text-sm text-gray-400 line-clamp-3 mb-6 leading-relaxed">
          {event.description || "Descubre una experiencia única que te conectará con momentos especiales y nuevas aventuras."}
        </p>

        {/* Enhanced action area */}
        <div className="mt-auto space-y-3">
          {/* Quick info row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex justify-between items-center text-xs text-gray-400"
          >
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Disponible
            </span>
            {event.price && (
              <span className="font-semibold text-cyan-400">
                ${event.price}
              </span>
            )}
          </motion.div>

          {/* Enhanced button */}
          <Link href={`/events/${event.id}`} className="block">
            <motion.div
              animate={{
                y: isHovered ? 0 : 3,
                scale: isHovered ? 1.02 : 1,
              }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <button className="w-full flex justify-center items-center py-3 px-6 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-xl transition-all duration-300 group/btn shadow-lg hover:shadow-cyan-500/25 border border-cyan-400/20">
                <span>Ver detalles</span>
                <ArrowRight
                  className="ml-2 group-hover/btn:translate-x-1 transition-transform duration-200"
                  size={18}
                />
              </button>
            </motion.div>
          </Link>
        </div>
      </div>

      {/* Enhanced border effect */}
      <motion.div
        className="absolute inset-0 rounded-3xl border border-transparent"
        animate={{ 
          borderColor: isHovered ? "rgba(103, 232, 249, 0.4)" : "transparent" 
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};
