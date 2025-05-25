import { memo } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Camera,
  CheckCircle,
  Mail,
  MapPin,
  Calendar,
  Heart,
  TrendingUp,
  Eye,
  Award,
  Edit,
  LogOut,
} from "lucide-react";
import { UserData } from "@/hooks/useProfile";

interface ProfileHeaderProps {
  session: any;
  userData: UserData;
  userStats: any;
  onEditClick: () => void;
  onLogout: () => void;
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const ProfileHeader = memo(
  ({
    session,
    userData,
    userStats,
    onEditClick,
    onLogout,
  }: ProfileHeaderProps) => {
    return (
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="relative overflow-hidden pt-24 pb-16"
      >
        {/* Background decorativo */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/50 to-gray-900/80 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-8 md:p-12 mb-8">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Avatar mejorado */}
              <div className="relative group">
                <div className="relative">
                  <Avatar className="h-32 w-32 rounded-2xl border-4 border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
                    <AvatarImage
                      src={session?.user?.image || undefined}
                      className="object-cover rounded-2xl"
                    />
                    <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-blue-600 text-4xl text-white font-bold rounded-2xl">
                      {userData.name
                        ? userData.name.charAt(0).toUpperCase()
                        : "U"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <Camera className="h-8 w-8 text-white" />
                  </div>

                  {/* Status badge */}
                  <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2 border-4 border-gray-800">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* User info */}
              <div className="text-center lg:text-left flex-1">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    {userData.name || "Usuario"}
                  </h1>
                  <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verificado
                  </Badge>
                </div>

                <p className="text-gray-300 text-lg mb-4">{userData.bio}</p>

                <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm text-gray-400 mb-6">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-cyan-400" />
                    <span>{userData.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-emerald-400" />
                    <span>{userData.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-purple-400" />
                    <span>Miembro desde {userStats.memberSince}</span>
                  </div>
                </div>

                {/* Stats rápidas */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                  {[
                    {
                      label: "Eventos",
                      value: userStats.eventsAttended,
                      icon: Calendar,
                      color: "text-cyan-400",
                    },
                    {
                      label: "Favoritos",
                      value: userStats.favoriteEvents,
                      icon: Heart,
                      color: "text-red-400",
                    },
                    {
                      label: "Gastado",
                      value: `$${userStats.totalSpent}`,
                      icon: TrendingUp,
                      color: "text-emerald-400",
                    },
                    {
                      label: "Visitas",
                      value: userStats.profileViews,
                      icon: Eye,
                      color: "text-purple-400",
                    },
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className={`${stat.color} text-2xl font-bold`}>
                        {stat.value}
                      </div>
                      <div className="text-gray-400 text-xs flex items-center justify-center gap-1">
                        <stat.icon className="h-3 w-3" />
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Progress level */}
                <div className="bg-gray-800/50 rounded-xl p-4 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">
                      Progreso del nivel
                    </span>
                    <span className="text-cyan-400 text-sm">
                      75% hasta el próximo nivel
                    </span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3">
                <Button
                  onClick={onEditClick}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-xl px-6"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Editar perfil
                </Button>

                <Button
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700/50 rounded-xl"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Ver como público
                </Button>

                <Button
                  onClick={onLogout}
                  variant="outline"
                  className="border-red-500/30 text-red-400 hover:bg-red-500/10 rounded-xl"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Cerrar sesión
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    );
  }
);

ProfileHeader.displayName = "ProfileHeader";

export default ProfileHeader;
