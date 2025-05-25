import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { memo, useState } from "react";
import { motion } from "framer-motion";
import {
  HelpCircle,
  MessageCircle,
  Phone,
  Mail,
  Search,
  ChevronDown,
  ChevronUp,
  Users,
  Calendar,
  CreditCard,
  MapPin,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type FAQ = {
  question: string;
  answer: string;
  category: string;
};

type FaqTabProps = {
  faqs?: FAQ[];
};

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

const FaqTab = memo(({ faqs }: FaqTabProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  // FAQs por defecto si no se proporcionan
  const defaultFaqs: FAQ[] = [
    {
      question: "¿Qué incluye el precio de la entrada?",
      answer:
        "El precio incluye acceso completo al evento, welcome drink, acceso a todas las actividades programadas, wifi gratuito y servicio de guardarropía básico. También incluye certificado digital de participación.",
      category: "general",
    },
    {
      question: "¿Puedo cancelar mi entrada y obtener reembolso?",
      answer:
        "Sí, ofrecemos cancelación gratuita hasta 24 horas antes del evento. Para cancelaciones con menos de 24 horas, se aplicará una penalización del 10%. En caso de cancelación por parte del organizador, se reembolsa el 100% del importe.",
      category: "pagos",
    },
    {
      question: "¿Hay restricciones de edad para asistir?",
      answer:
        "Este evento está dirigido a mayores de 18 años. Se requerirá identificación válida en la entrada. Menores de edad solo podrán ingresar acompañados de un adulto responsable y con autorización previa.",
      category: "acceso",
    },
    {
      question: "¿Qué métodos de pago aceptan?",
      answer:
        "Aceptamos TransferMóvil, pagos QR, tarjetas MLC y pago en efectivo (solo en taquilla). Para compras online, recomendamos TransferMóvil para confirmación instantánea.",
      category: "pagos",
    },
    {
      question: "¿El venue tiene estacionamiento disponible?",
      answer:
        "Sí, hay varias opciones de estacionamiento cercanas. Plaza Vieja (200m) ofrece tarifa especial para asistentes al evento presentando la entrada. También disponible valet parking con reserva previa.",
      category: "logistica",
    },
    {
      question: "¿Qué pasa si llueve? ¿Se cancela el evento?",
      answer:
        "El evento se realiza en un espacio cubierto, por lo que la lluvia no afecta su desarrollo. En caso de condiciones climáticas extremas que comprometan la seguridad, se notificará por email y redes sociales.",
      category: "logistica",
    },
    {
      question: "¿Puedo transferir mi entrada a otra persona?",
      answer:
        "Sí, las entradas son transferibles hasta 12 horas antes del evento. Para transferir, contacta con nuestro equipo de soporte con los datos del nuevo asistente. Se requiere verificación de identidad en la entrada.",
      category: "general",
    },
    {
      question: "¿Hay opciones de comida y bebida en el evento?",
      answer:
        "Sí, contamos con food trucks especializados, barra premium y opciones vegetarianas/veganas. El welcome drink está incluido en la entrada. Precios especiales para asistentes del evento.",
      category: "general",
    },
  ];

  const eventFaqs = faqs || defaultFaqs;

  const categories = [
    { id: "all", name: "Todas", icon: HelpCircle, color: "text-gray-400" },
    { id: "general", name: "General", icon: Users, color: "text-cyan-400" },
    { id: "pagos", name: "Pagos", icon: CreditCard, color: "text-emerald-400" },
    { id: "acceso", name: "Acceso", icon: Shield, color: "text-purple-400" },
    {
      id: "logistica",
      name: "Logística",
      icon: MapPin,
      color: "text-amber-400",
    },
  ];

  const filteredFaqs = eventFaqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  if (!eventFaqs.length) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="text-center py-12"
      >
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-12 border border-gray-700/50">
          <HelpCircle className="h-16 w-16 text-gray-600 mx-auto mb-6" />
          <h3 className="text-xl font-semibold text-white mb-4">
            No hay preguntas frecuentes disponibles
          </h3>
          <p className="text-gray-400 mb-8">
            Aún no se han agregado preguntas frecuentes para este evento.
          </p>
          <Button className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/30 rounded-xl">
            <MessageCircle className="h-4 w-4 mr-2" />
            Contactar organizador
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerChildren}
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={fadeIn}>
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <div className="p-2 bg-amber-500/20 rounded-lg">
              <HelpCircle className="h-6 w-6 text-amber-400" />
            </div>
            Preguntas frecuentes
          </h3>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Encuentra respuestas rápidas a las dudas más comunes sobre este
            evento
          </p>
        </div>
      </motion.div>

      {/* Buscador */}
      <motion.div variants={fadeIn}>
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Busca en las preguntas frecuentes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 bg-gray-900/50 border-gray-600/50 text-white placeholder:text-gray-400 rounded-xl focus:border-cyan-500/50"
            />
          </div>
        </div>
      </motion.div>

      {/* Filtros por categoría */}
      <motion.div variants={fadeIn}>
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
          <h4 className="text-white font-semibold mb-4">
            Filtrar por categoría
          </h4>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-cyan-500/20 border-cyan-500/30 text-cyan-400"
                    : "bg-gray-900/30 border-gray-600/30 text-gray-400 hover:border-gray-500/50 hover:text-gray-300"
                }`}
              >
                <category.icon
                  className={`h-4 w-4 ${
                    selectedCategory === category.id
                      ? "text-cyan-400"
                      : category.color
                  }`}
                />
                <span className="text-sm font-medium">{category.name}</span>
                <span className="text-xs opacity-70">
                  (
                  {
                    eventFaqs.filter(
                      (faq) =>
                        category.id === "all" || faq.category === category.id
                    ).length
                  }
                  )
                </span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Lista de FAQs */}
      <motion.div variants={fadeIn}>
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
          {filteredFaqs.length === 0 ? (
            <div className="p-12 text-center">
              <Search className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <h4 className="text-white font-semibold mb-2">
                No se encontraron resultados
              </h4>
              <p className="text-gray-400">
                Intenta con otros términos de búsqueda o selecciona una
                categoría diferente
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-600/30">
              {filteredFaqs.map((faq, index) => (
                <div key={index} className="p-6">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full text-left"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex gap-4 flex-1">
                        <div className="p-2 bg-gray-700/50 rounded-lg flex-shrink-0">
                          <HelpCircle className="h-5 w-5 text-cyan-400" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="bg-gray-700/50 text-gray-400 px-2 py-1 rounded-lg text-xs font-medium capitalize">
                              {faq.category}
                            </span>
                          </div>
                          <h4 className="text-lg font-semibold text-white text-left group-hover:text-cyan-300 transition-colors">
                            {faq.question}
                          </h4>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        {expandedFAQ === index ? (
                          <ChevronUp className="h-5 w-5 text-cyan-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </button>

                  <motion.div
                    initial={false}
                    animate={{
                      height: expandedFAQ === index ? "auto" : 0,
                      opacity: expandedFAQ === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 pl-16">
                      <p className="text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* CTA de contacto */}
      <motion.div variants={fadeIn}>
        <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/30">
          <div className="text-center mb-6">
            <h4 className="text-xl font-bold text-white mb-3">
              ¿No encuentras lo que buscas?
            </h4>
            <p className="text-gray-300">
              Nuestro equipo está listo para ayudarte con cualquier duda
              específica sobre el evento
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/30 rounded-xl">
              <MessageCircle className="h-4 w-4 mr-2" />
              Chat en vivo
            </Button>

            <Button
              variant="outline"
              className="bg-gray-800/50 border-gray-600/50 text-gray-300 hover:bg-gray-700/50 rounded-xl"
            >
              <Mail className="h-4 w-4 mr-2" />
              Enviar email
            </Button>

            <Button
              variant="outline"
              className="bg-gray-800/50 border-gray-600/50 text-gray-300 hover:bg-gray-700/50 rounded-xl"
            >
              <Phone className="h-4 w-4 mr-2" />
              Llamar soporte
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});

FaqTab.displayName = "FaqTab";

export default FaqTab;
