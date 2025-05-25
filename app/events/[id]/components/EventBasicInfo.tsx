import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  Heart,
  MapPin,
  Share2,
  Ticket,
  Users,
  Star,
  Shield,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useState } from "react";

type EventBasicInfoProps = {
  event: any;
  onTicketSelect: (ticketName: string) => void;
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

const EventBasicInfo = ({ event, onTicketSelect }: EventBasicInfoProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(
      isFavorite ? "Eliminado de favoritos" : "Añadido a favoritos",
      {
        description: isFavorite
          ? "Ya no recibirás notificaciones de este evento"
          : "Te notificaremos sobre actualizaciones importantes",
      }
    );
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: event.name,
          text: `¡Mira este increíble evento: ${event.name}!`,
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing", error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("¡Enlace copiado!", {
        description: "El enlace del evento se copió al portapapeles",
      });
    }
  };

  // Formatear fecha
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = eventDate.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerChildren}
      className="bg-gradient-to-br from-gray-900/80 via-gray-800/50 to-gray-900/80 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-8 md:p-12 relative overflow-hidden"
    >
      {/* Elementos decorativos */}
      <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-cyan-500/10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-purple-500/10 blur-3xl"></div>

      <div className="relative z-10">
        {/* Header con badges */}
        <motion.div variants={fadeIn} className="mb-8">
          <div className="flex flex-wrap gap-2 mb-6">
            {event.categories.map((category: string, index: number) => (
              <Badge
                key={index}
                variant="outline"
                className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/20 transition-colors px-3 py-1"
              >
                {category}
              </Badge>
            ))}
          </div>

          {/* Status y verificación */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2 bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-sm border border-green-500/30">
              <CheckCircle className="h-4 w-4" />
              <span>Evento verificado</span>
            </div>

            <div className="flex items-center gap-2 bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full text-sm border border-amber-500/30">
              <Star className="h-4 w-4 fill-current" />
              <span>4.9 valoración</span>
            </div>

            <div className="flex items-center gap-2 bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full text-sm border border-purple-500/30">
              <Sparkles className="h-4 w-4" />
              <span>Trending</span>
            </div>
          </div>
        </motion.div>

        {/* Descripción mejorada */}
        <motion.div variants={fadeIn} className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Sobre este evento
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            {event.description}
          </p>

          {/* Highlights del evento */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Shield, text: "Evento seguro", color: "text-green-400" },
              {
                icon: CheckCircle,
                text: "Entrada garantizada",
                color: "text-cyan-400",
              },
              {
                icon: Users,
                text: "Comunidad activa",
                color: "text-purple-400",
              },
              { icon: Star, text: "Alta valoración", color: "text-amber-400" },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <item.icon className={`h-4 w-4 ${item.color}`} />
                <span className="text-gray-300">{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Información del evento rediseñada */}
        <motion.div variants={fadeIn} className="mb-8">
          <h3 className="text-xl font-bold text-white mb-6">
            Detalles del evento
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-cyan-500/20 rounded-xl">
                  <Calendar className="h-6 w-6 text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Fecha</h4>
                  <p className="text-gray-300 capitalize">{formattedDate}</p>
                  <p className="text-cyan-400 text-sm">{formattedTime}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-emerald-500/30 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-500/20 rounded-xl">
                  <MapPin className="h-6 w-6 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Ubicación</h4>
                  <p className="text-gray-300">{event.location}</p>
                  <p className="text-emerald-400 text-sm">Ver en mapa</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-500/20 rounded-xl">
                  <Users className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Asistencia</h4>
                  <p className="text-gray-300">
                    {event.attendees || "250+"} confirmados
                  </p>
                  <p className="text-purple-400 text-sm">Capacidad limitada</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-amber-500/30 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-500/20 rounded-xl">
                  <Ticket className="h-6 w-6 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Precio</h4>
                  <p className="text-gray-300">${event.price} CUP</p>
                  <p className="text-amber-400 text-sm">
                    Mejor precio garantizado
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Acciones rediseñadas */}
        <motion.div variants={fadeIn} className="flex flex-wrap gap-4">
          <Button
            onClick={() =>
              onTicketSelect(event.ticketTypes?.[0]?.name || "general")
            }
            className="h-14 px-8 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
          >
            <Ticket className="mr-2 h-5 w-5" />
            Comprar entradas - ${event.price}
          </Button>

          <Button
            variant="outline"
            onClick={handleToggleFavorite}
            className={`h-14 px-6 rounded-xl border-2 transition-all duration-300 ${
              isFavorite
                ? "bg-red-500/20 border-red-500/50 text-red-400 hover:bg-red-500/30"
                : "bg-gray-800/50 border-gray-600/50 text-gray-300 hover:bg-gray-700/50"
            }`}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
          </Button>

          <Button
            variant="outline"
            onClick={handleShare}
            className="h-14 px-6 bg-gray-800/50 border-gray-600/50 text-gray-300 hover:bg-gray-700/50 rounded-xl transition-all duration-300"
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EventBasicInfo;
