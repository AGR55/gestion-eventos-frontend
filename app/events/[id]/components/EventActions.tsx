"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Share2,
  Calendar,
  Clock,
  UserPlus,
  UserCheck,
  Loader2,
} from "lucide-react";
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
  onRegistration: () => void;
  isRegistering: boolean;
  isRegistered: boolean;
  isAuthenticated: boolean;
}

export default function EventActions({
  event,
  dateInfo,
  onRegistration,
  isRegistering,
  isRegistered,
  isAuthenticated,
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
        console.log("Share cancelled");
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Enlace copiado al portapapeles");
    }
  };

  const addToCalendar = () => {
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

  // ✨ Determinar el estado del botón de inscripción
  const getRegistrationButtonProps = () => {
    if (dateInfo.isPast) {
      return {
        disabled: true,
        text: "Evento Finalizado",
        icon: <Clock className="mr-2 h-5 w-5" />,
        className: "bg-gray-600/50 text-gray-400 cursor-not-allowed",
      };
    }

    if (!event.isPublished) {
      return {
        disabled: true,
        text: "No Disponible",
        icon: <Clock className="mr-2 h-5 w-5" />,
        className: "bg-gray-600/50 text-gray-400 cursor-not-allowed",
      };
    }

    if (!isAuthenticated) {
      return {
        disabled: false,
        text: "Iniciar Sesión para Inscribirse",
        icon: <UserPlus className="mr-2 h-5 w-5" />,
        className:
          "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white",
      };
    }

    if (isRegistering) {
      return {
        disabled: true,
        text: "Procesando...",
        icon: <Loader2 className="mr-2 h-5 w-5 animate-spin" />,
        className: "bg-gray-600/50 text-gray-400 cursor-not-allowed",
      };
    }

    if (isRegistered) {
      return {
        disabled: false,
        text: "Cancelar Inscripción",
        icon: <UserCheck className="mr-2 h-5 w-5" />,
        className:
          "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white",
      };
    }
  };

  const buttonProps = getRegistrationButtonProps();

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

        {isRegistered && (
          <Badge
            variant="outline"
            className="bg-green-500/20 border-green-500/50 text-green-400"
          >
            ✓ Inscrito
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
      {event.isPublished && !dateInfo.isPast && (
        <div className="text-sm text-gray-400 space-y-1">
          {isRegistered ? (
            <>
              <p>✓ Estás inscrito a este evento</p>
              <p>✓ Recibirás notificaciones importantes</p>
              <p>✓ Puedes cancelar hasta 24h antes</p>
            </>
          ) : (
            <>
              <p>✓ Confirmación instantánea</p>
              <p>✓ Cancelación hasta 24h antes</p>
              <p>✓ Soporte directo con el organizador</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
