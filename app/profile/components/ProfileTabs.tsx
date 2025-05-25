import { memo } from "react";
import { motion } from "framer-motion";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, User, Calendar, Ticket, Settings } from "lucide-react";

interface ProfileTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const slideInLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const ProfileTabs = memo(({ activeTab, onTabChange }: ProfileTabsProps) => {
  const tabs = [
    { id: "overview", label: "Resumen", icon: Activity },
    { id: "personal-info", label: "Información", icon: User },
    { id: "my-events", label: "Mis Eventos", icon: Calendar },
    { id: "tickets", label: "Entradas", icon: Ticket },
    { id: "preferences", label: "Preferencias", icon: Settings },
  ];

  return (
    <motion.div initial="hidden" animate="visible" variants={slideInLeft}>
      <TabsList className="bg-gray-800/50 border border-gray-700/50 mb-8 rounded-2xl p-2 w-full grid grid-cols-2 md:grid-cols-5 backdrop-blur-xl">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400 cursor-pointer rounded-xl flex items-center gap-2 py-3 text-gray-400 hover:text-gray-200 transition-all duration-300"
          >
            <tab.icon className="h-4 w-4" />
            <span className="hidden sm:inline">{tab.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </motion.div>
  );
});

ProfileTabs.displayName = "ProfileTabs";

export default ProfileTabs;
