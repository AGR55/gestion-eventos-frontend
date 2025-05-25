"use client";

import { useState, useRef, useEffect } from "react";
import {
  Search,
  X,
  Loader2,
  Calendar,
  MapPin,
  Tag,
  Music,
  Palette,
  Trophy,
  Utensils,
  Laptop,
  Building,
  Clock,
  TrendingUp,
} from "lucide-react";
import { Button } from "../button";
import { Input } from "../input";
import { motion, AnimatePresence } from "framer-motion";

const EXAMPLE_SUGGESTIONS = [
  {
    id: 1,
    name: "Concierto de Jazz en Malecón",
    type: "event",
    icon: <Music size={16} />,
    location: "La Habana",
    date: "15 Jun",
    trending: true,
  },
  {
    id: 2,
    name: "Festival de Cine Independiente",
    type: "event",
    icon: <Calendar size={16} />,
    location: "Santiago",
    date: "22 Jun",
    trending: false,
  },
  {
    id: 3,
    name: "Teatro Nacional",
    type: "location",
    icon: <MapPin size={16} />,
    location: "La Habana",
    events: "12 eventos",
  },
  {
    id: 4,
    name: "Casa de la Música",
    type: "location",
    icon: <MapPin size={16} />,
    location: "Trinidad",
    events: "8 eventos",
  },
  {
    id: 5,
    name: "Música",
    type: "category",
    icon: <Music size={16} />,
    count: "45 eventos",
  },
  {
    id: 6,
    name: "Gastronomía",
    type: "category",
    icon: <Utensils size={16} />,
    count: "23 eventos",
  },
];

const CATEGORIES = [
  {
    name: "Todos",
    icon: <Search size={16} />,
    gradient: "from-gray-500/20 to-gray-600/20",
    color: "text-gray-400",
  },
  {
    name: "Música",
    icon: <Music size={16} />,
    gradient: "from-red-500/20 to-pink-500/20",
    color: "text-red-400",
  },
  {
    name: "Arte",
    icon: <Palette size={16} />,
    gradient: "from-purple-500/20 to-indigo-500/20",
    color: "text-purple-400",
  },
  {
    name: "Gastronomía",
    icon: <Utensils size={16} />,
    gradient: "from-orange-500/20 to-red-500/20",
    color: "text-orange-400",
  },
  {
    name: "Tecnología",
    icon: <Laptop size={16} />,
    gradient: "from-cyan-500/20 to-blue-500/20",
    color: "text-cyan-400",
  },
  {
    name: "Deportes",
    icon: <Trophy size={16} />,
    gradient: "from-emerald-500/20 to-teal-500/20",
    color: "text-emerald-400",
  },
];

