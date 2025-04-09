import { Event } from "@/types/types";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import { Label } from "../../label";
import Link from "next/link";

export const UpcomingEventsCard = ({ event }: { event: Event }) => {
  return (
    <div className="w-[480px] h-[520px] flex flex-col bg-white dark:bg-[#13212e] rounded-2xl shadow-md">
      <div className="w-full h-[320px] relative overflow-hidden">
        <Image
          className="rounded-t-2xl object-cover object-center"
          src={event.image}
          alt={event.name}
          fill
          sizes="(max-width: 768px) 100vw, 480px"
        />
      </div>

      <div className="p-6">
        <div className="flex gap-4 mb-2">
          <Label className="font-normal text-sm items-center text-neutral-800 dark:text-neutral-200"><Calendar size={14} /> {event.date}</Label>
          <Label className="font-normal text-sm items-center text-neutral-800 dark:text-neutral-200"><MapPin size={14} /> {event.location}</Label>
        </div>
        <Label className="font-bold text-xl text-neutral-800 dark:text-neutral-200">{event.name}</Label>
        <Label className="text-sm text-neutral-700 dark:text-neutral-300 mt-2 line-clamp-2 h-[40px]">{event.description}</Label>
        <Link
          href={`/events/${event.id}`}
          className="w-max mt-4 text-blue-300 dark:text-blue-600 rounded-lg flex items-center gap-1 group hover:text-blue-400 dark:hover:text-blue-500 transition-colors"
          prefetch={true}
        >
          Read More
          <span>
            <ArrowRight
              className="text-blue-300 dark:text-blue-600 group-hover:translate-x-1 group-hover:text-blue-400 group-hover:dark:hover:text-blue-500 transition-transform"
              size={18}
            />
          </span>
        </Link>
      </div>
    </div>
  );
}