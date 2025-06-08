"use client";

import { UseFormReturn } from "react-hook-form";
import { MapPin } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EventFormValues } from "@/schemas/event.schema";

interface EventLocationProps {
  form: UseFormReturn<EventFormValues>;
}

export function EventLocation({ form }: EventLocationProps) {
  return (
    <FormField
      control={form.control}
      name="address"
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
  );
}
