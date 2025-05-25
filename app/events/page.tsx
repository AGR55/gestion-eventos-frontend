"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Search,
  MapPin,
  Calendar,
  ArrowRight,
  ArrowLeft,
  Filter,
  Grid,
  List,
  Clock,
  DollarSign,
  Star,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FeaturedEventsCard } from "@/components/ui/events/featured_events/featured_events_card";
import { UpcomingEventsCard } from "@/components/ui/events/upcoming_events/upcoming_events_card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Event } from "@/types/types";
import { Chip } from "@/components/ui/events/chip";

// Animaciones mejoradas
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const slideIn = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4 },
  },
};

// Mock data actualizada con precio y duración
const mockEvents: Event[] = [
  {
    id: 1,
    name: "Festival Internacional de Música",
    description:
      "El evento musical más grande del año con artistas internacionales y bandas emergentes en múltiples escenarios.",
    date: "24 Jun 2023",
    location: "Parque Central, Madrid",
    image: "/images/events/music-festival.jpg",
    categories: ["Música", "Festival"],
    state: "Destacado",
    price: 45,
    duration: "3 días",
    attendees: 1500,
  },
  {
    id: 2,
    name: "Conferencia de Tecnología e Innovación",
    description:
      "Ponentes de las empresas tecnológicas más importantes compartirán las últimas tendencias.",
    date: "15 Jul 2023",
    location: "Centro de Convenciones, Barcelona",
    image: "/images/events/tech-conference.jpeg",
    categories: ["Tecnología", "Conferencia"],
    state: "Próximamente",
    price: 120,
    duration: "2 días",
    attendees: 800,
  },
  {
    id: 3,
    name: "Maratón Solidario",
    description:
      "Carrera benéfica para recaudar fondos para proyectos educativos en zonas desfavorecidas.",
    date: "10 Ago 2023",
    location: "Paseo Marítimo, Valencia",
    image: "/images/events/marathon.avif",
    categories: ["Deporte", "Solidario"],
    state: "Abierta inscripción",
    price: 0, // Evento gratuito
    duration: "4 horas",
    attendees: 2000,
  },
  {
    id: 4,
    name: "Exposición de Arte Contemporáneo",
    description:
      "Muestra de arte con obras de artistas nacionales e internacionales, con instalaciones interactivas.",
    date: "5 Sep 2023",
    location: "Museo de Arte Moderno, Málaga",
    image: "/images/events/art-exhibition.jpeg",
    categories: ["Arte", "Exposición"],
    state: "Destacado",
    price: 25,
    duration: "1 mes",
    attendees: 500,
  },
  {
    id: 5,
    name: "Festival Gastronómico",
    description:
      "Degustación de platos típicos de diferentes regiones y showcooking con chefs reconocidos.",
    date: "22 Sep 2023",
    location: "Plaza Mayor, Sevilla",
    image: "/images/events/food-festival.jpg",
    categories: ["Gastronomía", "Festival"],
    state: "Próximamente",
    price: 35,
    duration: "5 días",
    attendees: 1200,
  },
  {
    id: 6,
    name: "Concierto Sinfónico",
    description:
      "La orquesta sinfónica interpreta obras clásicas de Beethoven, Mozart y compositores contemporáneos.",
    date: "8 Oct 2023",
    location: "Auditorio Nacional, Madrid",
    image: "/images/events/symphony.jpg",
    categories: ["Música", "Concierto"],
    state: "Entradas disponibles",
    price: 60,
    duration: "3 horas",
    attendees: 300,
  },
];

// Categorías y filtros mejorados
const categories = [
  "Todos",
  "Música",
  "Tecnología",
  "Deporte",
  "Arte",
  "Gastronomía",
  "Festival",
  "Conferencia",
  "Exposición",
  "Concierto",
  "Solidario",
];

const locations = [
  "Todas",
  "Madrid",
  "Barcelona",
  "Valencia",
  "Málaga",
  "Sevilla",
];

