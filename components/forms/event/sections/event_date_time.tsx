"use client";

import { UseFormReturn } from "react-hook-form";
import { Calendar, Clock } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EventFormValues } from "@/schemas/event.schema";

interface EventDateTimeProps {
  form: UseFormReturn<EventFormValues>;
}

export function EventDateTime({ form }: EventDateTimeProps) {
  return (
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
              Duración (en horas)
            </FormLabel>
            <FormControl>
              <Input
                type="number"
                min="0"
                step="0.5"
                placeholder="2"
                className="bg-[#1A2836] border-gray-700 text-white focus-visible:ring-cyan-500"
                {...field}
                onChange={(e) =>
                  field.onChange(parseFloat(e.target.value) || 0)
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
