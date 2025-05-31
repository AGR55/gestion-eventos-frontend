"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ModeToggle } from "../toogle_mode";
import { UserAvatar } from "./user-avatar";
import { Calendar, Home, Info, Mail, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const navItems = [
  { href: "/", label: "Inicio", icon: <Home size={16} /> },
  { href: "/events", label: "Eventos", icon: <Calendar size={16} /> },
  { href: "/about", label: "Nosotros", icon: <Info size={16} /> },
  { href: "/contact", label: "Contacto", icon: <Mail size={16} /> },
];

export const Navbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Detectar scroll para cambiar el estilo del navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="w-full flex justify-center fixed top-4 z-50">
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`py-3 px-6 transition-all duration-500 ease-out inline-flex items-center gap-6 rounded-2xl ${
            isScrolled
              ? "bg-black/80 backdrop-blur-2xl border border-gray-800/50 shadow-2xl shadow-black/20"
              : "bg-black/40 backdrop-blur-xl border border-gray-700/30 shadow-lg shadow-black/10"
          }`}
        >
          {/* Logo mejorado */}
          <motion.div
            className="text-2xl font-light cursor-pointer flex items-center justify-center group"
            onClick={() => (window.location.href = "/")}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <span className="font-extrabold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mr-2 group-hover:from-cyan-300 group-hover:to-blue-300 transition-all duration-300">
              E-VENT
            </span>
            <span className="text-white group-hover:text-gray-200 transition-colors duration-300">
              {" "}
              HORIZON
            </span>
          </motion.div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex space-x-2 items-center">
            {navItems.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <Link
                  href={link.href}
                  className={`px-4 py-2 rounded-xl transition-all duration-300 flex items-center gap-2 text-sm font-medium relative overflow-hidden group ${
                    pathname === link.href
                      ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/10"
                      : "text-gray-300 hover:text-white hover:bg-white/10 border border-transparent hover:border-gray-600/30"
                  }`}
                >
                  {/* Efecto de brillo en hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>

                  <span className="relative z-10 flex items-center gap-2">
                    {link.icon}
                    {link.label}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Controls - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              <ModeToggle />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.3 }}
              className="w-9 h-9"
            >
              <UserAvatar />
            </motion.div>
          </div>
        </motion.nav>
      </div>

      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Mobile Menu */}
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-80 bg-black/95 backdrop-blur-xl border-l border-gray-800/50 z-50 md:hidden"
          >
            <div className="p-6">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="text-xl font-light flex items-center">
                  <span className="font-extrabold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mr-2">
                    E-VENT
                  </span>
                  <span className="text-white">HORIZON</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <div className="space-y-2 mb-8">
                {navItems.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`w-full px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 text-left ${
                        pathname === link.href
                          ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30"
                          : "text-gray-300 hover:text-white hover:bg-white/10 border border-transparent hover:border-gray-600/30"
                      }`}
                    >
                      {link.icon}
                      <span className="font-medium">{link.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Mobile Controls */}
              <div className="border-t border-gray-800/50 pt-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm font-medium">
                    Configuración
                  </span>
                  <div className="flex items-center gap-3">
                    <ModeToggle />
                    <UserAvatar />
                  </div>
                </div>
              </div>

              {/* Mobile Footer */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="text-center text-xs text-gray-500">
                  <p>© 2025 Event Horizon</p>
                  <p className="mt-1">Tu plataforma de eventos en Cuba</p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
};
