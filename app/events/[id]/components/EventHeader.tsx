import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";

type EventHeaderProps = {
  eventName: string;
};

export const EventHeader = ({ eventName }: EventHeaderProps) => {
  return (
    <div className="py-3 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center text-sm text-gray-400">
          <Link
            href="/events"
            className="flex items-center hover:text-cyan-400"
          >
            <ArrowLeft size={16} className="mr-2" />
            Volver a eventos
          </Link>
          <ChevronRight size={14} className="mx-2" />
          <span className="truncate max-w-[200px] md:max-w-md">
            {eventName}
          </span>
        </div>
      </div>
    </div>
  );
};
