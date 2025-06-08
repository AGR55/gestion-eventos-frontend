import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Event } from "@/types/types";

interface EventHeaderProps {
  event: Event;
}

export function EventHeader({ event }: EventHeaderProps) {
  return (
    <div className="py-3 border-b">
      <div className="mb-6">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {event.title}
        </h1>

        <div className="flex flex-wrap gap-4 text-gray-300">
          <div className="flex items-center gap-2">
            <span className="text-cyan-400">📅</span>
            <span>{new Date(event.date).toLocaleDateString("es-ES")}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-purple-400">📍</span>
            <span>{event.address}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-green-400">⏱️</span>
            <span>{event.duration} horas</span>
          </div>
        </div>
      </div>
    </div>
  );
}
