"use client";

import { motion } from "framer-motion";
import { useEvents } from "@/hooks/useEvents";
import { useCategories } from "@/hooks/useCategories";
import { Pagination } from "@/components/ui/pagination";
import { EventCard } from "@/components/events/event_card";
import { EventFilters } from "@/components/events/event_filters";
import { EventsHeader } from "@/components/events/events_header";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { AlertTriangle } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function EventsPage() {
  const {
    events,
    pagination,
    filters,
    isLoading,
    error,
    goToPage,
    applyFilters,
    clearFilters,
    searchEvents,
    filterByCategory,
    changePageSize,
  } = useEvents({ initialPageSize: 12 });

  const { categories } = useCategories();

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <AlertTriangle className="h-16 w-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">
            Error al cargar eventos
          </h2>
          <p className="text-gray-400 mb-4">{error.message}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <EventsHeader
            totalEvents={pagination.totalRecords}
            onSearch={searchEvents}
            currentSearch={filters.search}
          />

          {/* Filtros */}
          <EventFilters
            categories={categories}
            filters={filters}
            onApplyFilters={applyFilters}
            onClearFilters={clearFilters}
            onFilterByCategory={filterByCategory}
          />

          {/* Información de paginación */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-gray-400 text-sm">
              Mostrando {events.length} de {pagination.totalRecords} eventos
              {filters.search && (
                <span className="ml-2">• Búsqueda: "{filters.search}"</span>
              )}
            </div>

            <select
              value={pagination.pageSize}
              onChange={(e) => changePageSize(Number(e.target.value))}
              className="bg-gray-800/50 border border-gray-600/50 rounded-lg px-3 py-1 text-gray-300 text-sm"
            >
              <option value={12}>12 por página</option>
              <option value={24}>24 por página</option>
              <option value={48}>48 por página</option>
            </select>
          </div>

          {/* Lista de eventos */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-800/30 rounded-xl p-4 animate-pulse"
                >
                  <div className="h-48 bg-gray-700/50 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-700/50 rounded mb-2"></div>
                  <div className="h-3 bg-gray-700/50 rounded mb-4"></div>
                  <div className="h-6 bg-gray-700/50 rounded"></div>
                </div>
              ))}
            </div>
          ) : events.length > 0 ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {events.map((event) => (
                <motion.div key={event.id} variants={fadeIn}>
                  <EventCard event={event} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-gray-400 text-lg mb-4">
                No se encontraron eventos
              </div>
              <p className="text-gray-500 mb-6">
                Intenta ajustar los filtros o buscar algo diferente
              </p>
            </motion.div>
          )}

          {/* Paginación */}
          {pagination.totalPages > 1 && (
            <div className="mt-12">
              <Pagination
                currentPage={pagination.pageNumber}
                totalPages={pagination.totalPages}
                onPageChange={goToPage}
                hasPrevious={pagination.hasPrevious}
                hasNext={pagination.hasNext}
                className="justify-center"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
