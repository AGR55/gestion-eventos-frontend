"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Share2,
  Heart,
  Tag,
  ArrowLeft,
  ChevronRight,
  Ticket,
  CreditCard,
  ChevronDown,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FeaturedEventsCard } from "@/components/ui/events/featured_events/featured_events_card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import Link from "next/link";

// Simulación de datos de evento basados en el ID
const getMockEvent = (id: string) => {
  const events = [
    {
      id: 1,
      name: "Festival Internacional de Música",
      description:
        "El evento musical más grande del año con artistas internacionales y bandas emergentes en múltiples escenarios.",
      longDescription: `
        <p>Únete a nosotros para la experiencia musical definitiva del año. El Festival Internacional de Música reúne a más de 50 artistas de 20 países diferentes en un fin de semana inolvidable.</p>
        
        <p>Contaremos con 5 escenarios diferentes, cada uno dedicado a un género musical distinto:</p>
        <ul>
          <li>Escenario Principal: Grandes estrellas internacionales</li>
          <li>Escenario Alternativo: Rock independiente y música alternativa</li>
          <li>Zona Electrónica: DJs y música electrónica</li>
          <li>Espacio Acústico: Sesiones íntimas y acústicas</li>
          <li>Escenario Emergente: Nuevos talentos locales e internacionales</li>
        </ul>
        
        <p>Además de la música, disfrutarás de una amplia oferta gastronómica con food trucks de cocina internacional, zonas de descanso, mercadillo de artesanía y actividades paralelas como talleres de percusión, yoga y arte.</p>
      `,
      date: "24-26 Jun 2023",
      time: "18:00 - 03:00",
      location: "Parque Central, Madrid",
      fullAddress: "Av. de Concha Espina, s/n, 28036 Madrid",
      image: "/images/events/music-festival.jpg",
      gallery: [
        "/images/events/music-festival-1.jpg",
        "/images/events/music-festival-2.jpg",
        "/images/events/music-festival-3.jpg",
      ],
      categories: ["Música", "Festival"],
      state: "Destacado",
      organizer: "EventPro Productions",
      attendees: 850,
      capacity: 2000,
      ticketTypes: [
        { name: "Entrada General", price: 45, available: true },
        { name: "Entrada VIP", price: 120, available: true },
        { name: "Abono 3 días", price: 110, available: true },
        { name: "Abono 3 días VIP", price: 280, available: false },
      ],
      faqs: [
        {
          question: "¿Hay zona de camping?",
          answer:
            "Sí, disponemos de zona de camping con duchas, baños y seguridad 24h. El pase de camping se compra por separado.",
        },
        {
          question: "¿Se pueden llevar alimentos y bebidas?",
          answer:
            "No se permite la entrada de alimentos ni bebidas al recinto. Dentro encontrarás una amplia oferta gastronómica.",
        },
        {
          question: "¿Hay límite de edad para asistir?",
          answer:
            "Los menores de 16 años deben ir acompañados de un adulto. Los menores de 10 años tienen entrada gratuita.",
        },
      ],
    },
    {
      id: 2,
      name: "Conferencia de Tecnología e Innovación",
      description:
        "Ponentes de las empresas tecnológicas más importantes compartirán las últimas tendencias.",
      longDescription: `
        <p>La Conferencia de Tecnología e Innovación es el punto de encuentro para profesionales, entusiastas y emprendedores del sector tecnológico. Durante tres días intensos, los asistentes podrán acceder a conferencias, talleres y networking con los líderes de la industria.</p>
        
        <p>El programa incluye:</p>
        <ul>
          <li>Keynotes de CEOs de empresas tecnológicas líderes</li>
          <li>Paneles de discusión sobre inteligencia artificial, blockchain y realidad virtual</li>
          <li>Talleres prácticos de programación y diseño</li>
          <li>Zona de exposición con las últimas novedades tecnológicas</li>
          <li>Sesiones de networking y reclutamiento</li>
        </ul>
        
        <p>Este año contamos con ponentes de Google, Microsoft, Amazon, Meta y numerosas startups innovadoras que compartirán su visión sobre el futuro de la tecnología y las oportunidades emergentes en el sector.</p>
      `,
      date: "15-17 Jul 2023",
      time: "09:00 - 19:00",
      location: "Centro de Convenciones, Barcelona",
      fullAddress: "Plaça de Willy Brandt, 11-14, 08019 Barcelona",
      image: "/images/events/tech-conference.jpeg",
      gallery: [
        "/images/events/tech-conference-1.jpg",
        "/images/events/tech-conference-2.jpg",
        "/images/events/tech-conference-3.jpg",
      ],
      categories: ["Tecnología", "Conferencia"],
      state: "Próximamente",
      organizer: "TechConf Global",
      attendees: 450,
      capacity: 1000,
      ticketTypes: [
        { name: "Pase Estándar", price: 75, available: true },
        { name: "Pase Premium", price: 150, available: true },
        { name: "Pase Estudiante", price: 35, available: true },
      ],
      faqs: [
        {
          question: "¿Las conferencias estarán en inglés o español?",
          answer:
            "Habrá traducción simultánea para todas las conferencias principales. Los talleres se impartirán en el idioma indicado en el programa.",
        },
        {
          question: "¿Se entregará certificado de asistencia?",
          answer:
            "Sí, todos los asistentes recibirán un certificado digital de participación.",
        },
        {
          question: "¿Habrá oportunidades de trabajo?",
          answer:
            "Contaremos con una zona de reclutamiento donde importantes empresas buscarán talento.",
        },
      ],
    },
    // Puedes añadir más eventos según sea necesario
  ];

  return events.find((event) => event.id === id) || events[0]; // Fallback al primer evento si no se encuentra
};

