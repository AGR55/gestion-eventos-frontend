import { memo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Activity,
  CheckCircle,
  Ticket,
  Heart,
  Users,
  Clock,
  Calendar,
  MapPin,
  TrendingUp,
  Award,
} from "lucide-react";
import Image from "next/image";

interface OverviewTabProps {
  upcomingEvents: any[];
  userStats: any;
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const OverviewTab = memo(({ upcomingEvents, userStats }: OverviewTabProps) => {
  const recentActivity = [
    {
      action: "Asististe a",
      event: "Exposición de Arte Contemporáneo",
      time: "Hace 2 días",
      icon: CheckCircle,
      color: "text-green-400",
    },
    {
      action: "Compraste entrada para",
      event: "Maratón Solidario",
      time: "Hace 1 semana",
      icon: Ticket,
      color: "text-cyan-400",
    },
    {
      action: "Guardaste",
      event: "Festival Internacional de Música",
      time: "Hace 2 semanas",
      icon: Heart,
      color: "text-red-400",
    },
    {
      action: "Te uniste a",
      event: "Event Horizon",
      time: "Hace 8 meses",
      icon: Users,
      color: "text-purple-400",
    },
  ];

  const achievements = [
    { name: "Explorador", desc: "Asistió a 5+ eventos", unlocked: true },
    { name: "Aventurero", desc: "Asistió a 10+ eventos", unlocked: true },
    { name: "Veterano", desc: "Asistió a 25+ eventos", unlocked: false },
  ];

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Main stats */}
      <div className="lg:col-span-2 space-y-8">
        {/* Actividad reciente */}
        <motion.div
          variants={fadeIn}
          className="bg-gradient-to-br from-gray-900/80 via-gray-800/50 to-gray-900/80 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <Activity className="h-6 w-6 text-cyan-400" />
            </div>
            Actividad reciente
          </h3>

          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-gray-800/30 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="p-2 bg-gray-700/50 rounded-lg">
                  <activity.icon className={`h-5 w-5 ${activity.color}`} />
                </div>
                <div className="flex-1">
                  <p className="text-white">
                    <span className="text-gray-400">{activity.action}</span>{" "}
                    <span className="font-semibold">{activity.event}</span>
                  </p>
                  <p className="text-gray-500 text-sm">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Próximos eventos */}
        <motion.div
          variants={fadeIn}
          className="bg-gradient-to-br from-gray-900/80 via-gray-800/50 to-gray-900/80 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <div className="p-2 bg-emerald-500/20 rounded-lg">
                <Clock className="h-6 w-6 text-emerald-400" />
              </div>
              Próximos eventos
            </h3>
            <Button
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700/50 rounded-xl"
            >
              Ver todos
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {upcomingEvents.slice(0, 2).map((event) => (
              <div
                key={event.id}
                className="bg-gray-800/30 rounded-2xl border border-gray-700/50 overflow-hidden hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="relative h-32">
                  <Image
                    src={event.image}
                    alt={event.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h4 className="text-white font-semibold text-sm line-clamp-1">
                      {event.name}
                    </h4>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                    <Calendar className="h-4 w-4" />
                    {event.date} • {event.time}
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <MapPin className="h-4 w-4" />
                    {event.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Sidebar */}
      <div className="space-y-8">
        {/* Quick stats */}
        <motion.div
          variants={fadeIn}
          className="bg-gradient-to-br from-gray-900/80 via-gray-800/50 to-gray-900/80 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-6"
        >
          <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-amber-400" />
            Estadísticas
          </h4>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Este mes</span>
              <span className="text-white font-semibold">3 eventos</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Dinero ahorrado</span>
              <span className="text-green-400 font-semibold">$125</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Promedio gasto</span>
              <span className="text-white font-semibold">$95</span>
            </div>
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          variants={fadeIn}
          className="bg-gradient-to-br from-gray-900/80 via-gray-800/50 to-gray-900/80 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-6"
        >
          <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Award className="h-5 w-5 text-purple-400" />
            Logros
          </h4>

          <div className="space-y-3">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 p-3 rounded-xl ${
                  achievement.unlocked
                    ? "bg-amber-500/10 border border-amber-500/30"
                    : "bg-gray-800/30 border border-gray-700/50"
                }`}
              >
                <div
                  className={`p-2 rounded-lg ${
                    achievement.unlocked ? "bg-amber-500/20" : "bg-gray-700/50"
                  }`}
                >
                  <Award
                    className={`h-4 w-4 ${
                      achievement.unlocked ? "text-amber-400" : "text-gray-500"
                    }`}
                  />
                </div>
                <div>
                  <div
                    className={`font-medium text-sm ${
                      achievement.unlocked ? "text-amber-400" : "text-gray-500"
                    }`}
                  >
                    {achievement.name}
                  </div>
                  <div className="text-gray-400 text-xs">
                    {achievement.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
});

OverviewTab.displayName = "OverviewTab";

export default OverviewTab;
