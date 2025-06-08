"use client";

import { UseFormReturn } from "react-hook-form";
import { Users, Settings, DollarSign } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EventFormValues } from "@/schemas/event.schema";

interface EventCapacityProps {
  form: UseFormReturn<EventFormValues>;
}

export function EventCapacity({ form }: EventCapacityProps) {
  return (
    <div className="space-y-6">
      {/* Capacidad y configuraciones */}
      <div className="grid md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="limitParticipants"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300 font-medium flex items-center">
                <Users className="h-4 w-4 mr-2 text-cyan-400" />
                Límite de participantes
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="1"
                  placeholder="100"
                  className="bg-[#1A2836] border-gray-700 text-white focus-visible:ring-cyan-500"
                  {...field}
                  onChange={(e) =>
                    field.onChange(parseInt(e.target.value) || 1)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isPublished"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300 font-medium flex items-center">
                <DollarSign className="h-4 w-4 mr-2 text-cyan-400" />
                ¿Evento pagado?
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => field.onChange(value === "true")}
                  value={field.value ? "true" : "false"}
                >
                  <FormControl>
                    <SelectTrigger className="bg-[#1A2836] border-gray-700 text-white">
                      <SelectValue placeholder="Selecciona una opción" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="false">Gratuito</SelectItem>
                    <SelectItem value="true">Pagado</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Configuraciones adicionales */}
      <div className="space-y-4">
        <h3 className="text-gray-300 font-medium flex items-center">
          <Settings className="h-4 w-4 mr-2 text-cyan-400" />
          Configuraciones adicionales
        </h3>

        <div className="space-y-3">
          <FormField
            control={form.control}
            name="requireAcceptance"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="border-gray-600 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-gray-300 text-sm">
                    Requiere aprobación manual
                  </FormLabel>
                  <p className="text-xs text-gray-500">
                    Los participantes necesitarán tu aprobación antes de unirse
                    al evento
                  </p>
                </div>
              </FormItem>
            )}
          />

          <div className="flex flex-row items-start space-x-3 space-y-0">
            <Checkbox
              defaultChecked={true}
              className="border-gray-600 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
            />
            <div className="space-y-1 leading-none">
              <label className="text-gray-300 text-sm">
                Publicar evento inmediatamente
              </label>
              <p className="text-xs text-gray-500">
                El evento será visible públicamente una vez creado
              </p>
            </div>
          </div>

          <div className="flex flex-row items-start space-x-3 space-y-0">
            <Checkbox
              defaultChecked={false}
              className="border-gray-600 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
            />
            <div className="space-y-1 leading-none">
              <label className="text-gray-300 text-sm">
                Permitir comentarios
              </label>
              <p className="text-xs text-gray-500">
                Los participantes podrán dejar comentarios en el evento
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
