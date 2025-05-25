import { memo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Ticket,
  Search,
  Filter,
  Download,
  QrCode,
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  MoreHorizontal,
  Share2,
  RefreshCw,
  Phone,
} from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TicketsTabProps {
  ticketFilter: string;
  setTicketFilter: (filter: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
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

const TicketsTab = memo(
  ({
    ticketFilter,
    setTicketFilter,
    searchTerm,
    setSearchTerm,
  }: TicketsTabProps) => {
    const [selectedTicket, setSelectedTicket] = useState<number | null>(null);

    // Mock data para tickets del usuario
    const myTickets = [
      {
        id: 1,
        eventId: 1,
        eventName: "Festival Internacional de Música",
        eventDate: "2024-06-24",
        eventTime: "20:00",
        eventLocation: "Parque Central, La Habana",
        eventImage: "/images/events/music-festival.jpg",
        ticketType: "VIP",
        ticketNumber: "VIP-001-2024",
        qrCode: "QR123456789",
        purchaseDate: "2024-05-15",
        price: 150,
        status: "active",
        transferable: true,
        refundable: true,
        gate: "Entrada Principal",
        seat: "Zona VIP - A12",
      },
      {
        id: 2,
        eventId: 2,
        eventName: "Conferencia de Tecnología",
        eventDate: "2024-07-15",
        eventTime: "09:00",
        eventLocation: "Centro de Convenciones, Varadero",
        eventImage: "/images/events/tech-conference.jpeg",
        ticketType: "General",
        ticketNumber: "GEN-002-2024",
        qrCode: "QR987654321",
        purchaseDate: "2024-06-01",
        price: 80,
        status: "active",
        transferable: true,
        refundable: true,
        gate: "Entrada B",
        seat: "Asiento libre",
      },
      {
        id: 3,
        eventId: 3,
        eventName: "Exposición de Arte Digital",
        eventDate: "2024-05-20",
        eventTime: "18:00",
        eventLocation: "Galería Moderna, Miramar",
        eventImage: "/images/events/digital-art.jpg",
        ticketType: "General",
        ticketNumber: "ART-003-2024",
        qrCode: "QR567891234",
        purchaseDate: "2024-05-10",
        price: 30,
        status: "used",
        transferable: false,
        refundable: false,
        gate: "Entrada Principal",
        seat: "Acceso general",
      },
      {
        id: 4,
        eventId: 4,
        eventName: "Maratón Solidario",
        eventDate: "2024-08-10",
        eventTime: "07:00",
        eventLocation: "Malecón Habanero",
        eventImage: "/images/events/marathon.jpg",
        ticketType: "Participante",
        ticketNumber: "MAR-004-2024",
        qrCode: "QR445566778",
        purchaseDate: "2024-06-15",
        price: 25,
        status: "cancelled",
        transferable: false,
        refundable: true,
        gate: "Punto de Salida",
        seat: "N/A",
      },
    ];

    const ticketStats = {
      total: myTickets.length,
      active: myTickets.filter((t) => t.status === "active").length,
      used: myTickets.filter((t) => t.status === "used").length,
      cancelled: myTickets.filter((t) => t.status === "cancelled").length,
      totalSpent: myTickets.reduce((sum, t) => sum + t.price, 0),
    };

    const filteredTickets = myTickets.filter((ticket) => {
      const matchesSearch = ticket.eventName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesFilter =
        ticketFilter === "all" || ticket.status === ticketFilter;
      return matchesSearch && matchesFilter;
    });

    const getStatusColor = (status: string) => {
      switch (status) {
        case "active":
          return "bg-green-500/20 text-green-400 border-green-500/30";
        case "used":
          return "bg-gray-500/20 text-gray-400 border-gray-500/30";
        case "cancelled":
          return "bg-red-500/20 text-red-400 border-red-500/30";
        case "expired":
          return "bg-amber-500/20 text-amber-400 border-amber-500/30";
        default:
          return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      }
    };

    const getStatusText = (status: string) => {
      switch (status) {
        case "active":
          return "Activo";
        case "used":
          return "Usado";
        case "cancelled":
          return "Cancelado";
        case "expired":
          return "Expirado";
        default:
          return "Desconocido";
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
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Ticket className="h-6 w-6 text-purple-400" />
                  </div>
                  Mis Entradas
                </h3>
                <p className="text-gray-300">
                  Gestiona todas tus entradas y códigos QR
                </p>
              </div>

              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl">
                <Download className="h-4 w-4 mr-2" />
                Descargar todas
              </Button>
            </div>

            {/* Estadísticas rápidas */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                {
                  label: "Total",
                  value: ticketStats.total,
                  icon: Ticket,
                  color: "text-gray-400",
                },
                {
                  label: "Activas",
                  value: ticketStats.active,
                  icon: CheckCircle,
                  color: "text-green-400",
                },
                {
                  label: "Usadas",
                  value: ticketStats.used,
                  icon: Clock,
                  color: "text-gray-400",
                },
                {
                  label: "Canceladas",
                  value: ticketStats.cancelled,
                  icon: AlertTriangle,
                  color: "text-red-400",
                },
                {
                  label: "Gastado",
                  value: `$${ticketStats.totalSpent}`,
                  icon: Calendar,
                  color: "text-cyan-400",
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
                  placeholder="Buscar entradas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 bg-gray-900/50 border-gray-600/50 text-white rounded-xl"
                />
              </div>

              <div className="flex gap-2">
                {["all", "active", "used", "cancelled"].map((filter) => (
                  <Button
                    key={filter}
                    variant={ticketFilter === filter ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTicketFilter(filter)}
                    className={
                      ticketFilter === filter
                        ? "bg-purple-500/20 text-purple-400 border-purple-500/30"
                        : "border-gray-600 text-gray-400 hover:border-purple-500/30"
                    }
                  >
                    <Filter className="h-4 w-4 mr-1" />
                    {filter === "all"
                      ? "Todas"
                      : filter === "active"
                      ? "Activas"
                      : filter === "used"
                      ? "Usadas"
                      : "Canceladas"}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Lista de tickets */}
        <motion.div variants={fadeIn}>
          <div className="space-y-4">
            {filteredTickets.length === 0 ? (
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-12 border border-gray-700/50 text-center">
                <Ticket className="h-16 w-16 text-gray-600 mx-auto mb-6" />
                <h4 className="text-xl font-semibold text-white mb-2">
                  No se encontraron entradas
                </h4>
                <p className="text-gray-400">
                  {searchTerm
                    ? "Intenta con otros términos de búsqueda"
                    : "Aún no tienes entradas"}
                </p>
              </div>
            ) : (
              filteredTickets.map((ticket, index) => (
                <motion.div
                  key={ticket.id}
                  variants={fadeIn}
                  className="bg-gradient-to-br from-gray-900/80 via-gray-800/50 to-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden hover:border-purple-500/30 transition-all duration-300"
                >
                  <div className="flex flex-col lg:flex-row">
                    {/* Imagen del evento */}
                    <div className="relative lg:w-64 h-48 lg:h-auto">
                      <Image
                        src={ticket.eventImage}
                        alt={ticket.eventName}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                      {/* Status badge */}
                      <div className="absolute top-4 left-4">
                        <Badge className={getStatusColor(ticket.status)}>
                          {getStatusText(ticket.status)}
                        </Badge>
                      </div>

                      {/* Ticket type */}
                      <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-lg font-semibold text-sm">
                        {ticket.ticketType}
                      </div>

                      {/* QR Code indicator */}
                      {ticket.status === "active" && (
                        <div className="absolute bottom-4 left-4 bg-green-500/90 text-white p-2 rounded-lg">
                          <QrCode className="h-5 w-5" />
                        </div>
                      )}
                    </div>

                    {/* Contenido del ticket */}
                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-xl font-bold text-white mb-1">
                            {ticket.eventName}
                          </h4>
                          <p className="text-gray-400 text-sm">
                            #{ticket.ticketNumber}
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
                            {ticket.status === "active" && (
                              <>
                                <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                                  <Download className="h-4 w-4 mr-2" />
                                  Descargar PDF
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                                  <QrCode className="h-4 w-4 mr-2" />
                                  Mostrar QR
                                </DropdownMenuItem>
                                {ticket.transferable && (
                                  <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                                    <Share2 className="h-4 w-4 mr-2" />
                                    Transferir
                                  </DropdownMenuItem>
                                )}
                                {ticket.refundable && (
                                  <DropdownMenuItem className="text-red-400 hover:bg-red-500/10">
                                    <RefreshCw className="h-4 w-4 mr-2" />
                                    Solicitar reembolso
                                  </DropdownMenuItem>
                                )}
                              </>
                            )}
                            <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                              <Phone className="h-4 w-4 mr-2" />
                              Contactar soporte
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      {/* Información del evento */}
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Date(ticket.eventDate).toLocaleDateString(
                              "es-ES"
                            )}{" "}
                            • {ticket.eventTime}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <MapPin className="h-4 w-4" />
                          <span>{ticket.eventLocation}</span>
                        </div>
                      </div>

                      {/* Detalles del ticket */}
                      <div className="bg-gray-800/50 rounded-xl p-4 mb-4">
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-400">Puerta:</span>
                            <span className="text-white ml-2">
                              {ticket.gate}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-400">Asiento:</span>
                            <span className="text-white ml-2">
                              {ticket.seat}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-400">Comprado:</span>
                            <span className="text-white ml-2">
                              {new Date(ticket.purchaseDate).toLocaleDateString(
                                "es-ES"
                              )}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-400">Precio:</span>
                            <span className="text-emerald-400 ml-2 font-semibold">
                              ${ticket.price}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Acciones según el estado */}
                      <div className="flex gap-3">
                        {ticket.status === "active" && (
                          <>
                            <Button
                              size="sm"
                              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                            >
                              <QrCode className="h-4 w-4 mr-2" />
                              Mostrar QR
                            </Button>

                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-600 text-gray-300 hover:bg-gray-700/50"
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Descargar
                            </Button>
                          </>
                        )}

                        {ticket.status === "used" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-green-500/30 text-green-400 hover:bg-green-500/10"
                            disabled
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Entrada usada
                          </Button>
                        )}

                        {ticket.status === "cancelled" && ticket.refundable && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10"
                          >
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Ver reembolso
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
  }
);

TicketsTab.displayName = "TicketsTab";

export default TicketsTab;
