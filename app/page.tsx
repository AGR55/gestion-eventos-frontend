import { FeaturedEventsSection } from "@/components/ui/events/featured_events/featured_events_section";
import { UpcomingEventsSection } from "@/components/ui/events/upcoming_events/upcoming_events_section";
import { MainSection } from "@/components/ui/main_section/main_section";

export default function Home() {
  return (
    <div className="gap-6">
      <MainSection />
      <section className="mt-6 mb-24 mx-4">
        <FeaturedEventsSection />
      </section>
      <section className="mt-6 mb-12 mx-4">
        <UpcomingEventsSection />
      </section>
    </div>
  );
}
