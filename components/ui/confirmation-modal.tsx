"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  UserPlus,
  Clock,
  MapPin,
  DollarSign,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Event } from "@/types/types";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  event: Event;
  isRegistering: boolean;
  isAuthenticated: boolean;
  actionType: "register" | "unregister" | "login";
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  event,
  isRegistering,
  isAuthenticated,
  actionType,
}: ConfirmationModalProps) {
  const getModalContent = () => {
    switch (actionType) {
      case "login":
        return {
          title: "Iniciar Sesión Requerido",
          description: "Necesitas tener una cuenta para inscribirte a eventos.",
          icon: <AlertCircle className="h-12 w-12 text-yellow-400" />,
          confirmText: "Ir a Iniciar Sesión",
          cancelText: "Cancelar",
          confirmClass:
            "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
        };

      case "unregister":
        return {
          title: "Cancelar Inscripción",
          description:
            "¿Estás seguro de que quieres cancelar tu inscripción a este evento?",
          icon: <AlertCircle className="h-12 w-12 text-red-400" />,
          confirmText: "Sí, Cancelar Inscripción",
          cancelText: "No, Mantener Inscripción",
          confirmClass:
            "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600",
        };

      case "register":
      default:
        return {
          title: "Confirmar Inscripción",
          description: "¿Quieres inscribirte a este evento?",
          icon: <UserPlus className="h-12 w-12 text-cyan-400" />,
          confirmText:
            event.price > 0
              ? `Inscribirse - $${event.price} CUP`
              : "Inscribirse Gratis",
          cancelText: "Cancelar",
          confirmClass:
            event.price > 0
              ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
              : "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600",
        };
    }
  };

  const content = getModalContent();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("es-ES", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: date.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const eventDate = formatDate(event.date);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-md">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">{content.icon}</div>
          <DialogTitle className="text-xl font-bold text-white">
            {content.title}
          </DialogTitle>
          <DialogDescription className="text-gray-300 mt-2">
            {content.description}
          </DialogDescription>
        </DialogHeader>

        {/* Información del Evento */}
        {actionType !== "login" && (
          <div className="py-4">
            <div className="bg-gray-900/50 rounded-xl p-4 space-y-3">
              <h3 className="font-semibold text-lg text-white truncate">
                {event.title}
              </h3>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-300">
                  <Clock className="h-4 w-4 text-cyan-400" />
                  <span>{eventDate.date}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-300">
                  <Clock className="h-4 w-4 text-purple-400" />
                  <span>{eventDate.time}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-300">
                  <MapPin className="h-4 w-4 text-green-400" />
                  <span className="truncate">{event.address}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-300">
                  <DollarSign className="h-4 w-4 text-yellow-400" />
                  <span>
                    {event.price > 0
                      ? `$${event.price} CUP`
                      : "Evento Gratuito"}
                  </span>
                </div>
              </div>

              {/* Badges informativos */}
              <div className="flex flex-wrap gap-2 pt-2">
                {event.requireAcceptance && (
                  <Badge
                    variant="outline"
                    className="bg-blue-500/20 border-blue-500/50 text-blue-400 text-xs"
                  >
                    Requiere Aprobación
                  </Badge>
                )}

                {event.limitParticipants > 0 && (
                  <Badge
                    variant="outline"
                    className="bg-orange-500/20 border-orange-500/50 text-orange-400 text-xs"
                  >
                    Plazas Limitadas
                  </Badge>
                )}
              </div>
            </div>

            {/* Información adicional para registro */}
            {actionType === "register" && (
              <div className="mt-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="text-sm text-blue-300">
                  {event.requireAcceptance ? (
                    <>
                      <AlertCircle className="h-4 w-4 inline mr-2" />
                      Tu solicitud será revisada por el organizador
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4 inline mr-2" />
                      Tu inscripción será confirmada automáticamente
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        <DialogFooter className="flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isRegistering}
            className="flex-1 bg-gray-700/50 border-gray-600 hover:bg-gray-600/50 text-white"
          >
            {content.cancelText}
          </Button>

          <Button
            onClick={onConfirm}
            disabled={isRegistering}
            className={`flex-1 ${content.confirmClass} text-white font-semibold`}
          >
            {isRegistering ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Procesando...
              </>
            ) : (
              content.confirmText
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
