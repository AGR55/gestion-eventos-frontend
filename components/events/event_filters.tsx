"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Filter,
  X,
  Calendar,
  DollarSign,
  Tag,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { EventFilters as EventFiltersType, Category } from "@/types/types";

interface EventFiltersProps {
  categories: Category[];
  filters: EventFiltersType;
  onApplyFilters: (filters: EventFiltersType) => void;
  onClearFilters: () => void;
  onFilterByCategory: (categoryId: string) => void;
}

export function EventFilters({
  categories,
  filters,
  onApplyFilters,
  onClearFilters,
  onFilterByCategory,
}: EventFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localFilters, setLocalFilters] = useState<EventFiltersType>(filters);

  const updateLocalFilter = (key: keyof EventFiltersType, value: any) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    onApplyFilters(localFilters);
  };

  const clearFilters = () => {
    setLocalFilters({});
    onClearFilters();
  };

  const hasActiveFilters = Object.keys(filters).some(
    (key) =>
      filters[key as keyof EventFiltersType] !== undefined &&
      filters[key as keyof EventFiltersType] !== ""
  );

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter(
      (value) => value !== undefined && value !== "" && value !== null
    ).length;
  };

  return (
    <div className="mb-8">
      {/* Botón para expandir filtros */}
      <div className="flex items-center justify-between mb-4">
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          variant="outline"
          className="bg-gray-800/50 border-gray-600/50 hover:bg-gray-700/50"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filtros
          {getActiveFiltersCount() > 0 && (
            <Badge
              variant="secondary"
              className="ml-2 bg-cyan-500/20 text-cyan-400"
            >
              {getActiveFiltersCount()}
            </Badge>
          )}
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 ml-2" />
          ) : (
            <ChevronDown className="h-4 w-4 ml-2" />
          )}
        </Button>

        {hasActiveFilters && (
          <Button
            onClick={clearFilters}
            variant="ghost"
            size="sm"
            className="text-red-400 hover:text-red-300"
          >
            <X className="h-4 w-4 mr-1" />
            Limpiar filtros
          </Button>
        )}
      </div>

      {/* Filtros rápidos por categoría */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.slice(0, 6).map((category) => (
          <Button
            key={category.id}
            onClick={() => onFilterByCategory(category.id)}
            variant={filters.categoryId === category.id ? "default" : "outline"}
            size="sm"
            className={`${
              filters.categoryId === category.id
                ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                : "bg-gray-800/50 border-gray-600/50 hover:bg-gray-700/50"
            }`}
          >
            <Tag className="h-3 w-3 mr-1" />
            {category.name}
          </Button>
        ))}
      </div>

      {/* Panel de filtros expandido */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Filtro por categoría completo */}
                <div className="space-y-2">
                  <Label className="text-gray-300 flex items-center">
                    <Tag className="h-4 w-4 mr-2 text-cyan-400" />
                    Categoría
                  </Label>
                  <select
                    value={localFilters.categoryId || ""}
                    onChange={(e) =>
                      updateLocalFilter(
                        "categoryId",
                        e.target.value || undefined
                      )
                    }
                    className="w-full bg-gray-900/50 border border-gray-600/50 rounded-lg px-3 py-2 text-gray-300 text-sm focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="">Todas las categorías</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Filtro por fecha */}
                <div className="space-y-2">
                  <Label className="text-gray-300 flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-purple-400" />
                    Fecha desde
                  </Label>
                  <Input
                    type="date"
                    value={localFilters.dateFrom || ""}
                    onChange={(e) =>
                      updateLocalFilter("dateFrom", e.target.value || undefined)
                    }
                    className="bg-gray-900/50 border-gray-600/50 text-gray-300 focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300 flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-purple-400" />
                    Fecha hasta
                  </Label>
                  <Input
                    type="date"
                    value={localFilters.dateTo || ""}
                    onChange={(e) =>
                      updateLocalFilter("dateTo", e.target.value || undefined)
                    }
                    className="bg-gray-900/50 border-gray-600/50 text-gray-300 focus:border-cyan-500"
                  />
                </div>

                {/* Filtro por precio */}
                <div className="space-y-2">
                  <Label className="text-gray-300 flex items-center">
                    <DollarSign className="h-4 w-4 mr-2 text-green-400" />
                    Precio máximo
                  </Label>
                  <Input
                    type="number"
                    placeholder="Ej: 1000"
                    value={localFilters.priceMax || ""}
                    onChange={(e) =>
                      updateLocalFilter(
                        "priceMax",
                        e.target.value ? Number(e.target.value) : undefined
                      )
                    }
                    className="bg-gray-900/50 border-gray-600/50 text-gray-300 focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Filtros de tipo de evento */}
              <div className="mt-6 pt-6 border-t border-gray-700/50">
                <Label className="text-gray-300 mb-3 block">
                  Tipo de evento
                </Label>
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={() => updateLocalFilter("priceMin", 0)}
                    variant={
                      localFilters.priceMin === 0 ? "default" : "outline"
                    }
                    size="sm"
                    className={`${
                      localFilters.priceMin === 0
                        ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                        : "bg-gray-800/50 border-gray-600/50"
                    }`}
                  >
                    Solo eventos gratuitos
                  </Button>

                  <Button
                    onClick={() => updateLocalFilter("priceMin", 1)}
                    variant={
                      localFilters.priceMin === 1 ? "default" : "outline"
                    }
                    size="sm"
                    className={`${
                      localFilters.priceMin === 1
                        ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                        : "bg-gray-800/50 border-gray-600/50"
                    }`}
                  >
                    Solo eventos de pago
                  </Button>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-700/50">
                <Button
                  onClick={clearFilters}
                  variant="outline"
                  className="bg-gray-800/50 border-gray-600/50 hover:bg-gray-700/50"
                >
                  Limpiar
                </Button>
                <Button
                  onClick={applyFilters}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                >
                  Aplicar filtros
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mostrar filtros activos */}
      {hasActiveFilters && (
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {filters.categoryId && (
              <Badge
                variant="secondary"
                className="bg-cyan-500/20 text-cyan-400"
              >
                Categoría:{" "}
                {categories.find((c) => c.id === filters.categoryId)?.name}
                <X
                  className="h-3 w-3 ml-1 cursor-pointer"
                  onClick={() => updateLocalFilter("categoryId", undefined)}
                />
              </Badge>
            )}

            {filters.search && (
              <Badge
                variant="secondary"
                className="bg-purple-500/20 text-purple-400"
              >
                Búsqueda: "{filters.search}"
              </Badge>
            )}

            {filters.dateFrom && (
              <Badge
                variant="secondary"
                className="bg-green-500/20 text-green-400"
              >
                Desde: {filters.dateFrom}
              </Badge>
            )}

            {filters.priceMax && (
              <Badge
                variant="secondary"
                className="bg-yellow-500/20 text-yellow-400"
              >
                Máx: ${filters.priceMax}
              </Badge>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
