"use client";

import { Event } from "@/types/types";
import { ArrowRight, Calendar, MapPin, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

export const UpcomingEventsCard = ({ event }: { event: Event }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="w-full h-[460px] flex flex-col bg-white dark:bg-[#13212e] rounded-2xl shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{
        y: -5,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Image section - fixed height */}
      <div className="w-full h-[220px] relative overflow-hidden flex-shrink-0">
        <motion.div
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.4 }}
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

        {/* Category tag overlay */}
        <div className="absolute top-4 left-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-medium"
          >
            <span className="flex items-center gap-1">
              <Tag size={12} />
              {Array.isArray(event.categories) && event.categories.length > 0
                ? event.categories[0]
                : typeof event.categories === "string"
                ? event.categories
                : "Categoría"}
            </span>
          </motion.div>
        </div>

        {/* Date overlay */}
        <div className="absolute bottom-4 right-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-black/60 backdrop-blur-sm px-3 py-2 rounded-lg text-white text-sm flex items-center gap-2"
          >
            <Calendar size={16} className="text-cyan-400" />
            {event.date}
          </motion.div>
        </div>
      </div>

      {/* Content section with flexible layout */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Title with controlled height */}
        <h3 className="font-bold text-lg text-neutral-800 dark:text-white mb-2 line-clamp-2 h-[50px] transition-colors group-hover:text-cyan-700 dark:group-hover:text-cyan-400">
          {event.name}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1 text-neutral-600 dark:text-neutral-300 text-sm mb-3">
          <MapPin size={14} className="text-cyan-600 dark:text-cyan-400" />
          <span className="truncate">{event.location}</span>
        </div>

        {/* Description with line clamp */}
        <p className="text-sm text-neutral-700 dark:text-neutral-300 line-clamp-3 mb-4">
          {event.description}
        </p>

        {/* Button that stays at bottom */}
        <div className="mt-auto">
          <motion.div
            animate={{
              y: isHovered ? 0 : 5,
              opacity: isHovered ? 1 : 0.9,
            }}
            transition={{ duration: 0.2 }}
          >
            <Link
              href={`/events/${event.id}`}
              className="w-full flex justify-center items-center py-2.5 px-4 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-medium rounded-lg transition-all duration-200 group"
              prefetch={true}
            >
              Ver detalles
              <ArrowRight
                className="ml-2 group-hover:translate-x-1 transition-transform"
                size={18}
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
