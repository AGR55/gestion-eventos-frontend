"use client";

import { createContext, useContext, ReactNode } from "react";
import { useEvents } from "@/hooks/useEvents";
import { Event, EventFilters, PaginationParams } from "@/types/types";

interface EventsContextType {
  events: Event[];
  pagination: {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalRecords: number;
    hasPrevious: boolean;
    hasNext: boolean;
  };
  filters: EventFilters;
  isLoading: boolean;
  error: Error | null;
  goToPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  changePageSize: (size: number) => void;
  applyFilters: (filters: EventFilters) => void;
  clearFilters: () => void;
  searchEvents: (query: string) => void;
  filterByCategory: (categoryId: string) => void;
  refetch: () => void;
  fetchEvents: (
    params?: Partial<PaginationParams>,
    filters?: EventFilters
  ) => void;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export function EventsProvider({ children }: { children: ReactNode }) {
  const eventsHook = useEvents({ autoFetch: false });

  return (
    <EventsContext.Provider value={eventsHook}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEventsContext() {
  const context = useContext(EventsContext);
  if (context === undefined) {
    throw new Error("useEventsContext must be used within an EventsProvider");
  }
  return context;
}
