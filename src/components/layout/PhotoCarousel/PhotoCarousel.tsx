"use client";

/* eslint-disable @next/next/no-img-element */

import {
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useMemo } from "react";

interface PhotoCarouselImage {
  src: string;
  alt: string;
  name: string;
}

interface PhotoCarouselProps {
  images: PhotoCarouselImage[];
}

export default function PhotoCarousel({
  images,
}: PhotoCarouselProps) {
  const autoplay = useMemo(() => Autoplay({
    delay: 3000,
    stopOnInteraction: true,
  }), []);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
    loop: true,
  }, [autoplay]);

  const scrollPrev = useCallback(() => {
    autoplay.stop();
    emblaApi?.scrollPrev();
  }, [autoplay, emblaApi]);

  const scrollNext = useCallback(() => {
    autoplay.stop();
    emblaApi?.scrollNext();
  }, [autoplay, emblaApi]);

  const updateCarouselLayout = useCallback(() => {
    emblaApi?.reInit();
  }, [emblaApi]);

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="relative h-72 w-full min-w-0 bg-black md:h-96">
      <div className="h-full overflow-hidden bg-black" ref={emblaRef}>
        <ul className="group/carousel flex h-full touch-pan-y bg-black">
          {images.map((image, index) => (
            <li
              key={`${image.src}-${index}`}
              className="group/item h-full min-w-0 flex-[0_0_auto]">
              <div className="relative flex h-full items-center justify-center overflow-hidden bg-black">
                <img
                  className="block h-full w-auto max-w-none object-contain transition-[filter,opacity] duration-200 ease-linear group-hover/carousel:brightness-40 group-hover/item:brightness-100"
                  src={image.src}
                  alt={image.alt}
                  onLoad={updateCarouselLayout} />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-5 opacity-0 transition-opacity duration-200 ease-linear group-hover/item:opacity-100 group-focus-within/item:opacity-100">
                  <p className="font-helvetica-neue-system text-xs font-light uppercase tracking-[2px] text-white">
                    {image.name}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {images.length > 1 && (
        <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-2">
          <button
            type="button"
            className="pointer-events-auto inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-xs bg-white/85 text-foreground transition-colors duration-150 hover:bg-white"
            aria-label="Previous images"
            onClick={scrollPrev}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          <button
            type="button"
            className="pointer-events-auto inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-xs bg-white/85 text-foreground transition-colors duration-150 hover:bg-white"
            aria-label="Next images"
            onClick={scrollNext}>
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </div>
      )}
    </div>
  );
}
