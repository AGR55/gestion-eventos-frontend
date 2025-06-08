"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Calendar, Users, TrendingUp, MapPin } from "lucide-react";

interface EventsHeaderProps {
  totalEvents: number;
  onSearch: (query: string) => void;
  currentSearch?: string;
}

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

export function EventsHeader({
  totalEvents,
  onSearch,
  currentSearch = "",
}: EventsHeaderProps) {
  const [searchQuery, setSearchQuery] = useState(currentSearch);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // Búsqueda en tiempo real con debounce
    const timer = setTimeout(() => {
      onSearch(e.target.value);
    }, 500);

    return () => clearTimeout(timer);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="mb-12"
    >
      {/* Título principal */}
      <motion.div variants={fadeIn} className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text mb-4">
          Descubre Eventos Increíbles
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Encuentra y participa en eventos que te apasionen. Desde conferencias
          hasta conciertos, tenemos algo especial para ti.
        </p>
      </motion.div>

      {/* Estadísticas rápidas */}
      <motion.div
        variants={fadeIn}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
      >
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 text-center">
          <Calendar className="h-6 w-6 text-cyan-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{totalEvents}</div>
          <div className="text-gray-400 text-sm">Eventos disponibles</div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 text-center">
          <Users className="h-6 w-6 text-purple-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">50K+</div>
          <div className="text-gray-400 text-sm">Participantes activos</div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 text-center">
          <TrendingUp className="h-6 w-6 text-green-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">95%</div>
          <div className="text-gray-400 text-sm">Satisfacción</div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 text-center">
          <MapPin className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">25+</div>
          <div className="text-gray-400 text-sm">Ciudades</div>
        </div>
      </motion.div>

      {/* Barra de búsqueda */}
      <motion.div variants={fadeIn} className="max-w-2xl mx-auto">
        <form onSubmit={handleSearch} className="relative">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar eventos por nombre, descripción o ubicación..."
              value={searchQuery}
              onChange={handleSearchInput}
              className="w-full pl-12 pr-24 h-14 bg-gray-800/50 backdrop-blur-sm border-gray-600/50 rounded-2xl text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20 text-lg"
            />
            <Button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl px-6 h-10"
            >
              Buscar
            </Button>
          </div>
        </form>

        {/* Sugerencias de búsqueda */}
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <span className="text-gray-400 text-sm">Búsquedas populares:</span>
          {["Tecnología", "Música", "Arte", "Networking", "Workshop"].map(
            (tag) => (
              <button
                key={tag}
                onClick={() => {
                  setSearchQuery(tag);
                  onSearch(tag);
                }}
                className="text-cyan-400 hover:text-cyan-300 text-sm underline underline-offset-2 transition-colors"
              >
                {tag}
              </button>
            )
          )}
        </div>
      </motion.div>

      {/* Información de resultados de búsqueda */}
      {currentSearch && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-cyan-500/20 border border-cyan-500/30 rounded-full px-4 py-2">
            <Search className="h-4 w-4 text-cyan-400" />
            <span className="text-cyan-300 text-sm">
              Mostrando resultados para: <strong>"{currentSearch}"</strong>
            </span>
            <button
              onClick={() => {
                setSearchQuery("");
                onSearch("");
              }}
              className="text-cyan-400 hover:text-cyan-300 ml-2"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
