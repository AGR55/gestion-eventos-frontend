"use client";

import { useState } from "react";
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
  const { data: session } = useSession();
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

  const onSubmit = async (data: EventFormValues) => {
    if (!session?.accessToken) {
      toast.error("No autorizado", {
        description: "Debes iniciar sesión para crear un evento",
      });
      return;
    }

    setIsLoading(true);
    try {
      // ✨ Crear evento con JSON
      const newEvent = await eventService.createEvent(
        data,
        session.accessToken
      );

      // ✨ Subir imagen por separado si existe
      if (imageFile && newEvent.id) {
        try {
          await eventService.uploadEventImage(
            newEvent.id,
            imageFile,
            session.accessToken
          );
          toast.success("Evento e imagen creados exitosamente!");
        } catch (imageError) {
          console.warn("Error uploading image:", imageError);
          toast.success("Evento creado exitosamente", {
            description:
              "La imagen no se pudo subir, pero el evento fue creado.",
          });
        }
      } else {
        toast.success("¡Evento creado exitosamente!", {
          description:
            "Tu evento ha sido publicado y está disponible para los usuarios.",
        });
      }

      if (onSuccess) {
        onSuccess(newEvent.id);
      } else {
        router.push(`/events/${newEvent.id}`);
      }
    } catch (error) {
      console.error("Error creating event:", error);
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
