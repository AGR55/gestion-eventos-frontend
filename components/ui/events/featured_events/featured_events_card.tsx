"use client";

import { CalendarDays, MapPin, ArrowRight, Star, Users, Clock } from "lucide-react";
import { Chip } from "../chip";
import { Label } from "../../label";
import Image from "next/image";
import { Event } from "@/types/types";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export const FeaturedEventsCard = ({ event }: { event: Event }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="w-full sm:w-[480px] h-[360px] rounded-3xl relative overflow-hidden group cursor-pointer shadow-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -8, rotateY: 2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      {/* Background image with parallax effect */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        animate={{ scale: isHovered ? 1.1 : 1.05 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Image
          src={event.image}
          alt={event.name}
          width={480}
          height={360}
          className="rounded-3xl object-cover w-full h-full"
          priority
        />
      </motion.div>

      {/* Dynamic gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/90 rounded-3xl"></div>
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-cyan-900/40 via-transparent to-transparent rounded-3xl"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Top section with badges */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-20">
        <div className="flex gap-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <Chip
              variant="filled"
              color="blue"
              size="sm"
              className="bg-gradient-to-r from-cyan-500/90 to-blue-500/90 backdrop-blur-sm border border-white/20 shadow-lg"
            >
              {event.state}
            </Chip>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          whileHover={{ scale: 1.1, rotate: 10 }}
          className="bg-amber-500/95 backdrop-blur-sm p-2 rounded-full shadow-lg border border-amber-300/30"
        >
          <Star className="h-4 w-4 text-white" fill="white" />
        </motion.div>
      </div>

      {/* Content section */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {/* Metadata row */}
          <div className="flex items-center text-xs gap-3 flex-wrap">
            <motion.span
              className="flex items-center gap-1.5 text-cyan-300 bg-cyan-500/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-cyan-500/30"
              whileHover={{ scale: 1.05 }}
            >
              <CalendarDays size={12} />
              {event.date}
            </motion.span>

            <motion.span
              className="flex items-center gap-1.5 text-emerald-300 bg-emerald-500/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-emerald-500/30"
              whileHover={{ scale: 1.05 }}
            >
              <MapPin size={12} />
              {event.location}
            </motion.span>
          </div>

          {/* Title */}
          <motion.h3
            className="text-2xl md:text-3xl font-bold text-white leading-tight"
            animate={{
              color: isHovered ? "#67e8f9" : "#ffffff"
            }}
            transition={{ duration: 0.3 }}
          >
            {event.name}
          </motion.h3>

          {/* Description expandable */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              height: isHovered ? "auto" : 0,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-gray-200 text-sm leading-relaxed mb-3">
              {event.description || "Descubre una experiencia única llena de momentos inolvidables y conexiones especiales."}
            </p>

            {/* Action buttons */}
            <div className="flex gap-3">
              <Link
                href={`/events/${event.id}`}
                className="flex-1"
              >
                <motion.button
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-cyan-500/25"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Ver detalles</span>
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </motion.button>
              </Link>

              <motion.button
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 hover:border-white/30 text-white p-3 rounded-xl transition-all duration-300"
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Guardar evento"
              >
                <Star size={16} />
              </motion.button>
            </div>
          </motion.div>

          {/* Default CTA when not hovered */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{
              opacity: isHovered ? 0 : 1,
              height: isHovered ? 0 : "auto",
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <Link
              href={`/events/${event.id}`}
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium group/link"
            >
              <span>Más información</span>
              <ArrowRight
                size={14}
                className="transition-transform group-hover/link:translate-x-1"
              />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Interactive effects */}

      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 pointer-events-none rounded-3xl"
        initial={{ opacity: 0, x: "-100%", rotate: 25 }}
        animate={{
          opacity: isHovered ? 0.1 : 0,
          x: isHovered ? "100%" : "-100%",
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />

      {/* Glow effect */}
      <motion.div
        className="absolute -inset-1 bg-gradient-to-r from-cyan-500/50 via-blue-500/50 to-purple-500/50 rounded-3xl opacity-0 blur-lg -z-10"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Border glow */}
      <motion.div
        className="absolute inset-0 rounded-3xl border border-white/20"
        animate={{
          borderColor: isHovered ? "rgba(103, 232, 249, 0.5)" : "rgba(255, 255, 255, 0.2)"
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};
