"use client";

import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Info,
  MapPin,
  HelpCircle,
  Calendar,
  Users,
  Shield,
  Clock,
  Tag,
} from "lucide-react";
import { Event } from "@/types/types";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

interface EventInfoProps {
  event: Event;
  dateInfo: {
    formattedDate: string;
    formattedTime: string;
    isPast: boolean;
  };
}

export default function EventInfo({ event, dateInfo }: EventInfoProps) {
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
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50"
    >
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="bg-gray-900/50 mb-8 w-full">
          <TabsTrigger value="details" className="flex items-center gap-2">
            <Info className="h-4 w-4" />
            Detalles
          </TabsTrigger>
          <TabsTrigger value="location" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Ubicación
          </TabsTrigger>
          <TabsTrigger value="organizer" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Organizador
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <div className="space-y-6">
            {/* Información básica */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">
                Sobre este evento
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                {event.description}
              </p>
            </div>

            {/* Detalles del evento */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">
                  Información del evento
                </h4>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-cyan-400 mt-1" />
                    <div>
                      <p className="text-white font-medium">Fecha y hora</p>
                      <p className="text-gray-400 text-sm">{eventDate.date}</p>
                      <p className="text-gray-400 text-sm">{eventDate.time}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-purple-400 mt-1" />
                    <div>
                      <p className="text-white font-medium">Duración</p>
                      <p className="text-gray-400 text-sm">
                        {event.duration} horas
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-green-400 mt-1" />
                    <div>
                      <p className="text-white font-medium">Capacidad</p>
                      <p className="text-gray-400 text-sm">
                        {event.limitParticipants > 0
                          ? `Hasta ${event.limitParticipants} personas`
                          : "Capacidad ilimitada"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Tag className="h-5 w-5 text-yellow-400 mt-1" />
                    <div>
                      <p className="text-white font-medium">Categoría</p>
                      <Badge variant="outline" className="mt-1">
                        {event.category?.name || "Sin categoría"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">
                  Configuración del evento
                </h4>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-green-400" />
                    <div>
                      <p className="text-white font-medium">
                        {event.requireAcceptance
                          ? "Requiere aprobación"
                          : "Inscripción automática"}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {event.requireAcceptance
                          ? "El organizador debe aprobar tu inscripción"
                          : "Tu inscripción será confirmada automáticamente"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-blue-400" />
                    <div>
                      <p className="text-white font-medium">
                        Estado: {event.isPublished ? "Publicado" : "Borrador"}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {event.isPublished
                          ? "Evento visible para todos los usuarios"
                          : "Solo visible para el organizador"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-purple-400" />
                    <div>
                      <p className="text-white font-medium">Precio</p>
                      <p className="text-gray-400 text-sm">
                        {event.price > 0
                          ? `$${event.price} CUP`
                          : "Evento gratuito"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="location">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">
                Ubicación del evento
              </h3>

              <div className="bg-gray-900/50 rounded-xl p-6">
                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="h-5 w-5 text-cyan-400 mt-1" />
                  <div>
                    <h4 className="text-white font-semibold mb-2">
                      {event.address}
                    </h4>
                    <p className="text-gray-400 mb-4">
                      Ubicación completa del evento
                    </p>
                  </div>
                </div>

                {/* Placeholder para mapa */}
                <div className="h-64 bg-gray-700/50 rounded-lg flex items-center justify-center border border-gray-600/30">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-gray-500 mx-auto mb-2" />
                    <p className="text-gray-400">Mapa del evento</p>
                    <p className="text-gray-500 text-sm">
                      Próximamente: Mapa interactivo
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-700/50">
                  <p className="text-gray-400 text-sm">
                    💡 <strong>Consejo:</strong> Te recomendamos llegar 15
                    minutos antes del evento.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="organizer">
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-4">
              Información del organizador
            </h3>

            <div className="bg-gray-900/50 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {event.organizer?.userName?.charAt(0).toUpperCase() || "?"}
                </div>

                <div className="flex-1">
                  <h4 className="text-white font-semibold text-lg mb-2">
                    {event.organizer?.userName || "Organizador desconocido"}
                  </h4>

                  <p className="text-gray-400 mb-4">Organizador de eventos</p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Email de contacto</p>
                      <p className="text-white">
                        {event.organizer?.email || "No disponible"}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-400 text-sm">
                        Eventos organizados
                      </p>
                      <p className="text-white">Este y otros eventos</p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-700/50">
                    <p className="text-gray-400 text-sm">
                      ¿Tienes preguntas sobre este evento? Contacta directamente
                      con el organizador.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
