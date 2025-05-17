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
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useState } from "react";

type EventBasicInfoProps = {
  event: any;
  onTicketSelect: (ticketName: string) => void;
};

const EventBasicInfo = ({ event, onTicketSelect }: EventBasicInfoProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(
      isFavorite ? "Eliminado de favoritos" : "Añadido a favoritos"
    );
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: event.name,
          text: event.description,
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing", error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Enlace copiado al portapapeles");
    }
  };

  return (
    <div>
      <div className="mb-3 flex flex-wrap gap-2">
        {event.categories.map((category: string, index: number) => (
          <Badge
            key={index}
            variant="outline"
            className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
          >
            {category}
          </Badge>
        ))}
      </div>

      <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
        {event.name}
      </h1>

      <p className="text-gray-300 text-lg mb-6">{event.description}</p>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-[#0D1621] p-3 rounded-lg">
            <Calendar className="h-6 w-6 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-white font-medium">Fecha</h3>
            <p className="text-gray-400">{event.date}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-[#0D1621] p-3 rounded-lg">
            <Clock className="h-6 w-6 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-white font-medium">Hora</h3>
            <p className="text-gray-400">{event.time}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-[#0D1621] p-3 rounded-lg">
            <MapPin className="h-6 w-6 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-white font-medium">Ubicación</h3>
            <p className="text-gray-400">{event.location}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-[#0D1621] p-3 rounded-lg">
            <Users className="h-6 w-6 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-white font-medium">Asistencia</h3>
            <p className="text-gray-400">
              {event.attendees} / {event.capacity}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button
          onClick={() => onTicketSelect(event.ticketTypes[0]?.name)}
          className="bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-600 hover:to-cyan-500 text-black font-medium"
        >
          <Ticket className="mr-2 h-5 w-5" />
          Comprar entradas
        </Button>

        <Button
          variant="outline"
          onClick={handleToggleFavorite}
          className={`border-gray-700 ${
            isFavorite
              ? "text-red-400 hover:text-red-500"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <Heart
            className={`mr-2 h-5 w-5 ${isFavorite ? "fill-red-400" : ""}`}
          />
          {isFavorite ? "Favorito" : "Añadir a favoritos"}
        </Button>

        <Button
          variant="outline"
          onClick={handleShare}
          className="border-gray-700 text-gray-400 hover:text-white"
        >
          <Share2 className="mr-2 h-5 w-5" />
          Compartir
        </Button>
      </div>
    </div>
  );
};

export default EventBasicInfo;
