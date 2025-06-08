import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

interface RelatedEventsProps {
  events: any[];
}

export default function RelatedEvents({ events }: RelatedEventsProps) {
  // Mock events si no hay datos
  const mockEvents = [
    {
      id: 1,
      name: "Workshop de Desarrollo Web",
      date: "2025-06-15",
      price: 0,
      image: "/api/placeholder/300/200",
      location: "Centro Tecnológico",
    },
    {
      id: 2,
      name: "Conferencia de IA",
      date: "2025-06-20",
      price: 150,
      image: "/api/placeholder/300/200",
      location: "Palacio de Convenciones",
    },
    {
      id: 3,
      name: "Meetup de Startups",
      date: "2025-06-25",
      price: 0,
      image: "/api/placeholder/300/200",
      location: "Hub de Innovación",
    },
  ];

  const displayEvents = events.length > 0 ? events.slice(0, 3) : mockEvents;

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
      className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">
          Otros eventos que podrían interesarte
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {displayEvents.map((event, index) => (
          <div
            key={event.id}
            className="bg-gray-900/50 rounded-xl overflow-hidden border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300"
          >
            <img
              src={`http://localhost:8080${event.image}`}
              alt={event.name}
              className="w-full h-32 object-cover"
            />
            <div className="p-4">
              <h3 className="text-white font-semibold mb-2 line-clamp-2">
                {event.name}
              </h3>
              <p className="text-gray-400 text-sm mb-2">{event.location}</p>
              <div className="flex justify-between items-center">
                <span className="text-cyan-400 font-bold">
                  {event.price > 0 ? `$${event.price}` : "GRATIS"}
                </span>
                <Link href={`/events/${event.id}`}>
                  <Button size="sm" variant="outline" className="text-xs">
                    Ver detalles
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Link href="/events">
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
            Ver todos los eventos
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </motion.section>
  );
}
