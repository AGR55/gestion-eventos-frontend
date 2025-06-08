import { useState, useEffect } from "react";
import { Category } from "@/types/types";
import { eventService } from "@/services/event.service";
import { toast } from "sonner";

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await eventService.getCategories();
      setCategories(data);

      if (data.length === 0) {
        toast.info("No hay categorías disponibles", {
          description: "Contacta al administrador para crear categorías",
        });
      }
    } catch (error) {
      const errorInstance =
        error instanceof Error ? error : new Error("Error desconocido");
      setError(errorInstance);

      console.error("Error fetching categories:", error);
      toast.error("Error al cargar categorías", {
        description: errorInstance.message,
      });

      setCategories(getFallbackCategories());
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const refetch = () => {
    fetchCategories();
  };

  return {
    categories,
    isLoading,
    error,
    refetch,
  };
};

const getFallbackCategories = (): Category[] => [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    name: "Música",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null,
    active: true,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    name: "Arte",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null,
    active: true,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    name: "Tecnología",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null,
    active: true,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440004",
    name: "Deportes",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null,
    active: true,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440005",
    name: "Gastronomía",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null,
    active: true,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440006",
    name: "Educación",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null,
    active: true,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440007",
    name: "Negocios",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null,
    active: true,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440008",
    name: "Entretenimiento",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null,
    active: true,
  },
];
