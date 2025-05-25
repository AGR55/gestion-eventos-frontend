"use client";

import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
  Star,
  ArrowUpRight,
  Heart,
  Globe,
  Shield,
} from "lucide-react";
import Link from "next/link";

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

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { name: "Explorar Eventos", href: "/events" },
      { name: "Crear Evento", href: "/create-event" },
      { name: "Mi Perfil", href: "/profile" },
      { name: "Mis Entradas", href: "/tickets" },
    ],
    support: [
      { name: "Centro de Ayuda", href: "/help" },
      { name: "Contacto", href: "/contact" },
      { name: "Términos de Servicio", href: "/terms" },
      { name: "Política de Privacidad", href: "/privacy" },
    ],
  };

  const socialLinks = [
    {
      icon: Facebook,
      href: "#",
      color: "hover:text-blue-400",
      label: "Facebook",
    },
    {
      icon: Instagram,
      href: "#",
      color: "hover:text-pink-400",
      label: "Instagram",
    },
    {
      icon: Twitter,
      href: "#",
      color: "hover:text-cyan-400",
      label: "Twitter",
    },
    {
      icon: Linkedin,
      href: "#",
      color: "hover:text-blue-300",
      label: "LinkedIn",
    },
    { icon: Youtube, href: "#", color: "hover:text-red-400", label: "YouTube" },
  ];

  return (
    <motion.footer
      initial="hidden"
      animate="visible"
      variants={staggerChildren}
      className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 border-t border-t-gray-800 text-white overflow-hidden"
    >
      {/* Efectos de fondo minimalistas */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Sección principal */}
        <div className="container mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Marca y estadísticas */}
            <motion.div variants={fadeIn} className="lg:col-span-1">
              <Link href="/" className="group inline-block mb-6">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      EVENT HORIZON
                    </h3>
                    <p className="text-gray-400 text-xs">
                      El futuro de los eventos
                    </p>
                  </div>
                </div>
              </Link>

              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Conectamos personas a través de experiencias únicas.
              </p>
            </motion.div>

            {/* Enlaces - Plataforma */}
            <motion.div variants={fadeIn}>
              <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-cyan-400" />
                Plataforma
              </h4>
              <ul className="space-y-2">
                {footerLinks.platform.map((link, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm flex items-center gap-2 group"
                    >
                      <span>{link.name}</span>
                      <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Enlaces - Soporte */}
            <motion.div variants={fadeIn}>
              <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Shield className="h-4 w-4 text-purple-400" />
                Soporte
              </h4>
              <ul className="space-y-2">
                {footerLinks.support.map((link, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-purple-400 transition-colors duration-300 text-sm flex items-center gap-2 group"
                    >
                      <span>{link.name}</span>
                      <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contacto y Redes Sociales */}
            <motion.div variants={fadeIn}>
              <h4 className="text-white font-semibold mb-4">Contacto</h4>

              {/* Información de contacto compacta */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-gray-300 text-sm">
                  <div className="p-1.5 bg-cyan-500/20 rounded-md">
                    <Mail className="h-3 w-3 text-cyan-400" />
                  </div>
                  <a
                    href="mailto:hello@eventhorizon.com"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    hello@eventhorizon.com
                  </a>
                </div>

                <div className="flex items-center gap-3 text-gray-300 text-sm">
                  <div className="p-1.5 bg-emerald-500/20 rounded-md">
                    <Phone className="h-3 w-3 text-emerald-400" />
                  </div>
                  <a
                    href="tel:+53123456789"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    +53 123 456 789
                  </a>
                </div>

                <div className="flex items-center gap-3 text-gray-300 text-sm">
                  <div className="p-1.5 bg-purple-500/20 rounded-md">
                    <MapPin className="h-3 w-3 text-purple-400" />
                  </div>
                  <span className="text-gray-400">La Habana, Cuba</span>
                </div>
              </div>

              {/* Redes sociales */}
              <div>
                <h5 className="text-white font-medium mb-3 text-sm">
                  Síguenos
                </h5>
                <div className="flex gap-2">
                  {socialLinks.map((social, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      <Link
                        href={social.href}
                        className={`flex items-center justify-center w-8 h-8 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50 text-gray-400 ${social.color} transition-all duration-300 hover:border-current`}
                        aria-label={social.label}
                      >
                        <social.icon className="h-4 w-4" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer final */}
        <motion.div variants={fadeIn} className="border-t border-gray-700/30">
          <div className="container mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
              <div className="flex items-center gap-4">
                <p className="text-gray-400">
                  © {currentYear} Event Horizon. Todos los derechos reservados.
                </p>
                <div className="hidden md:flex items-center gap-1 text-gray-400">
                  Hecho con <Heart className="h-3 w-3 text-red-400 mx-1" /> en
                  Cuba
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-400">
                <Link
                  href="/terms"
                  className="hover:text-white transition-colors"
                >
                  Términos
                </Link>
                <span>•</span>
                <Link
                  href="/privacy"
                  className="hover:text-white transition-colors"
                >
                  Privacidad
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};
