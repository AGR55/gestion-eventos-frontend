"use client";

import { FeaturedEventsSection } from "@/components/ui/events/featured_events/featured_events_section";
import { UpcomingEventsSection } from "@/components/ui/events/upcoming_events/upcoming_events_section";
import { MainSection } from "@/components/ui/main_section/main_section";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  MapPin,
  Users,
  TrendingUp,
  Star,
  ArrowRight,
  Play,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Animaciones mejoradas
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const scaleOnHover = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

// Sección de estadísticas mejorada
const StatsSection = () => {
  const stats = [
    {
      icon: <CalendarCheck className="h-12 w-12 text-cyan-400" />,
      value: "150+",
      label: "Eventos al año",
      description: "Celebrados en toda Cuba",
      color: "from-cyan-500/20 to-blue-500/20",
    },
    {
      icon: <MapPin className="h-12 w-12 text-emerald-400" />,
      value: "30+",
      label: "Locaciones en Cuba",
      description: "De La Habana a Santiago",
      color: "from-emerald-500/20 to-teal-500/20",
    },
    {
      icon: <Users className="h-12 w-12 text-purple-400" />,
      value: "25,000+",
      label: "Asistentes",
      description: "Cada año",
      color: "from-purple-500/20 to-pink-500/20",
    },
    {
      icon: <TrendingUp className="h-12 w-12 text-orange-400" />,
      value: "92%",
      label: "Satisfacción",
      description: "De nuestros usuarios",
      color: "from-orange-500/20 to-red-500/20",
    },
  ];

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Elementos decorativos de fondo mejorados */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-cyan-600/10 to-blue-600/10 blur-[120px] animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-purple-600/10 to-pink-600/10 blur-[120px] animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-r from-emerald-600/5 to-teal-600/5 blur-[100px]"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 bg-cyan-500/10 text-cyan-400 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-cyan-500/20"
          >
            <Star className="h-4 w-4" />
            La plataforma líder en Cuba
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Conectando{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              experiencias
            </span>
            <br />
            inolvidables
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            Descubre, participa y disfruta de los mejores eventos culturales,
            musicales y educativos en toda la isla. Tu próxima aventura te está
            esperando.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover="hover"
              className="group"
            >
              <motion.div
                variants={scaleOnHover}
                className={`bg-gradient-to-br ${stat.color} backdrop-blur-sm rounded-2xl p-8 border border-gray-800/50 text-center relative overflow-hidden transition-all duration-500 hover:border-gray-700/50 hover:shadow-2xl hover:shadow-cyan-500/10`}
              >
                {/* Efecto de brillo en hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                <div className="relative z-10">
                  <div className="flex justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {stat.value}
                  </h3>
                  <p className="text-lg font-semibold text-gray-200 mb-2">
                    {stat.label}
                  </p>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Sección CTA completamente rediseñada
const CtaSection = () => {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Contenido de texto */}
          <motion.div variants={fadeInLeft} className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 text-cyan-400 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-cyan-500/20">
                <Play className="h-4 w-4" />
                ¿Organizas eventos?
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Haz realidad tu{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  evento soñado
                </span>
              </h2>

              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Te proporcionamos las mejores herramientas, locaciones y
                servicios para que tu evento sea una experiencia única e
                inolvidable para todos los asistentes.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/organizers">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
                >
                  Comenzar ahora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 py-4 px-8 rounded-xl transition-all duration-300 font-semibold"
                >
                  Contactar soporte
                </Button>
              </Link>
            </div>

            {/* Testimonial mini */}
            <div className="flex items-center gap-4 pt-8 border-t border-gray-800">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-400 border-2 border-gray-900"
                  ></div>
                ))}
              </div>
              <div>
                <p className="text-gray-300 text-sm">
                  <span className="font-semibold text-white">
                    +500 organizadores
                  </span>{" "}
                  confían en nosotros
                </p>
              </div>
            </div>
          </motion.div>

          {/* Tarjeta visual */}
          <motion.div variants={fadeInRight} className="relative">
            <div className="relative bg-gradient-to-br from-[#0F1419] via-[#1a2332] to-[#0F1419] rounded-3xl p-8 border border-gray-800/50 overflow-hidden">
              {/* Efectos de fondo */}
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-cyan-500/20 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-purple-500/20 blur-3xl"></div>

              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-purple-400 flex items-center justify-center">
                    <CalendarCheck className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">
                      Panel de Control
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Gestiona tus eventos fácilmente
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-cyan-400">127</p>
                    <p className="text-gray-400 text-xs">Eventos creados</p>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-purple-400">89%</p>
                    <p className="text-gray-400 text-xs">Tasa de éxito</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Asistencia promedio</span>
                    <span className="text-white font-semibold">85%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full w-[85%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Banner de categorías mejorado
const CategoriesBanner = () => {
  const categories = [
    { name: "Música", emoji: "🎵", color: "from-red-500/20 to-pink-500/20" },
    { name: "Cine", emoji: "🎬", color: "from-blue-500/20 to-purple-500/20" },
    {
      name: "Teatro",
      emoji: "🎭",
      color: "from-purple-500/20 to-indigo-500/20",
    },
    {
      name: "Gastronomía",
      emoji: "🍽️",
      color: "from-orange-500/20 to-red-500/20",
    },
    {
      name: "Cultura",
      emoji: "🏛️",
      color: "from-emerald-500/20 to-teal-500/20",
    },
    {
      name: "Tecnología",
      emoji: "💻",
      color: "from-cyan-500/20 to-blue-500/20",
    },
    { name: "Arte", emoji: "🎨", color: "from-pink-500/20 to-rose-500/20" },
    {
      name: "Educación",
      emoji: "📚",
      color: "from-yellow-500/20 to-orange-500/20",
    },
  ];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      className="py-12 relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 via-gray-800/30 to-gray-900/50 border-y border-gray-800/50"></div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-8">
          <h3 className="text-lg font-semibold text-white mb-2">
            Explora por categorías
          </h3>
          <p className="text-gray-400">
            Encuentra eventos que se adapten a tus intereses
          </p>
        </div>

        <div className="flex justify-center flex-wrap gap-3">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Link
                href={`/events?category=${category.name}`}
                className={`group bg-gradient-to-r ${category.color} backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium text-white border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 flex items-center gap-2 hover:shadow-lg`}
              >
                <span className="text-lg">{category.emoji}</span>
                <span className="group-hover:text-cyan-300 transition-colors">
                  {category.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl container mx-auto">
        {/* Hero Section */}
        <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
          <MainSection />
        </motion.div>

        {/* Categories Banner */}
        <CategoriesBanner />

        {/* Featured Events */}
        <motion.section
          className="py-16 px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <div className="text-center mb-12">
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 text-cyan-400 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-cyan-500/20"
            >
              <Star className="h-4 w-4" />
              Destacados
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              Eventos que no te puedes perder
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-gray-400 max-w-2xl mx-auto"
            >
              Selección especial de los eventos más populares y emocionantes de
              esta temporada
            </motion.p>
          </div>
          <FeaturedEventsSection />
        </motion.section>

        {/* Stats Section */}
        <StatsSection />

        {/* Upcoming Events */}
        <motion.section
          className="py-16 px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <div className="text-center mb-12">
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-emerald-500/20"
            >
              <CalendarCheck className="h-4 w-4" />
              Próximamente
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              Próximos eventos
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-gray-400 max-w-2xl mx-auto"
            >
              Planifica tu agenda con los eventos más esperados de los próximos
              meses
            </motion.p>
          </div>
          <UpcomingEventsSection />
        </motion.section>

        {/* CTA Section */}
        <CtaSection />
      </div>
    </div>
  );
}
