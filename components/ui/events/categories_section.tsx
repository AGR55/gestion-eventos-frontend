"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Music,
  Camera,
  Theater,
  UtensilsCrossed,
  Landmark,
  Laptop,
  Palette,
  BookOpen,
  ArrowRight,
} from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// ✨ Mapeo de categorías con íconos
const categoryIcons = {
  Música: Music,
  Cine: Camera,
  Teatro: Theater,
  Gastronomía: UtensilsCrossed,
  Cultura: Landmark,
  Tecnología: Laptop,
  Arte: Palette,
  Educación: BookOpen,
};

export function CategoriesSection() {
  const categories = [
    {
      name: "Música",
      emoji: "🎵",
      color: "from-red-500/20 to-pink-500/20",
      borderColor: "border-red-500/30",
      hoverColor: "hover:border-red-400/50",
      description: "Conciertos, festivales y eventos musicales",
    },
    {
      name: "Cine",
      emoji: "🎬",
      color: "from-blue-500/20 to-purple-500/20",
      borderColor: "border-blue-500/30",
      hoverColor: "hover:border-blue-400/50",
      description: "Estrenos, festivales de cine y documentales",
    },
    {
      name: "Teatro",
      emoji: "🎭",
      color: "from-purple-500/20 to-indigo-500/20",
      borderColor: "border-purple-500/30",
      hoverColor: "hover:border-purple-400/50",
      description: "Obras teatrales y performances en vivo",
    },
    {
      name: "Gastronomía",
      emoji: "🍽️",
      color: "from-orange-500/20 to-red-500/20",
      borderColor: "border-orange-500/30",
      hoverColor: "hover:border-orange-400/50",
      description: "Festivales culinarios y cenas especiales",
    },
    {
      name: "Cultura",
      emoji: "🏛️",
      color: "from-emerald-500/20 to-teal-500/20",
      borderColor: "border-emerald-500/30",
      hoverColor: "hover:border-emerald-400/50",
      description: "Exposiciones, museos y patrimonio",
    },
    {
      name: "Tecnología",
      emoji: "💻",
      color: "from-cyan-500/20 to-blue-500/20",
      borderColor: "border-cyan-500/30",
      hoverColor: "hover:border-cyan-400/50",
      description: "Conferencias tech y talleres digitales",
    },
    {
      name: "Arte",
      emoji: "🎨",
      color: "from-pink-500/20 to-rose-500/20",
      borderColor: "border-pink-500/30",
      hoverColor: "hover:border-pink-400/50",
      description: "Galerías, exposiciones y arte urbano",
    },
    {
      name: "Educación",
      emoji: "📚",
      color: "from-yellow-500/20 to-orange-500/20",
      borderColor: "border-yellow-500/30",
      hoverColor: "hover:border-yellow-400/50",
      description: "Talleres, seminarios y cursos",
    },
  ];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
      className="py-16 relative"
    >
      <div className="container mx-auto max-w-7xl px-4">
        {/* ✨ Título de la sección */}
        <motion.div variants={fadeIn} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Explora por categorías
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Encuentra eventos que se adapten perfectamente a tus intereses y
            pasiones
          </p>
        </motion.div>

        {/* ✨ Grid de categorías */}
        <motion.div
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((category, index) => {
            const IconComponent =
              categoryIcons[category.name as keyof typeof categoryIcons];

            return (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  href={`/events?category=${encodeURIComponent(category.name)}`}
                  className={`group bg-gradient-to-br ${category.color} backdrop-blur-sm rounded-2xl p-6 border ${category.borderColor} ${category.hoverColor} transition-all duration-300 flex flex-col items-center text-center hover:shadow-lg hover:shadow-white/5 block`}
                >
                  {/* ✨ Ícono o emoji */}
                  <div className="mb-4 relative">
                    {IconComponent ? (
                      <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-2">
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                    ) : (
                      <div className="text-4xl mb-2">{category.emoji}</div>
                    )}
                  </div>

                  {/* ✨ Nombre de la categoría */}
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {category.name}
                  </h3>

                  {/* ✨ Descripción */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-4 group-hover:text-gray-300 transition-colors">
                    {category.description}
                  </p>

                  {/* ✨ Indicador de acción */}
                  <div className="flex items-center text-cyan-400 text-sm font-medium group-hover:text-cyan-300 transition-colors mt-auto">
                    <span>Explorar</span>
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ✨ Botón para ver todas las categorías */}
        <motion.div variants={fadeIn} className="text-center mt-12">
          <Link href="/events">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-gray-700/50 to-gray-600/50 hover:from-gray-600/50 hover:to-gray-500/50 text-white font-medium px-8 py-3 rounded-xl border border-gray-600/50 hover:border-gray-500/50 transition-all duration-300 flex items-center gap-2 mx-auto"
            >
              Ver todos los eventos
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
