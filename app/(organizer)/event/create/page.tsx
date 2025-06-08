"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateEventForm } from "@/components/forms/event/create_event_form";
import LoadingSpinner from "@/components/ui/loading-spinner";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function CreateEventPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Loading state
  if (status === "loading") {
    return <LoadingSpinner text="Verificando permisos..." />;
  }

  // Authentication and authorization check
  if (status === "unauthenticated" || !session?.user?.isOrganizer) {
    router.push("/auth");
    return null;
  }

  const handleEventCreated = (eventId: string) => {
    router.push(`/events/${eventId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4 text-gray-300 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>

          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text mb-4">
            Crear Nuevo Evento
          </h1>
          <p className="text-gray-400 text-lg">
            Comparte tu evento con la comunidad y conecta con personas afines
          </p>
        </motion.div>

        {/* Formulario */}
        <CreateEventForm onSuccess={handleEventCreated} />
      </div>
    </div>
  );
}
