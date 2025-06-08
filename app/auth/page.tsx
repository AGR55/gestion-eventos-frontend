"use client";

import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { useState } from "react";

// Importa los componentes de formulario directamente
import { SignInForm } from "@/components/authentication/signin/signin";
import { SignUpForm } from "@/components/authentication/signup/signup";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<string>("signin");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] flex items-center justify-center p-4">
      <div className="w-full h-[800px] max-w-6xl grid lg:grid-cols-2 rounded-3xl overflow-hidden bg-[#111E27]/40 backdrop-blur-md border border-white/10 shadow-[0_0_35px_rgba(0,200,255,0.1)] mt-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative hidden lg:block"
        >
          <div className="absolute inset-0">
            <Image
              alt="event_background"
              src="/auth.webp"
              fill
              style={{ objectFit: "cover" }}
              className="brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#111E27]/80 to-transparent"></div>
          </div>

          <div className="relative z-10 h-full flex flex-col justify-between p-12">
            <div className="mb-auto">
              <div className="text-3xl font-light">
                <span className="font-extrabold text-white">E-VENT</span>
                <span className="text-white"> HORIZON</span>
              </div>
              <p className="text-gray-300 text-lg max-w-md">
                Descubre eventos exclusivos, conecta con personas afines y crea
                experiencias inolvidables
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <svg
                    className="h-6 w-6 text-cyan-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-medium">Descubre eventos</h3>
                  <p className="text-gray-400 text-sm">
                    Eventos seleccionados para ti
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <svg
                    className="h-6 w-6 text-cyan-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-medium">Comunidad activa</h3>
                  <p className="text-gray-400 text-sm">
                    Conecta con personas afines
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-8 lg:p-12"
        >
          <Tabs
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 mb-8 bg-transparent">
              <TabsTrigger
                value="signin"
                className={`text-base text-white border-b-2 transition-all py-3 px-2 font-medium cursor-pointer
                  ${
                    activeTab === "signin"
                      ? ""
                      : "border-transparent text-gray-400 hover:text-gray-300"
                  }`}
              >
                Iniciar Sesión
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className={`text-base text-white border-b-2 transition-all py-3 px-2 font-medium cursor-pointer
                  ${
                    activeTab === "signup"
                      ? ""
                      : "border-transparent text-gray-400 hover:text-gray-300"
                  }`}
              >
                Registrarse
              </TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <SignInForm />
            </TabsContent>
            <TabsContent value="signup">
              <SignUpForm />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
