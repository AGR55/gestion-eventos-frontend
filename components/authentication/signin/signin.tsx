"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { SocialButton } from "@/components/authentication/social_buttons/social_buttons";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import { signinSchema } from "@/lib/validations/auth";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { VerificationModal } from "@/components/ui/modals/verification_modal";

type SigninFormValues = z.infer<typeof signinSchema>;

export const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [verificationModalOpen, setVerificationModalOpen] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState("");
  const router = useRouter();

  const form = useForm<SigninFormValues>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit(data: SigninFormValues) {
    setIsLoading(true);
    try {
      const loginResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/Auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
        }
      );

      const responseData = await loginResponse.json();

      if (!loginResponse.ok) {
        if (responseData.code === "EmailNotVerified") {
          setUnverifiedEmail(data.email);
          setVerificationModalOpen(true);
          toast.warning("Cuenta no verificada", {
            description: "Por favor verifica tu correo electrónico para continuar.",
          });
          return;
        }
        
        throw new Error(responseData.message || "Error al iniciar sesión");
      }

      localStorage.setItem("token", responseData.token);
      
      if (data.rememberMe) {
        localStorage.setItem("rememberedEmail", data.email);
      }

      toast.success("¡Inicio de sesión exitoso!", {
        description: "Bienvenido de nuevo.",
      });

      router.push("/");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Error al iniciar sesión", {
        description: 
          error instanceof Error
            ? error.message
            : "Credenciales incorrectas o error de conexión",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleVerificationSuccess = async () => {
    try {
      setIsLoading(true);
      const formData = form.getValues();

      const loginResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/Auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      if (!loginResponse.ok) {
        throw new Error("Error al iniciar sesión automáticamente");
      }

      const loginData = await loginResponse.json();
      localStorage.setItem("token", loginData.token);

      toast.success("¡Cuenta verificada!", {
        description: "Has iniciado sesión correctamente.",
      });

      router.push("/");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Error al iniciar sesión", {
        description: "Por favor, intenta iniciar sesión manualmente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerificationCancel = () => {
    setVerificationModalOpen(false);
    toast("Verificación pendiente", {
      description: "Necesitas verificar tu cuenta para iniciar sesión.",
    });
  };

  return (
    <>
      <Form {...form}>
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300 font-medium mb-1.5 flex items-center">
                  <Mail size={16} className="mr-2 text-cyan-400" />
                  Correo Electrónico
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="tu.email@ejemplo.com"
                    className="bg-[#0F1A24] border-gray-700 focus-visible:ring-cyan-500 focus-visible:border-cyan-500 text-white h-12 pl-4"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage className="text-red-400 text-sm mt-1" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300 font-medium mb-1.5 flex items-center">
                  <Lock size={16} className="mr-2 text-cyan-400" />
                  Contraseña
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="bg-[#0F1A24] border-gray-700 focus-visible:ring-cyan-500 focus-visible:border-cyan-500 text-white h-12 pr-10 pl-4"
                      {...field}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-300 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="text-red-400 text-sm mt-1" />
              </FormItem>
            )}
          />

          <div className="flex justify-between items-center pt-1">
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex items-center space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="border-gray-600 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500 cursor-pointer w-[18px] h-[18px] rounded-sm"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormLabel className="text-sm text-gray-400 cursor-pointer">
                    Recordarme
                  </FormLabel>
                </FormItem>
              )}
            />

            <a
              href="#"
              className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-600 hover:to-cyan-500 text-black font-medium py-6 h-12 rounded-lg shadow-lg shadow-cyan-500/20 transition-all duration-200 mt-6"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Procesando...
              </>
            ) : (
              "Iniciar Sesión"
            )}
          </Button>

          <div className="flex items-center justify-center my-6">
            <div className="flex-grow h-px bg-gray-800"></div>
            <span className="px-4 text-gray-400 text-sm">o continúa con</span>
            <div className="flex-grow h-px bg-gray-800"></div>
          </div>

          <div className="flex flex-col gap-4">
            <SocialButton icon="google" label="GOOGLE" />
            <SocialButton icon="facebook" label="FACEBOOK" />
          </div>
        </motion.form>
      </Form>

      <VerificationModal
        open={verificationModalOpen}
        onOpenChange={setVerificationModalOpen}
        email={unverifiedEmail}
        onVerificationSuccess={handleVerificationSuccess}
        onVerificationCancel={handleVerificationCancel}
      />
    </>
  );
};