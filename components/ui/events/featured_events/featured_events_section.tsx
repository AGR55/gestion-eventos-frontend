"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { featured_events } from "@/test-data/featured_events";
import { FeaturedEventsCard } from "./featured_events_card";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const FeaturedEventsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const totalSlides = featured_events.length;

  const updateScrollButtons = useCallback(() => {
    if (!carouselRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 0);

    const isAtEnd = Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 2;
    setCanScrollRight(!isAtEnd);

    if (scrollLeft === 0) {
      setCurrentIndex(0);
    } else if (isAtEnd) {
      setCurrentIndex(totalSlides - 1);
    } else {
      const cardWidth = 480 + 16;
      const approximate = Math.round(scrollLeft / cardWidth);
      setCurrentIndex(Math.min(approximate, totalSlides - 1));
    }
  }, [totalSlides]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();

      return () => carousel.removeEventListener("scroll", updateScrollButtons);
    }
  }, [updateScrollButtons]);

  const scrollToIndex = (index: number) => {
    if (carouselRef.current && index >= 0 && index < totalSlides) {
      const card = carouselRef.current.children[index] as HTMLElement;
      const scrollPosition = card.offsetLeft - 20;

      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });

      setCurrentIndex(index);
    }
  };

  const handleNext = () => {
    scrollToIndex(Math.min(currentIndex + 1, totalSlides - 1));
  };

  const handlePrev = () => {
    scrollToIndex(Math.max(currentIndex - 1, 0));
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="relative">
        <h1 className="text-4xl font-bold mb-4">Eventos Destacados</h1>

        <div className="relative overflow-hidden">
          {canScrollLeft && (
            <div
              className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to right, #111E27 0%, rgba(17, 30, 39, 0) 100%)",
              }}
            ></div>
          )}

          <div
            ref={carouselRef}
            className="flex flex-row overflow-x-auto scroll-smooth gap-4 pb-4 hide-scrollbar"
            style={{
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
          >
            <style jsx>{`
              .hide-scrollbar::-webkit-scrollbar {
                display: none; /* Chrome, Safari, Opera */
              }
            `}</style>

            {featured_events.map((event) => (
              <div key={event.id.toString()} className="flex-shrink-0">
                <FeaturedEventsCard event={event} />
              </div>
            ))}
          </div>

          {canScrollRight && (
            <div
              className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to left, #111E27 0%, rgba(17, 30, 39, 0) 100%)",
              }}
            ></div>
          )}
        </div>

        <button
          onClick={handlePrev}
          disabled={!canScrollLeft}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full text-white disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed z-20"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={handleNext}
          disabled={!canScrollRight}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full text-white disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed z-20"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="flex justify-center gap-2">
        {featured_events.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentIndex === index ? "bg-cyan-400" : "bg-gray-600"
            }`}
            aria-label={`Ir a diapositiva ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
