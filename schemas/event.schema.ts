import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().min(1, "El título del evento es requerido"),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres"),
  categoryId: z.string().min(1, "Selecciona una categoría"),
  date: z.string().min(1, "La fecha es requerida"),
  time: z.string().min(1, "La hora es requerida"),
  address: z.string().min(1, "La dirección es requerida"),
  duration: z.number().min(0, "La duración no puede ser negativa"),
  limitParticipants: z
    .number()
    .min(1, "El límite de participantes debe ser mayor a 0"),
  requireAcceptance: z.boolean().default(false),
  isPublished: z.boolean().default(true),
});

export type EventFormValues = z.infer<typeof eventSchema>;
