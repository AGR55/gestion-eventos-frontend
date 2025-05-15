"use client";

import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "../avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "../toogle_mode";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav
      className="z-50 fixed top-4 left-4 right-4 py-3 px-6 
                   bg-white/20 dark:bg-slate-900/50 backdrop-blur-xl 
                   border border-white/20 dark:border-slate-700/30
                   rounded-full shadow-lg shadow-black/5 dark:shadow-white/5
                   transition-all duration-300"
    >
      <div
        className="absolute left-6 top-1/2 transform -translate-y-1/2 text-2xl font-light cursor-pointer"
        onClick={() => (window.location.href = "/")}
      >
        <span className="font-extrabold text-white">E-VENT</span>
        <span className="text-white"> HORIZON</span>
      </div>

      <div className="flex justify-center items-center w-full">
        <div className="flex space-x-4 justify-center items-center">
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
                  ? "bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 font-medium"
                  : "text-gray-700 dark:text-gray-200 hover:text-indigo-600 hover:bg-indigo-500/5 dark:hover:text-indigo-300"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="absolute flex items-center justify-center right-[72px] top-1/2 transform -translate-y-1/2 w-9 h-9">
        <ModeToggle />
      </div>
      <div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex items-center justify-center w-9 h-9">
        <Avatar
          className="h-9 w-9 rounded-full overflow-hidden ring-2 ring-white/30 dark:ring-slate-700/40 transition-all hover:ring-indigo-400 dark:hover:ring-indigo-500 cursor-pointer"
          onClick={() => (window.location.href = "/auth")}
        >
          <AvatarImage
            className="rounded-full w-full h-full object-cover"
            src="https://github.com/shadcn.png"
            alt="@shadcn"
          />
          <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
            CN
          </AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
};
