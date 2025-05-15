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
} from "@/components/ui/dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, RefreshCw, XCircle } from "lucide-react";
import { toast } from "sonner";

interface VerificationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email: string;
  onVerificationSuccess: () => void;
  onVerificationCancel: () => void;
}

export function VerificationModal({
  open,
  onOpenChange,
  email,
  onVerificationSuccess,
  onVerificationCancel,
}: VerificationModalProps) {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verificationError, setVerificationError] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
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
        setVerificationError(false);
      }, 300);
    }
  }, [open]);

  const handleVerify = async () => {
    if (code.length !== 6) return;

    setIsLoading(true);
    setVerificationError(false);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/Auth/verify-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            code: code,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Código de verificación inválido");
      }

      // Success verification
      setIsVerified(true);
      setTimeout(() => {
        onVerificationSuccess();
        setOpen(false);
      }, 1500);
    } catch (error) {
      console.error("Verification failed:", error);
      setVerificationError(true);
      toast.error("Verificación fallida", {
        description: error instanceof Error ? error.message : "Código incorrecto",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/Auth/resend-verification`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al reenviar el código");
      }

      // Reset code and countdown
      setCode("");
      setCountdown(60);
      setCanResend(false);
      toast.success("Código reenviado", {
        description: "Se ha enviado un nuevo código a tu correo electrónico",
      });
    } catch (error) {
      console.error("Failed to resend code:", error);
      toast.error("Error al reenviar", {
        description: error instanceof Error ? error.message : "Inténtalo de nuevo más tarde",
      });
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
    <Dialog open={open} onOpenChange={onOpenChange}>
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
            ) : verificationError ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-2"
              >
                <XCircle className="h-5 w-5 text-red-500" />
                <span>Código incorrecto</span>
              </motion.div>
            ) : (
              "Verificación de correo"
            )}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {isVerified
              ? "Tu cuenta ha sido verificada correctamente."
              : `Hemos enviado un código de 6 dígitos a ${email}`}
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
                      className={`bg-[#1A2836] border-gray-700 text-white w-12 h-12 text-xl ${verificationError ? 'border-red-500' : ''}`}
                    />
                    <InputOTPSlot
                      index={1}
                      className={`bg-[#1A2836] border-gray-700 text-white w-12 h-12 text-xl ${verificationError ? 'border-red-500' : ''}`}
                    />
                    <InputOTPSlot
                      index={2}
                      className={`bg-[#1A2836] border-gray-700 text-white w-12 h-12 text-xl ${verificationError ? 'border-red-500' : ''}`}
                    />
                    <InputOTPSlot
                      index={3}
                      className={`bg-[#1A2836] border-gray-700 text-white w-12 h-12 text-xl ${verificationError ? 'border-red-500' : ''}`}
                    />
                    <InputOTPSlot
                      index={4}
                      className={`bg-[#1A2836] border-gray-700 text-white w-12 h-12 text-xl ${verificationError ? 'border-red-500' : ''}`}
                    />
                    <InputOTPSlot
                      index={5}
                      className={`bg-[#1A2836] border-gray-700 text-white w-12 h-12 text-xl ${verificationError ? 'border-red-500' : ''}`}
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
              <Button
                type="button"
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
                disabled={isLoading}
                onClick={onVerificationCancel}
              >
                Cancelar
              </Button>
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
              <Button
                type="button"
                className="bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 text-black"
                onClick={() => onOpenChange(false)}
              >
                Continuar
              </Button>
            </motion.div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