const QUICK_SEARCHES = [
  "Eventos este fin de semana",
  "Conciertos en La Habana",
  "Festival de arte",
  "Eventos gratuitos",
];

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [suggestions, setSuggestions] = useState<typeof EXAMPLE_SUGGESTIONS>(
    []
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchTerm.length > 1) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setSuggestions(
          EXAMPLE_SUGGESTIONS.filter((suggestion) =>
            suggestion.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
        setIsLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    } else if (isFocused && searchTerm.length === 0) {
      // Mostrar sugerencias populares cuando está enfocado pero vacío
      setSuggestions(EXAMPLE_SUGGESTIONS.slice(0, 4));
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, isFocused]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (!searchTerm) return;

    console.log(
      `Searching for: ${searchTerm} in category: ${selectedCategory}`
    );

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsFocused(false);
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
    if (e.key === "Escape") {
      setIsFocused(false);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    inputRef.current?.focus();
  };

  const handleSuggestionClick = (suggestion: (typeof EXAMPLE_SUGGESTIONS)[0]) => {
    setSearchTerm(suggestion.name);
    if (suggestion.type === "category") {
      setSelectedCategory(suggestion.name);
    }
    setIsFocused(false);
    handleSearch();
  };

  const handleQuickSearch = (query: string) => {
    setSearchTerm(query);
    setIsFocused(false);
    setTimeout(() => handleSearch(), 100);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      {/* Barra de búsqueda principal */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div
          className={`relative bg-black/40 backdrop-blur-xl border transition-all duration-300 rounded-2xl overflow-hidden ${
            isFocused
              ? "border-cyan-500/50 shadow-2xl shadow-cyan-500/20"
              : "border-gray-700/50 hover:border-gray-600/50"
          }`}
        >
          <div className="flex items-center">
            <div className="flex-1 relative">
              <Input
                ref={inputRef}
                placeholder="Busca eventos, lugares o experiencias únicas..."
                className="bg-transparent border-0 text-white placeholder:text-gray-400 text-lg px-6 py-4 h-14 focus-visible:ring-0 focus-visible:ring-offset-0"
                type="text"
                name="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
              />

              {searchTerm && !isLoading && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={clearSearch}
                  className="absolute right-20 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-gray-700/50"
                  aria-label="Limpiar búsqueda"
                >
                  <X size={18} />
                </motion.button>
              )}
            </div>

            <Button
              onClick={handleSearch}
              disabled={isLoading}
              className="m-2 h-10 w-10 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 border-0 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Buscar"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Search className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Categorías */}
      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
          >
            {CATEGORIES.map((category, index) => (
              <motion.button
                key={category.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedCategory(category.name)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === category.name
                    ? `bg-gradient-to-r ${category.gradient} ${category.color} border border-current/30`
                    : "bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-gray-200 border border-transparent"
                }`}
              >
                {category.icon}
                <span>{category.name}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dropdown de sugerencias */}
      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 mt-2 bg-black/90 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl z-50 overflow-hidden"
          >
            {searchTerm.length === 0 && (
              <>
                {/* Búsquedas rápidas */}
                <div className="p-6 border-b border-gray-700/50">
                  <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                    <TrendingUp size={16} />
                    Búsquedas populares
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {QUICK_SEARCHES.map((query, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickSearch(query)}
                        className="px-3 py-1.5 bg-gray-800/50 hover:bg-cyan-500/20 text-gray-300 hover:text-cyan-300 text-sm rounded-full transition-all duration-200 border border-gray-700/50 hover:border-cyan-500/50"
                      >
                        {query}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Lista de sugerencias */}
            {suggestions.length > 0 && (
              <div className="max-h-80 overflow-y-auto">
                <div className="p-2">
                  <h3 className="text-sm font-semibold text-gray-300 mb-2 px-4 py-2">
                    {searchTerm.length > 0 ? "Resultados" : "Sugerencias"}
                  </h3>
                  {suggestions.map((suggestion, index) => (
                    <motion.button
                      key={suggestion.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="w-full text-left px-4 py-3 hover:bg-gray-800/50 rounded-xl flex items-center gap-3 transition-all duration-200 group"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <div className="flex-shrink-0 p-2 bg-gray-800/50 rounded-lg group-hover:bg-cyan-500/20 transition-colors">
                        <span className="text-gray-400 group-hover:text-cyan-400">
                          {suggestion.icon}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-medium truncate">
                            {suggestion.name}
                          </span>
                          {suggestion.trending && (
                            <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">
                              Trending
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-4 mt-1">
                          {"location" in suggestion && (
                            <span className="text-sm text-gray-400 flex items-center gap-1">
                              <MapPin size={12} />
                              {suggestion.location}
                            </span>
                          )}
                          {"date" in suggestion && (
                            <span className="text-sm text-gray-400 flex items-center gap-1">
                              <Clock size={12} />
                              {suggestion.date}
                            </span>
                          )}
                          {"events" in suggestion && (
                            <span className="text-sm text-gray-400">
                              {suggestion.events}
                            </span>
                          )}
                          {"count" in suggestion && (
                            <span className="text-sm text-gray-400">
                              {suggestion.count}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex-shrink-0">
                        <span className="text-xs text-gray-500 bg-gray-800/50 px-2 py-1 rounded-full">
                          {suggestion.type === "event"
                            ? "Evento"
                            : suggestion.type === "location"
                            ? "Lugar"
                            : "Categoría"}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Estado de carga */}
            {isLoading && (
              <div className="p-8 text-center">
                <Loader2 className="h-6 w-6 animate-spin text-cyan-400 mx-auto mb-2" />
                <p className="text-gray-400 text-sm">Buscando eventos...</p>
              </div>
            )}

            {/* Sin resultados */}
            {searchTerm.length > 1 && !isLoading && suggestions.length === 0 && (
              <div className="p-8 text-center">
                <Search className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-sm">
                  No se encontraron resultados para "{searchTerm}"
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Intenta con otros términos de búsqueda
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
