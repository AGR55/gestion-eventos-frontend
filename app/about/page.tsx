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
} from "lucide-react";
import Image from "next/image";

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

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      {/* Hero Section */}
      <section className="mb-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text mb-6 mt-12">
            Creando Experiencias Inolvidables
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10">
            En Event Horizon, nuestro objetivo es conectar a personas con
            eventos extraordinarios que transforman momentos ordinarios en
            recuerdos duraderos.
          </p>

          <div className="relative h-[300px] md:h-[500px] w-full rounded-xl overflow-hidden shadow-2xl shadow-cyan-900/20">
            <div className="absolute inset-0 bg-gradient-to-t from-[#111E27]/80 to-transparent z-10"></div>
            <Image
              src="/images/about-hero.jpg"
              alt="Event collage"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="mb-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <span className="text-cyan-400 text-sm font-semibold tracking-wider mb-2 block">
              NUESTRA MISIÓN
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Transformando la Industria de Eventos
            </h2>
            <p className="text-gray-400 mb-6">
              Nacimos con la visión de revolucionar cómo las personas descubren,
              organizan y disfrutan eventos. Desde 2020, hemos conectado
              millones de asistentes con experiencias que resuenan con sus
              pasiones.
            </p>
            <p className="text-gray-400 mb-8">
              Nuestra plataforma combina tecnología de vanguardia con un enfoque
              centrado en el usuario para crear el ecosistema de eventos más
              completo y accesible del mercado.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-cyan-400 h-5 w-5" />
                <span className="text-gray-300">Eventos verificados</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="text-cyan-400 h-5 w-5" />
                <span className="text-gray-300">Pago seguro</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="text-cyan-400 h-5 w-5" />
                <span className="text-gray-300">Soporte 24/7</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="text-cyan-400 h-5 w-5" />
                <span className="text-gray-300">Reembolso garantizado</span>
              </div>
            </div>
          </div>

          <div className="relative h-[400px] rounded-xl overflow-hidden shadow-lg border border-cyan-900/20">
            <Image
              src="/images/about-mission.jpg"
              alt="Our mission"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerChildren}
        className="mb-24 py-12 px-8 rounded-2xl bg-gradient-to-r from-[#0F1A24] to-[#1A2836] border border-gray-800"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Nuestro Impacto
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Números que reflejan nuestro compromiso con la creación de
            experiencias excepcionales
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            {
              icon: <Calendar className="h-8 w-8 text-cyan-400" />,
              number: "10K+",
              label: "Eventos Mensuales",
            },
            {
              icon: <Users className="h-8 w-8 text-cyan-400" />,
              number: "1.5M+",
              label: "Usuarios Activos",
            },
            {
              icon: <MapPin className="h-8 w-8 text-cyan-400" />,
              number: "120+",
              label: "Ciudades",
            },
            {
              icon: <Award className="h-8 w-8 text-cyan-400" />,
              number: "98%",
              label: "Satisfacción",
            },
          ].map((stat, index) => (
            <motion.div key={index} variants={fadeIn} className="text-center">
              <div className="bg-[#0D1621] p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                {stat.icon}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">
                {stat.number}
              </h3>
              <p className="text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="mb-24">
        <div className="text-center mb-16">
          <span className="text-cyan-400 text-sm font-semibold tracking-wider mb-2 block">
            POR QUÉ ELEGIRNOS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Características que nos Distinguen
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Diseñamos cada aspecto de nuestra plataforma pensando en tu
            experiencia
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerChildren}
          className="grid md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: <Zap className="h-10 w-10 text-cyan-400" />,
              title: "Experiencia Sin Fricciones",
              description:
                "Desde el descubrimiento hasta el check-in, todo el proceso está diseñado para ser rápido e intuitivo.",
            },
            {
              icon: <Shield className="h-10 w-10 text-cyan-400" />,
              title: "Seguridad Garantizada",
              description:
                "Transacciones seguras y verificación de eventos para proteger a todos los usuarios.",
            },
            {
              icon: <Clock className="h-10 w-10 text-cyan-400" />,
              title: "Siempre al Día",
              description:
                "Descubre eventos en tiempo real con notificaciones personalizadas según tus intereses.",
            },
            {
              icon: <Heart className="h-10 w-10 text-cyan-400" />,
              title: "Recomendaciones Personalizadas",
              description:
                "Nuestro algoritmo aprende de tus preferencias para mostrarte eventos que te encantarán.",
            },
            {
              icon: <Star className="h-10 w-10 text-cyan-400" />,
              title: "Experiencias Premium",
              description:
                "Acceso a eventos exclusivos y ofertas especiales para miembros de nuestra comunidad.",
            },
            {
              icon: <MapPin className="h-10 w-10 text-cyan-400" />,
              title: "Eventos Locales",
              description:
                "Conectamos personas con lo mejor de su comunidad, impulsando economías locales.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              className="bg-[#0F1A24] border border-gray-800 rounded-xl p-6 hover:border-cyan-900 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-900/10"
            >
              <div className="bg-gradient-to-br from-[#1A2836] to-[#243442] p-3 rounded-lg w-fit mb-5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Team Section */}
      <section className="mb-20">
        <div className="text-center mb-16">
          <span className="text-cyan-400 text-sm font-semibold tracking-wider mb-2 block">
            NUESTRO EQUIPO
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Mentes Creativas
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Un grupo diverso de profesionales apasionados por crear experiencias
            excepcionales
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerChildren}
          className="grid md:grid-cols-4 gap-8"
        >
          {[
            {
              name: "Alejandra Moreno",
              position: "CEO & Fundadora",
              image: "/images/team-1.jpg",
            },
            {
              name: "Carlos Vega",
              position: "CTO",
              image: "/images/team-2.jpg",
            },
            {
              name: "Sofia Blanco",
              position: "Directora de Diseño",
              image: "/images/team-3.jpg",
            },
            {
              name: "Diego Fuentes",
              position: "Jefe de Operaciones",
              image: "/images/team-4.jpg",
            },
          ].map((member, index) => (
            <motion.div key={index} variants={fadeIn} className="group">
              <div className="relative h-[350px] rounded-xl overflow-hidden mb-4 border border-gray-800 group-hover:border-cyan-900 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-t from-[#111E27] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-semibold text-white">
                {member.name}
              </h3>
              <p className="text-cyan-400">{member.position}</p>
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
        className="text-center py-16 px-6 md:px-20 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Únete a la Revolución de Eventos
        </h2>
        <p className="text-gray-100 max-w-3xl mx-auto mb-10 text-lg">
          Descubre eventos que resuenan con tus pasiones, conoce a personas con
          tus mismos intereses y crea recuerdos que durarán toda la vida.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button className="bg-white text-blue-600 font-medium px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
            Explorar Eventos
          </button>
          <button className="bg-transparent text-white border border-white font-medium px-8 py-3 rounded-lg hover:bg-white/10 transition-colors">
            Contactar
          </button>
        </div>
      </motion.section>
    </div>
  );
}
