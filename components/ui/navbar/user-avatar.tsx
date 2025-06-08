"use client";

import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "../avatar";
import { UserIcon, Plus, Calendar, LogOut, User } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const UserAvatar = () => {
  const { data: session, status } = useSession();
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  // ✨ Asegurar hidratación correcta
  useEffect(() => {
    setIsClient(true);
  }, []);

  // ✨ Debug de la sesión
  console.log("=== USER AVATAR DEBUG ===");
  console.log("Session status:", status);
  console.log("Session data:", session);
  console.log("User data:", session?.user);
  console.log("Is authenticated:", status === "authenticated");
  console.log("Access token exists:", !!session?.accessToken);

  const user = session?.user;
  const isAuthenticated = status === "authenticated" && !!session;
  const isOrganizer = user?.isOrganizer;

  const handleClick = () => {
    console.log("Avatar clicked - isAuthenticated:", isAuthenticated);
    if (!isAuthenticated) {
      router.push("/auth");
    }
  };

  const handleSignOut = async () => {
    console.log("Signing out...");
    try {
      await signOut({
        callbackUrl: "/auth",
        redirect: true,
      });
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // ✨ Mostrar loading durante la verificación de sesión
  if (!isClient || status === "loading") {
    return (
      <div className="h-9 w-9 rounded-full bg-gray-600 animate-pulse ring-2 ring-white/30"></div>
    );
  }

  // ✨ Usuario no autenticado
  if (!isAuthenticated) {
    console.log("Rendering unauthenticated avatar");
    return (
      <Avatar
        className="h-9 w-9 rounded-full overflow-hidden ring-2 ring-white/30 transition-all hover:ring-cyan-400 cursor-pointer"
        onClick={handleClick}
      >
        <AvatarFallback className="flex items-center justify-center bg-gradient-to-br from-gray-500 to-gray-600 text-white hover:from-gray-400 hover:to-gray-500 transition-all">
          <UserIcon className="h-5 w-5" />
        </AvatarFallback>
      </Avatar>
    );
  }

  // ✨ Usuario autenticado
  console.log("Rendering authenticated avatar for:", user?.name || user?.email);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-9 w-9 rounded-full overflow-hidden ring-2 ring-white/30 transition-all hover:ring-cyan-400 cursor-pointer">
          {user?.image ? (
            <AvatarImage
              className="rounded-full w-full h-full object-cover"
              src={user.image}
              alt={user.name || user.email || "Usuario"}
            />
          ) : null}
          <AvatarFallback className="flex items-center justify-center bg-gradient-to-br from-cyan-500 to-blue-500 text-white font-semibold">
            {user?.name
              ? user.name.charAt(0).toUpperCase()
              : user?.email
              ? user.email.charAt(0).toUpperCase()
              : "U"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-56 bg-[#13212e] border-gray-700 shadow-xl"
        align="end"
        sideOffset={8}
      >
        {/* ✨ Información del usuario */}
        <div className="px-3 py-2 border-b border-gray-700">
          <p className="text-sm font-medium text-white truncate">
            {user?.name || "Usuario"}
          </p>
          <p className="text-xs text-gray-400 truncate">{user?.email}</p>
          {isOrganizer && (
            <p className="text-xs text-cyan-400 font-medium">Organizador</p>
          )}
        </div>

        <DropdownMenuItem
          onClick={() => router.push("/profile")}
          className="text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer flex items-center"
        >
          <User className="h-4 w-4 mr-2" />
          Mi Perfil
        </DropdownMenuItem>

        {isOrganizer && (
          <>
            <DropdownMenuSeparator className="bg-gray-700" />
            <DropdownMenuItem
              onClick={() => router.push("/event/create")}
              className="text-cyan-400 hover:text-cyan-300 hover:bg-gray-800 cursor-pointer flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Crear Evento
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => router.push("/event/list")}
              className="text-cyan-400 hover:text-cyan-300 hover:bg-gray-800 cursor-pointer flex items-center"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Mis Eventos
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuSeparator className="bg-gray-700" />
        <DropdownMenuItem
          onClick={handleSignOut}
          className="text-red-400 hover:text-red-300 hover:bg-gray-800 cursor-pointer flex items-center"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Cerrar Sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
