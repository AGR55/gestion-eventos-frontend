"use client";

import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "../avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "../toogle_mode";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="w-full flex justify-center fixed top-4 z-50">
      <nav
        className="py-3 px-6 
                  bg-white/30 dark:bg-slate-900/60 backdrop-blur-3xl 
                  border border-white/20 dark:border-slate-700/30
                  rounded-full shadow-lg shadow-black/5 dark:shadow-white/5
                  transition-all duration-300
                  inline-flex items-center gap-6"
      >
        <div
          className="text-2xl font-light cursor-pointer flex items-center justify-center"
          onClick={() => (window.location.href = "/")}
        >
          <span className="font-extrabold text-white mr-2">E-VENT</span>
          <span className="text-white"> HORIZON</span>
        </div>

        <div className="flex space-x-4 items-center">
          {[
            { href: "/", label: "Home" },
            { href: "/events", label: "Events" },
            { href: "/about", label: "About" },
            { href: "/contact", label: "Contact" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-1 rounded-full transition-all ${
                pathname === link.href
                  ? "bg-cyan-500/10 text-cyan-500 dark:text-cyan-300 font-medium"
                  : "text-gray-200 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <ModeToggle />

          {/* Avatar */}
          <Avatar
            className="h-9 w-9 rounded-full overflow-hidden ring-2 ring-white/30 dark:ring-slate-700/40 transition-all hover:ring-cyan-400 dark:hover:ring-cyan-500 cursor-pointer"
            onClick={() => (window.location.href = "/auth")}
          >
            <AvatarImage
              className="rounded-full w-full h-full object-cover"
              src="https://github.com/shadcn.png"
              alt="@shadcn"
            />
            <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-blue-500 text-white">
              CN
            </AvatarFallback>
          </Avatar>
        </div>
      </nav>
    </div>
  );
};
