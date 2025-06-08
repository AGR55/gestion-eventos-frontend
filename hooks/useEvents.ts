import { useState, useEffect, useCallback } from "react";
import { eventsService } from "@/services/events.service";
import {
  PaginationParams,
  EventsResponse,
  Event,
  EventFilters,
} from "@/types/types";
import { toast } from "sonner";

interface UseEventsOptions {
  initialPageSize?: number;
  autoFetch?: boolean;
}

export const useEvents = (options: UseEventsOptions = {}) => {
  const { initialPageSize = 12, autoFetch = true } = options;

  const [events, setEvents] = useState<Event[]>([]);
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: initialPageSize,
    totalPages: 0,
    totalRecords: 0,
    hasPrevious: false,
    hasNext: false,
  });
  const [filters, setFilters] = useState<EventFilters>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchEvents = useCallback(
    async (
      pageParams?: Partial<PaginationParams>,
      newFilters?: EventFilters
    ) => {
      console.log("=== FETCHING EVENTS ===");
      console.log("Page params:", pageParams);
      console.log("Current pagination:", pagination);
      console.log("New filters:", newFilters);
      console.log("Current filters:", filters);

      setIsLoading(true);
      setError(null);

      try {
        const params = {
          pageNumber: pageParams?.pageNumber ?? pagination.pageNumber,
          pageSize: pageParams?.pageSize ?? pagination.pageSize,
        };

        const filtersToUse = newFilters ?? filters;

        console.log("Final params:", params);
        console.log("Final filters:", filtersToUse);

        const response = await eventsService.getEvents(params, filtersToUse);

        console.log("Service response:", response);

        // ✨ Validación adicional de la respuesta
        if (!response) {
          throw new Error("No response received from events service");
        }

        if (!Array.isArray(response.data)) {
          console.error("Invalid response.data:", response.data);
          throw new Error("Invalid events data format");
        }

        setEvents(response.data);
        setPagination({
          pageNumber: response.pageNumber,
          pageSize: response.pageSize,
          totalPages: response.totalPages,
          totalRecords: response.totalRecords,
          hasPrevious: response.hasPrevious,
          hasNext: response.hasNext,
        });

        if (newFilters !== undefined) {
          setFilters(newFilters);
        }

        console.log(
          "Successfully updated state with events:",
          response.data.length
        );
      } catch (error) {
        const errorInstance =
          error instanceof Error ? error : new Error("Error desconocido");

        console.error("Error in fetchEvents:", errorInstance);
        setError(errorInstance);

        // ✨ Limpiar eventos en caso de error
        setEvents([]);

        toast.error("Error al cargar eventos", {
          description: errorInstance.message,
        });
      } finally {
        setIsLoading(false);
        console.log("=== FETCH COMPLETE ===");
      }
    },
    [pagination.pageNumber, pagination.pageSize, filters]
  );

  // Funciones de navegación
  const goToPage = (page: number) => {
    console.log(`Going to page: ${page}`);
    if (page >= 1 && page <= pagination.totalPages) {
      fetchEvents({ pageNumber: page });
    }
  };

  const nextPage = () => {
    if (pagination.hasNext) {
      goToPage(pagination.pageNumber + 1);
    }
  };

  const previousPage = () => {
    if (pagination.hasPrevious) {
      goToPage(pagination.pageNumber - 1);
    }
  };

  const changePageSize = (size: number) => {
    console.log(`Changing page size to: ${size}`);
    fetchEvents({ pageNumber: 1, pageSize: size });
  };

  // Funciones de filtrado
  const applyFilters = (newFilters: EventFilters) => {
    console.log("Applying filters:", newFilters);
    fetchEvents({ pageNumber: 1 }, newFilters);
  };

  const clearFilters = () => {
    console.log("Clearing filters");
    fetchEvents({ pageNumber: 1 }, {});
  };

  const searchEvents = (query: string) => {
    console.log("Searching events with query:", query);
    applyFilters({ ...filters, search: query });
  };

  const filterByCategory = (categoryId: string) => {
    console.log("Filtering by category:", categoryId);
    applyFilters({ ...filters, categoryId });
  };

  // Auto-fetch en mount
  useEffect(() => {
    if (autoFetch) {
      console.log("Auto-fetching events on mount");

      // ✨ Test de conexión antes del fetch principal
      eventsService.testConnection().then((isConnected) => {
        console.log("API connection test:", isConnected);
        if (isConnected) {
          fetchEvents();
        } else {
          setError(new Error("No se pudo conectar con el servidor"));
        }
      });
    }
  }, []); // ✨ Dependencias vacías para evitar loops

  return {
    // Datos
    events,
    pagination,
    filters,
    isLoading,
    error,

    // Navegación
    goToPage,
    nextPage,
    previousPage,
    changePageSize,

    // Filtrado
    applyFilters,
    clearFilters,
    searchEvents,
    filterByCategory,

    // Acciones
    refetch: () => fetchEvents(),
    fetchEvents,
  };
};
