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
import { toast } from "sonner";

const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  email: z.string().email({ message: "Introduce un email válido" }),
  subject: z
    .string()
    .min(5, { message: "El asunto debe tener al menos 5 caracteres" }),
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
      staggerChildren: 0.2,
    },
  },
};

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
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
        description: "Te responderemos lo antes posible. ¡Gracias!",
      });

      form.reset();

      // Resetear estado de éxito después de un tiempo
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al enviar", {
        description: "Por favor, inténtalo de nuevo más tarde.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      <section className="mb-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text mb-6 mt-20">
            Ponte en Contacto
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10">
            Estamos aquí para ayudarte. Contacta con nuestro equipo para
            cualquier duda, sugerencia o colaboración.
          </p>
        </motion.div>
      </section>

      {/* Contact Info Cards */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerChildren}
        className="grid md:grid-cols-3 gap-6 mb-20"
      >
        {[
          {
            icon: <Mail className="h-8 w-8 text-cyan-400" />,
            title: "Email",
            content: "info@eventhorizon.com",
            description: "Responderemos en 24-48 horas",
            action: "Enviar email",
            url: "mailto:info@eventhorizon.com",
          },
          {
            icon: <Phone className="h-8 w-8 text-cyan-400" />,
            title: "Teléfono",
            content: "+34 900 123 456",
            description: "Lun-Vie, 9:00-18:00",
            action: "Llamar ahora",
            url: "tel:+34900123456",
          },
          {
            icon: <MapPin className="h-8 w-8 text-cyan-400" />,
            title: "Oficina",
            content: "Calle Innovación, 42",
            description: "Madrid, España 28001",
            action: "Ver en mapa",
            url: "https://maps.google.com",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            variants={fadeIn}
            className="bg-[#0F1A24] border border-gray-800 rounded-xl p-6 hover:border-cyan-900 transition-all duration-300 flex flex-col"
          >
            <div className="bg-gradient-to-br from-[#1A2836] to-[#243442] p-3 rounded-lg w-fit mb-4">
              {item.icon}
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {item.title}
            </h3>
            <p className="text-white mb-1">{item.content}</p>
            <p className="text-gray-400 text-sm mb-6">{item.description}</p>
            <div className="mt-auto">
              <a
                href={item.url}
                className="text-cyan-400 font-medium hover:text-cyan-300 flex items-center gap-2 transition-colors"
              >
                {item.action} <ArrowRight size={16} />
              </a>
            </div>
          </motion.div>
        ))}
      </motion.section>

      {/* Contact Form & Map */}
      <section className="mb-24 grid md:grid-cols-2 gap-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="bg-[#0F1A24] rounded-xl border border-gray-800 p-8"
        >
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Envíanos un mensaje
            </h2>
            <p className="text-gray-400">
              Completa el formulario y nos pondremos en contacto contigo lo
              antes posible.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Nombre</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Tu nombre"
                          {...field}
                          className="bg-[#1A2836] border-gray-700 text-white focus-visible:ring-cyan-500 focus-visible:border-cyan-500"
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
                      <FormLabel className="text-gray-300">Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="tu.email@ejemplo.com"
                          {...field}
                          className="bg-[#1A2836] border-gray-700 text-white focus-visible:ring-cyan-500 focus-visible:border-cyan-500"
                          disabled={isSubmitting}
                        />
                      </FormControl>
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
                    <FormLabel className="text-gray-300">Asunto</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="¿En qué podemos ayudarte?"
                        {...field}
                        className="bg-[#1A2836] border-gray-700 text-white focus-visible:ring-cyan-500 focus-visible:border-cyan-500"
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
                    <FormLabel className="text-gray-300">Mensaje</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Escribe tu mensaje detallado aquí..."
                        {...field}
                        className="bg-[#1A2836] border-gray-700 text-white focus-visible:ring-cyan-500 focus-visible:border-cyan-500 min-h-[120px]"
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
                className="w-full bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-600 hover:to-cyan-500 text-black font-medium py-6 h-12 rounded-lg transition-all duration-200"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
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
                    Enviando...
                  </>
                ) : isSuccess ? (
                  <>
                    <CheckCircle className="mr-2 h-5 w-5" /> Mensaje enviado
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" /> Enviar mensaje
                  </>
                )}
              </Button>
            </form>
          </Form>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="rounded-xl overflow-hidden h-[600px] border border-gray-800 relative"
        >
          {/* Reemplaza esta URL con cualquier mapa embebido que quieras usar */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12140.440617277746!2d-3.7037974!3d40.4167754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422997800a3c81%3A0xc436dec1618c2269!2sMadrid%2C%20Spain!5e0!3m2!1sen!2ses!4v1651890876261!5m2!1sen!2ses"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapa de ubicación"
            className="grayscale contrast-[1.2] brightness-[0.8] invert-[0.15]"
          ></iframe>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0F1A24] p-6 pointer-events-none">
            <div className="flex items-center text-white mb-2">
              <Clock size={16} className="text-cyan-400 mr-2" />
              <span className="text-sm">
                Horario de oficina: Lunes a Viernes 9:00 - 18:00
              </span>
            </div>
            <div className="flex items-center text-white">
              <MapPin size={16} className="text-cyan-400 mr-2" />
              <span className="text-sm">
                Calle Innovación, 42 - Madrid, España 28001
              </span>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mb-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Preguntas Frecuentes
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Encuentra respuestas a las preguntas más comunes sobre nuestros
            servicios
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="grid md:grid-cols-2 gap-8"
        >
          {[
            {
              question: "¿Cómo puedo crear un evento en la plataforma?",
              answer:
                "Para crear un evento, inicia sesión en tu cuenta, haz clic en 'Crear evento' en tu panel de control y sigue las instrucciones. Podrás agregar detalles, imágenes, fechas y opciones de tickets.",
            },
            {
              question: "¿Puedo cambiar la fecha de mi evento?",
              answer:
                "Sí, puedes modificar la fecha y hora de tu evento desde el panel de administración hasta 24 horas antes del inicio, notificando automáticamente a los asistentes registrados.",
            },
            {
              question: "¿Cuáles son las comisiones por venta de entradas?",
              answer:
                "Cobramos una comisión del 2.5% + 0.50€ por cada venta de entrada. Para eventos benéficos ofrecemos tarifas reducidas, contacta con nuestro equipo para más información.",
            },
            {
              question: "¿Cómo funcionan los reembolsos?",
              answer:
                "Los organizadores pueden establecer su propia política de reembolsos. Como plataforma, garantizamos reembolsos completos si un evento es cancelado por el organizador.",
            },
            {
              question: "¿Ofrecen soporte para la promoción de eventos?",
              answer:
                "Sí, ofrecemos herramientas de promoción integradas y paquetes de marketing adicionales. También contamos con un blog y redes sociales donde destacamos eventos seleccionados.",
            },
            {
              question: "¿La plataforma funciona en dispositivos móviles?",
              answer:
                "Sí, nuestra plataforma es completamente responsiva y funciona en todos los dispositivos. Ademas se desarrollarán aplicaciones nativas para iOS y Android con funcionalidades adicionales.",
            },
          ].map((faq, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              className="bg-[#0F1A24] border border-gray-800 rounded-xl p-6 hover:border-cyan-900 transition-all duration-300"
            >
              <div className="flex gap-4">
                <div className="mt-1">
                  <MessageSquare className="h-5 w-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-400">{faq.answer}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="text-center py-16 px-6 md:px-20 rounded-2xl bg-gradient-to-br from-[#0F1A24] to-[#1A2836] border border-gray-800"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Vamos a Crear Algo Increíble Juntos
        </h2>
        <p className="text-gray-300 max-w-3xl mx-auto mb-10 text-lg">
          ¿Tienes un evento especial en mente? Nuestro equipo de expertos está
          listo para ayudarte a hacerlo realidad desde la planificación hasta la
          ejecución.
        </p>
        <Button className="bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-600 hover:to-cyan-500 text-black font-medium px-8 py-7 h-auto text-lg rounded-lg shadow-lg shadow-cyan-500/20 transition-all duration-200">
          Programa una consulta gratuita
        </Button>
      </motion.section>
    </div>
  );
}
