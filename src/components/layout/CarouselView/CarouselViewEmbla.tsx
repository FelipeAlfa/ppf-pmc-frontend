"use client";

import {
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useEmblaCarousel from "embla-carousel-react";
import { Children, ReactNode, useCallback, useEffect, useState } from "react";

interface CarouselViewEmblaProps {
  children: ReactNode;
  previews?: ReactNode[];
}

export default function CarouselViewEmbla({
  children,
  previews,
}: CarouselViewEmblaProps) {
  const slides = Children.toArray(children);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    containScroll: "trimSnaps",
    loop: false,
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);
  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);
  const scrollTo = useCallback((index: number) => {
    emblaApi?.scrollTo(index);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const updateCurrentIndex = () => {
      setCurrentIndex(emblaApi.selectedScrollSnap());
    };

    updateCurrentIndex();
    emblaApi.on("select", updateCurrentIndex);
    emblaApi.on("reInit", updateCurrentIndex);

    return () => {
      emblaApi.off("select", updateCurrentIndex);
      emblaApi.off("reInit", updateCurrentIndex);
    };
  }, [emblaApi]);

  if (slides.length === 0) {
    return null;
  }

  return (
    <div className="relative min-w-0 w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <ul className="flex touch-pan-y gap-4">
          {slides}
        </ul>
      </div>
      {slides.length > 1 && (
        <>
          <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between">
            <button
              type="button"
              className="pointer-events-auto inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-sm bg-white/90 text-foreground shadow-sm transition-colors duration-150 hover:bg-white"
              aria-label="Previous photo"
              onClick={scrollPrev}>
              <FontAwesomeIcon icon={faAngleLeft} />
            </button>
            <button
              type="button"
              className="pointer-events-auto inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-sm bg-white/90 text-foreground shadow-sm transition-colors duration-150 hover:bg-white"
              aria-label="Next photo"
              onClick={scrollNext}>
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
          </div>
          <div className="mt-4 flex justify-center gap-2 overflow-x-auto pb-1">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`h-12 w-12 shrink-0 cursor-pointer overflow-hidden rounded-sm bg-foreground/10 ring-1 ring-foreground/10 transition-opacity duration-150 ${index === currentIndex ? "opacity-100 ring-foreground/60" : "opacity-45 hover:opacity-75"}`}
                aria-label={`Go to photo ${index + 1}`}
                aria-pressed={index === currentIndex}
                onClick={() => scrollTo(index)}>
                {previews?.[index] ?? (
                  <span className="block h-full w-full bg-foreground/20" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