// Eventos relacionados mock
const relatedEvents = [
  {
    id: 3,
    name: "Exhibición de Arte Digital",
    description:
      "Una muestra de las obras más innovadoras creadas con tecnología digital y realidad aumentada.",
    date: "10 Ago 2023",
    location: "Galería Moderna, Madrid",
    image: "/images/events/art-exhibition.jpeg",
    categories: ["Arte", "Tecnología"],
    state: "Próximamente",
  },
  {
    id: 4,
    name: "Concierto de Jazz en el Parque",
    description:
      "Una velada con los mejores músicos de jazz de la escena nacional en un entorno natural único.",
    date: "22 Jul 2023",
    location: "Parque del Retiro, Madrid",
    image: "/images/events/symphony.jpg",
    categories: ["Música", "Jazz"],
    state: "Entradas disponibles",
  },
];

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

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    if (params.id) {
      // En una aplicación real, aquí harías un fetch a tu API
      const fetchedEvent = getMockEvent(params.id as string);
      setEvent(fetchedEvent);
      setActiveImage(fetchedEvent.image);
      setLoading(false);
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 flex justify-center">
        <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">
          Evento no encontrado
        </h1>
        <p className="text-gray-400 mb-8">
          No pudimos encontrar el evento que estás buscando.
        </p>
        <Button onClick={() => router.push("/events")}>
          Ver todos los eventos
        </Button>
      </div>
    );
  }

  const handleTicketSelection = (ticketName: string) => {
    setSelectedTicket(ticketName);
    // Scroll to booking section
    document
      .getElementById("booking-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAddToCart = () => {
    if (!selectedTicket) return;

    const ticket = event.ticketTypes.find(
      (t: any) => t.name === selectedTicket
    );

    toast.success("¡Añadido al carrito!", {
      description: `${quantity}x ${selectedTicket} - ${
        ticket.price * quantity
      }€`,
    });
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(
      isFavorite ? "Eliminado de favoritos" : "Añadido a favoritos"
    );
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: event.name,
          text: event.description,
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing", error));
    } else {
      // Fallback para navegadores que no soportan Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast.success("Enlace copiado al portapapeles");
    }
  };

  return (
    <div className="bg-[#111E27] min-h-screen mt-20">
      {/* Breadcrumb */}
      <div className="py-3 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-gray-400">
            <Link
              href="/events"
              className="flex items-center hover:text-cyan-400"
            >
              <ArrowLeft size={16} className="mr-2" />
              Volver a eventos
            </Link>
            <ChevronRight size={14} className="mx-2" />
            <span className="truncate max-w-[200px] md:max-w-md">
              {event.name}
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-12"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="mb-3 flex flex-wrap gap-2">
                {event.categories.map((category: string, index: number) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
                  >
                    {category}
                  </Badge>
                ))}
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                {event.name}
              </h1>

              <p className="text-gray-300 text-lg mb-6">{event.description}</p>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="bg-[#0D1621] p-3 rounded-lg">
                    <Calendar className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Fecha</h3>
                    <p className="text-gray-400">{event.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-[#0D1621] p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Hora</h3>
                    <p className="text-gray-400">{event.time}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-[#0D1621] p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Ubicación</h3>
                    <p className="text-gray-400">{event.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-[#0D1621] p-3 rounded-lg">
                    <Users className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Asistencia</h3>
                    <p className="text-gray-400">
                      {event.attendees} / {event.capacity}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() =>
                    handleTicketSelection(event.ticketTypes[0]?.name)
                  }
                  className="bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-600 hover:to-cyan-500 text-black font-medium"
                >
                  <Ticket className="mr-2 h-5 w-5" />
                  Comprar entradas
                </Button>

                <Button
                  variant="outline"
                  onClick={handleToggleFavorite}
                  className={`border-gray-700 ${
                    isFavorite
                      ? "text-red-400 hover:text-red-500"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Heart
                    className={`mr-2 h-5 w-5 ${
                      isFavorite ? "fill-red-400" : ""
                    }`}
                  />
                  {isFavorite ? "Favorito" : "Añadir a favoritos"}
                </Button>

                <Button
                  variant="outline"
                  onClick={handleShare}
                  className="border-gray-700 text-gray-400 hover:text-white"
                >
                  <Share2 className="mr-2 h-5 w-5" />
                  Compartir
                </Button>
              </div>
            </div>

            <div>
              <div className="relative h-[350px] md:h-[450px] rounded-xl overflow-hidden mb-4">
                <Image
                  src={activeImage}
                  alt={event.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="flex gap-2 overflow-x-auto p-2">
                <div
                  className={`w-20 h-20 relative rounded-lg overflow-hidden cursor-pointer ${
                    activeImage === event.image ? "ring-2 ring-cyan-400" : ""
                  }`}
                  onClick={() => setActiveImage(event.image)}
                >
                  <Image
                    src={event.image}
                    alt="Thumbnail"
                    fill
                    className="object-cover"
                  />
                </div>

                {event.gallery?.map((img: string, index: number) => (
                  <div
                    key={index}
                    className={`w-20 h-20 relative rounded-lg overflow-hidden cursor-pointer ${
                      activeImage === img ? "ring-2 ring-cyan-400" : ""
                    }`}
                    onClick={() => setActiveImage(img)}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Tabs Section */}
        <section className="mb-12">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="bg-[#0D1621] border border-gray-800 mb-6">
              <TabsTrigger
                value="details"
                className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
              >
                Detalles
              </TabsTrigger>
              <TabsTrigger
                value="location"
                className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
              >
                Ubicación
              </TabsTrigger>
              <TabsTrigger
                value="tickets"
                className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
              >
                Entradas
              </TabsTrigger>
              <TabsTrigger
                value="faq"
                className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
              >
                FAQ
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="details"
              className="bg-[#13212e] rounded-xl p-6 border border-gray-800"
            >
              <div className="prose prose-invert max-w-none">
                <div
                  dangerouslySetInnerHTML={{ __html: event.longDescription }}
                />
              </div>

              <div className="mt-8 pt-8 border-t border-gray-800">
                <h3 className="text-xl font-bold text-white mb-4">
                  Organizado por
                </h3>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#0D1621] rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-cyan-400">
                      {event.organizer.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">
                      {event.organizer}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Organizador verificado
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent
              value="location"
              className="bg-[#13212e] rounded-xl p-6 border border-gray-800"
            >
              <h3 className="text-xl font-bold text-white mb-2">
                {event.location}
              </h3>
              <p className="text-gray-400 mb-6">{event.fullAddress}</p>

              <div className="rounded-xl overflow-hidden h-[400px] relative mb-6">
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12140.440617277746!2d-3.7037974!3d40.4167754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422997800a3c81%3A0xc436dec1618c2269!2s${encodeURIComponent(
                    event.location
                  )}!5e0!3m2!1sen!2ses!4v1651890876261!5m2!1sen!2ses`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa de ubicación"
                  className="grayscale contrast-[1.2] brightness-[0.8] invert-[0.15]"
                ></iframe>
              </div>

              <div className="bg-[#0D1621] p-4 rounded-lg">
                <h4 className="text-white font-medium mb-2">Cómo llegar</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-start gap-2">
                    <div className="bg-cyan-500/10 p-2 rounded-lg">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 4L4 8L8 12"
                          stroke="#22CCEE"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M4 8H13.5C17.0899 8 20 10.9101 20 14.5V14.5C20 18.0899 17.0899 21 13.5 21H8"
                          stroke="#22CCEE"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <h5 className="text-white text-sm font-medium">Metro</h5>
                      <p className="text-gray-400 text-sm">
                        Línea 5 - Estación Central
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <div className="bg-cyan-500/10 p-2 rounded-lg">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="3"
                          y="6"
                          width="18"
                          height="12"
                          rx="2"
                          stroke="#22CCEE"
                          strokeWidth="2"
                        />
                        <path d="M3 10H21" stroke="#22CCEE" strokeWidth="2" />
                      </svg>
                    </div>
                    <div>
                      <h5 className="text-white text-sm font-medium">Bus</h5>
                      <p className="text-gray-400 text-sm">
                        Líneas 27, 40, 124
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <div className="bg-cyan-500/10 p-2 rounded-lg">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="9"
                          stroke="#22CCEE"
                          strokeWidth="2"
                        />
                        <path
                          d="M12 7V12L15 15"
                          stroke="#22CCEE"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <h5 className="text-white text-sm font-medium">
                        Parking
                      </h5>
                      <p className="text-gray-400 text-sm">
                        Parking público cercano
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent
              value="tickets"
              id="booking-section"
              className="bg-[#13212e] rounded-xl p-6 border border-gray-800"
            >
              <h3 className="text-xl font-bold text-white mb-6">
                Entradas disponibles
              </h3>

              <div className="space-y-4 mb-8">
                {event.ticketTypes.map((ticket: any, index: number) => (
                  <div
                    key={index}
                    className={`bg-[#0F1A24] border ${
                      selectedTicket === ticket.name
                        ? "border-cyan-500"
                        : "border-gray-800"
                    } rounded-lg p-4 transition-colors cursor-pointer ${
                      !ticket.available ? "opacity-60 cursor-not-allowed" : ""
                    }`}
                    onClick={() =>
                      ticket.available && handleTicketSelection(ticket.name)
                    }
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-white font-medium">
                          {ticket.name}
                        </h4>
                        <p className="text-gray-400 text-sm">
                          {ticket.available ? "Disponible" : "Agotado"}
                        </p>
                      </div>
                      <div className="text-lg font-bold text-white">
                        {ticket.price}€
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {selectedTicket && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#0D1621] rounded-lg p-6 border border-gray-800"
                >
                  <h4 className="text-lg font-bold text-white mb-4">
                    Resumen de compra
                  </h4>

                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h5 className="text-white">{selectedTicket}</h5>
                      <p className="text-gray-400 text-sm">{event.date}</p>
                    </div>

                    <div className="flex items-center">
                      <button
                        className="w-8 h-8 flex items-center justify-center bg-[#13212e] rounded-l-lg border border-gray-800"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        -
                      </button>
                      <div className="w-10 h-8 flex items-center justify-center bg-[#0F1A24] border-t border-b border-gray-800">
                        {quantity}
                      </div>
                      <button
                        className="w-8 h-8 flex items-center justify-center bg-[#13212e] rounded-r-lg border border-gray-800"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-gray-800 pt-4 mb-6">
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-400">Precio por entrada:</span>
                      <span className="text-white">
                        {
                          event.ticketTypes.find(
                            (t: any) => t.name === selectedTicket
                          )?.price
                        }
                        €
                      </span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-400">Cantidad:</span>
                      <span className="text-white">{quantity}</span>
                    </div>
                    <div className="flex justify-between mt-2 pt-2 border-t border-gray-800">
                      <span className="text-white font-medium">Total:</span>
                      <span className="text-xl font-bold text-white">
                        {(
                          event.ticketTypes.find(
                            (t: any) => t.name === selectedTicket
                          )?.price * quantity
                        ).toFixed(2)}
                        €
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={handleAddToCart}
                    className="w-full bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-600 hover:to-cyan-500 text-black font-medium py-6 h-auto"
                  >
                    <CreditCard className="mr-2 h-5 w-5" />
                    Proceder al pago
                  </Button>

                  <div className="flex items-center gap-2 mt-4 text-gray-400 text-sm">
                    <Info size={14} />
                    <span>
                      Pago seguro con cifrado SSL. No cobramos gastos de
                      gestión.
                    </span>
                  </div>
                </motion.div>
              )}
            </TabsContent>

            <TabsContent
              value="faq"
              className="bg-[#13212e] rounded-xl p-6 border border-gray-800"
            >
              <h3 className="text-xl font-bold text-white mb-6">
                Preguntas frecuentes
              </h3>

              <Accordion type="single" collapsible className="mb-4">
                {event.faqs.map((faq: any, index: number) => (
                  <AccordionItem
                    key={index}
                    value={`faq-${index}`}
                    className="border-gray-800"
                  >
                    <AccordionTrigger className="text-white hover:text-cyan-400 hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="bg-[#0D1621] p-4 rounded-lg text-center">
                <p className="text-gray-300 mb-2">
                  ¿No encuentras respuesta a tu pregunta?
                </p>
                <Button
                  variant="outline"
                  className="border-gray-700 text-cyan-400 hover:text-cyan-300 hover:bg-gray-800"
                >
                  Contactar con el organizador
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Related Events */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="mb-16"
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Eventos relacionados
              </h2>
              <p className="text-gray-400 mt-1">
                Otros eventos que podrían interesarte
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {relatedEvents.map((event) => (
              <FeaturedEventsCard key={event.id} event={event} />
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
