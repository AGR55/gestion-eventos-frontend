import { memo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  Settings,
  Bell,
  Shield,
  Palette,
  Globe,
  Mail,
  MessageSquare,
  MapPin,
  Calendar,
  Heart,
  Zap,
  Moon,
  Sun,
  Volume2,
  Eye,
  Lock,
  Trash2,
  Download,
  Upload,
} from "lucide-react";
import { NotificationSettings } from "@/hooks/useProfile";

interface PreferencesTabProps {
  notifications: NotificationSettings;
  setNotifications: (notifications: NotificationSettings) => void;
  userInterests: string[];
  onToggleInterest: (interest: string) => void;
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const PreferencesTab = memo(
  ({
    notifications,
    setNotifications,
    userInterests,
    onToggleInterest,
  }: PreferencesTabProps) => {
    const handleNotificationChange = (
      key: keyof NotificationSettings,
      value: boolean
    ) => {
      setNotifications({
        ...notifications,
        [key]: value,
      });
    };

    const availableInterests = [
      "Música",
      "Arte",
      "Tecnología",
      "Deportes",
      "Gastronomía",
      "Literatura",
      "Cine",
      "Teatro",
      "Danza",
      "Fotografía",
      "Ciencia",
      "Historia",
      "Moda",
      "Viajes",
      "Naturaleza",
    ];

    const languages = [
      { code: "es", name: "Español", flag: "🇪🇸" },
      { code: "en", name: "English", flag: "🇺🇸" },
      { code: "fr", name: "Français", flag: "🇫🇷" },
      { code: "pt", name: "Português", flag: "🇧🇷" },
    ];

    const themes = [
      { id: "dark", name: "Oscuro", icon: Moon, active: true },
      { id: "light", name: "Claro", icon: Sun, active: false },
      { id: "auto", name: "Automático", icon: Eye, active: false },
    ];

    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
        className="space-y-8"
      >
        {/* Header */}
        <motion.div variants={fadeIn}>
          <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/50 to-gray-900/80 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-8">
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <div className="p-2 bg-emerald-500/20 rounded-lg">
                <Settings className="h-6 w-6 text-emerald-400" />
              </div>
              Preferencias
            </h3>
            <p className="text-gray-300">
              Personaliza tu experiencia en Event Horizon
            </p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Columna izquierda */}
          <div className="space-y-8">
            {/* Notificaciones */}
            <motion.div variants={fadeIn}>
              <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/50 to-gray-900/80 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-8">
                <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="p-2 bg-cyan-500/20 rounded-lg">
                    <Bell className="h-5 w-5 text-cyan-400" />
                  </div>
                  Notificaciones
                </h4>

                <div className="space-y-6">
                  {[
                    {
                      key: "emailNotifications" as keyof NotificationSettings,
                      label: "Notificaciones por email",
                      description:
                        "Recibe actualizaciones importantes por correo",
                      icon: Mail,
                    },
                    {
                      key: "eventReminders" as keyof NotificationSettings,
                      label: "Recordatorios de eventos",
                      description:
                        "Te avisamos antes de que inicien tus eventos",
                      icon: Calendar,
                    },
                    {
                      key: "marketingEmails" as keyof NotificationSettings,
                      label: "Emails promocionales",
                      description: "Ofertas especiales y eventos recomendados",
                      icon: Zap,
                    },
                    {
                      key: "newEventsNearby" as keyof NotificationSettings,
                      label: "Eventos cercanos",
                      description: "Nuevos eventos en tu área de interés",
                      icon: MapPin,
                    },
                    {
                      key: "weeklyDigest" as keyof NotificationSettings,
                      label: "Resumen semanal",
                      description: "Resumen de actividad y eventos destacados",
                      icon: MessageSquare,
                    },
                    {
                      key: "friendActivity" as keyof NotificationSettings,
                      label: "Actividad de amigos",
                      description: "Cuando tus amigos asistan a eventos",
                      icon: Heart,
                    },
                  ].map((setting, index) => (
                    <div
                      key={setting.key}
                      className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl border border-gray-700/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-700/50 rounded-lg">
                          <setting.icon className="h-4 w-4 text-gray-400" />
                        </div>
                        <div>
                          <Label className="text-white font-medium">
                            {setting.label}
                          </Label>
                          <p className="text-gray-400 text-sm">
                            {setting.description}
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={notifications[setting.key]}
                        onCheckedChange={(value) =>
                          handleNotificationChange(setting.key, value)
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Privacidad y Seguridad */}
            <motion.div variants={fadeIn}>
              <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/50 to-gray-900/80 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-8">
                <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="p-2 bg-red-500/20 rounded-lg">
                    <Shield className="h-5 w-5 text-red-400" />
                  </div>
                  Privacidad y Seguridad
                </h4>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl border border-gray-700/50">
                    <div className="flex items-center gap-3">
                      <Eye className="h-4 w-4 text-gray-400" />
                      <div>
                        <Label className="text-white font-medium">
                          Perfil público
                        </Label>
                        <p className="text-gray-400 text-sm">
                          Otros usuarios pueden ver tu perfil
                        </p>
                      </div>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl border border-gray-700/50">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <div>
                        <Label className="text-white font-medium">
                          Mostrar eventos asistidos
                        </Label>
                        <p className="text-gray-400 text-sm">
                          Otros pueden ver tus eventos pasados
                        </p>
                      </div>
                    </div>
                    <Switch defaultChecked={false} />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl border border-gray-700/50">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <div>
                        <Label className="text-white font-medium">
                          Compartir ubicación
                        </Label>
                        <p className="text-gray-400 text-sm">
                          Para recomendaciones de eventos cercanos
                        </p>
                      </div>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>

                  <div className="pt-4 border-t border-gray-700/50">
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        className="border-gray-600 text-gray-300 hover:bg-gray-700/50 rounded-xl"
                      >
                        <Lock className="h-4 w-4 mr-2" />
                        Cambiar contraseña
                      </Button>
                      <Button
                        variant="outline"
                        className="border-red-500/30 text-red-400 hover:bg-red-500/10 rounded-xl"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Eliminar cuenta
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Columna derecha */}
          <div className="space-y-8">
            {/* Intereses */}
            <motion.div variants={fadeIn}>
              <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/50 to-gray-900/80 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-8">
                <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Heart className="h-5 w-5 text-purple-400" />
                  </div>
                  Intereses
                </h4>

                <p className="text-gray-400 text-sm mb-6">
                  Selecciona tus intereses para recibir recomendaciones
                  personalizadas
                </p>

                <div className="flex flex-wrap gap-2">
                  {availableInterests.map((interest) => (
                    <Button
                      key={interest}
                      variant={
                        userInterests.includes(interest) ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => onToggleInterest(interest)}
                      className={
                        userInterests.includes(interest)
                          ? "bg-purple-500/20 text-purple-400 border-purple-500/30 hover:bg-purple-500/30"
                          : "border-gray-600 text-gray-400 hover:border-purple-500/30 hover:text-purple-400"
                      }
                    >
                      {interest}
                    </Button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Apariencia */}
            <motion.div variants={fadeIn}>
              <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/50 to-gray-900/80 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-8">
                <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="p-2 bg-amber-500/20 rounded-lg">
                    <Palette className="h-5 w-5 text-amber-400" />
                  </div>
                  Apariencia
                </h4>

                <div className="space-y-6">
                  <div>
                    <Label className="text-white font-medium mb-4 block">
                      Tema
                    </Label>
                    <div className="grid grid-cols-3 gap-3">
                      {themes.map((theme) => (
                        <div
                          key={theme.id}
                          className={`p-4 rounded-xl border cursor-pointer transition-all ${
                            theme.active
                              ? "bg-amber-500/20 border-amber-500/30 text-amber-400"
                              : "bg-gray-800/30 border-gray-700/50 text-gray-400 hover:border-amber-500/30"
                          }`}
                        >
                          <div className="text-center">
                            <theme.icon className="h-6 w-6 mx-auto mb-2" />
                            <span className="text-sm font-medium">
                              {theme.name}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-white font-medium mb-4 block">
                      Idioma
                    </Label>
                    <div className="grid grid-cols-2 gap-3">
                      {languages.map((lang) => (
                        <div
                          key={lang.code}
                          className={`p-3 rounded-xl border cursor-pointer transition-all ${
                            lang.code === "es"
                              ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-400"
                              : "bg-gray-800/30 border-gray-700/50 text-gray-400 hover:border-emerald-500/30"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{lang.flag}</span>
                            <span className="text-sm font-medium">
                              {lang.name}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-white font-medium mb-4 block flex items-center gap-2">
                      <Volume2 className="h-4 w-4" />
                      Volumen de notificaciones
                    </Label>
                    <Slider
                      defaultValue={[75]}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-2">
                      <span>Silencioso</span>
                      <span>Alto</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Datos y Exportación */}
            <motion.div variants={fadeIn}>
              <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/50 to-gray-900/80 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-8">
                <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <Download className="h-5 w-5 text-green-400" />
                  </div>
                  Mis Datos
                </h4>

                <div className="space-y-4">
                  <p className="text-gray-400 text-sm">
                    Gestiona tus datos personales y exporta tu información
                  </p>

                  <div className="flex flex-col gap-3">
                    <Button
                      variant="outline"
                      className="border-green-500/30 text-green-400 hover:bg-green-500/10 rounded-xl justify-start"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Exportar todos mis datos
                    </Button>

                    <Button
                      variant="outline"
                      className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10 rounded-xl justify-start"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Importar configuración
                    </Button>

                    <Button
                      variant="outline"
                      className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10 rounded-xl justify-start"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Ver datos almacenados
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Botón de guardar */}
        <motion.div variants={fadeIn}>
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/30 text-center">
            <h4 className="text-white font-semibold mb-2">
              ¿Listo para guardar los cambios?
            </h4>
            <p className="text-gray-400 text-sm mb-4">
              Tus preferencias se aplicarán inmediatamente a tu experiencia
            </p>
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-xl px-8">
              Guardar preferencias
            </Button>
          </div>
        </motion.div>
      </motion.div>
    );
  }
);

PreferencesTab.displayName = "PreferencesTab";

export default PreferencesTab;
