"use client";

import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "../avatar";
import { UserIcon } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export const UserAvatar = () => {
  const { data: session, status } = useSession();
  const user = session?.user;
  const isAuthenticated = status === "authenticated";
  const router = useRouter();

  const handleClick = () => {
    if (isAuthenticated) {
      // Opcional: mostrar un menú desplegable o dirigir al perfil
      router.push("/profile");
    } else {
      router.push("/auth");
    }
  };

  return (
    <Avatar
      className="h-9 w-9 rounded-full overflow-hidden ring-2 ring-white/30 dark:ring-slate-700/40 transition-all hover:ring-cyan-400 dark:hover:ring-cyan-500 cursor-pointer"
      onClick={handleClick}
    >
      {isAuthenticated && user?.image ? (
        <AvatarImage
          className="rounded-full w-full h-full object-cover"
          src={user.image}
          alt={user.name || "Usuario"}
        />
      ) : null}
      <AvatarFallback
        className={`flex items-center justify-center ${
          isAuthenticated
            ? "bg-gradient-to-br from-cyan-500 to-blue-500"
            : "bg-gradient-to-br from-gray-500 to-gray-600"
        } text-white`}
      >
        {isAuthenticated && user?.name ? (
          user.name.charAt(0).toUpperCase()
        ) : (
          <UserIcon className="h-5 w-5" />
        )}
      </AvatarFallback>
    </Avatar>
  );
};
