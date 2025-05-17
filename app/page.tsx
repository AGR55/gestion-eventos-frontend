"use client";

import { FeaturedEventsSection } from "@/components/ui/events/featured_events/featured_events_section";
import { UpcomingEventsSection } from "@/components/ui/events/upcoming_events/upcoming_events_section";
import { MainSection } from "@/components/ui/main_section/main_section";
import { motion } from "framer-motion";
import { CalendarCheck, MapPin, Users, TrendingUp } from "lucide-react";
import Link from "next/link";

// Animaciones y variantes
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Componente para las estadísticas
const StatsSection = () => {
  const stats = [
    {
      icon: <CalendarCheck className="h-10 w-10 text-cyan-400" />,
      value: "150+",
      label: "Eventos al año",
    },
    {
      icon: <MapPin className="h-10 w-10 text-cyan-400" />,
      value: "30+",
      label: "Locaciones en Cuba",
    },
    {
      icon: <Users className="h-10 w-10 text-cyan-400" />,
      value: "25,000+",
      label: "Asistentes",
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-cyan-400" />,
      value: "92%",
      label: "Satisfacción",
    },
  ];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="py-16 px-4 relative overflow-hidden"
    >
      {/* Elemento decorativo de fondo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-40 w-60 h-60 rounded-full bg-cyan-600 blur-[100px]"></div>
        <div className="absolute bottom-20 right-40 w-80 h-80 rounded-full bg-purple-600 blur-[120px]"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.h2
          variants={fadeInUp}
          className="text-center text-3xl md:text-4xl font-bold text-white mb-2"
        >
          La plataforma de eventos líder en Cuba
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          className="text-center text-gray-400 mb-12 max-w-2xl mx-auto"
        >
          Conectamos a miles de personas con los mejores eventos culturales,
          musicales y educativos en toda la isla.
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-[#13212e] rounded-xl p-6 border border-gray-800 text-center group hover:bg-cyan-600/10 hover:border-cyan-500/50 transition-all duration-300"
            >
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">
                {stat.value}
              </h3>
              <p className="text-gray-400 group-hover:text-cyan-300 transition-colors">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Componente para el call-to-action
const CtaSection = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
      className="py-16 px-4 mb-12"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="relative overflow-hidden bg-gradient-to-r from-[#111E27] to-[#13212e] rounded-2xl p-8 md:p-12 shadow-lg border border-gray-800">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-purple-500"></div>
          <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-cyan-600/20 blur-xl"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-purple-600/20 blur-xl"></div>

          <div className="relative z-10 text-center md:max-w-2xl md:mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ¿Quieres organizar tu propio evento?
            </h2>
            <p className="text-gray-300 mb-8">
              Ponemos a tu disposición las mejores locaciones y servicios para
              hacer de tu evento una experiencia inolvidable para todos los
              asistentes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/organizers"
                className="bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-600 hover:to-cyan-500 text-black font-medium py-3 px-6 rounded-lg transition-all duration-300"
              >
                Registrarse como organizador
              </Link>
              <Link
                href="/contact"
                className="bg-transparent border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 py-3 px-6 rounded-lg transition-all duration-300"
              >
                Contactar con el equipo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const CategoriesBanner = () => {
  const categories = [
    "Música",
    "Cine",
    "Teatro",
    "Gastronomía",
    "Cultura",
    "Tecnología",
    "Arte",
    "Educación",
  ];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      className="py-8 overflow-hidden bg-[#13212e]/50 border-y border-gray-800"
    >
      <div className="container mx-auto">
        <div className="flex justify-center flex-wrap gap-4">
          {categories.map((category, index) => (
            <Link
              href={`/events?category=${category}`}
              key={index}
              className="bg-[#111E27] px-4 py-2 rounded-full text-sm text-gray-300 hover:bg-cyan-500/20 hover:text-cyan-400 transition-all duration-300"
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function Home() {
  return (
    <div className="overflow-hidden max-w-7xl container mx-auto">
      <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
        <MainSection />
      </motion.div>

      <motion.section
        className="mt-16 mb-16 mx-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <FeaturedEventsSection />
      </motion.section>

      <StatsSection />

      <motion.section
        className="mt-8 mb-16 mx-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <UpcomingEventsSection />
      </motion.section>

      <CtaSection />
    </div>
  );
}
