import { TabsContent, TabsList, TabsTrigger, Tabs } from "@/components/ui/tabs";
import DetailsTab from "./DetailsTab";
import TicketsTab from "./TicketsTab";
import FaqTab from "./FaqTab";
import { lazy, Suspense } from "react";

// Optimización: Carga diferida para componentes pesados
const LazyLocationTab = lazy(() => import("./LocationTab"));

type EventDetailTabsProps = {
  event: any;
  selectedTicket: string | null;
  onTicketSelect: (ticketName: string) => void;
};

const EventDetailTabs = ({
  event,
  selectedTicket,
  onTicketSelect,
}: EventDetailTabsProps) => {
  return (
    <Tabs defaultValue="details" className="w-full">
      <TabsList className="bg-[#0D1621] border border-gray-800 mb-6 rounded-xl">
        <TabsTrigger
          value="details"
          className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400 cursor-pointer"
        >
          Detalles
        </TabsTrigger>
        <TabsTrigger
          value="location"
          className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400 cursor-pointer"
        >
          Ubicación
        </TabsTrigger>
        <TabsTrigger
          value="tickets"
          className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400 cursor-pointer"
        >
          Entradas
        </TabsTrigger>
        <TabsTrigger
          value="faq"
          className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400 cursor-pointer"
        >
          FAQ
        </TabsTrigger>
      </TabsList>

      <TabsContent
        value="details"
        className="bg-[#13212e] rounded-xl p-6 border border-gray-800"
      >
        <DetailsTab event={event} />
      </TabsContent>

      <TabsContent
        value="location"
        className="bg-[#13212e] rounded-xl p-6 border border-gray-800"
      >
        <Suspense
          fallback={
            <div className="h-[400px] flex items-center justify-center text-gray-400">
              Cargando mapa...
            </div>
          }
        >
          <LazyLocationTab event={event} />
        </Suspense>
      </TabsContent>

      <TabsContent
        value="tickets"
        id="booking-section"
        className="bg-[#13212e] rounded-xl p-6 border border-gray-800"
      >
        <TicketsTab event={event} />
      </TabsContent>

      <TabsContent
        value="faq"
        className="bg-[#13212e] rounded-xl p-6 border border-gray-800"
      >
        <FaqTab faqs={event.faqs} />
      </TabsContent>
    </Tabs>
  );
};

export default EventDetailTabs;
