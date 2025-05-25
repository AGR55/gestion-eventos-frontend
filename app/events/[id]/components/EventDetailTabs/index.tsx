import { TabsContent, TabsList, TabsTrigger, Tabs } from "@/components/ui/tabs";
import DetailsTab from "./DetailsTab";
import TicketsTab from "./TicketsTab";
import FaqTab from "./FaqTab";
import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Info, MapPin, Ticket, HelpCircle } from "lucide-react";

// Optimización: Carga diferida para componentes pesados
const LazyLocationTab = lazy(() => import("./LocationTab"));

type EventDetailTabsProps = {
  event: any;
  selectedTicket: string | null;
  onTicketSelect: (ticketName: string) => void;
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const EventDetailTabs = ({
  event,
  selectedTicket,
  onTicketSelect,
}: EventDetailTabsProps) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="bg-gradient-to-br from-gray-900/80 via-gray-800/50 to-gray-900/80 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-8 relative overflow-hidden"
    >
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-purple-500/10 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-24 h-24 rounded-full bg-cyan-500/10 blur-3xl"></div>

      <div className="relative z-10">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="bg-gray-800/50 border border-gray-700/50 mb-8 rounded-2xl p-2 w-full grid grid-cols-4 !border-b-0">
            <TabsTrigger
              value="details"
              className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400 data-[state=active]:after:hidden cursor-pointer rounded-xl flex items-center gap-2 py-3 text-gray-400 hover:text-gray-200 transition-all duration-300"
            >
              <Info className="h-4 w-4" />
              <span className="hidden sm:inline">Detalles</span>
            </TabsTrigger>
            <TabsTrigger
              value="location"
              className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400 data-[state=active]:after:hidden cursor-pointer rounded-xl flex items-center gap-2 py-3 text-gray-400 hover:text-gray-200 transition-all duration-300"
            >
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">Ubicación</span>
            </TabsTrigger>
            <TabsTrigger
              value="tickets"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400 data-[state=active]:after:hidden cursor-pointer rounded-xl flex items-center gap-2 py-3 text-gray-400 hover:text-gray-200 transition-all duration-300"
            >
              <Ticket className="h-4 w-4" />
              <span className="hidden sm:inline">Entradas</span>
            </TabsTrigger>
            <TabsTrigger
              value="faq"
              className="data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-400 data-[state=active]:after:hidden cursor-pointer rounded-xl flex items-center gap-2 py-3 text-gray-400 hover:text-gray-200 transition-all duration-300"
            >
              <HelpCircle className="h-4 w-4" />
              <span className="hidden sm:inline">FAQ</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-0">
            <DetailsTab event={event} />
          </TabsContent>

          <TabsContent value="location" className="mt-0">
            <Suspense
              fallback={
                <div className="h-[400px] flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-400">Cargando mapa...</p>
                  </div>
                </div>
              }
            >
              <LazyLocationTab event={event} />
            </Suspense>
          </TabsContent>

          <TabsContent value="tickets" id="booking-section" className="mt-0">
            <TicketsTab event={event} />
          </TabsContent>

          <TabsContent value="faq" className="mt-0">
            <FaqTab faqs={event.faqs} />
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default EventDetailTabs;
