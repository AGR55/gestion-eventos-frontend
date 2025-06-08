"use client";

import { Save, Eye, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EventFormActionsProps {
  isLoading: boolean;
  isLoadingCategories: boolean;
  onPreview: () => void;
}

export function EventFormActions({
  isLoading,
  isLoadingCategories,
  onPreview,
}: EventFormActionsProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 pt-6">
      <Button
        type="submit"
        disabled={isLoading || isLoadingCategories}
        className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium py-3 h-12"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
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
        className="border-gray-700 text-gray-300 hover:bg-gray-800 h-12"
        onClick={onPreview}
        disabled={isLoading}
      >
        <Eye className="h-5 w-5 mr-2" />
        Vista previa
      </Button>

      <Button
        type="button"
        variant="ghost"
        className="text-gray-400 hover:text-gray-300 hover:bg-gray-800 h-12"
        disabled={isLoading}
      >
        Guardar borrador
      </Button>
    </div>
  );
}
