"use client";

import { UseFormReturn } from "react-hook-form";
import { Tag, Loader2 } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EventFormValues } from "@/schemas/event.schema";
import { Category } from "@/types/types";

interface EventBasicInfoProps {
  form: UseFormReturn<EventFormValues>;
  categories: Category[];
  isLoadingCategories: boolean;
}

export function EventBasicInfo({
  form,
  categories,
  isLoadingCategories,
}: EventBasicInfoProps) {
  return (
    <div className="space-y-6">
      {/* Título y Categoría */}
      <div className="grid md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300 font-medium flex items-center">
                <Tag className="h-4 w-4 mr-2 text-cyan-400" />
                Título del evento
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
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300 font-medium">
                Categoría
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={isLoadingCategories}
              >
                <FormControl>
                  <SelectTrigger className="bg-[#1A2836] border-gray-700 text-white">
                    <SelectValue
                      placeholder={
                        isLoadingCategories
                          ? "Cargando categorías..."
                          : "Selecciona una categoría"
                      }
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {isLoadingCategories ? (
                    // ✅ ARREGLADO: Removido SelectItem con value vacío
                    <div className="flex items-center justify-center py-4 text-gray-500">
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Cargando categorías...
                    </div>
                  ) : categories.length > 0 ? (
                    categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        <div className="flex items-center justify-between w-full">
                          <span>{category.name}</span>
                          {process.env.NODE_ENV === "development" && (
                            <span className="text-xs text-gray-500 ml-2">
                              {category.active ? "✅" : "❌"}
                            </span>
                          )}
                        </div>
                      </SelectItem>
                    ))
                  ) : (
                    // ✅ ARREGLADO: Mensaje sin SelectItem cuando no hay categorías
                    <div className="flex items-center justify-center py-4 text-gray-500">
                      <span className="text-sm">
                        No hay categorías disponibles
                      </span>
                    </div>
                  )}
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
    </div>
  );
}
