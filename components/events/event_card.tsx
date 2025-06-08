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
  // ✨ Debug del organizador
  console.log("=== EVENT CARD DEBUG ===");
  console.log("Event ID:", event.id);
  console.log("Event title:", event.title);
  console.log("Organizer object:", event.organizer);
  console.log(
    "Organizer keys:",
    event.organizer ? Object.keys(event.organizer) : "No organizer"
  );

  if (event.organizer) {
    console.log("Organizer details:", {
      id: event.organizer.id,
      email: event.organizer.email,
      name: event.organizer.name,
      // Log todas las propiedades
      allProps: Object.entries(event.organizer),
    });
  }

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
    // Si no hay imagen, usar placeholder
    if (!imageUrl) {
      return "/api/placeholder/400/300";
    }

    // Si ya es una URL completa (empieza con http/https), usarla directamente
    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
      return imageUrl;
    }

    // Si empieza con /api/ (placeholder), usarla directamente
    if (imageUrl.startsWith("/api/")) {
      return imageUrl;
    }

    // Si no empieza con /, agregar /
    const cleanImageUrl = imageUrl.startsWith("/") ? imageUrl : `/${imageUrl}`;

    // Construir URL completa solo si tenemos un backend URL válido
    const baseUrl =
      process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") ||
      "http://localhost:8080";

    try {
      // Validar que se pueda construir una URL válida
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
      className="group"
    >
      <Link href={`/events/${event.id}`}>
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300">
          {/* Imagen del evento */}
          <div className="relative h-48 overflow-hidden">
            <Image
              src={eventImage}
              alt={event.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
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
                } text-white font-bold`}
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

          {/* Contenido de la tarjeta */}
          <div className="p-6">
            {/* Categoría */}
            <div className="mb-3">
              <Badge
                variant="outline"
                className="text-xs border-gray-600/50 text-gray-400"
              >
                {categoryName}
              </Badge>
            </div>

            {/* Título */}
            <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-cyan-400 transition-colors">
              {event.title}
            </h3>

            {/* Descripción */}
            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
              {event.description}
            </p>

            {/* Información del evento */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-gray-400 text-sm">
                <Calendar className="h-4 w-4 mr-2 text-cyan-400" />
                <span>
                  {dateInfo.time} • {dateInfo.fullDate}
                </span>
              </div>

              <div className="flex items-center text-gray-400 text-sm">
                <MapPin className="h-4 w-4 mr-2 text-purple-400" />
                <span className="truncate">{event.address}</span>
              </div>

              <div className="flex items-center text-gray-400 text-sm">
                <Users className="h-4 w-4 mr-2 text-green-400" />
                <span>
                  {event.limitParticipants > 0
                    ? `Hasta ${event.limitParticipants} personas`
                    : "Capacidad ilimitada"}
                </span>
              </div>
            </div>

            {/* Organizador - ✨ Sección corregida */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {organizerInitial}
                </div>
                <div className="ml-2">
                  <p className="text-white text-sm font-medium">
                    {organizerName}
                  </p>
                  <p className="text-gray-400 text-xs">Organizador</p>
                </div>
              </div>

              {/* Rating mock */}
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-gray-400 text-sm ml-1">4.8</span>
              </div>
            </div>

            {/* Acción rápida */}
            {!isEventPast && (
              <Button
                onClick={handleQuickAction}
                className={`w-full h-10 font-semibold rounded-xl transition-all duration-300 ${
                  event.price > 0
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                    : "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                } text-white`}
              >
                {event.price > 0 ? "Añadir al carrito" : "Inscribirse gratis"}
              </Button>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
