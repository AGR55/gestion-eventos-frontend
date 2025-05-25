"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  Users,
  MapPin,
  Award,
  Star,
  Zap,
  Shield,
  Clock,
  Heart,
  CheckCircle,
  Globe,
  TrendingUp,
  Target,
  Sparkles,
  ArrowRight,
  Play,
  Quote,
  Trophy,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

export default function AboutPage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      name: "María González",
      role: "Organizadora de Eventos",
      content:
        "Event Horizon ha transformado completamente la forma en que gestiono mis eventos. La plataforma es intuitiva y potente.",
      image: "/images/testimonials/maria.jpg",
      rating: 5,
    },
    {
      name: "Carlos Pérez",
      role: "Asistente Frecuente",
      content:
        "Descubrí eventos increíbles que nunca habría encontrado por mi cuenta. La personalización es excepcional.",
      image: "/images/testimonials/carlos.jpg",
      rating: 5,
    },
    {
      name: "Ana Rodríguez",
      role: "Community Manager",
      content:
        "El soporte al cliente es fantástico. Siempre están disponibles para ayudar y resolver cualquier duda.",
      image: "/images/testimonials/ana.jpg",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
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
            {/* Badge */}
            <motion.div
              variants={slideInLeft}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 text-cyan-400 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-cyan-500/20 mt-20"
            >
              <Sparkles className="h-4 w-4" />
              Desde 2020 conectando experiencias
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 text-transparent bg-clip-text">
                Creando
              </span>
              <br />
              <span className="text-white">Experiencias</span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 text-transparent bg-clip-text">
                Inolvidables
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
              En Event Horizon, transformamos momentos ordinarios en recuerdos
              extraordinarios. Somos la plataforma líder que conecta personas
              con eventos únicos en toda Cuba.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button
                asChild
                className="h-14 px-8 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-cyan-500/25 text-lg"
              >
                <Link href="/events">
                  Explorar Eventos
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>

              <Button
                variant="outline"
                className="h-14 px-8 border-gray-600 text-gray-300 hover:bg-gray-700/50 rounded-xl text-lg"
              >
                <Play className="mr-2" size={20} />
                Ver Demo
              </Button>
            </div>

            {/* Hero Image con overlay mejorado */}
            <div className="relative h-[400px] md:h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl shadow-cyan-900/20 border border-gray-700/50">
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent z-10"></div>
              <motion.div
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2 }}
              >
                <Image
                  src="/images/about-hero.jpg"
                  alt="Event collage showcasing vibrant experiences"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>

              {/* Stats flotantes */}
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <div className="flex justify-between items-end">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="bg-black/60 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/10"
                  >
                    <div className="text-2xl font-bold text-white">150K+</div>
                    <div className="text-sm text-gray-300">
                      Asistentes felices
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    className="bg-black/60 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/10"
                  >
                    <div className="text-2xl font-bold text-white">5K+</div>
                    <div className="text-sm text-gray-300">
                      Eventos realizados
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 }}
                    className="bg-black/60 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/10"
                  >
                    <div className="text-2xl font-bold text-white">98%</div>
                    <div className="text-sm text-gray-300">Satisfacción</div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Misión Section - Rediseñado */}
        <section className="mb-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={slideInLeft}>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-400 px-3 py-1 rounded-full text-sm font-semibold mb-6 border border-cyan-500/20">
                <Target className="h-4 w-4" />
                Nuestra Misión
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                Transformando la
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">
                  {" "}
                  Industria{" "}
                </span>
                de Eventos
              </h2>

              <div className="space-y-6 mb-10">
                <p className="text-lg text-gray-300 leading-relaxed">
                  Desde 2020, hemos revolucionado cómo las personas descubren,
                  organizan y disfrutan eventos. Nuestra plataforma ha conectado{" "}
                  <span className="text-cyan-400 font-semibold">
                    más de 150,000 asistentes
                  </span>{" "}
                  con experiencias que resuenan profundamente con sus pasiones.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Combinamos tecnología de vanguardia con un enfoque centrado en
                  el usuario para crear el ecosistema de eventos más completo y
                  accesible de Cuba.
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4 mb-10">
                {[
                  {
                    icon: CheckCircle,
                    text: "Eventos verificados",
                  },
                  {
                    icon: Shield,
                    text: "Pago 100% seguro",
                  },
                  {
                    icon: Clock,
                    text: "Soporte 24/7",
                  },
                  {
                    icon: Trophy,
                    text: "Garantía de calidad",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={fadeIn}
                    className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-colors"
                  >
                    <div className="p-2 bg-cyan-500/10 rounded-lg">
                      <item.icon className="text-cyan-400 h-4 w-4" />
                    </div>
                    <span className="text-gray-300 font-medium">
                      {item.text}
                    </span>
                  </motion.div>
                ))}
              </div>

              <Button
                asChild
                className="h-12 px-6 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-xl"
              >
                <Link href="/events">
                  Descubre Eventos
                  <ArrowRight className="ml-2" size={18} />
                </Link>
              </Button>
            </motion.div>

            <motion.div variants={slideInRight}>
              <div className="relative">
                {/* Imagen principal */}
                <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-gray-700/50">
                  <Image
                    src="/images/about-mission.jpg"
                    alt="Our mission in action"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>

                {/* Cards flotantes */}
                <motion.div
                  initial={{ opacity: 0, x: 50, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -top-6 -left-6 bg-gradient-to-r from-cyan-500/90 to-blue-500/90 backdrop-blur-sm p-4 rounded-xl border border-white/20 shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg">25K+</div>
                      <div className="text-cyan-100 text-sm">
                        Usuarios activos
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -50, y: -20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="absolute -bottom-6 -right-6 bg-gradient-to-r from-purple-500/90 to-pink-500/90 backdrop-blur-sm p-4 rounded-xl border border-white/20 shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <Calendar className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg">500+</div>
                      <div className="text-purple-100 text-sm">Eventos/mes</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Stats Section - Completamente rediseñado */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerChildren}
          className="mb-32"
        >
          <div className="relative bg-gradient-to-r from-gray-900/80 via-gray-800/50 to-gray-900/80 backdrop-blur-xl rounded-3xl p-12 border border-gray-700/50 overflow-hidden">
            {/* Elementos decorativos */}
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-cyan-500/10 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-purple-500/10 blur-3xl"></div>

            <div className="relative z-10">
              <div className="text-center mb-16">
                <motion.div
                  variants={fadeIn}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 text-cyan-400 px-3 py-1 rounded-full text-sm font-semibold mb-6 border border-cyan-500/20"
                >
                  <TrendingUp className="h-4 w-4" />
                  Nuestro Impacto
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Números que Inspiran
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Cada número representa historias reales de conexiones,
                  experiencias y momentos únicos
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    icon: <Calendar className="h-12 w-12" />,
                    number: "5,000+",
                    label: "Eventos Realizados",
                    color: "from-cyan-500 to-blue-500",
                    bgColor: "from-cyan-500/10 to-blue-500/10",
                  },
                  {
                    icon: <Users className="h-12 w-12" />,
                    number: "150K+",
                    label: "Asistentes Conectados",
                    color: "from-purple-500 to-pink-500",
                    bgColor: "from-purple-500/10 to-pink-500/10",
                  },
                  {
                    icon: <MapPin className="h-12 w-12" />,
                    number: "50+",
                    label: "Ciudades en Cuba",
                    color: "from-emerald-500 to-teal-500",
                    bgColor: "from-emerald-500/10 to-teal-500/10",
                  },
                  {
                    icon: <Award className="h-12 w-12" />,
                    number: "98%",
                    label: "Satisfacción Cliente",
                    color: "from-orange-500 to-red-500",
                    bgColor: "from-orange-500/10 to-red-500/10",
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={fadeIn}
                    className={`bg-gradient-to-br ${stat.bgColor} backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 group hover:transform hover:scale-105`}
                  >
                    <div
                      className={`bg-gradient-to-r ${stat.color} p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <div className="text-white">{stat.icon}</div>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                      {stat.number}
                    </h3>
                    <p className="text-gray-300 font-medium">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Features Section - Rediseñado */}
        <section className="mb-32">
          <div className="text-center mb-20">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-400 px-3 py-1 rounded-full text-sm font-semibold mb-6 border border-purple-500/20"
            >
              <Star className="h-4 w-4" />
              Por Qué Elegirnos
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Características que nos
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                {" "}
                Distinguen
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Cada aspecto de nuestra plataforma está diseñado pensando en crear
              la mejor experiencia posible
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <Zap className="h-8 w-8" />,
                title: "Experiencia Sin Fricciones",
                description:
                  "Desde el descubrimiento hasta el check-in, todo está optimizado para ser rápido e intuitivo.",
                color: "from-yellow-500 to-orange-500",
                bgColor: "from-yellow-500/10 to-orange-500/10",
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Seguridad Garantizada",
                description:
                  "Transacciones seguras con encriptación de nivel bancario y verificación exhaustiva de eventos.",
                color: "from-green-500 to-emerald-500",
                bgColor: "from-green-500/10 to-emerald-500/10",
              },
              {
                icon: <Clock className="h-8 w-8" />,
                title: "Siempre Actualizado",
                description:
                  "Información en tiempo real con notificaciones personalizadas según tus intereses específicos.",
                color: "from-blue-500 to-indigo-500",
                bgColor: "from-blue-500/10 to-indigo-500/10",
              },
              {
                icon: <Heart className="h-8 w-8" />,
                title: "Recomendaciones IA",
                description:
                  "Algoritmo inteligente que aprende de tus preferencias para mostrarte eventos perfectos.",
                color: "from-pink-500 to-rose-500",
                bgColor: "from-pink-500/10 to-rose-500/10",
              },
              {
                icon: <Star className="h-8 w-8" />,
                title: "Experiencias Premium",
                description:
                  "Acceso exclusivo a eventos VIP y ofertas especiales para miembros de nuestra comunidad.",
                color: "from-purple-500 to-violet-500",
                bgColor: "from-purple-500/10 to-violet-500/10",
              },
              {
                icon: <Globe className="h-8 w-8" />,
                title: "Impacto Local",
                description:
                  "Conectamos personas con lo mejor de su comunidad, impulsando economías y culturas locales.",
                color: "from-cyan-500 to-teal-500",
                bgColor: "from-cyan-500/10 to-teal-500/10",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className={`bg-gradient-to-br ${feature.bgColor} backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 group hover:transform hover:scale-105`}
              >
                <div
                  className={`bg-gradient-to-r ${feature.color} p-3 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <div className="text-white">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Team Section - Rediseñado */}
        <section className="mb-32">
          <div className="text-center mb-20">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-400 px-3 py-1 rounded-full text-sm font-semibold mb-6 border border-emerald-500/20"
            >
              <Users className="h-4 w-4" />
              Nuestro Equipo
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Mentes
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 text-transparent bg-clip-text">
                {" "}
                Creativas
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Un grupo diverso de profesionales apasionados por crear
              experiencias excepcionales y conectar comunidades
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
            className="grid md:grid-cols-2 lg:grid-cols-5 gap-8"
          >
            {[
              {
                name: "Javier Leiva Suarez",
                position: "CEO & Fundador",
                image: "/images/founders/Javier.webp",
                description:
                  "Visionario líder con 10+ años en tecnología y eventos",
                social: "@javieleiva",
              },
              {
                name: "Adriano Gonzalez Reyes",
                position: "CTO",
                image: "/images/founders/Adriano.webp",
                description:
                  "Arquitecto tecnológico especializado en sistemas escalables",
                social: "@adrianogr",
              },
              {
                name: "Hanssel Carrillo Vazquez",
                position: "Director de Diseño",
                image: "/images/founders/Hanssel.webp",
                description:
                  "Diseñador UX/UI con enfoque en experiencias memorables",
                social: "@hanssel_design",
              },
              {
                name: "Hayla Lorena Milanes Millan",
                position: "Jefa de Operaciones",
                image: "/images/founders/Hayla.webp",
                description:
                  "Experta en gestión operativa y optimización de procesos",
                social: "@hayla_ops",
              },
              {
                name: "Ismaday Vazquez",
                position: "Coordinadora de Eventos",
                image: "/images/founders/Ismaday.webp",
                description:
                  "Especialista en producción y coordinación de eventos",
                social: "@ismaday_events",
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="group relative"
              >
                <div className="relative h-[400px] rounded-2xl overflow-hidden mb-6 border border-gray-700/50 group-hover:border-cyan-500/50 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300 z-10"></div>
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Overlay content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="text-sm text-cyan-400 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {member.social}
                    </div>
                    <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      {member.description}
                    </p>
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-cyan-400 font-medium">{member.position}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Testimonials Section - Nuevo */}
        <section className="mb-32">
          <div className="text-center mb-20">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-amber-400 px-3 py-1 rounded-full text-sm font-semibold mb-6 border border-amber-500/20"
            >
              <Quote className="h-4 w-4" />
              Testimonios
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Lo que Dicen
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 text-transparent bg-clip-text">
                {" "}
                Nuestros Usuarios
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Historias reales de personas que han transformado su forma de
              vivir eventos
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="relative"
          >
            <div className="bg-gradient-to-r from-gray-900/80 via-gray-800/50 to-gray-900/80 backdrop-blur-xl rounded-3xl p-12 border border-gray-700/50">
              <div className="grid lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    variants={fadeIn}
                    className="bg-gradient-to-br from-gray-800/50 to-gray-900/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-cyan-500/30">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-white font-bold">
                          {testimonial.name}
                        </h4>
                        <p className="text-cyan-400 text-sm">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className="text-amber-400 fill-current"
                        />
                      ))}
                    </div>

                    <p className="text-gray-300 leading-relaxed italic">
                      "{testimonial.content}"
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* CTA Final - Rediseñado */}
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

            <div className="relative z-10">
              <motion.div
                variants={fadeIn}
                className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-semibold mb-8 border border-white/20"
              >
                <Sparkles className="h-4 w-4" />
                Únete a la Revolución
              </motion.div>

              <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
                Únete a la Revolución
                <br />
                de Eventos
              </h2>

              <p className="text-xl text-gray-100 max-w-4xl mx-auto mb-12 leading-relaxed">
                Descubre eventos que resuenan con tus pasiones, conoce personas
                con tus mismos intereses y crea recuerdos que durarán toda la
                vida. Tu próxima experiencia increíble te está esperando.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  className="h-14 px-8 bg-white text-blue-600 hover:bg-gray-100 font-bold text-lg rounded-xl shadow-lg hover:scale-105 transition-all duration-300"
                >
                  <Link href="/events">
                    Explorar Eventos
                    <ArrowRight className="ml-2" size={20} />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="h-14 px-8 border-white/30 text-white hover:bg-white/10 font-semibold text-lg rounded-xl backdrop-blur-sm"
                >
                  <Link href="/contact">Contactar Equipo</Link>
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="flex justify-center items-center gap-8 mt-12 text-white/80">
                <div className="flex items-center gap-2">
                  <Users size={20} />
                  <span className="text-sm">150K+ usuarios</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star size={20} />
                  <span className="text-sm">98% satisfacción</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield size={20} />
                  <span className="text-sm">100% seguro</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
