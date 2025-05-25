import { memo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  MapPin,
  Search,
  Filter,
  Plus,
  Users,
  Clock,
  Star,
  Eye,
  Share2,
  Edit,
  Trash2,
  MoreHorizontal,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MyEventsTabProps {
  upcomingEvents: any[];
}

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

const MyEventsTab = memo(({ upcomingEvents }: MyEventsTabProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  // Mock data ampliado para eventos del usuario
  const myEvents = [
    {
      id: 1,
      name: "Workshop de React Avanzado",
      description:
        "Aprende técnicas avanzadas de React con expertos de la industria.",
      date: "2024-06-28",
      time: "14:00",
      location: "Centro Tecnológico, La Habana",
      image: "/images/events/react-workshop.jpg",
      categories: ["Tecnología", "Workshop"],
      status: "upcoming",
      price: 95,
      attendees: 25,
      maxAttendees: 30,
      isOrganizer: true,
      revenue: 2375,
      rating: 4.8,
      reviews: 12,
    },
    {
      id: 2,
      name: "Concierto Acústico",
      description: "Una noche íntima con los mejores artistas locales.",
      date: "2024-07-15",
      time: "20:00",
      location: "Café Cultural, Vedado",
      image: "/images/events/acoustic-concert.jpg",
      categories: ["Música", "Concierto"],
      status: "upcoming",
      price: 45,
      attendees: 45,
      maxAttendees: 50,
      isOrganizer: false,
      ticketPurchased: true,
    },
    {
      id: 3,
      name: "Exposición de Arte Digital",
      description: "Muestra de arte digital interactivo y realidad aumentada.",
      date: "2024-05-20",
      time: "18:00",
      location: "Galería Moderna, Miramar",
      image: "/images/events/digital-art.jpg",
      categories: ["Arte", "Tecnología"],
      status: "completed",
      price: 30,
      attendees: 80,
      maxAttendees: 80,
      isOrganizer: true,
      revenue: 2400,
      rating: 4.9,
      reviews: 28,
    },
  ];

  const eventStats = {
    total: myEvents.length,
    upcoming: myEvents.filter((e) => e.status === "upcoming").length,
    completed: myEvents.filter((e) => e.status === "completed").length,
    organized: myEvents.filter((e) => e.isOrganizer).length,
    totalRevenue: myEvents
      .filter((e) => e.isOrganizer)
      .reduce((sum, e) => sum + (e.revenue || 0), 0),
  };

  const filteredEvents = myEvents.filter((event) => {
    const matchesSearch = event.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || event.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "cancelled":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerChildren}
      className="space-y-8"
    >
      {/* Header con estadísticas */}
      <motion.div variants={fadeIn}>
        <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/50 to-gray-900/80 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                <div className="p-2 bg-cyan-500/20 rounded-lg">
                  <Calendar className="h-6 w-6 text-cyan-400" />
                </div>
                Mis Eventos
              </h3>
              <p className="text-gray-300">
                Gestiona y monitorea todos tus eventos
              </p>
            </div>

            <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-xl">
              <Plus className="h-4 w-4 mr-2" />
              Crear Evento
            </Button>
          </div>

          {/* Estadísticas rápidas */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              {
                label: "Total",
                value: eventStats.total,
                icon: Calendar,
                color: "text-gray-400",
              },
              {
                label: "Próximos",
                value: eventStats.upcoming,
                icon: Clock,
                color: "text-blue-400",
              },
              {
                label: "Completados",
                value: eventStats.completed,
                icon: CheckCircle,
                color: "text-green-400",
              },
              {
                label: "Organizados",
                value: eventStats.organized,
                icon: Users,
                color: "text-purple-400",
              },
              {
                label: "Ingresos",
                value: `$${eventStats.totalRevenue}`,
                icon: TrendingUp,
                color: "text-emerald-400",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/50"
              >
                <div className="flex items-center gap-2 mb-2">
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  <span className="text-gray-400 text-xs font-medium">
                    {stat.label}
                  </span>
                </div>
                <div className={`text-lg font-bold ${stat.color}`}>
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Controles de búsqueda y filtros */}
      <motion.div variants={fadeIn}>
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Buscar eventos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 bg-gray-900/50 border-gray-600/50 text-white rounded-xl"
              />
            </div>

            <div className="flex gap-2">
              {["all", "upcoming", "completed"].map((filter) => (
                <Button
                  key={filter}
                  variant={filterStatus === filter ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus(filter)}
                  className={
                    filterStatus === filter
                      ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
                      : "border-gray-600 text-gray-400 hover:border-cyan-500/30"
                  }
                >
                  <Filter className="h-4 w-4 mr-1" />
                  {filter === "all"
                    ? "Todos"
                    : filter === "upcoming"
                    ? "Próximos"
                    : "Completados"}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Lista de eventos */}
      <motion.div variants={fadeIn}>
        <div className="space-y-6">
          {filteredEvents.length === 0 ? (
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-12 border border-gray-700/50 text-center">
              <Calendar className="h-16 w-16 text-gray-600 mx-auto mb-6" />
              <h4 className="text-xl font-semibold text-white mb-2">
                No se encontraron eventos
              </h4>
              <p className="text-gray-400">
                {searchTerm
                  ? "Intenta con otros términos de búsqueda"
                  : "Aún no tienes eventos registrados"}
              </p>
            </div>
          ) : (
            filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                variants={fadeIn}
                className="bg-gradient-to-br from-gray-900/80 via-gray-800/50 to-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Imagen del evento */}
                  <div className="relative md:w-64 h-48 md:h-auto">
                    <Image
                      src={event.image}
                      alt={event.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                    {/* Badges en la imagen */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className={getStatusColor(event.status)}>
                        {event.status === "upcoming"
                          ? "Próximo"
                          : event.status === "completed"
                          ? "Completado"
                          : "Cancelado"}
                      </Badge>
                      {event.isOrganizer && (
                        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                          Organizador
                        </Badge>
                      )}
                    </div>

                    {/* Precio */}
                    <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-lg font-semibold">
                      ${event.price}
                    </div>
                  </div>

                  {/* Contenido del evento */}
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-xl font-bold text-white mb-2">
                          {event.name}
                        </h4>
                        <p className="text-gray-300 text-sm line-clamp-2">
                          {event.description}
                        </p>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-600 text-gray-400"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-gray-800 border-gray-700">
                          <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                            <Eye className="h-4 w-4 mr-2" />
                            Ver detalles
                          </DropdownMenuItem>
                          {event.isOrganizer && (
                            <>
                              <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                                <Edit className="h-4 w-4 mr-2" />
                                Editar evento
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-400 hover:bg-red-500/10">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Eliminar evento
                              </DropdownMenuItem>
                            </>
                          )}
                          <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                            <Share2 className="h-4 w-4 mr-2" />
                            Compartir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {/* Categorías */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {event.categories.map((category, catIndex) => (
                        <Badge
                          key={catIndex}
                          variant="outline"
                          className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30 text-xs"
                        >
                          {category}
                        </Badge>
                      ))}
                    </div>

                    {/* Información del evento */}
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(event.date).toLocaleDateString("es-ES")} •{" "}
                          {event.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <Users className="h-4 w-4" />
                        <span>
                          {event.attendees}/{event.maxAttendees} asistentes
                        </span>
                      </div>
                      {event.isOrganizer && event.rating && (
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <Star className="h-4 w-4 text-amber-400 fill-current" />
                          <span>
                            {event.rating} ({event.reviews} reseñas)
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Estadísticas del organizador */}
                    {event.isOrganizer && (
                      <div className="bg-gray-800/50 rounded-xl p-4 mt-4">
                        <h5 className="text-white font-semibold mb-3">
                          Estadísticas del evento
                        </h5>
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-emerald-400 font-bold text-lg">
                              ${event.revenue}
                            </div>
                            <div className="text-gray-400 text-xs">
                              Ingresos
                            </div>
                          </div>
                          <div>
                            <div className="text-cyan-400 font-bold text-lg">
                              {Math.round(
                                (event.attendees / event.maxAttendees) * 100
                              )}
                              %
                            </div>
                            <div className="text-gray-400 text-xs">
                              Ocupación
                            </div>
                          </div>
                          <div>
                            <div className="text-amber-400 font-bold text-lg">
                              {event.rating}
                            </div>
                            <div className="text-gray-400 text-xs">
                              Valoración
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Acciones */}
                    <div className="flex gap-3 mt-4">
                      <Link href={`/events/${event.id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Ver evento
                        </Button>
                      </Link>

                      {event.isOrganizer && event.status === "upcoming" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-600 text-gray-300 hover:bg-gray-700/50"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Gestionar
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </motion.div>
  );
});

MyEventsTab.displayName = "MyEventsTab";

export default MyEventsTab;
