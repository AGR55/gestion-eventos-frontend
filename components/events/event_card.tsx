"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Users, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Event } from "@/types/types";
import { useState } from "react";
import { toast } from "sonner";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.getDate().toString().padStart(2, "0"),
      month: date.toLocaleDateString("es-ES", { month: "short" }),
      time: date.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      fullDate: date.toLocaleDateString("es-ES", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };
  };

  const dateInfo = formatDate(event.date);
  const isEventPast = new Date(event.date) < new Date();

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "Removido de favoritos" : "Añadido a favoritos");
  };

  const handleQuickAction = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isEventPast) return;

    toast.success(
      event.price > 0 ? "Añadido al carrito" : "Inscripción exitosa"
    );
  };

  // ✨ Protecciones mejoradas para valores null/undefined
  const categoryName = event.category?.name || "Sin categoría";
  const organizerName = event.organizer?.name || "Organizador";
  const organizerInitial = organizerName.charAt(0).toUpperCase();

  // ✨ Función helper para construir URL de imagen segura
  const getEventImage = (imageUrl: string | null | undefined): string => {
    if (!imageUrl) {
      return "/api/placeholder/400/300";
    }

    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
      return imageUrl;
    }

    if (imageUrl.startsWith("/api/")) {
      return imageUrl;
    }

    const cleanImageUrl = imageUrl.startsWith("/") ? imageUrl : `/${imageUrl}`;
    const baseUrl =
      process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") ||
      "http://localhost:8080";

    try {
      new URL(cleanImageUrl, baseUrl);
      return `${baseUrl}${cleanImageUrl}`;
    } catch (error) {
      console.warn("Invalid image URL, using placeholder:", imageUrl);
      return "/api/placeholder/400/300";
    }
  };

  const eventImage = getEventImage(event.imageUrl);

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="group w-full"
    >
      <Link href={`/events/${event.id}`}>
        {/* ✨ Contenedor con altura fija */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 h-[520px] flex flex-col">
          {/* ✨ Imagen con altura fija */}
          <div className="relative h-48 w-full overflow-hidden flex-shrink-0">
            <Image
              src={eventImage}
              alt={event.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* Overlay con fecha */}
            <div className="absolute top-4 left-4 bg-gray-900/80 backdrop-blur-sm rounded-xl p-2 text-center">
              <div className="text-2xl font-bold text-white">
                {dateInfo.day}
              </div>
              <div className="text-xs text-gray-300 uppercase">
                {dateInfo.month}
              </div>
            </div>

            {/* Badge de precio */}
            <div className="absolute top-4 right-4">
              <Badge
                variant={event.price > 0 ? "default" : "secondary"}
                className={`${
                  event.price > 0
                    ? "bg-gradient-to-r from-green-500 to-emerald-500"
                    : "bg-gradient-to-r from-cyan-500 to-blue-500"
                } text-white font-bold text-xs px-2 py-1`}
              >
                {event.price > 0 ? `$${event.price}` : "GRATIS"}
              </Badge>
            </div>

            {/* Botón de favorito */}
            <button
              onClick={handleFavorite}
              className="absolute bottom-4 right-4 bg-gray-900/80 backdrop-blur-sm rounded-full p-2 hover:bg-gray-800/90 transition-colors"
            >
              <Heart
                className={`h-4 w-4 ${
                  isFavorite
                    ? "fill-red-500 text-red-500"
                    : "text-gray-300 hover:text-red-400"
                }`}
              />
            </button>

            {/* Overlay de evento pasado */}
            {isEventPast && (
              <div className="absolute inset-0 bg-gray-900/60 flex items-center justify-center">
                <Badge variant="destructive" className="text-sm">
                  Evento Finalizado
                </Badge>
              </div>
            )}
          </div>

          {/* ✨ Contenido con flex-grow para ocupar el espacio restante */}
          <div className="p-4 flex-grow flex flex-col">
            {/* Categoría */}
            <div className="mb-2 flex-shrink-0">
              <Badge
                variant="outline"
                className="text-xs border-gray-600/50 text-gray-400"
              >
                {categoryName}
              </Badge>
            </div>

            {/* ✨ Título con altura fija */}
            <div className="h-14 flex-shrink-0 mb-2">
              <h3 className="text-lg font-bold text-white line-clamp-2 group-hover:text-cyan-400 transition-colors leading-tight">
                {event.title}
              </h3>
            </div>

            {/* ✨ Descripción con altura fija */}
            <div className="h-10 flex-shrink-0 mb-3">
              <p className="text-gray-400 text-sm line-clamp-2 leading-tight">
                {event.description}
              </p>
            </div>

            {/* ✨ Información del evento con altura fija */}
            <div className="space-y-1 mb-3 flex-shrink-0 h-16">
              <div className="flex items-center text-gray-400 text-sm">
                <Calendar className="h-4 w-4 mr-2 text-cyan-400 flex-shrink-0" />
                <span className="truncate">
                  {dateInfo.time} • {dateInfo.day} {dateInfo.month}
                </span>
              </div>

              <div className="flex items-center text-gray-400 text-sm">
                <MapPin className="h-4 w-4 mr-2 text-purple-400 flex-shrink-0" />
                <span className="truncate">{event.address}</span>
              </div>

              <div className="flex items-center text-gray-400 text-sm">
                <Users className="h-4 w-4 mr-2 text-green-400 flex-shrink-0" />
                <span className="truncate">
                  {event.limitParticipants > 0
                    ? `Hasta ${event.limitParticipants} personas`
                    : "Capacidad ilimitada"}
                </span>
              </div>
            </div>

            {/* ✨ Espaciador para empujar el organizador hacia abajo */}
            <div className="flex-grow"></div>

            {/* ✨ Organizador siempre en la parte inferior */}
            <div className="flex items-center justify-between flex-shrink-0 mt-auto">
              <div className="flex items-center min-w-0 flex-1">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {organizerInitial}
                </div>
                <div className="ml-2 min-w-0 flex-1">
                  <p className="text-white text-sm font-medium truncate">
                    {organizerName}
                  </p>
                  <p className="text-gray-400 text-xs">Organizador</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center flex-shrink-0 ml-2">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-gray-400 text-sm ml-1">4.8</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
