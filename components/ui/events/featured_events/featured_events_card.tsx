"use client";

import { CalendarDays, MapPin, ArrowRight, Star } from "lucide-react";
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
      className="w-full sm:w-[480px] h-[320px] rounded-2xl relative overflow-hidden group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Decorative elements */}
      <div className="absolute top-3 right-3 z-20">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-amber-500/90 backdrop-blur-sm p-1.5 rounded-full shadow-lg"
        >
          <Star className="h-4 w-4 text-white" fill="white" />
        </motion.div>
      </div>

      {/* Main image with animated zoom on hover */}
      <motion.div
        className="w-full h-full"
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ duration: 0.4 }}
      >
        <Image
          src={event.image}
          alt={event.name}
          width={480}
          height={320}
          className="rounded-2xl object-cover w-full h-full"
          priority
        />
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90 rounded-2xl opacity-100 transition-opacity"></div>

      {/* Top metadata row */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
        <Chip variant="filled" color="blue" size="sm" className="w-max">
          {event.state}
        </Chip>
      </div>

      {/* Main content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
        <div className="flex flex-col gap-2">
          <Label className="text-white/90 flex items-center text-sm gap-2 flex-wrap">
            <span className="flex items-center gap-1">
              <CalendarDays size={14} className="text-cyan-400" />
              {event.date}
            </span>
            <span className="h-1 w-1 bg-cyan-400 rounded-full"></span>
            <span className="flex items-center gap-1">
              <MapPin size={14} className="text-cyan-400" />
              {event.location}
            </span>
          </Label>

          <Label className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
            {event.name}
          </Label>

          <motion.div
            className="mt-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              height: isHovered ? "auto" : 0,
            }}
            transition={{ duration: 0.2 }}
          >
            <Link
              href={`/events/${event.id}`}
              className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 text-sm font-medium group/link"
            >
              Ver detalles
              <ArrowRight
                size={14}
                className="transition-transform group-hover/link:translate-x-1"
              />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Interactive shine effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 pointer-events-none"
        initial={{ opacity: 0, rotate: -25, scale: 2 }}
        animate={{
          opacity: isHovered ? 0.07 : 0,
          left: isHovered ? "100%" : "-100%",
        }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
};
