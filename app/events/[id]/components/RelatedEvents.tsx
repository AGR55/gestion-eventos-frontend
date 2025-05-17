import { FeaturedEventsCard } from "@/components/ui/events/featured_events/featured_events_card";
import { motion } from "framer-motion";
import { memo } from "react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

type RelatedEventsProps = {
  events: any[];
};

const RelatedEvents = memo(({ events }: RelatedEventsProps) => {
  if (!events.length) return null;

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
      className="mb-16"
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Eventos relacionados
          </h2>
          <p className="text-gray-400 mt-1">
            Otros eventos que podrían interesarte
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {events.map((event) => (
          <FeaturedEventsCard key={event.id} event={event} />
        ))}
      </div>
    </motion.section>
  );
});

RelatedEvents.displayName = "RelatedEvents";

export default RelatedEvents;
