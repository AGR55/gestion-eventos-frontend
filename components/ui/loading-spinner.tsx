import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  text?: string;
  className?: string;
  fullScreen?: boolean;
}

export default function LoadingSpinner({
  size = "medium",
  text = "Cargando...",
  className = "",
  fullScreen = true,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    small: "w-8 h-8",
    medium: "w-16 h-16",
    large: "w-20 h-20",
  };

  const textSizes = {
    small: "text-sm",
    medium: "text-lg",
    large: "text-xl",
  };

  const containerClass = fullScreen
    ? "min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center"
    : "flex items-center justify-center p-8";

  return (
    <div className={`${containerClass} ${className}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="relative mb-6">
          <div
            className={`${sizeClasses[size]} border-4 border-cyan-400/30 rounded-full animate-spin mx-auto`}
          ></div>
          <div
            className={`absolute inset-0 ${sizeClasses[size]} border-4 border-t-cyan-400 rounded-full animate-spin mx-auto`}
          ></div>

          {/* Pulso interno */}
          <motion.div
            className={`absolute inset-2 bg-cyan-400/20 rounded-full`}
            animate={{ scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className={`text-white font-semibold mb-2 ${textSizes[size]}`}>
            {text}
          </h3>
          <p className="text-gray-400 text-sm">Preparando tu información...</p>

          {/* Puntos animados */}
          <div className="flex justify-center gap-1 mt-4">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-cyan-400 rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
