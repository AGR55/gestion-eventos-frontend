import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Ticket,
  Plus,
  Minus,
  CreditCard,
  Shield,
  CheckCircle,
  Clock,
  Gift,
} from "lucide-react";
import Image from "next/image";
import { useState, memo } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

type TicketsTabProps = {
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

const TicketsTab = memo(({ event }: TicketsTabProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  // Precio único para todos
  const ticketPrice = 250;

  const handleIncrement = () => {
    setQuantity((prev) => Math.min(prev + 1, 10));
  };

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  const handlePromoCode = () => {
    if (promoCode.toLowerCase() === "descuento10") {
      setDiscount(0.1);
      toast.success("¡Código aplicado!", {
        description: "10% de descuento aplicado correctamente",
      });
    } else if (promoCode) {
      toast.error("Código inválido", {
        description: "El código promocional no es válido",
      });
    }
  };

  const handlePurchase = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      toast.success("¡Compra realizada con éxito!", {
        description: `Has adquirido ${quantity} entrada${
          quantity > 1 ? "s" : ""
        } para "${event.name}".`,
        action: {
          label: "Ver entradas",
          onClick: () => console.log("Ver entradas"),
        },
      });
    }, 1500);
  };

  const subtotal = ticketPrice * quantity;
  const discountAmount = subtotal * discount;
  const total = subtotal - discountAmount;

  return (
    <motion.div initial="hidden" animate="visible" variants={staggerChildren}>
      <motion.div variants={fadeIn} className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">Comprar entradas</h3>
        <p className="text-gray-400">
          Selecciona la cantidad de entradas y completa tu compra de forma
          segura
        </p>
      </motion.div>

      {/* Tipo de entrada */}
      <motion.div
        variants={fadeIn}
        className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 mb-8 hover:border-cyan-500/30 transition-all duration-300"
      >
        <div className="flex gap-6 items-center">
          <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 h-20 w-20 rounded-2xl flex items-center justify-center flex-shrink-0 border border-cyan-500/30">
            <Ticket className="h-10 w-10 text-cyan-400" />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h4 className="text-white font-bold text-xl">Entrada General</h4>
              <div className="flex items-center gap-1 bg-green-500/10 text-green-400 px-2 py-1 rounded-full text-xs border border-green-500/30">
                <CheckCircle className="h-3 w-3" />
                <span>Disponible</span>
              </div>
            </div>

            <p className="text-gray-300 mb-3">
              Acceso completo a todas las actividades, áreas VIP incluidas y
              gift de bienvenida
            </p>

            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <Shield className="h-4 w-4 text-green-400" />
                <span>Transferencia segura</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Clock className="h-4 w-4 text-cyan-400" />
                <span>Confirmación instantánea</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Gift className="h-4 w-4 text-purple-400" />
                <span>Gift incluido</span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-3xl font-bold text-white mb-1">
              {ticketPrice} CUP
            </div>
            <div className="text-cyan-400 text-sm font-medium">por persona</div>
            <div className="text-gray-500 text-xs">impuestos incluidos</div>
          </div>
        </div>
      </motion.div>

      {/* Formulario de compra */}
      <motion.div
        variants={fadeIn}
        className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8"
      >
        <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-cyan-400" />
          Completar compra
        </h4>

        <div className="space-y-8">
          {/* Selección de cantidad */}
          <div>
            <label className="block text-gray-300 font-medium mb-4">
              Cantidad de entradas
            </label>
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-gray-900/50 rounded-xl border border-gray-600/50">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleDecrement}
                  disabled={quantity <= 1 || isProcessing}
                  className="text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-l-xl"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="px-6 py-3 text-white font-semibold text-lg min-w-[60px] text-center">
                  {quantity}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleIncrement}
                  disabled={quantity >= 10 || isProcessing}
                  className="text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-r-xl"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="text-gray-400 text-sm">
                Máximo 10 entradas por compra
              </div>
            </div>
          </div>

          {/* Código promocional */}
          <div>
            <label className="block text-gray-300 font-medium mb-4">
              Código promocional (opcional)
            </label>
            <div className="flex gap-3">
              <Input
                placeholder="Introduce tu código"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="bg-gray-900/50 border-gray-600/50 text-white placeholder:text-gray-400 rounded-xl"
                disabled={isProcessing}
              />
              <Button
                onClick={handlePromoCode}
                variant="outline"
                className="bg-gray-800/50 border-gray-600/50 text-gray-300 hover:bg-gray-700/50 rounded-xl px-6"
                disabled={isProcessing || !promoCode}
              >
                Aplicar
              </Button>
            </div>
          </div>

          {/* Resumen de compra */}
          <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-600/50">
            <h5 className="text-white font-semibold mb-4">Resumen de compra</h5>

            <div className="space-y-3">
              <div className="flex justify-between text-gray-300">
                <span>
                  Subtotal ({quantity} entrada{quantity > 1 ? "s" : ""})
                </span>
                <span>{subtotal.toFixed(0)} CUP</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-green-400">
                  <span>Descuento (10%)</span>
                  <span>-{discountAmount.toFixed(0)} CUP</span>
                </div>
              )}

              <div className="flex justify-between text-gray-400 text-sm">
                <span>Comisión de servicio</span>
                <span>Incluida</span>
              </div>

              <div className="border-t border-gray-600/50 pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-white font-bold text-lg">Total</span>
                  <span className="text-2xl font-bold text-cyan-400">
                    {total.toFixed(0)} CUP
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Botón de compra */}
          <Button
            onClick={handlePurchase}
            className="w-full h-16 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                Procesando compra...
              </>
            ) : (
              <>
                <CreditCard className="mr-3 h-6 w-6" />
                Comprar ahora - {total.toFixed(0)} CUP
              </>
            )}
          </Button>

          {/* Métodos de pago */}
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-4">
              Métodos de pago aceptados
            </p>
            <div className="flex justify-center gap-6">
              <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-600/50">
                <Image
                  height={24}
                  width={24}
                  src="/images/payment/transfermovil.png"
                  alt="TransferMóvil"
                  className="h-6 opacity-80"
                />
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-600/50">
                <Image
                  height={24}
                  width={24}
                  src="/images/payment/mipymes.png"
                  alt="Pago MiPymes"
                  className="h-6 opacity-80"
                />
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-600/50">
                <Image
                  height={24}
                  width={24}
                  src="/images/payment/qr.png"
                  alt="Pago QR"
                  className="h-6 opacity-80"
                />
              </div>
            </div>
          </div>

          {/* Información de seguridad */}
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-green-400" />
              <div>
                <p className="text-green-400 font-medium text-sm">
                  Compra 100% segura
                </p>
                <p className="text-gray-300 text-xs">
                  Tus datos están protegidos con encriptación de nivel bancario
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});

TicketsTab.displayName = "TicketsTab";

export default TicketsTab;
