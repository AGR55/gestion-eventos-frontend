"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image"; // Añade esta importación
import { Search, MapPin, Calendar, ArrowRight, ArrowLeft } from "lucide-react";
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

// Mock data - replace with your actual API call
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
  },
];

// Categories for filtering
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

// Locations for filtering
const locations = [
  "Todas",
  "Madrid",
  "Barcelona",
  "Valencia",
  "Málaga",
  "Sevilla",
];

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedLocation, setSelectedLocation] = useState("Todas");
  const [dateFilter, setDateFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(mockEvents);
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([]);
  const [viewMode, setViewMode] = useState("grid");

  const eventsPerPage = 6;

  // Filter events based on selected filters
  useEffect(() => {
    let result = mockEvents;

    // Filter by search query
    if (searchQuery) {
      result = result.filter(
        (event) =>
          event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "Todos") {
      result = result.filter((event) => {
        const categories = Array.isArray(event.categories)
          ? event.categories
          : [event.categories];
        return categories.includes(selectedCategory);
      });
    }

    // Filter by location
    if (selectedLocation !== "Todas") {
      result = result.filter((event) =>
        event.location.includes(selectedLocation)
      );
    }

    // Filter by date
    // Add date filtering logic if needed

    setFilteredEvents(result);

    // Get featured events
    setFeaturedEvents(
      mockEvents.filter((event) => event.state === "Destacado")
    );
  }, [searchQuery, selectedCategory, selectedLocation, dateFilter]);

  // Calculate pagination
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Reset filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("Todos");
    setSelectedLocation("Todas");
    setDateFilter("all");
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Hero Section */}
      <motion.section
        className="mb-16 text-center"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text mb-6 mt-16">
          Descubre Eventos Increíbles
        </h1>
        <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-10">
          Encuentra los mejores eventos culturales, conciertos, conferencias y
          más. Vive experiencias únicas y crea recuerdos inolvidables.
        </p>
      </motion.section>

      {/* Search & Filters Section */}
      <motion.section
        className="mb-12"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="bg-[#13212e] rounded-2xl p-6 border border-gray-800">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-3 text-gray-400"
                size={18}
              />
              <Input
                placeholder="Buscar eventos, artistas, lugares..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[#0F1A24] border-gray-700 text-white"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-full sm:w-[180px] bg-[#0F1A24] border-gray-700 text-white">
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent className="bg-[#0F1A24] border-gray-700 text-white">
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
                <SelectTrigger className="w-full sm:w-[180px] bg-[#0F1A24] border-gray-700 text-white">
                  <SelectValue placeholder="Ubicación" />
                </SelectTrigger>
                <SelectContent className="bg-[#0F1A24] border-gray-700 text-white">
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={resetFilters}
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                Resetear
              </Button>
            </div>
          </div>

          {/* Popular Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.slice(0, 8).map((category) => (
              <div
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 rounded-full text-sm cursor-pointer transition-colors 
                  ${
                    selectedCategory === category
                      ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
                  }`}
              >
                {category}
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured Events Section */}
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
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Eventos Destacados
              </h2>
              <p className="text-gray-400 mt-1">
                Descubre nuestras recomendaciones especiales
              </p>
            </div>
            <Button
              variant="link"
              className="text-cyan-400 hover:text-cyan-300 hidden md:flex items-center gap-1"
            >
              Ver todos <ArrowRight size={16} />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {featuredEvents.map((event) => (
              <FeaturedEventsCard key={event.id} event={event} />
            ))}
          </div>

          <div className="mt-6 flex justify-center md:hidden">
            <Button
              variant="link"
              className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
            >
              Ver todos los destacados <ArrowRight size={16} />
            </Button>
          </div>
        </motion.section>
      )}

      {/* All Events Section */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Todos los Eventos
            </h2>
            <p className="text-gray-400 mt-1">
              {filteredEvents.length} eventos encontrados
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Tabs
              defaultValue="grid"
              className="w-[180px]"
              onValueChange={(value) => setViewMode(value)}
            >
              <TabsList className="bg-[#0F1A24] border border-gray-800">
                <TabsTrigger
                  value="grid"
                  className="data-[state=active]:bg-gray-800"
                >
                  Cuadrícula
                </TabsTrigger>
                <TabsTrigger
                  value="list"
                  className="data-[state=active]:bg-gray-800"
                >
                  Lista
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="bg-[#13212e] rounded-2xl p-12 text-center border border-gray-800">
            <div className="mb-4 flex justify-center">
              <Calendar className="h-16 w-16 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No se encontraron eventos
            </h3>
            <p className="text-gray-400 mb-6">
              No hay eventos que coincidan con tus criterios de búsqueda.
            </p>
            <Button onClick={resetFilters}>Ver todos los eventos</Button>
          </div>
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
              {currentEvents.map((event) => (
                <div key={event.id}>
                  {viewMode === "grid" ? (
                    <UpcomingEventsCard event={event} />
                  ) : (
                    <EventListItem event={event} />
                  )}
                </div>
              ))}
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="border-gray-700 text-gray-300 hover:bg-gray-800"
                  >
                    <ArrowLeft size={16} />
                  </Button>

                  {Array.from({ length: totalPages }).map((_, index) => (
                    <Button
                      key={index}
                      variant={
                        currentPage === index + 1 ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => paginate(index + 1)}
                      className={
                        currentPage === index + 1
                          ? "bg-cyan-600 hover:bg-cyan-700"
                          : "border-gray-700 text-gray-300 hover:bg-gray-800"
                      }
                    >
                      {index + 1}
                    </Button>
                  ))}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="border-gray-700 text-gray-300 hover:bg-gray-800"
                  >
                    <ArrowRight size={16} />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </section>

      {/* Explore by Category Section */}
      <motion.section
        className="mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Explorar por Categoría
            </h2>
            <p className="text-gray-400 mt-1">
              Encuentra eventos según tus intereses
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            {
              name: "Música",
              icon: "🎵",
              color: "from-purple-500 to-blue-600",
              count: 24,
            },
            {
              name: "Arte",
              icon: "🎨",
              color: "from-yellow-500 to-orange-600",
              count: 18,
            },
            {
              name: "Tecnología",
              icon: "💻",
              color: "from-cyan-500 to-blue-600",
              count: 15,
            },
            {
              name: "Gastronomía",
              icon: "🍽️",
              color: "from-red-500 to-pink-600",
              count: 12,
            },
            {
              name: "Deporte",
              icon: "⚽",
              color: "from-green-500 to-emerald-600",
              count: 20,
            },
            {
              name: "Conferencias",
              icon: "🎤",
              color: "from-blue-500 to-indigo-600",
              count: 8,
            },
            {
              name: "Exposiciones",
              icon: "🖼️",
              color: "from-amber-500 to-orange-600",
              count: 14,
            },
            {
              name: "Festivales",
              icon: "🎭",
              color: "from-pink-500 to-rose-600",
              count: 9,
            },
          ].map((category) => (
            <motion.div
              key={category.name}
              variants={fadeIn}
              className="bg-[#13212e] rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-colors cursor-pointer group"
              onClick={() => setSelectedCategory(category.name)}
            >
              <div className={`text-3xl mb-3`}>{category.icon}</div>
              <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
                {category.name}
              </h3>
              <p className="text-gray-400 text-sm">{category.count} eventos</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Newsletter */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="bg-gradient-to-r from-[#0F1A24] to-[#1A2836] rounded-2xl p-8 md:p-12 border border-gray-800"
      >
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              No te pierdas ningún evento
            </h2>
            <p className="text-gray-300 mb-6">
              Suscríbete a nuestra newsletter y recibe recomendaciones
              personalizadas de eventos según tus intereses.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                placeholder="Tu correo electrónico"
                className="bg-[#0D1621] border-gray-700 text-white"
              />
              <Button className="bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-600 hover:to-cyan-500 text-black font-medium transition-all duration-200">
                Suscribirme
              </Button>
            </div>

            <p className="text-gray-500 text-sm mt-3">
              Al suscribirte, aceptas nuestra política de privacidad.
            </p>
          </div>

          <div className="hidden md:block relative h-[250px]">
            <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
              <div className="w-28 h-28 rounded-full bg-cyan-500/20 backdrop-blur-xl"></div>
            </div>
            <div className="absolute bottom-0 left-0 transform -translate-x-1/4 translate-y-1/4">
              <div className="w-20 h-20 rounded-full bg-blue-500/20 backdrop-blur-xl"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Calendar className="w-20 h-20 text-cyan-400/80" />
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

// Additional component for list view
function EventListItem({ event }: { event: Event }) {
  return (
    <motion.div
      variants={fadeIn}
      className="bg-[#13212e] rounded-xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all flex flex-col md:flex-row"
    >
      <div className="relative w-full md:w-48 h-40 md:h-auto flex-shrink-0">
        <Image
          src={event.image}
          alt={event.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex flex-wrap gap-2 mb-2">
          {Array.isArray(event.categories) ? (
            event.categories.map((category) => (
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

        <h3 className="text-xl font-bold text-white mb-2">{event.name}</h3>

        <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
          <div className="flex items-center gap-1">
            <Calendar size={14} className="text-cyan-400" />
            {event.date}
          </div>
          <div className="flex items-center gap-1">
            <MapPin size={14} className="text-cyan-400" />
            {event.location}
          </div>
        </div>

        <p className="text-gray-300 text-sm mb-4 line-clamp-2">
          {event.description}
        </p>

        <div className="mt-auto">
          <Button
            variant="link"
            className="text-cyan-400 hover:text-cyan-300 p-0 h-auto flex items-center gap-1"
            asChild
          >
            <a href={`/events/${event.id}`}>
              Ver detalles <ArrowRight size={14} />
            </a>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
