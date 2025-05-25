import {
  Map,
  MapPin,
  Navigation,
  Clock,
  Phone,
  ExternalLink,
  Car,
  Bus,
  Train,
} from "lucide-react";
import { memo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

type LocationTabProps = {
  event: any;
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

const LocationTab = memo(({ event }: LocationTabProps) => {
  const [mapLoaded, setMapLoaded] = useState(false);

  const handleLoadMap = () => {
    setMapLoaded(true);
  };

  const venueInfo = {
    name: "Centro Cultural Plaza de Armas",
    address: event.location || "Calle Tacón #1, La Habana Vieja",
    fullAddress:
      event.fullAddress ||
      "Calle Tacón #1, entre O'Reilly y Empedrado, La Habana Vieja, La Habana, Cuba",
    phone: "+53 7 861-3988",
    capacity: "500 personas",
    accessibility: true,
    parking: true,
    publicTransport: true,
  };

  const transportOptions = [
    {
      icon: Bus,
      title: "Transporte Público",
      description: "Líneas P7 y P5 con paradas cercanas",
      details: [
        "P7 - Parada Central (5 min a pie)",
        "P5 - Parada Norte (7 min a pie)",
        "Servicio regular hasta las 23:00",
      ],
      color: "text-green-400",
      bgColor: "bg-green-500/20",
    },
    {
      icon: Car,
      title: "Taxi Colectivo",
      description: "Múltiples rutas disponibles",
      details: [
        "Ruta 27 - Parada Centro Cultural",
        "Ruta 15 - Plaza de Armas",
        "Servicio hasta las 24:00",
      ],
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/20",
    },
    {
      icon: Car,
      title: "Estacionamiento",
      description: "Opciones de parqueo seguro",
      details: [
        "Plaza Vieja (200m) - Tarifa especial",
        "Estacionamiento Obispo (300m)",
        "Valet parking disponible",
      ],
      color: "text-purple-400",
      bgColor: "bg-purple-500/20",
    },
  ];

  const nearbyPlaces = [
    {
      name: "Restaurante El Floridita",
      distance: "2 min a pie",
      type: "Gastronomía",
    },
    { name: "Hotel Santa Isabel", distance: "1 min a pie", type: "Hospedaje" },
    { name: "Museo de la Ciudad", distance: "3 min a pie", type: "Cultura" },
    { name: "Plaza de Armas", distance: "50m", type: "Punto de referencia" },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerChildren}
      className="space-y-8"
    >
      {/* Header de ubicación */}
      <motion.div variants={fadeIn}>
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <MapPin className="h-6 w-6 text-cyan-400" />
            </div>
            Ubicación del evento
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Información del venue */}
            <div>
              <h4 className="text-xl font-semibold text-white mb-4">
                {venueInfo.name}
              </h4>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-cyan-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">
                      {venueInfo.address}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {venueInfo.fullAddress}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                  <div>
                    <p className="text-white">{venueInfo.phone}</p>
                    <p className="text-gray-400 text-sm">Contacto del venue</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-purple-400 flex-shrink-0" />
                  <div>
                    <p className="text-white">
                      Capacidad: {venueInfo.capacity}
                    </p>
                    <p className="text-gray-400 text-sm">Aforo controlado</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/30 rounded-xl"
                  variant="outline"
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  Cómo llegar
                </Button>

                <Button
                  className="bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 border border-gray-600/50 rounded-xl"
                  variant="outline"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Ver en Google Maps
                </Button>
              </div>
            </div>

            {/* Features del venue */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">
                Características del lugar
              </h4>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-900/30 rounded-xl p-4 border border-gray-600/30">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-white font-medium text-sm">
                      Accesible
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs">
                    Rampa y ascensor disponibles
                  </p>
                </div>

                <div className="bg-gray-900/30 rounded-xl p-4 border border-gray-600/30">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span className="text-white font-medium text-sm">
                      Climatizado
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs">
                    Aire acondicionado central
                  </p>
                </div>

                <div className="bg-gray-900/30 rounded-xl p-4 border border-gray-600/30">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-white font-medium text-sm">
                      WiFi Gratis
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs">
                    Conexión de alta velocidad
                  </p>
                </div>

                <div className="bg-gray-900/30 rounded-xl p-4 border border-gray-600/30">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                    <span className="text-white font-medium text-sm">
                      Seguridad
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs">
                    Personal de seguridad 24/7
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mapa interactivo */}
      <motion.div variants={fadeIn}>
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
          {!mapLoaded ? (
            <div className="h-[400px] flex flex-col items-center justify-center p-8">
              <div className="bg-gray-900/50 rounded-2xl p-8 text-center border border-gray-600/30">
                <Map className="h-16 w-16 text-gray-600 mb-6 mx-auto" />
                <h4 className="text-white font-semibold mb-3">
                  Mapa interactivo
                </h4>
                <p className="text-gray-400 text-center max-w-md mb-6">
                  Para proteger tu privacidad, el mapa se cargará solo cuando lo
                  solicites. Incluye navegación turn-by-turn y puntos de interés
                  cercanos.
                </p>
                <Button
                  onClick={handleLoadMap}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-xl"
                >
                  <Map className="h-4 w-4 mr-2" />
                  Cargar mapa interactivo
                </Button>
              </div>
            </div>
          ) : (
            <div className="relative">
              <iframe
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  venueInfo.fullAddress
                )}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                className="w-full h-[400px]"
                frameBorder="0"
                scrolling="no"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa del evento"
              />

              {/* Overlay con información */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/95 via-gray-900/70 to-transparent p-6">
                <div className="flex items-center justify-between">
                  <div className="text-white">
                    <h4 className="font-semibold">{venueInfo.name}</h4>
                    <p className="text-sm text-gray-300">{venueInfo.address}</p>
                  </div>
                  <Button
                    size="sm"
                    className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg"
                  >
                    <Navigation className="h-4 w-4 mr-1" />
                    Navegar
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Opciones de transporte */}
      <motion.div variants={fadeIn}>
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 rounded-lg">
              <Navigation className="h-6 w-6 text-emerald-400" />
            </div>
            Cómo llegar
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {transportOptions.map((option, index) => (
              <div
                key={index}
                className="bg-gray-900/30 rounded-2xl p-6 border border-gray-600/30 hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`${option.bgColor} p-3 rounded-xl`}>
                    <option.icon className={`h-6 w-6 ${option.color}`} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{option.title}</h4>
                    <p className="text-gray-400 text-sm">
                      {option.description}
                    </p>
                  </div>
                </div>

                <ul className="space-y-2">
                  {option.details.map((detail, detailIndex) => (
                    <li
                      key={detailIndex}
                      className="flex items-center gap-2 text-sm"
                    >
                      <div className="w-1.5 h-1.5 bg-gray-500 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-300">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Lugares cercanos */}
      <motion.div variants={fadeIn}>
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
          <h3 className="text-xl font-bold text-white mb-6">
            Lugares de interés cercanos
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            {nearbyPlaces.map((place, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-900/30 rounded-xl border border-gray-600/30"
              >
                <div>
                  <h4 className="text-white font-medium">{place.name}</h4>
                  <p className="text-gray-400 text-sm">{place.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-cyan-400 font-medium text-sm">
                    {place.distance}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});

LocationTab.displayName = "LocationTab";

export default LocationTab;
