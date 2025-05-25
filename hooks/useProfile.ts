import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

export interface UserData {
  name: string;
  email: string;
  phoneNumber: string;
  location: string;
  bio: string;
  website: string;
  birthDate: string;
  occupation: string;
  interests: string[];
}

export interface NotificationSettings {
  emailNotifications: boolean;
  eventReminders: boolean;
  marketingEmails: boolean;
  newEventsNearby: boolean;
  weeklyDigest: boolean;
  friendActivity: boolean;
}

export const useProfile = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { logout } = useAuth();

  const [activeTab, setActiveTab] = useState("overview");
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [ticketFilter, setTicketFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    phoneNumber: "",
    location: "La Habana, Cuba",
    bio: "Entusiasta de eventos culturales y tecnología. Siempre en busca de nuevas experiencias.",
    website: "",
    birthDate: "",
    occupation: "",
    interests: ["Música", "Arte", "Tecnología"],
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    eventReminders: true,
    marketingEmails: false,
    newEventsNearby: true,
    weeklyDigest: true,
    friendActivity: false,
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth");
    }

    if (session?.user) {
      setUserData((prev) => ({
        ...prev,
        name: session.user.name || "",
        email: session.user.email || "",
      }));
    }
  }, [session, status, router]);

  const handleSaveProfile = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Perfil actualizado", {
        description: "Tus cambios han sido guardados correctamente.",
      });

      setEditMode(false);
    } catch (error) {
      toast.error("Error al actualizar", {
        description: "No se pudieron guardar los cambios. Inténtalo de nuevo.",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      toast.error("Error al cerrar sesión", {
        description: "Por favor, intenta nuevamente.",
      });
    }
  };

  const toggleInterest = (interest: string) => {
    setUserData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  return {
    session,
    status,
    activeTab,
    setActiveTab,
    editMode,
    setEditMode,
    isLoading,
    ticketFilter,
    setTicketFilter,
    searchTerm,
    setSearchTerm,
    userData,
    setUserData,
    notifications,
    setNotifications,
    handleSaveProfile,
    handleInputChange,
    handleLogout,
    toggleInterest,
  };
};
