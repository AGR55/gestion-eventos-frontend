"use client";

import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "../avatar";
import { UserIcon, Plus, Calendar } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const UserAvatar = () => {
  const { data: session, status } = useSession();
  const user = session?.user;
  const isAuthenticated = status === "authenticated";
  const isOrganizer = user?.isOrganizer;
  const router = useRouter();

  const handleClick = () => {
    if (!isAuthenticated) {
      router.push("/auth");
    }
  };

  if (!isAuthenticated) {
    return (
      <Avatar
        className="h-9 w-9 rounded-full overflow-hidden ring-2 ring-white/30 transition-all hover:ring-cyan-400 cursor-pointer"
        onClick={handleClick}
      >
        <AvatarFallback className="flex items-center justify-center bg-gradient-to-br from-gray-500 to-gray-600 text-white">
          <UserIcon className="h-5 w-5" />
        </AvatarFallback>
      </Avatar>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-9 w-9 rounded-full overflow-hidden ring-2 ring-white/30 transition-all hover:ring-cyan-400 cursor-pointer">
          {user?.image ? (
            <AvatarImage
              className="rounded-full w-full h-full object-cover"
              src={user.image}
              alt={user.name || "Usuario"}
            />
          ) : null}
          <AvatarFallback className="flex items-center justify-center bg-gradient-to-br from-cyan-500 to-blue-500 text-white">
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-56 bg-[#13212e] border-gray-700"
        align="end"
      >
        <DropdownMenuItem
          onClick={() => router.push("/profile")}
          className="text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer"
        >
          Mi Perfil
        </DropdownMenuItem>

        {isOrganizer && (
          <>
            <DropdownMenuSeparator className="bg-gray-700" />
            <DropdownMenuItem
              onClick={() => router.push("/event/create")}
              className="text-cyan-400 hover:text-cyan-300 hover:bg-gray-800 cursor-pointer"
            >
              <Plus className="h-4 w-4 mr-2" />
              Crear Evento
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => router.push("/event/list")}
              className="text-cyan-400 hover:text-cyan-300 hover:bg-gray-800 cursor-pointer"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Mis Eventos
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuSeparator className="bg-gray-700" />
        <DropdownMenuItem
          onClick={() => signOut({ callbackUrl: "/auth" })}
          className="text-red-400 hover:text-red-300 hover:bg-gray-800 cursor-pointer"
        >
          Cerrar Sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
