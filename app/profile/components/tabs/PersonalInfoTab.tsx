import { memo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Edit, Save, Shield, Trash2 } from "lucide-react";
import { UserData } from "@/hooks/useProfile";

interface PersonalInfoTabProps {
  userData: UserData;
  editMode: boolean;
  isLoading: boolean;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSave: () => void;
  onEditToggle: () => void;
  onToggleInterest: (interest: string) => void;
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const PersonalInfoTab = memo(
  ({
    userData,
    editMode,
    isLoading,
    onInputChange,
    onSave,
    onEditToggle,
    onToggleInterest,
  }: PersonalInfoTabProps) => {
    const interests = [
      "Música",
      "Arte",
      "Tecnología",
      "Deportes",
      "Gastronomía",
      "Literatura",
      "Cine",
      "Teatro",
    ];

    return (
      <motion.div
        variants={fadeIn}
        className="bg-gradient-to-br from-gray-900/80 via-gray-800/50 to-gray-900/80 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-8"
      >
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <User className="h-6 w-6 text-cyan-400" />
            </div>
            Información Personal
          </h3>
          <Button
            onClick={editMode ? onSave : onEditToggle}
            className={
              editMode
                ? "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                : "bg-gray-800/50 border border-gray-600 text-gray-300 hover:bg-gray-700/50"
            }
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                Guardando...
              </>
            ) : editMode ? (
              <>
                <Save className="h-4 w-4 mr-2" />
                Guardar cambios
              </>
            ) : (
              <>
                <Edit className="h-4 w-4 mr-2" />
                Editar perfil
              </>
            )}
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Información básica */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">
              Información básica
            </h4>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-gray-300 font-medium">
                  Nombre completo
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={userData.name}
                  onChange={onInputChange}
                  disabled={!editMode}
                  className="mt-2 bg-gray-800/50 border-gray-600 text-white rounded-xl"
                  placeholder="Tu nombre completo"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-gray-300 font-medium">
                  Correo electrónico
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={userData.email}
                  disabled={true}
                  className="mt-2 bg-gray-900/50 border-gray-700 text-gray-400 rounded-xl"
                />
                <p className="text-gray-500 text-xs mt-1">
                  El email no se puede modificar
                </p>
              </div>

              <div>
                <Label
                  htmlFor="phoneNumber"
                  className="text-gray-300 font-medium"
                >
                  Teléfono
                </Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={userData.phoneNumber}
                  onChange={onInputChange}
                  disabled={!editMode}
                  className="mt-2 bg-gray-800/50 border-gray-600 text-white rounded-xl"
                  placeholder="+53 5555 5555"
                />
              </div>

              <div>
                <Label
                  htmlFor="birthDate"
                  className="text-gray-300 font-medium"
                >
                  Fecha de nacimiento
                </Label>
                <Input
                  id="birthDate"
                  name="birthDate"
                  type="date"
                  value={userData.birthDate}
                  onChange={onInputChange}
                  disabled={!editMode}
                  className="mt-2 bg-gray-800/50 border-gray-600 text-white rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Información adicional */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">
              Información adicional
            </h4>

            <div className="space-y-4">
              <div>
                <Label htmlFor="location" className="text-gray-300 font-medium">
                  Ubicación
                </Label>
                <Input
                  id="location"
                  name="location"
                  value={userData.location}
                  onChange={onInputChange}
                  disabled={!editMode}
                  className="mt-2 bg-gray-800/50 border-gray-600 text-white rounded-xl"
                  placeholder="Ciudad, País"
                />
              </div>

              <div>
                <Label
                  htmlFor="occupation"
                  className="text-gray-300 font-medium"
                >
                  Ocupación
                </Label>
                <Input
                  id="occupation"
                  name="occupation"
                  value={userData.occupation}
                  onChange={onInputChange}
                  disabled={!editMode}
                  className="mt-2 bg-gray-800/50 border-gray-600 text-white rounded-xl"
                  placeholder="Tu ocupación"
                />
              </div>

              <div>
                <Label htmlFor="website" className="text-gray-300 font-medium">
                  Sitio web
                </Label>
                <Input
                  id="website"
                  name="website"
                  type="url"
                  value={userData.website}
                  onChange={onInputChange}
                  disabled={!editMode}
                  className="mt-2 bg-gray-800/50 border-gray-600 text-white rounded-xl"
                  placeholder="https://tu-sitio.com"
                />
              </div>

              <div>
                <Label htmlFor="bio" className="text-gray-300 font-medium">
                  Biografía
                </Label>
                <textarea
                  id="bio"
                  name="bio"
                  value={userData.bio}
                  onChange={onInputChange}
                  disabled={!editMode}
                  rows={4}
                  className="mt-2 w-full rounded-xl bg-gray-800/50 border border-gray-600 text-white p-3 resize-none"
                  placeholder="Cuéntanos sobre ti..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Intereses */}
        <div className="mt-8 pt-8 border-t border-gray-700/50">
          <h4 className="text-lg font-semibold text-white mb-4">Intereses</h4>
          <div className="flex flex-wrap gap-2">
            {interests.map((interest) => (
              <Button
                key={interest}
                variant={
                  userData.interests.includes(interest) ? "default" : "outline"
                }
                size="sm"
                disabled={!editMode}
                className={
                  userData.interests.includes(interest)
                    ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
                    : "border-gray-600 text-gray-400 hover:border-cyan-500/30"
                }
                onClick={() => editMode && onToggleInterest(interest)}
              >
                {interest}
              </Button>
            ))}
          </div>
        </div>

        {/* Acciones de seguridad */}
        <div className="mt-8 pt-8 border-t border-gray-700/50">
          <h4 className="text-lg font-semibold text-white mb-4">
            Seguridad de la cuenta
          </h4>
          <div className="flex flex-wrap gap-4">
            <Button
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700/50"
            >
              <Shield className="h-4 w-4 mr-2" />
              Cambiar contraseña
            </Button>
            <Button
              variant="outline"
              className="border-red-500/30 text-red-400 hover:bg-red-500/10"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Eliminar cuenta
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }
);

PersonalInfoTab.displayName = "PersonalInfoTab";

export default PersonalInfoTab;
