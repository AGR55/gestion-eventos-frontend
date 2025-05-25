import { memo } from "react";
import { motion } from "framer-motion";
import {
  User,
  CheckCircle,
  Star,
  Clock,
  Users,
  MapPin,
  Calendar,
  Award,
  Shield,
  Sparkles,
  MessageCircle,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type DetailsTabProps = {
  event: any;
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const DetailsTab = memo(({ event }: DetailsTabProps) => {
  // Datos mock mejorados
  const eventDetails = {
    longDescription:
      event.longDescription ||
      `
      <p>Sumérgete en una experiencia única donde la música, el arte y la tecnología convergen para crear momentos inolvidables. Este evento ha sido cuidadosamente diseñado para ofrecerte una noche llena de emociones, conexiones auténticas y entretenimiento de primera clase.</p>
      
      <h3>¿Qué te espera?</h3>
      <ul>
        <li><strong>Música en vivo:</strong> Artistas reconocidos y talentos emergentes</li>
        <li><strong>Experiencias interactivas:</strong> Instalaciones de arte digital y realidad aumentada</li>
        <li><strong>Gastronomía premium:</strong> Food trucks y barras especializadas</li>
        <li><strong>Networking:</strong> Espacios diseñados para conectar con personas afines</li>
        <li><strong>Ambiente único:</strong> Decoración temática e iluminación profesional</li>
      </ul>
      
      <h3>Programa del evento</h3>
      <p><strong>18:00 - 19:30:</strong> Apertura y bienvenida<br>
      <strong>19:30 - 21:00:</strong> Presentaciones artísticas<br>
      <strong>21:00 - 23:00:</strong> Actividad principal<br>
      <strong>23:00 - 01:00:</strong> After party y networking</p>
    `,
    organizer: event.organizer || "Event Horizon Productions",
    organizerBio:
      "Organizador líder en eventos culturales y tecnológicos con más de 50 eventos exitosos",
    organizerRating: 4.9,
    organizerEvents: 47,
    highlights: [
      "Evento eco-friendly con certificación sostenible",
      "Accesibilidad garantizada para personas con movilidad reducida",
      "Zona VIP con servicios premium incluidos",
      "Aplicación móvil exclusiva del evento",
      "Servicio de fotografía profesional incluido",
    ],
    requirements: [
      "Edad mínima: 18 años",
      "Entrada válida hasta 30 minutos después del inicio",
      "No se permite reingreso",
      "Código de vestimenta: casual elegante",
    ],
    amenities: [
      { icon: Shield, text: "Seguridad 24/7", color: "text-green-400" },
      { icon: Users, text: "Networking zones", color: "text-cyan-400" },
      { icon: Sparkles, text: "Experiencias VIP", color: "text-purple-400" },
      {
        icon: Award,
        text: "Certificado de asistencia",
        color: "text-amber-400",
      },
    ],
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerChildren}
      className="space-y-10"
    >
      {/* Descripción principal */}
      <motion.div variants={fadeIn}>
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <Sparkles className="h-6 w-6 text-cyan-400" />
            </div>
            Sobre este evento
          </h3>

          <div
            className="prose prose-invert prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: eventDetails.longDescription }}
          />
        </div>
      </motion.div>

      {/* Highlights del evento */}
      <motion.div variants={fadeIn}>
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 rounded-lg">
              <CheckCircle className="h-6 w-6 text-emerald-400" />
            </div>
            Lo que incluye tu entrada
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            {eventDetails.highlights.map((highlight, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-gray-900/30 rounded-xl border border-gray-600/30"
              >
                <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                <span className="text-gray-300">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Servicios y amenidades */}
      <motion.div variants={fadeIn}>
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
          <h3 className="text-2xl font-bold text-white mb-6">
            Servicios disponibles
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {eventDetails.amenities.map((amenity, index) => (
              <div key={index} className="text-center">
                <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-600/30 hover:border-cyan-500/30 transition-all duration-300">
                  <div className="p-3 bg-gradient-to-br from-gray-700/50 to-gray-800/50 rounded-xl w-fit mx-auto mb-4">
                    <amenity.icon className={`h-8 w-8 ${amenity.color}`} />
                  </div>
                  <p className="text-white font-medium text-sm">
                    {amenity.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Requisitos e información importante */}
      <motion.div variants={fadeIn}>
        <div className="bg-amber-500/10 backdrop-blur-sm rounded-2xl p-8 border border-amber-500/30">
          <h3 className="text-2xl font-bold text-amber-400 mb-6 flex items-center gap-3">
            <div className="p-2 bg-amber-500/20 rounded-lg">
              <Clock className="h-6 w-6 text-amber-400" />
            </div>
            Información importante
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-semibold mb-4">
                Requisitos de entrada
              </h4>
              <ul className="space-y-2">
                {eventDetails.requirements.map((req, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-gray-300"
                  >
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full flex-shrink-0"></div>
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">
                Políticas del evento
              </h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                  Cancelación gratuita hasta 24h antes
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                  Reembolso completo por cancelación del evento
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                  Transferencia de entradas permitida
                </li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Información del organizador mejorada */}
      <motion.div variants={fadeIn}>
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <User className="h-6 w-6 text-purple-400" />
            </div>
            Organizado por
          </h3>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Avatar y info básica */}
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center border border-purple-500/30">
                <span className="text-3xl font-bold text-purple-400">
                  {eventDetails.organizer.charAt(0)}
                </span>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-xl font-bold text-white">
                    {eventDetails.organizer}
                  </h4>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verificado
                  </Badge>
                </div>

                <p className="text-gray-300 mb-3">
                  {eventDetails.organizerBio}
                </p>

                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-amber-400 fill-current" />
                    <span className="text-white font-semibold">
                      {eventDetails.organizerRating}
                    </span>
                    <span className="text-gray-400">valoración</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-cyan-400" />
                    <span className="text-white font-semibold">
                      {eventDetails.organizerEvents}
                    </span>
                    <span className="text-gray-400">eventos</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Acciones */}
            <div className="flex flex-col gap-3 md:ml-auto">
              <Button
                variant="outline"
                className="bg-purple-500/20 border-purple-500/30 text-purple-400 hover:bg-purple-500/30 rounded-xl"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Contactar organizador
              </Button>

              <Button
                variant="outline"
                className="bg-gray-800/50 border-gray-600/50 text-gray-300 hover:bg-gray-700/50 rounded-xl"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Ver perfil completo
              </Button>
            </div>
          </div>

          {/* Stats del organizador */}
          <div className="mt-8 pt-8 border-t border-gray-600/50">
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-cyan-400 mb-1">98%</div>
                <div className="text-gray-400 text-sm">Satisfacción</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-emerald-400 mb-1">
                  24h
                </div>
                <div className="text-gray-400 text-sm">Respuesta promedio</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400 mb-1">
                  5K+
                </div>
                <div className="text-gray-400 text-sm">Asistentes totales</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});

DetailsTab.displayName = "DetailsTab";

export default DetailsTab;
