import { Calendar, MapPin } from "lucide-react";
import { Chip } from "./chip";
import { Label } from "../../label";
import Image from "next/image";
import { Event } from "@/types/types";

export const FeaturedEventsCard = ({ key, event }: { key?: string, event: Event }) => {
  return (
    <div key={key} className="w-[480px] h-[320px] rounded-2xl relative overflow-hidden">
      <Image
        src={event.image}
        alt={event.name}
        width={480}
        height={320}
        className="rounded-2xl object-cover w-full h-full"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent from-60% to-black/80 rounded-2xl"></div>

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex flex-col gap-1">
          <Chip variant="filled" color="blue" size="sm" className="w-max mb-1">
            {event.state}
          </Chip>

          <Label className="text-white/90 flex items-center gap-1">
            <Calendar size={14} /> {event.date} - <MapPin size={14} /> {event.location}
          </Label>

          <Label className="text-2xl font-bold text-white">
            {event.name}
          </Label>
        </div>
      </div>
    </div>
  );
}