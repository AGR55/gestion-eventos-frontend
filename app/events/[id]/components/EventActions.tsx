"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Share2, Ticket, Calendar, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Event } from "@/types/types";

interface EventActionsProps {
  event: Event;
  dateInfo: {
    formattedDate: string;
    formattedTime: string;
    isPast: boolean;
  };
  onAddToCart: () => void;
}

export default function EventActions({
  event,
  dateInfo,
  onAddToCart,
}: EventActionsProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "Removido de favoritos" : "Añadido a favoritos");
  };

  const handleShare = async () => {
    const shareData = {
      title: event.title,
      text: `¡Mira este evento: ${event.title}!`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        // Usuario canceló o error
        console.log("Share cancelled");
      }
    } else {
      // Fallback para navegadores que no soportan Web Share API
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Enlace copiado al portapapeles");
    }
  };

  const addToCalendar = () => {
    // Crear evento para calendario
    const startDate = new Date(event.date);
    const endDate = new Date(
      startDate.getTime() + event.duration * 60 * 60 * 1000
    );

    const formatDateForCalendar = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    };

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      event.title
    )}&dates=${formatDateForCalendar(startDate)}/${formatDateForCalendar(
      endDate
    )}&details=${encodeURIComponent(
      event.description
    )}&location=${encodeURIComponent(event.address)}`;

    window.open(calendarUrl, "_blank");
    toast.success("Redirigiendo a Google Calendar");
  };

  if (dateInfo.isPast) {
    return (
      <div className="bg-gray-600/20 border border-gray-600/50 rounded-xl p-6">
        <div className="text-center">
          <Clock className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-300 mb-2">
            Evento Finalizado
          </h3>
          <p className="text-gray-400 text-sm">Este evento ya ha terminado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Información de estado */}
      <div className="flex flex-wrap gap-2 mb-4">
        {!event.isPublished && (
          <Badge
            variant="outline"
            className="bg-yellow-500/20 border-yellow-500/50 text-yellow-400"
          >
            Evento en borrador
          </Badge>
        )}

        {event.requireAcceptance && (
          <Badge
            variant="outline"
            className="bg-blue-500/20 border-blue-500/50 text-blue-400"
          >
            Requiere aprobación
          </Badge>
        )}

        <Badge
          variant={event.price > 0 ? "default" : "secondary"}
          className={`${
            event.price > 0
              ? "bg-gradient-to-r from-green-500 to-emerald-500"
              : "bg-gradient-to-r from-cyan-500 to-blue-500"
          } text-white font-bold`}
        >
          {event.price > 0 ? `$${event.price} CUP` : "GRATIS"}
        </Badge>
      </div>

      {/* Botón principal de acción */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={onAddToCart}
          disabled={!event.isPublished}
          className={`flex-1 h-12 font-bold text-lg ${
            !event.isPublished
              ? "bg-gray-600/50 text-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
          }`}
        >
          <Ticket className="mr-2 h-5 w-5" />
          {!event.isPublished
            ? "No disponible"
            : event.price > 0
            ? `Comprar - $${event.price}`
            : "Inscribirse Gratis"}
        </Button>
      </div>

      {/* Acciones secundarias */}
      <div className="flex gap-3">
        <Button
          onClick={handleFavorite}
          variant="outline"
          className={`h-12 px-4 ${
            isFavorite
              ? "bg-red-500/20 border-red-500/50 text-red-400"
              : "bg-gray-800/50 border-gray-600/50 text-gray-300"
          }`}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
        </Button>

        <Button
          onClick={handleShare}
          variant="outline"
          className="h-12 px-4 bg-gray-800/50 border-gray-600/50 text-gray-300"
        >
          <Share2 className="h-5 w-5" />
        </Button>

        <Button
          onClick={addToCalendar}
          variant="outline"
          className="h-12 px-4 bg-gray-800/50 border-gray-600/50 text-gray-300"
        >
          <Calendar className="h-5 w-5" />
        </Button>
      </div>

      {/* Información adicional */}
      {event.isPublished && (
        <div className="text-sm text-gray-400 space-y-1">
          <p>✓ Confirmación instantánea</p>
          <p>✓ Cancelación hasta 24h antes</p>
          <p>✓ Soporte directo con el organizador</p>
        </div>
      )}
    </div>
  );
}
