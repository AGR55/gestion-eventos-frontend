import Image from "next/image";
import { useState } from "react";
import { memo } from "react";
import { motion } from "framer-motion";
import { Eye, Expand, Share2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

type EventGalleryProps = {
  mainImage: string;
  gallery?: string[];
  eventName: string;
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const EventGallery = memo(
  ({ mainImage, gallery = [], eventName }: EventGalleryProps) => {
    const [activeImage, setActiveImage] = useState(mainImage);
    const [showFullscreen, setShowFullscreen] = useState(false);

    const allImages = [mainImage, ...gallery];

    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="bg-gradient-to-br from-gray-900/80 via-gray-800/50 to-gray-900/80 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-6 relative overflow-hidden"
      >
        {/* Elementos decorativos */}
        <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-cyan-500/10 blur-2xl"></div>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Galería del evento</h3>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="bg-gray-800/50 border-gray-600/50 text-gray-300 hover:bg-gray-700/50"
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-gray-800/50 border-gray-600/50 text-gray-300 hover:bg-gray-700/50"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Imagen principal */}
          <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-6 group">
            <Image
              src={activeImage}
              alt={eventName}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
            />

            {/* Overlay con acciones */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <div>
                  <p className="text-white font-semibold">{eventName}</p>
                  <p className="text-gray-300 text-sm">
                    Imagen {allImages.indexOf(activeImage) + 1} de{" "}
                    {allImages.length}
                  </p>
                </div>
                <Button
                  size="sm"
                  onClick={() => setShowFullscreen(true)}
                  className="bg-black/50 hover:bg-black/70 text-white border-white/20"
                >
                  <Expand className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Thumbnails mejorados */}
          {allImages.length > 1 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-white font-medium">Más imágenes</h4>
                <span className="text-gray-400 text-sm">
                  {allImages.length} fotos
                </span>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {allImages.map((img: string, index: number) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative h-20 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                      activeImage === img
                        ? "ring-2 ring-cyan-400 shadow-lg shadow-cyan-400/25"
                        : "hover:ring-2 hover:ring-gray-400"
                    }`}
                    onClick={() => setActiveImage(img)}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />

                    {/* Overlay indicator */}
                    {activeImage === img && (
                      <div className="absolute inset-0 bg-cyan-400/20 flex items-center justify-center">
                        <div className="w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center">
                          <Eye className="h-3 w-3 text-black" />
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Stats de la galería */}
          <div className="mt-6 pt-6 border-t border-gray-700/50">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-cyan-400">
                  {allImages.length}
                </div>
                <div className="text-gray-400 text-sm">Imágenes</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400">4.9</div>
                <div className="text-gray-400 text-sm">Calidad</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-emerald-400">HD</div>
                <div className="text-gray-400 text-sm">Resolución</div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal fullscreen (placeholder) */}
        {showFullscreen && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setShowFullscreen(false)}
          >
            <div className="relative max-w-4xl max-h-full">
              <Image
                src={activeImage}
                alt={eventName}
                width={800}
                height={600}
                className="object-contain"
              />
              <Button
                onClick={() => setShowFullscreen(false)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70"
                size="sm"
              >
                ✕
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    );
  }
);

EventGallery.displayName = "EventGallery";

export default EventGallery;