const priceRanges = [
  { label: "Todos los precios", value: "all" },
  { label: "Gratis", value: "free" },
  { label: "Hasta €25", value: "0-25" },
  { label: "€26 - €50", value: "26-50" },
  { label: "€51 - €100", value: "51-100" },
  { label: "Más de €100", value: "100+" },
];

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedLocation, setSelectedLocation] = useState("Todas");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(mockEvents);
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([]);
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);

  const eventsPerPage = 6;

  useEffect(() => {
    let result = [...mockEvents];

    // Búsqueda por texto
    if (searchQuery) {
      result = result.filter(
        (event) =>
          event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filtro por categoría
    if (selectedCategory !== "Todos") {
      result = result.filter((event) => {
        const categories = Array.isArray(event.categories)
          ? event.categories
          : [event.categories];
        return categories.includes(selectedCategory);
      });
    }

    // Filtro por ubicación
    if (selectedLocation !== "Todas") {
      result = result.filter((event) =>
        event.location.includes(selectedLocation)
      );
    }

    // Filtro por precio
    if (priceRange !== "all") {
      result = result.filter((event) => {
        const price = event.price || 0;
        switch (priceRange) {
          case "free":
            return price === 0;
          case "0-25":
            return price > 0 && price <= 25;
          case "26-50":
            return price >= 26 && price <= 50;
          case "51-100":
            return price >= 51 && price <= 100;
          case "100+":
            return price > 100;
          default:
            return true;
        }
      });
    }

    // Ordenamiento
    result.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return (a.price || 0) - (b.price || 0);
        case "price-high":
          return (b.price || 0) - (a.price || 0);
        case "popularity":
          return (b.attendees || 0) - (a.attendees || 0);
        case "name":
          return a.name.localeCompare(b.name);
        default: // date
          return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
    });

    setFilteredEvents(result);
    setCurrentPage(1);

    // Eventos destacados
    setFeaturedEvents(
      mockEvents.filter((event) => event.state === "Destacado")
    );
  }, [searchQuery, selectedCategory, selectedLocation, priceRange, sortBy]);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("Todos");
    setSelectedLocation("Todas");
    setPriceRange("all");
    setSortBy("date");
    setCurrentPage(1);
  };

  const activeFiltersCount = [
    selectedCategory !== "Todos",
    selectedLocation !== "Todas",
    priceRange !== "all",
    searchQuery !== "",
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Section Mejorado */}
        <motion.section
          className="mb-16 text-center relative overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          {/* Elementos decorativos de fondo */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-cyan-600/10 to-blue-600/10 blur-[120px] animate-pulse"></div>
            <div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-purple-600/10 to-pink-600/10 blur-[120px] animate-pulse"
              style={{ animationDelay: "2s" }}
            ></div>
          </div>

          <div className="relative z-10">
            <motion.div
              variants={slideIn}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 text-cyan-400 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-cyan-500/20 mt-20"
            >
              <Star className="h-4 w-4" />
              Descubre experiencias únicas
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text mb-6">
              Eventos Increíbles
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
              Encuentra los mejores eventos culturales, conciertos, conferencias
              y más. Vive experiencias únicas y crea recuerdos inolvidables en
              toda España.
            </p>

            {/* Stats rápidas */}
            <div className="flex justify-center gap-8 text-sm text-gray-400 mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-cyan-400" />
                <span>{mockEvents.length}+ eventos</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-400" />
                <span>5 ciudades</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-purple-400" />
                <span>10k+ asistentes</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Sección de Filtros Mejorada */}
        <motion.section
          className="mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-6 border border-gray-700/50 shadow-2xl">
            {/* Barra de búsqueda principal */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <Input
                  placeholder="Buscar eventos, artistas, lugares..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 rounded-xl focus:border-cyan-500/50 focus:ring-cyan-500/20"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>

              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                className="h-12 px-6 border-gray-600/50 bg-gray-800/50 text-white hover:bg-gray-700/50 rounded-xl flex items-center gap-2"
              >
                <Filter size={18} />
                Filtros
                {activeFiltersCount > 0 && (
                  <span className="bg-cyan-500 text-white text-xs px-2 py-1 rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>
            </div>

            {/* Filtros expandibles */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: showFilters ? "auto" : 0,
                opacity: showFilters ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-700/50">
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="bg-gray-800/50 border-gray-600/50 text-white h-12 rounded-xl">
                    <SelectValue placeholder="Categoría" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600 text-white">
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={selectedLocation}
                  onValueChange={setSelectedLocation}
                >
                  <SelectTrigger className="bg-gray-800/50 border-gray-600/50 text-white h-12 rounded-xl">
                    <SelectValue placeholder="Ubicación" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600 text-white">
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger className="bg-gray-800/50 border-gray-600/50 text-white h-12 rounded-xl">
                    <SelectValue placeholder="Precio" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600 text-white">
                    {priceRanges.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="bg-gray-800/50 border-gray-600/50 text-white h-12 rounded-xl">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600 text-white">
                    <SelectItem value="date">Fecha</SelectItem>
                    <SelectItem value="price-low">
                      Precio: Menor a Mayor
                    </SelectItem>
                    <SelectItem value="price-high">
                      Precio: Mayor a Menor
                    </SelectItem>
                    <SelectItem value="popularity">Popularidad</SelectItem>
                    <SelectItem value="name">Nombre A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {activeFiltersCount > 0 && (
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-700/50">
                  <span className="text-sm text-gray-400">
                    {activeFiltersCount} filtro
                    {activeFiltersCount > 1 ? "s" : ""} activo
                    {activeFiltersCount > 1 ? "s" : ""}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetFilters}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700/50"
                  >
                    Limpiar filtros
                  </Button>
                </div>
              )}
            </motion.div>

            {/* Categorías rápidas */}
            <div className="flex flex-wrap gap-2 mt-4">
              {categories.slice(0, 6).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30"
                      : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700/50 hover:border-gray-600/50"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Eventos Destacados */}
        {featuredEvents.length > 0 && (
          <motion.section
            className="mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="flex justify-between items-center mb-8">
              <div>
                <motion.div
                  variants={slideIn}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-amber-400 px-3 py-1 rounded-full text-sm font-semibold mb-3 border border-amber-500/20"
                >
                  <TrendingUp className="h-4 w-4" />
                  Destacados
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  Eventos Destacados
                </h2>
                <p className="text-gray-400 mt-2">
                  Descubre nuestras recomendaciones especiales seleccionadas
                  para ti
                </p>
              </div>
            </div>

            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
              {featuredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex-shrink-0"
                >
                  <FeaturedEventsCard event={event} />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Todos los Eventos */}
        <section className="mb-16">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Todos los Eventos
              </h2>
              <p className="text-gray-400 mt-2">
                {filteredEvents.length} evento
                {filteredEvents.length !== 1 ? "s" : ""} encontrado
                {filteredEvents.length !== 1 ? "s" : ""}
                {activeFiltersCount > 0 && (
                  <span className="ml-2 text-cyan-400">
                    (con filtros aplicados)
                  </span>
                )}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Tabs
                value={viewMode}
                onValueChange={setViewMode}
                className="w-auto"
              >
                <TabsList className="bg-gray-800/50 border border-gray-700/50 rounded-xl">
                  <TabsTrigger
                    value="grid"
                    className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400 rounded-lg"
                  >
                    <Grid size={16} className="mr-2" />
                    Cuadrícula
                  </TabsTrigger>
                  <TabsTrigger
                    value="list"
                    className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400 rounded-lg"
                  >
                    <List size={16} className="mr-2" />
                    Lista
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {filteredEvents.length === 0 ? (
            <motion.div
              variants={fadeIn}
              className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-12 text-center border border-gray-700/50"
            >
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 rounded-full bg-gray-700/50 flex items-center justify-center">
                  <Calendar className="h-10 w-10 text-gray-500" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                No se encontraron eventos
              </h3>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                No hay eventos que coincidan con tus criterios de búsqueda.
                Prueba ajustando los filtros o explora otras categorías.
              </p>
              <Button
                onClick={resetFilters}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
              >
                Ver todos los eventos
              </Button>
            </motion.div>
          ) : (
            <>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className={
                  viewMode === "grid"
                    ? "grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "flex flex-col gap-4"
                }
              >
                {currentEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    variants={fadeIn}
                    transition={{ delay: index * 0.05 }}
                  >
                    {viewMode === "grid" ? (
                      <UpcomingEventsCard event={event} />
                    ) : (
                      <EventListItem event={event} />
                    )}
                  </motion.div>
                ))}
              </motion.div>

              {/* Paginación mejorada */}
              {totalPages > 1 && (
                <motion.div
                  variants={fadeIn}
                  className="flex justify-center mt-12"
                >
                  <div className="flex items-center gap-2 bg-gray-800/30 backdrop-blur-sm rounded-2xl p-2 border border-gray-700/50">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="text-gray-300 hover:text-white hover:bg-gray-700/50 disabled:opacity-50"
                    >
                      <ArrowLeft size={16} />
                    </Button>

                    {Array.from({ length: Math.min(5, totalPages) }).map(
                      (_, index) => {
                        const pageNumber =
                          currentPage <= 3
                            ? index + 1
                            : currentPage + index - 2;

                        if (pageNumber > totalPages) return null;

                        return (
                          <Button
                            key={pageNumber}
                            variant={
                              currentPage === pageNumber ? "default" : "ghost"
                            }
                            size="sm"
                            onClick={() => paginate(pageNumber)}
                            className={
                              currentPage === pageNumber
                                ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                                : "text-gray-300 hover:text-white hover:bg-gray-700/50"
                            }
                          >
                            {pageNumber}
                          </Button>
                        );
                      }
                    )}

                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <>
                        <span className="text-gray-500 px-2">...</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => paginate(totalPages)}
                          className="text-gray-300 hover:text-white hover:bg-gray-700/50"
                        >
                          {totalPages}
                        </Button>
                      </>
                    )}

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="text-gray-300 hover:text-white hover:bg-gray-700/50 disabled:opacity-50"
                    >
                      <ArrowRight size={16} />
                    </Button>
                  </div>
                </motion.div>
              )}
            </>
          )}
        </section>

        {/* Explorar por Categoría - Mejorado */}
        <motion.section
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="text-center mb-12">
            <motion.div
              variants={slideIn}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-400 px-3 py-1 rounded-full text-sm font-semibold mb-4 border border-purple-500/20"
            >
              <Filter className="h-4 w-4" />
              Explorar
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Explora por Categoría
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Encuentra eventos que se adapten perfectamente a tus intereses y
              pasiones
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Música",
                icon: "🎵",
                color: "from-red-500/20 to-pink-500/20",
                border: "border-red-500/30",
                count: mockEvents.filter((e) => e.categories.includes("Música"))
                  .length,
              },
              {
                name: "Arte",
                icon: "🎨",
                color: "from-purple-500/20 to-indigo-500/20",
                border: "border-purple-500/30",
                count: mockEvents.filter((e) => e.categories.includes("Arte"))
                  .length,
              },
              {
                name: "Tecnología",
                icon: "💻",
                color: "from-cyan-500/20 to-blue-500/20",
                border: "border-cyan-500/30",
                count: mockEvents.filter((e) =>
                  e.categories.includes("Tecnología")
                ).length,
              },
              {
                name: "Gastronomía",
                icon: "🍽️",
                color: "from-orange-500/20 to-red-500/20",
                border: "border-orange-500/30",
                count: mockEvents.filter((e) =>
                  e.categories.includes("Gastronomía")
                ).length,
              },
              {
                name: "Deporte",
                icon: "⚽",
                color: "from-emerald-500/20 to-teal-500/20",
                border: "border-emerald-500/30",
                count: mockEvents.filter((e) =>
                  e.categories.includes("Deporte")
                ).length,
              },
              {
                name: "Festival",
                icon: "🎭",
                color: "from-amber-500/20 to-yellow-500/20",
                border: "border-amber-500/30",
                count: mockEvents.filter((e) =>
                  e.categories.includes("Festival")
                ).length,
              },
              {
                name: "Conferencia",
                icon: "🎤",
                color: "from-blue-500/20 to-indigo-500/20",
                border: "border-blue-500/30",
                count: mockEvents.filter((e) =>
                  e.categories.includes("Conferencia")
                ).length,
              },
              {
                name: "Exposición",
                icon: "🖼️",
                color: "from-pink-500/20 to-rose-500/20",
                border: "border-pink-500/30",
                count: mockEvents.filter((e) =>
                  e.categories.includes("Exposición")
                ).length,
              },
            ].map((category, index) => (
              <motion.div
                key={category.name}
                variants={fadeIn}
                transition={{ delay: index * 0.1 }}
                className={`bg-gradient-to-br ${category.color} backdrop-blur-sm rounded-2xl p-6 border ${category.border} hover:border-opacity-60 transition-all duration-300 cursor-pointer group hover:transform hover:scale-105`}
                onClick={() => setSelectedCategory(category.name)}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-400 text-sm">
                  {category.count} evento{category.count !== 1 ? "s" : ""}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Newsletter Mejorado */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="bg-gradient-to-r from-gray-900/50 via-gray-800/30 to-gray-900/50 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-gray-700/50 relative overflow-hidden"
        >
          {/* Elementos decorativos */}
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-cyan-500/10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-purple-500/10 blur-3xl"></div>

          <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
            <div>
              <motion.div
                variants={slideIn}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-400 px-3 py-1 rounded-full text-sm font-semibold mb-4 border border-cyan-500/20"
              >
                <Star className="h-4 w-4" />
                Suscríbete
              </motion.div>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                No te pierdas ningún evento
              </h2>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Suscríbete a nuestra newsletter y recibe recomendaciones
                personalizadas, ofertas exclusivas y acceso anticipado a los
                mejores eventos.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  placeholder="tu@email.com"
                  className="flex-1 h-12 bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 rounded-xl focus:border-cyan-500/50"
                />
                <Button className="h-12 px-8 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-cyan-500/25">
                  Suscribirme
                </Button>
              </div>

              <p className="text-gray-500 text-sm mt-4">
                ✨ Acceso gratuito • 📧 Sin spam • 🎫 Ofertas exclusivas
              </p>
            </div>

            <div className="hidden md:block relative">
              <div className="relative h-[300px] flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>
                <Calendar className="w-24 h-24 text-cyan-400/80 relative z-10" />
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

// Componente mejorado para vista de lista
function EventListItem({ event }: { event: Event }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={fadeIn}
      className="bg-gray-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 flex flex-col md:flex-row group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -2 }}
    >
      <div className="relative w-full md:w-64 h-48 md:h-auto flex-shrink-0">
        <Image
          src={event.image}
          alt={event.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

        {/* Price badge */}
        <div className="absolute top-4 left-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              event.price === 0
                ? "bg-green-500/90 text-white"
                : "bg-black/60 backdrop-blur-sm text-white border border-white/20"
            }`}
          >
            {event.price === 0 ? "Gratis" : `€${event.price}`}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex flex-wrap gap-2 mb-3">
          {Array.isArray(event.categories) ? (
            event.categories.slice(0, 2).map((category) => (
              <Chip key={category} variant="outlined" color="blue" size="sm">
                {category}
              </Chip>
            ))
          ) : (
            <Chip variant="outlined" color="blue" size="sm">
              {event.categories}
            </Chip>
          )}
        </div>

        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
          {event.name}
        </h3>

        <div className="grid grid-cols-2 gap-4 text-sm text-gray-400 mb-4">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-cyan-400" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-emerald-400" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-purple-400" />
            <span>{event.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={16} className="text-orange-400" />
            <span>{event.attendees}+ asistentes</span>
          </div>
        </div>

        <p className="text-gray-300 text-sm mb-6 line-clamp-2 leading-relaxed">
          {event.description}
        </p>

        <div className="mt-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span
              className={`text-lg font-bold ${
                event.price === 0 ? "text-green-400" : "text-cyan-400"
              }`}
            >
              {event.price === 0 ? "Gratis" : `€${event.price}`}
            </span>
            <span className="text-sm text-gray-400">• {event.duration}</span>
          </div>

          <Button
            variant="link"
            className="text-cyan-400 hover:text-cyan-300 p-0 h-auto flex items-center gap-2 group/btn"
            asChild
          >
            <a href={`/events/${event.id}`}>
              Ver detalles
              <ArrowRight
                size={16}
                className="transition-transform group-hover/btn:translate-x-1"
              />
            </a>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
