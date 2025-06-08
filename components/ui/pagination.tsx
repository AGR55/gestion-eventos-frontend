"use client";

import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasPrevious: boolean;
  hasNext: boolean;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  hasPrevious,
  hasNext,
  className = "",
}: PaginationProps) {
  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    const delta = 2;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > delta + 2) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - delta);
      const end = Math.min(totalPages - 1, currentPage + delta);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - delta - 1) {
        pages.push("...");
      }

      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(1)}
        disabled={!hasPrevious}
        className="bg-gray-800/50 border-gray-600/50 hover:bg-gray-700/50"
      >
        <ChevronsLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevious}
        className="bg-gray-800/50 border-gray-600/50 hover:bg-gray-700/50"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {generatePageNumbers().map((page, index) => (
        <Button
          key={index}
          variant={page === currentPage ? "default" : "outline"}
          size="sm"
          onClick={() => typeof page === "number" && onPageChange(page)}
          disabled={typeof page === "string"}
          className={`min-w-[40px] ${
            page === currentPage
              ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
              : "bg-gray-800/50 border-gray-600/50 hover:bg-gray-700/50"
          }`}
        >
          {page}
        </Button>
      ))}

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext}
        className="bg-gray-800/50 border-gray-600/50 hover:bg-gray-700/50"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(totalPages)}
        disabled={!hasNext}
        className="bg-gray-800/50 border-gray-600/50 hover:bg-gray-700/50"
      >
        <ChevronsRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
