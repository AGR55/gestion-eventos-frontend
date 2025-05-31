"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  DollarSign,
  Tag,
  Upload,
  Save,
  Eye,
  ArrowLeft,
} from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import Image from "next/image";

const eventSchema = z.object({
  name: z.string().min(1, "El nombre del evento es requerido"),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres"),
  category: z.string().min(1, "Selecciona una categoría"),
  date: z.string().min(1, "La fecha es requerida"),
  time: z.string().min(1, "La hora es requerida"),
  location: z.string().min(1, "La ubicación es requerida"),
  capacity: z.number().min(1, "La capacidad debe ser mayor a 0"),
  price: z.number().min(0, "El precio no puede ser negativo"),
  duration: z.string().optional(),
});

type EventFormValues = z.infer<typeof eventSchema>;

const categories = [
  "Música",
  "Arte",
  "Tecnología",
  "Deportes",
  "Gastronomía",
  "Educación",
  "Negocios",
  "Entretenimiento",
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function CreateEventPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      date: "",
      time: "",
      location: "",
      capacity: 1,
      price: 0,
      duration: "",
    },
  });

  // Redirect si no es organizador
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (status === "unauthenticated" || !session?.user?.isOrganizer) {
    router.push("/auth");
    return null;
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: EventFormValues) => {
    setIsLoading(true);
    try {
      // Preparar FormData para enviar imagen y datos
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("date", data.date);
      formData.append("time", data.time);
      formData.append("location", data.location);
      formData.append("capacity", data.capacity.toString());
      formData.append("price", data.price.toString());
      if (data.duration) formData.append("duration", data.duration);
      if (imageFile) formData.append("image", imageFile);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/Events`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al crear el evento");
      }

      const newEvent = await response.json();

      toast.success("¡Evento creado exitosamente!", {
        description:
          "Tu evento ha sido publicado y está disponible para los usuarios.",
      });

      router.push(`/events/${newEvent.id}`);
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
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="bg-[#13212e] rounded-2xl border border-gray-800 p-8"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Imagen del evento */}
              <div className="space-y-4">
                <label className="text-white font-medium flex items-center">
                  <Upload className="h-5 w-5 mr-2 text-cyan-400" />
                  Imagen del evento
                </label>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-cyan-600 file:text-white hover:file:bg-cyan-700 file:cursor-pointer cursor-pointer bg-[#1A2836] border border-gray-700 rounded-lg p-3"
                    />
                  </div>
                  {previewImage && (
                    <div className="w-full md:w-48 h-32 relative rounded-lg overflow-hidden">
                      <Image
                        src={previewImage}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Información básica */}
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300 font-medium flex items-center">
                        <Tag className="h-4 w-4 mr-2 text-cyan-400" />
                        Nombre del evento
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Festival de Música Electrónica"
                          className="bg-[#1A2836] border-gray-700 text-white focus-visible:ring-cyan-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300 font-medium">
                        Categoría
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-[#1A2836] border-gray-700 text-white">
                            <SelectValue placeholder="Selecciona una categoría" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Descripción */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300 font-medium">
                      Descripción
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe tu evento en detalle..."
                        className="bg-[#1A2836] border-gray-700 text-white focus-visible:ring-cyan-500 min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Fecha, hora y duración */}
              <div className="grid md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300 font-medium flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-cyan-400" />
                        Fecha
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          className="bg-[#1A2836] border-gray-700 text-white focus-visible:ring-cyan-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300 font-medium flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-cyan-400" />
                        Hora
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="time"
                          className="bg-[#1A2836] border-gray-700 text-white focus-visible:ring-cyan-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300 font-medium">
                        Duración (opcional)
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="2 horas"
                          className="bg-[#1A2836] border-gray-700 text-white focus-visible:ring-cyan-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Ubicación */}
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300 font-medium flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-cyan-400" />
                      Ubicación
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Centro de Convenciones, Ciudad"
                        className="bg-[#1A2836] border-gray-700 text-white focus-visible:ring-cyan-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Capacidad y precio */}
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="capacity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300 font-medium flex items-center">
                        <Users className="h-4 w-4 mr-2 text-cyan-400" />
                        Capacidad máxima
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          placeholder="100"
                          className="bg-[#1A2836] border-gray-700 text-white focus-visible:ring-cyan-500"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300 font-medium flex items-center">
                        <DollarSign className="h-4 w-4 mr-2 text-cyan-400" />
                        Precio (0 para gratis)
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          placeholder="25.00"
                          className="bg-[#1A2836] border-gray-700 text-white focus-visible:ring-cyan-500"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Botones de acción */}
              <div className="flex flex-col md:flex-row gap-4 pt-6">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium py-3 h-12"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white mr-2"></div>
                      Creando evento...
                    </>
                  ) : (
                    <>
                      <Save className="h-5 w-5 mr-2" />
                      Crear Evento
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800"
                  onClick={() => {
                    // Vista previa del evento
                    toast.info("Función de vista previa", {
                      description:
                        "Esta función estará disponible próximamente",
                    });
                  }}
                >
                  <Eye className="h-5 w-5 mr-2" />
                  Vista previa
                </Button>
              </div>
            </form>
          </Form>
        </motion.div>
      </div>
    </div>
  );
}
