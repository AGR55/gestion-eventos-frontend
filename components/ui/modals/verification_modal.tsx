"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, RefreshCw } from "lucide-react";

export function VerificationModal() {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [open, setOpen] = useState(false);
  const firstInputRef = useRef(null);

  // Countdown timer for resend code
  useEffect(() => {
    if (!open) return;

    if (countdown > 0 && !canResend) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && !canResend) {
      setCanResend(true);
    }
  }, [countdown, canResend, open]);

  // Focus first input when modal opens
  useEffect(() => {
    if (open && firstInputRef.current) {
      setTimeout(() => {
        if (firstInputRef.current) {
          // @ts-ignore
          firstInputRef.current.focus();
        }
      }, 100);
    }
  }, [open]);

  // Reset states when modal closes
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setCode("");
        setIsVerified(false);
        setIsLoading(false);
        setCountdown(60);
        setCanResend(false);
      }, 300);
    }
  }, [open]);

  const handleVerify = async () => {
    if (code.length !== 6) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Success verification
      setIsVerified(true);
      setTimeout(() => {
        setOpen(false);
      }, 1500);
    } catch (error) {
      console.error("Verification failed:", error);
      // Handle error - you could show an error message here
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Reset code and countdown
      setCode("");
      setCountdown(60);
      setCanResend(false);
    } catch (error) {
      console.error("Failed to resend code:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-submit when all 6 digits are entered
  useEffect(() => {
    if (code.length === 6) {
      handleVerify();
    }
  }, [code]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          Registrarme
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-[#0F1A24] border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            {isVerified ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-2"
              >
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>Verificación exitosa</span>
              </motion.div>
            ) : (
              "Verificación de registro"
            )}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {isVerified
              ? "Tu cuenta ha sido verificada correctamente."
              : "Hemos enviado un código de 6 dígitos a tu correo."}
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence>
          {!isVerified && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col w-full items-center gap-4 py-4"
            >
              <div className="flex w-full justify-center items-center">
                <InputOTP
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                  value={code}
                  onChange={setCode}
                  className="gap-2 w-full"
                  disabled={isLoading}
                >
                  <InputOTPGroup>
                    <InputOTPSlot
                      ref={firstInputRef}
                      index={0}
                      className="bg-[#1A2836] border-gray-700 text-white w-12 h-12 text-xl"
                    />
                    <InputOTPSlot
                      index={1}
                      className="bg-[#1A2836] border-gray-700 text-white w-12 h-12 text-xl"
                    />
                    <InputOTPSlot
                      index={2}
                      className="bg-[#1A2836] border-gray-700 text-white w-12 h-12 text-xl"
                    />
                    <InputOTPSlot
                      index={3}
                      className="bg-[#1A2836] border-gray-700 text-white w-12 h-12 text-xl"
                    />
                    <InputOTPSlot
                      index={4}
                      className="bg-[#1A2836] border-gray-700 text-white w-12 h-12 text-xl"
                    />
                    <InputOTPSlot
                      index={5}
                      className="bg-[#1A2836] border-gray-700 text-white w-12 h-12 text-xl"
                    />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <div className="text-sm text-gray-400 flex items-center gap-2">
                {canResend ? (
                  <button
                    onClick={handleResendCode}
                    disabled={isLoading}
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 disabled:opacity-50 cursor-pointer"
                  >
                    <RefreshCw className="h-3 w-3" />
                    <span>Reenviar código</span>
                  </button>
                ) : (
                  <span>Reenviar código en {countdown}s</span>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <DialogFooter className="justify-end mt-2">
          {!isVerified && (
            <>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800"
                  disabled={isLoading}
                >
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                type="button"
                onClick={handleVerify}
                disabled={code.length !== 6 || isLoading}
                className={`relative bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-600 hover:to-cyan-500 text-black transition-all duration-200 ${
                  isLoading ? "pl-9" : ""
                }`}
              >
                {isLoading && (
                  <RefreshCw className="absolute left-3 h-4 w-4 animate-spin" />
                )}
                Verificar
              </Button>
            </>
          )}
          {isVerified && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <DialogClose asChild>
                <Button
                  type="button"
                  className="bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 text-black"
                >
                  Continuar
                </Button>
              </DialogClose>
            </motion.div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
