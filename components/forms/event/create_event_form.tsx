"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { eventSchema, EventFormValues } from "@/schemas/event.schema";
import { eventService } from "@/services/event.service";
import { useCategories } from "@/hooks/useCategories";
import { useImageUpload } from "@/hooks/useImageUpload";
import { toast } from "sonner";

import { EventBasicInfo } from "./sections/event_basic_info";
import { EventImageUpload } from "./sections/event_image_upload";
import { EventDateTime } from "./sections/event_date_time";
import { EventLocation } from "./sections/event_location";
import { EventCapacity } from "./sections/event_capacity";
import { EventFormActions } from "./sections/event_form_actions";

import { Form } from "@/components/ui/form";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

interface CreateEventFormProps {
  onSuccess?: (eventId: string) => void;
}

export function CreateEventForm({ onSuccess }: CreateEventFormProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { categories, isLoading: isLoadingCategories } = useCategories();
  const { previewImage, imageFile, handleImageChange } = useImageUpload();

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      categoryId: "",
      date: "",
      time: "",
      address: "",
      duration: 0,
      limitParticipants: 1,
      requireAcceptance: false,
      isPublished: true,
    },
  });

  // ✨ Debug de la sesión cuando cambia
  useEffect(() => {
    console.log("=== SESSION MONITORING ===");
    console.log("Session status:", status);
    console.log("Session data:", session);
    console.log("Access token exists:", !!session?.accessToken);
    if (session?.accessToken) {
      console.log("Access token length:", session.accessToken.length);
      console.log(
        "Access token preview:",
        session.accessToken.substring(0, 50) + "..."
      );
    }
    console.log("========================");
  }, [session, status]);

  const onSubmit = async (data: EventFormValues) => {
    console.log("=== FORM SUBMIT DEBUG START ===");
    console.log("1. Session status:", status);
    console.log("2. Session object exists:", !!session);
    console.log("3. Session user:", session?.user);
    console.log("4. Session accessToken exists:", !!session?.accessToken);
    console.log("5. Session accessToken type:", typeof session?.accessToken);

    if (session?.accessToken) {
      console.log("6. AccessToken length:", session.accessToken.length);
      console.log(
        "7. AccessToken preview:",
        session.accessToken.substring(0, 100) + "..."
      );
      console.log(
        "8. AccessToken is string:",
        typeof session.accessToken === "string"
      );
      console.log(
        "9. AccessToken is empty:",
        session.accessToken.trim() === ""
      );
    } else {
      console.log("6. ❌ NO ACCESS TOKEN FOUND");
    }

    console.log("10. Form data:", data);
    console.log("11. Image file:", imageFile);
    console.log("=== FORM SUBMIT DEBUG END ===");

    // ✨ Validación paso a paso con logs específicos
    if (!session) {
      console.error("❌ VALIDATION FAILED: No session found");
      toast.error("Sesión no encontrada", {
        description: "Por favor, inicia sesión nuevamente",
      });
      return;
    }

    if (!session.accessToken) {
      console.error("❌ VALIDATION FAILED: No accessToken in session");
      console.error("Session keys:", Object.keys(session));
      toast.error("Token de acceso no encontrado", {
        description: "Por favor, cierra sesión e inicia sesión nuevamente",
      });
      return;
    }

    if (typeof session.accessToken !== "string") {
      console.error("❌ VALIDATION FAILED: AccessToken is not string");
      console.error("AccessToken type:", typeof session.accessToken);
      console.error("AccessToken value:", session.accessToken);
      toast.error("Token de acceso inválido", {
        description: "Tipo de token incorrecto. Inicia sesión nuevamente",
      });
      return;
    }

    if (session.accessToken.trim() === "") {
      console.error("❌ VALIDATION FAILED: AccessToken is empty string");
      toast.error("Token de acceso vacío", {
        description: "Token vacío. Inicia sesión nuevamente",
      });
      return;
    }

    console.log("✅ ALL VALIDATIONS PASSED");
    console.log("✅ About to call eventService.createEvent with:");
    console.log("   - Data:", data);
    console.log("   - Image file:", imageFile);
    console.log(
      "   - Token preview:",
      session.accessToken.substring(0, 50) + "..."
    );

    setIsLoading(true);
    try {
      console.log("🚀 Calling eventService.createEvent...");

      // ✨ Una sola llamada que incluye todo: datos + imagen
      const newEvent = await eventService.createEvent(
        data,
        imageFile, // ✨ La imagen se envía junto con los datos en FormData
        session.accessToken
      );

      console.log("✅ Event created successfully:", newEvent);

      toast.success("¡Evento creado exitosamente!", {
        description: imageFile
          ? "Tu evento e imagen han sido publicados correctamente."
          : "Tu evento ha sido publicado y está disponible para los usuarios.",
      });

      if (onSuccess) {
        onSuccess(newEvent.id);
      } else {
        router.push(`/events/${newEvent.id}`);
      }
    } catch (error) {
      console.error("❌ Error creating event:", error);
      console.error("❌ Error type:", typeof error);
      console.error(
        "❌ Error message:",
        error instanceof Error ? error.message : "Unknown error"
      );

      if (error instanceof Error) {
        if (
          error.message.includes("Token") ||
          error.message.includes("autenticación")
        ) {
          console.error("❌ Authentication error detected");
          toast.error("Error de autenticación", {
            description: "Por favor, cierra sesión e inicia sesión nuevamente",
            action: {
              label: "Ir a login",
              onClick: () => (window.location.href = "/auth"),
            },
          });
          return;
        }
      }

      toast.error("Error al crear evento", {
        description:
          error instanceof Error
            ? error.message
            : "Ocurrió un error inesperado",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ✨ Botón de debug temporal
  const debugToken = () => {
    console.log("=== DEBUG BUTTON CLICKED ===");
    console.log("Session:", session);
    console.log("Access token:", session?.accessToken);
    console.log("Token type:", typeof session?.accessToken);
    if (session?.accessToken) {
      console.log("Token length:", session.accessToken.length);
      console.log("Token preview:", session.accessToken.substring(0, 100));

      // Test directo del servicio
      console.log("Testing service call...");
      eventService
        .createEvent(
          {
            title: "Test Event",
            description: "Test description for debugging purposes",
            categoryId: categories[0]?.id || "test-category",
            date: "2024-12-31",
            time: "23:59",
            address: "Test address",
            duration: 1,
            limitParticipants: 10,
            requireAcceptance: false,
            isPublished: true,
          },
          null,
          session.accessToken
        )
        .then((result) => console.log("✅ Service test success:", result))
        .catch((error) => console.error("❌ Service test error:", error));
    }
    console.log("===========================");
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="bg-[#13212e] rounded-2xl border border-gray-800 p-8"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <EventImageUpload
            previewImage={previewImage}
            onImageChange={handleImageChange}
          />

          <EventBasicInfo
            form={form}
            categories={categories}
            isLoadingCategories={isLoadingCategories}
          />

          <EventDateTime form={form} />

          <EventLocation form={form} />

          <EventCapacity form={form} />

          {/* ✨ Botón de debug temporal - remover en producción */}
          {/*process.env.NODE_ENV === "development" && (
            <div className="flex gap-4">
              <button
                type="button"
                onClick={debugToken}
                className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg text-sm"
              >
                🐛 Debug Token
              </button>
            </div>
          )*/}

          <EventFormActions
            isLoading={isLoading}
            isLoadingCategories={isLoadingCategories}
            onPreview={() => {
              toast.info("Función de vista previa", {
                description: "Esta función estará disponible próximamente",
              });
            }}
          />
        </form>
      </Form>
    </motion.div>
  );
}
