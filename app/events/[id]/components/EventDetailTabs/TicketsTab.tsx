import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Ticket, Plus, Minus, CreditCard } from "lucide-react";
import Image from "next/image";
import { useState, memo } from "react";
import { toast } from "sonner";

type TicketsTabProps = {
  event: any;
};

const TicketsTab = memo(({ event }: TicketsTabProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  // Precio único para todos
  const ticketPrice = 250;

  const handleIncrement = () => {
    setQuantity((prev) => Math.min(prev + 1, 10));
  };

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  const handlePurchase = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      toast.success("¡Compra realizada con éxito!", {
        description: `Has adquirido ${quantity} entrada${
          quantity > 1 ? "s" : ""
        } para "${event.name}".`,
      });
    }, 1500);
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-6">
        Entrada para el evento
      </h3>

      <div className="bg-[#0D1621] border border-gray-800 rounded-lg p-6 mb-8">
        <div className="flex gap-4 items-center">
          <div className="bg-cyan-500/20 h-16 w-16 rounded-lg flex items-center justify-center flex-shrink-0">
            <Ticket className="h-8 w-8 text-cyan-400" />
          </div>
          <div className="flex-1">
            <h4 className="text-white font-medium text-lg">Entrada General</h4>
            <p className="text-gray-400">
              Acceso completo a todas las actividades del evento
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">
              {ticketPrice} CUP
            </div>
            <div className="text-cyan-400 text-sm">Disponible</div>
          </div>
        </div>
      </div>

      <div className="bg-[#0D1621] border border-gray-800 rounded-lg p-6">
        <h4 className="text-lg font-medium text-white mb-4">
          Finalizar compra
        </h4>

        <div className="grid gap-6">
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="w-full sm:w-1/2">
              <label
                htmlFor="quantity"
                className="block text-gray-400 text-sm mb-2"
              >
                Cantidad de entradas
              </label>
              <div className="flex">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleDecrement}
                  disabled={quantity <= 1 || isProcessing}
                  className="rounded-r-none border-gray-700 cursor-pointer"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  id="quantity"
                  min="1"
                  max="10"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-16 text-center rounded-none border-gray-700"
                  disabled={isProcessing}
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleIncrement}
                  disabled={quantity >= 10 || isProcessing}
                  className="rounded-l-none border-gray-700 cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="w-full sm:w-1/2">
              <label
                htmlFor="promo"
                className="block text-gray-400 text-sm mb-2"
              >
                Código promocional (opcional)
              </label>
              <Input
                id="promo"
                placeholder="Introduce tu código"
                className="border-gray-700"
                disabled={isProcessing}
              />
            </div>
          </div>

          <div className="flex justify-between items-center py-4 border-t border-gray-800">
            <div>
              <span className="text-white font-medium">Total a pagar</span>
              <p className="text-gray-500 text-sm">Incluye impuestos</p>
            </div>
            <span className="text-2xl font-bold text-cyan-400">
              {(ticketPrice * quantity).toFixed(0)} CUP
            </span>
          </div>

          <Button
            onClick={handlePurchase}
            className="w-full bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-600 hover:to-cyan-500 text-black font-medium py-6"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <div className="h-5 w-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                Procesando...
              </>
            ) : (
              <>
                <CreditCard className="mr-2 h-5 w-5" />
                Comprar ahora
              </>
            )}
          </Button>

          <div className="mt-4 flex justify-center gap-4">
            <Image
              height={32}
              width={32}
              src="/images/payment/mipymes.png"
              alt="Pago MiPymes"
              className="h-8"
            />
            <Image
              height={32}
              width={32}
              src="/images/payment/transfermovil.png"
              alt="TransferMóvil"
              className="h-8"
            />
            <Image
              height={32}
              width={32}
              src="/images/payment/qr.png"
              alt="Pago QR"
              className="h-8"
            />
          </div>

          <p className="text-gray-400 text-sm text-center">
            Al completar la compra, aceptas los términos y condiciones. Las
            entradas te serán enviadas por correo electrónico.
          </p>
        </div>
      </div>
    </div>
  );
});

TicketsTab.displayName = "TicketsTab";

export default TicketsTab;
