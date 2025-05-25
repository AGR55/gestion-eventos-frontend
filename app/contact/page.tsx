"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  CheckCircle,
  ArrowRight,
  Users,
  Headphones,
  Calendar,
  Zap,
  Star,
  Globe,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Heart,
  MessageCircle,
  HelpCircle,
} from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import Image from "next/image";

const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  email: z.string().email({ message: "Introduce un email válido" }),
  phone: z.string().optional(),
  subject: z
    .string()
    .min(5, { message: "El asunto debe tener al menos 5 caracteres" }),
  category: z.string().min(1, { message: "Selecciona una categoría" }),
  message: z
    .string()
    .min(10, { message: "El mensaje debe tener al menos 10 caracteres" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6 },
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6 },
  },
};

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      category: "",
      message: "",
    },
  });

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);

    try {
      // Simular envío a una API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Form data:", data);
      setIsSuccess(true);

      toast.success("Mensaje enviado", {
        description: "Te responderemos en las próximas 24 horas. ¡Gracias!",
      });

      form.reset();

      // Resetear estado de éxito después de un tiempo
      setTimeout(() => setIsSuccess(false), 4000);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al enviar", {
        description: "Por favor, inténtalo de nuevo más tarde.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const contactMethods = [
    {
      icon: <Mail className="h-8 w-8" />,
      title: "Email",
      subtitle: "Respuesta en 24h",
      content: "info@eventhorizon.com",
      description: "Para consultas generales y soporte técnico",
      action: "Enviar email",
      url: "mailto:info@eventhorizon.com",
      color: "from-cyan-500 to-blue-500",
      bgColor: "from-cyan-500/10 to-blue-500/10",
      available: true,
    },
    {
      icon: <Phone className="h-8 w-8" />,
      title: "Teléfono",
      subtitle: "Lun-Vie 9:00-18:00",
      content: "+53 5555 1234",
      description: "Soporte directo para organizadores de eventos",
      action: "Llamar ahora",
      url: "tel:+5355551234",
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-500/10 to-emerald-500/10",
      available: true,
    },
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "Chat en Vivo",
      subtitle: "Respuesta inmediata",
      content: "chat.eventhorizon.com",
      description: "Asistencia instantánea para dudas rápidas",
      action: "Iniciar chat",
      url: "#",
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-500/10 to-pink-500/10",
      available: true,
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      title: "Oficina Principal",
      subtitle: "La Habana, Cuba",
      content: "Calle 23 #456, Vedado",
      description: "Visítanos para reuniones y consultas presenciales",
      action: "Ver en mapa",
      url: "https://maps.google.com",
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-500/10 to-red-500/10",
      available: true,
    },
  ];

  const teamMembers = [
    {
      name: "Ana García",
      role: "Gerente de Atención al Cliente",
      image: "/images/team/ana-garcia.jpg",
      specialty: "Soporte general y resolución de problemas",
      availability: "Lun-Vie 9:00-18:00",
    },
    {
      name: "Carlos López",
      role: "Especialista en Eventos",
      image: "/images/team/carlos-lopez.jpg",
      specialty: "Planificación y producción de eventos",
      availability: "Lun-Sáb 10:00-20:00",
    },
    {
      name: "María Rodríguez",
      role: "Soporte Técnico",
      image: "/images/team/maria-rodriguez.jpg",
      specialty: "Problemas técnicos y configuración",
      availability: "24/7 disponible",
    },
  ];

  const faqs = [
    {
      question: "¿Cómo puedo crear mi primer evento en la plataforma?",
      answer:
        "Crear un evento es muy sencillo. Solo necesitas registrarte, hacer clic en 'Crear evento' y seguir nuestro asistente paso a paso. Podrás configurar todos los detalles, desde la descripción hasta los tipos de entrada y métodos de pago. Si necesitas ayuda, nuestro equipo está disponible para guiarte en todo el proceso.",
      category: "Eventos",
    },
    {
      question: "¿Cuáles son las comisiones y tarifas de la plataforma?",
      answer:
        "Cobramos una comisión competitiva del 3% + 0.30€ por transacción exitosa. No hay costos iniciales ni tarifas mensuales. Para eventos benéficos y organizaciones sin fines de lucro, ofrecemos tarifas especiales. Todos los costos son transparentes y se muestran claramente antes de la confirmación.",
      category: "Pagos",
    },
    {
      question: "¿Puedo modificar mi evento después de publicarlo?",
      answer:
        "Sí, puedes editar la mayoría de los detalles de tu evento en cualquier momento desde tu panel de control. Para cambios significativos como fecha, ubicación o precio, te recomendamos notificar a los asistentes con al menos 48 horas de anticipación. El sistema enviará automáticamente las notificaciones correspondientes.",
      category: "Eventos",
    },
    {
      question: "¿Cómo funciona el sistema de reembolsos?",
      answer:
        "Como organizador, tú estableces tu política de reembolsos. Ofrecemos opciones flexibles: sin reembolsos, reembolso parcial o total hasta cierta fecha, o reembolsos caso por caso. Los asistentes pueden solicitar reembolsos directamente desde su cuenta, y tú decides aprobarlos según tu política establecida.",
      category: "Pagos",
    },
    {
      question: "¿Qué herramientas de promoción están disponibles?",
      answer:
        "Incluimos herramientas completas de marketing: páginas de evento optimizadas para SEO, integración con redes sociales, códigos de descuento, programa de afiliados, email marketing automatizado y analíticas detalladas. También ofrecemos paquetes de promoción premium con mayor visibilidad en nuestra plataforma.",
      category: "Marketing",
    },
    {
      question: "¿La plataforma funciona bien en dispositivos móviles?",
      answer:
        "Absolutamente. Nuestra plataforma está completamente optimizada para móviles y tablets. Además, estamos desarrollando aplicaciones nativas para iOS y Android que incluirán funcionalidades adicionales como check-in con QR, notificaciones push personalizadas y modo offline.",
      category: "Técnico",
    },
    {
      question: "¿Ofrecen soporte durante el evento en vivo?",
      answer:
        "Sí, para eventos Premium ofrecemos soporte en tiempo real durante el evento. Esto incluye monitoreo técnico, asistencia para check-in, resolución de problemas de último minuto y un número de emergencia directo. También proporcionamos un dashboard en vivo para que puedas monitorear todo en tiempo real.",
      category: "Soporte",
    },
    {
      question: "¿Puedo integrar mi evento con otras plataformas?",
      answer:
        "Sí, ofrecemos integraciones con las principales plataformas: Zoom para eventos virtuales, Mailchimp para email marketing, Google Analytics para seguimiento, Facebook y Instagram para promoción, y APIs para integraciones personalizadas. Nuestro equipo técnico puede ayudarte con configuraciones específicas.",
      category: "Técnico",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {/* Hero Section Mejorado */}
        <section className="mb-32 relative">
          {/* Elementos decorativos de fondo */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-cyan-600/10 to-blue-600/10 blur-[120px] animate-pulse"></div>
            <div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-purple-600/10 to-pink-600/10 blur-[120px] animate-pulse"
              style={{ animationDelay: "2s" }}
            ></div>
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-center relative z-10"
          >
            <motion.div
              variants={slideInLeft}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 text-cyan-400 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-cyan-500/20 mt-20"
            >
              <Headphones className="h-4 w-4" />
              Soporte 24/7 disponible
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
                Estamos Aquí
              </span>
              <br />
              <span className="text-white">Para</span>
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                {" "}
                Ayudarte
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
              Nuestro equipo de expertos está listo para ayudarte a crear
              experiencias inolvidables. Desde consultas técnicas hasta
              planificación estratégica de eventos.
            </p>

            {/* Stats rápidas */}
            <div className="flex justify-center gap-8 text-sm text-gray-400 mb-12">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-cyan-400" />
                <span>&lt; 24h respuesta</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-emerald-400" />
                <span>Equipo especializado</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-purple-400" />
                <span>98% satisfacción</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Métodos de Contacto Mejorados */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-400 px-3 py-1 rounded-full text-sm font-semibold mb-6 border border-green-500/20"
            >
              <Zap className="h-4 w-4" />
              Múltiples Canales
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Elige Tu Forma Preferida de
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 text-transparent bg-clip-text">
                {" "}
                Contacto
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Ofrecemos múltiples canales para que puedas contactarnos de la
              manera que te resulte más cómoda
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className={`bg-gradient-to-br ${method.bgColor} backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 group hover:transform hover:scale-105 relative overflow-hidden`}
              >
                {/* Elemento decorativo */}
                <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-white/5 blur-xl"></div>

                <div
                  className={`bg-gradient-to-r ${method.color} p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <div className="text-white">{method.icon}</div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {method.title}
                    </h3>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-400 font-medium">
                        {method.available ? "Disponible" : "Offline"}
                      </span>
                    </div>
                  </div>
                  <p className="text-cyan-400 font-medium">{method.subtitle}</p>
                  <p className="text-white font-semibold">{method.content}</p>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {method.description}
                  </p>
                </div>

                <a
                  href={method.url}
                  className={`inline-flex items-center gap-2 bg-gradient-to-r ${method.color} text-white px-4 py-2 rounded-xl font-medium hover:scale-105 transition-all duration-300 shadow-lg`}
                >
                  {method.action}
                  <ArrowRight size={16} />
                </a>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Formulario y Mapa Mejorados */}
        <section className="mb-32 grid lg:grid-cols-2 gap-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInLeft}
            className="bg-gradient-to-br from-gray-900/80 via-gray-800/50 to-gray-900/80 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-8 md:p-12 relative overflow-hidden"
          >
            {/* Elementos decorativos */}
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-cyan-500/10 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-purple-500/10 blur-3xl"></div>

            <div className="relative z-10">
              <div className="mb-10">
                <motion.div
                  variants={fadeIn}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-400 px-3 py-1 rounded-full text-sm font-semibold mb-6 border border-cyan-500/20"
                >
                  <Send className="h-4 w-4" />
                  Formulario de Contacto
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Envíanos un Mensaje
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  Completa el formulario con tus datos y nos pondremos en
                  contacto contigo en las próximas 24 horas para ayudarte con lo
                  que necesites.
                </p>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300 font-medium">
                            Nombre completo
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Tu nombre"
                              {...field}
                              className="h-12 bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 rounded-xl focus:border-cyan-500/50 focus:ring-cyan-500/20"
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300 font-medium">
                            Correo electrónico
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="tu.email@ejemplo.com"
                              type="email"
                              {...field}
                              className="h-12 bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 rounded-xl focus:border-cyan-500/50 focus:ring-cyan-500/20"
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300 font-medium">
                            Teléfono (opcional)
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="+53 5555 1234"
                              {...field}
                              className="h-12 bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 rounded-xl focus:border-cyan-500/50 focus:ring-cyan-500/20"
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300 font-medium">
                            Categoría
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            disabled={isSubmitting}
                          >
                            <FormControl>
                              <SelectTrigger className="h-12 bg-gray-800/50 border-gray-600/50 text-white rounded-xl focus:border-cyan-500/50">
                                <SelectValue placeholder="Selecciona una categoría" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-gray-800 border-gray-600 text-white">
                              <SelectItem value="general">
                                Consulta General
                              </SelectItem>
                              <SelectItem value="eventos">
                                Creación de Eventos
                              </SelectItem>
                              <SelectItem value="tecnico">
                                Soporte Técnico
                              </SelectItem>
                              <SelectItem value="pagos">
                                Pagos y Facturación
                              </SelectItem>
                              <SelectItem value="marketing">
                                Marketing y Promoción
                              </SelectItem>
                              <SelectItem value="partnership">
                                Colaboraciones
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300 font-medium">
                          Asunto
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="¿En qué podemos ayudarte?"
                            {...field}
                            className="h-12 bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 rounded-xl focus:border-cyan-500/50 focus:ring-cyan-500/20"
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300 font-medium">
                          Mensaje
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe tu consulta con el mayor detalle posible para poder ayudarte mejor..."
                            {...field}
                            className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400 rounded-xl focus:border-cyan-500/50 focus:ring-cyan-500/20 min-h-[140px] resize-none"
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Enviando mensaje...
                      </>
                    ) : isSuccess ? (
                      <>
                        <CheckCircle className="mr-2 h-5 w-5" />
                        ¡Mensaje enviado con éxito!
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Enviar mensaje
                      </>
                    )}
                  </Button>

                  <p className="text-gray-500 text-sm text-center">
                    ✨ Respuesta garantizada en 24 horas • 🔒 Tus datos están
                    seguros • 📧 Sin spam
                  </p>
                </form>
              </Form>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInRight}
            className="space-y-8"
          >
            {/* Mapa mejorado */}
            <div className="rounded-2xl overflow-hidden h-[400px] border border-gray-700/50 relative shadow-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3593.2843187285085!2d-82.3665956!3d23.1319635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88cd79c1b3b5b0b1%3A0x3b1f8c8c8c8c8c8c!2sHavana%2C%20Cuba!5e0!3m2!1sen!2scuba!4v1651890876261!5m2!1sen!2scuba"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Event Horizon"
                className="grayscale contrast-[1.2] brightness-[0.7] saturate-[1.3]"
              ></iframe>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/95 via-gray-900/70 to-transparent p-6">
                <div className="flex items-center text-white mb-3">
                  <MapPin size={20} className="text-cyan-400 mr-3" />
                  <div>
                    <h4 className="font-semibold">Oficina Principal</h4>
                    <p className="text-sm text-gray-300">
                      Calle 23 #456, Vedado, La Habana
                    </p>
                  </div>
                </div>
                <div className="flex items-center text-white">
                  <Clock size={16} className="text-emerald-400 mr-2" />
                  <span className="text-sm">Lunes a Viernes: 9:00 - 18:00</span>
                </div>
              </div>
            </div>

            {/* Team cards */}
            <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/50 to-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-8">
              <div className="text-center mb-8">
                <motion.div
                  variants={fadeIn}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-400 px-3 py-1 rounded-full text-sm font-semibold mb-4 border border-purple-500/20"
                >
                  <Users className="h-4 w-4" />
                  Nuestro Equipo
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Conoce a Quienes te Ayudarán
                </h3>
                <p className="text-gray-300 text-sm">
                  Profesionales dedicados listos para resolver tus dudas
                </p>
              </div>

              <div className="space-y-4">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={index}
                    variants={fadeIn}
                    className="flex items-center gap-4 p-4 bg-gray-800/30 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300"
                  >
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-cyan-500/30">
                      <div className="w-full h-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                        <Users className="text-cyan-400" size={20} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold">
                        {member.name}
                      </h4>
                      <p className="text-cyan-400 text-sm">{member.role}</p>
                      <p className="text-gray-400 text-xs">
                        {member.specialty}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-green-400">
                          Disponible
                        </span>
                      </div>
                      <p className="text-gray-500 text-xs">
                        {member.availability}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* FAQ Section Mejorado */}
        <section className="mb-32">
          <div className="text-center mb-20">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-amber-400 px-3 py-1 rounded-full text-sm font-semibold mb-6 border border-amber-500/20"
            >
              <HelpCircle className="h-4 w-4" />
              FAQ
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Preguntas
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 text-transparent bg-clip-text">
                {" "}
                Frecuentes
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Encuentra respuestas rápidas a las dudas más comunes sobre nuestra
              plataforma
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="max-w-4xl mx-auto"
          >
            {faqs.map((faq, index) => (
              <motion.div key={index} variants={fadeIn} className="mb-4">
                <button
                  onClick={() =>
                    setExpandedFAQ(expandedFAQ === index ? null : index)
                  }
                  className="w-full bg-gradient-to-r from-gray-800/50 to-gray-900/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 text-left"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-start gap-4">
                      <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-2 rounded-lg flex-shrink-0">
                        <MessageSquare className="h-5 w-5 text-cyan-400" />
                      </div>
                      <div>
                        <span className="inline-block bg-gray-700/50 text-gray-300 px-2 py-1 rounded-full text-xs font-medium mb-2">
                          {faq.category}
                        </span>
                        <h3 className="text-lg font-semibold text-white text-left">
                          {faq.question}
                        </h3>
                      </div>
                    </div>
                    <div className="flex-shrink-0 ml-4">
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
                  <div className="px-6 pb-6 pt-2">
                    <div className="pl-12">
                      <p className="text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* CTA Final Mejorado */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="relative"
        >
          <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
            {/* Elementos decorativos */}
            <div className="absolute top-0 left-0 w-40 h-40 rounded-full bg-white/10 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full bg-white/10 blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-white/5 blur-3xl"></div>

            <div className="relative z-10">
              <motion.div
                variants={fadeIn}
                className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-semibold mb-8 border border-white/20"
              >
                <Heart className="h-4 w-4" />
                Estamos aquí para ti
              </motion.div>

              <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
                ¿Tienes una Idea
                <br />
                Increíble?
              </h2>

              <p className="text-xl text-gray-100 max-w-4xl mx-auto mb-12 leading-relaxed">
                No importa si es tu primer evento o el número 100, nuestro
                equipo está listo para ayudarte a convertir tu visión en una
                experiencia inolvidable. Hablemos de tu proyecto.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button
                  asChild
                  className="h-14 px-8 bg-white text-blue-600 hover:bg-gray-100 font-bold text-lg rounded-xl shadow-lg hover:scale-105 transition-all duration-300"
                >
                  <a href="#contact-form">
                    Enviar Mensaje
                    <Send className="ml-2" size={20} />
                  </a>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="h-14 px-8 border-white/30 text-white hover:bg-white/10 font-semibold text-lg rounded-xl backdrop-blur-sm"
                >
                  <a href="tel:+5355551234">
                    Llamar Ahora
                    <Phone className="ml-2" size={20} />
                  </a>
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="flex justify-center items-center gap-8 text-white/80">
                <div className="flex items-center gap-2">
                  <CheckCircle size={20} />
                  <span className="text-sm">Respuesta garantizada</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe size={20} />
                  <span className="text-sm">Soporte en español</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star size={20} />
                  <span className="text-sm">Equipo certificado</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
