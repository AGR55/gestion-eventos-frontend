import { Map, MapPin } from "lucide-react";
import { memo, useState } from "react";

type LocationTabProps = {
  event: any;
};

const LocationTab = memo(({ event }: LocationTabProps) => {
  const [mapLoaded, setMapLoaded] = useState(false);

  const handleLoadMap = () => {
    setMapLoaded(true);
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-4">
        Ubicación del evento
      </h3>

      <div className="flex items-start gap-3 mb-6">
        <MapPin className="h-5 w-5 text-cyan-400 mt-1 flex-shrink-0" />
        <div>
          <p className="text-white">{event.location}</p>
          <p className="text-gray-400">{event.fullAddress}</p>
        </div>
      </div>

      {!mapLoaded ? (
        <div className="bg-[#0D1621] rounded-lg h-[400px] flex flex-col items-center justify-center border border-gray-800">
          <Map className="h-16 w-16 text-gray-600 mb-4" />
          <p className="text-gray-400 text-center max-w-md px-4">
            Para proteger tu privacidad, el mapa interactivo se cargará solo
            cuando lo solicites haciendo clic en el botón a continuación.
          </p>
          <button
            className="mt-4 bg-cyan-500 hover:bg-cyan-600 text-black font-medium py-2 px-4 rounded-md text-sm transition-colors cursor-pointer"
            onClick={handleLoadMap}
          >
            Cargar mapa interactivo
          </button>
        </div>
      ) : (
        <div className="bg-[#0D1621] rounded-lg h-[400px] border border-gray-800 overflow-hidden">
          <iframe
            src={`https://maps.google.com/maps?q=${encodeURIComponent(
              event.fullAddress
            )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
            className="w-full h-full"
            frameBorder="0"
            scrolling="no"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapa del evento"
          />
        </div>
      )}

      <div className="mt-8 grid gap-4">
        <h4 className="text-lg font-medium text-white">Cómo llegar</h4>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-[#0D1621] p-4 rounded-lg border border-gray-800">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-cyan-500/20 p-2 rounded">
                <svg className="h-5 w-5 text-cyan-400" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M4,16V6H2V16A2,2 0 0,0 4,18H20A2,2 0 0,0 22,16V6H20V16H4Z"
                  />
                </svg>
              </div>
              <span className="text-white font-medium">Transporte Público</span>
            </div>
            <p className="text-gray-400 text-sm">
              Línea P7 - Parada Central
              <br />
              Línea P5 - Parada Norte
              <br />A 5 minutos a pie
            </p>
          </div>

          <div className="bg-[#0D1621] p-4 rounded-lg border border-gray-800">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-cyan-500/20 p-2 rounded">
                <svg className="h-5 w-5 text-cyan-400" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M18,11H6V6H18M16.5,17A1.5,1.5 0 0,1 15,15.5A1.5,1.5 0 0,1 16.5,14A1.5,1.5 0 0,1 18,15.5A1.5,1.5 0 0,1 16.5,17M7.5,17A1.5,1.5 0 0,1 6,15.5A1.5,1.5 0 0,1 7.5,14A1.5,1.5 0 0,1 9,15.5A1.5,1.5 0 0,1 7.5,17M4,16C4,14.89 4.9,14 6,14A2,2 0 0,1 8,16A2,2 0 0,1 6,18A2,2 0 0,1 4,16M18.92,6C18.72,5.42 18.16,5 17.5,5H6.5C5.84,5 5.28,5.42 5.08,6L3,12V20A1,1 0 0,0 4,21H5A1,1 0 0,0 6,20V19H18V20A1,1 0 0,0 19,21H20A1,1 0 0,0 21,20V12L18.92,6Z"
                  />
                </svg>
              </div>
              <span className="text-white font-medium">Taxi Colectivo</span>
            </div>
            <p className="text-gray-400 text-sm">
              Ruta 27
              <br />
              Parada "Centro Cultural"
              <br />
              Justo en frente del recinto
            </p>
          </div>

          <div className="bg-[#0D1621] p-4 rounded-lg border border-gray-800">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-cyan-500/20 p-2 rounded">
                <svg className="h-5 w-5 text-cyan-400" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M5,11L6.5,6.5H17.5L19,11M17.5,16A1.5,1.5 0 0,1 16,14.5A1.5,1.5 0 0,1 17.5,13A1.5,1.5 0 0,1 19,14.5A1.5,1.5 0 0,1 17.5,16M6.5,16A1.5,1.5 0 0,1 5,14.5A1.5,1.5 0 0,1 6.5,13A1.5,1.5 0 0,1 8,14.5A1.5,1.5 0 0,1 6.5,16M18.92,6C18.72,5.42 18.16,5 17.5,5H6.5C5.84,5 5.28,5.42 5.08,6L3,12V20A1,1 0 0,0 4,21H5A1,1 0 0,0 6,20V19H18V20A1,1 0 0,0 19,21H20A1,1 0 0,0 21,20V12L18.92,6Z"
                  />
                </svg>
              </div>
              <span className="text-white font-medium">Estacionamiento</span>
            </div>
            <p className="text-gray-400 text-sm">
              Estacionamiento público "Plaza Vieja"
              <br />
              A 200 metros
              <br />
              Tarifa especial para asistentes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

LocationTab.displayName = "LocationTab";

export default LocationTab;
