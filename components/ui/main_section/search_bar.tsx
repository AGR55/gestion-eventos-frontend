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
} from "lucide-react";
import { Button } from "../button";
import { Input } from "../input";
import { motion, AnimatePresence } from "framer-motion";
import { CategoryButton } from "./category_buttons";

const EXAMPLE_SUGGESTIONS = [
  {
    id: 1,
    name: "Concierto de Jazz",
    type: "event",
    icon: <Calendar size={14} />,
  },
  {
    id: 2,
    name: "Festival de Cine",
    type: "event",
    icon: <Calendar size={14} />,
  },
  { id: 3, name: "Madrid", type: "location", icon: <MapPin size={14} /> },
  { id: 4, name: "Barcelona", type: "location", icon: <MapPin size={14} /> },
  { id: 5, name: "Música", type: "category", icon: <Tag size={14} /> },
  { id: 6, name: "Gastronomía", type: "category", icon: <Tag size={14} /> },
];

// Create a categories array with icons
const CATEGORIES = [
  { name: "Eventos", icon: <Calendar size={16} /> },
  { name: "Lugares", icon: <Building size={16} /> },
  { name: "Música", icon: <Music size={16} /> },
  { name: "Arte", icon: <Palette size={16} /> },
  { name: "Deportes", icon: <Trophy size={16} /> },
  { name: "Gastronomía", icon: <Utensils size={16} /> },
  { name: "Tecnología", icon: <Laptop size={16} /> },
];

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
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
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

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
      `Searching for: ${searchTerm}${
        selectedCategory ? ` in ${selectedCategory}` : ""
      }`
    );

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    inputRef.current?.focus();
  };

  const handleSuggestionClick = (
    suggestion: (typeof EXAMPLE_SUGGESTIONS)[0]
  ) => {
    setSearchTerm(suggestion.name);
    if (suggestion.type === "category") {
      setSelectedCategory(suggestion.name);
    }
    setIsFocused(false);
    handleSearch();
  };

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center"
    >
      <motion.div
        className="p-1 bg-gradient-to-r from-[#C9554E] to-[#3AB5B8] drop-shadow-2xl rounded-2xl w-96 max-w-full flex flex-row gap-1"
        initial={{ opacity: 0.9, y: 5 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: isFocused ? 1.02 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="relative flex-grow">
          <Input
            ref={inputRef}
            placeholder="Busca eventos, lugares o categorías"
            className="rounded-xl !bg-white shadow-border w-full text-black pl-3 pr-8 py-2 h-10 focus-visible:ring-2 focus-visible:ring-cyan-400 transition-all"
            type="text"
            name="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
          />

          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="flex gap-1">
          <Button
            onClick={handleSearch}
            disabled={isLoading || !searchTerm}
            className="rounded-xl bg-gray-900/75 transition-colors hover:bg-gray-900/90 h-10 w-10 p-0 disabled:opacity-70"
            aria-label="Search"
          >
            {isLoading ? (
              <Loader2 className="text-white h-4 w-4 animate-spin" />
            ) : (
              <Search className="text-white h-4 w-4" />
            )}
          </Button>
        </div>
      </motion.div>

      {isFocused && (
        <motion.div
          className="flex mt-8 px-2 overflow-x-auto pb-2 no-scrollbar"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {CATEGORIES.map((category) => (
            <div
              key={category.name}
              onClick={() => {
                setSelectedCategory(
                  selectedCategory === category.name ? null : category.name
                );
                inputRef.current?.focus();
              }}
              className={`relative ${
                selectedCategory === category.name ? "scale-105" : ""
              }`}
            >
              <CategoryButton>
                {category.icon}
                <span className="text-xs whitespace-nowrap">
                  {category.name}
                </span>
              </CategoryButton>
              {selectedCategory === category.name && (
                <motion.div
                  layoutId="selected-indicator"
                  className="absolute inset-0 border-2 border-white rounded-full pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </div>
          ))}
        </motion.div>
      )}

      {/* Suggestions dropdown */}
      <AnimatePresence>
        {isFocused && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: 10, height: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 mt-16 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg z-10 border border-white/10 backdrop-blur-md overflow-hidden"
          >
            <div className="max-h-[300px] overflow-y-auto">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion.id}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 flex items-center gap-2 transition-colors"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <span className="text-cyan-500">{suggestion.icon}</span>
                  <span className="text-sm">{suggestion.name}</span>
                  <span className="text-xs text-gray-500 ml-auto">
                    {suggestion.type === "event"
                      ? "Evento"
                      : suggestion.type === "location"
                      ? "Lugar"
                      : "Categoría"}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
