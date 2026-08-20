"use client";

import Image from "next/image";
import { useEffect } from "react";
import Overlay from "@/components/ui/Overlay/Overlay";
import { imageLightboxNavButtonVariants } from "./ImageLightbox.variants";

interface ImageLightboxImage {
  src: string;
  alt: string;
  title?: string;
}

interface ImageLightboxProps {
  active?: boolean;
  image?: ImageLightboxImage;
  currentIndex?: number;
  totalItems?: number;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
}

export default function ImageLightbox({
  active = false,
  image,
  currentIndex,
  totalItems,
  onClose,
  onPrevious,
  onNext,
}: ImageLightboxProps) {
  useEffect(() => {
    if (!active) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrevious?.();
      if (event.key === "ArrowRight") onNext?.();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, onClose, onNext, onPrevious]);

  return (
    <Overlay active={active} onBackgroundClick={onClose}>
      <div
        className="relative flex max-h-full w-full max-w-6xl flex-col items-center justify-center gap-4 text-white"
        role="dialog"
        aria-modal="true"
        aria-label={image?.title ?? image?.alt ?? "Image preview"}
        onMouseDown={(event) => event.stopPropagation()}>
        <button
          className="absolute top-0 right-0 z-10 inline-flex h-10 cursor-pointer items-center justify-center rounded-full border border-white/50 bg-black/40 px-3 text-xs font-bold uppercase tracking-wider transition-colors duration-100 ease-linear hover:bg-black/70"
          type="button"
          aria-label="Close image preview"
          onClick={onClose}>
          Close
        </button>
        {image && (
          <>
            <div className="relative h-[75vh] w-full max-w-[calc(100%-4rem)]">
              <Image
                className="object-contain"
                src={image.src}
                alt={image.alt}
                fill
                sizes="100vw" />
            </div>
            {(image.title || totalItems) && (
              <div className="max-w-3xl text-center text-sm">
                {image.title && <p className="font-bold">{image.title}</p>}
                {typeof currentIndex === "number" && totalItems && (
                  <p className="mt-1 opacity-80">{currentIndex + 1} / {totalItems}</p>
                )}
              </div>
            )}
          </>
        )}
        {onPrevious && (
          <button
            className={imageLightboxNavButtonVariants({ side: "previous" })}
            type="button"
            aria-label="Previous image"
            onClick={onPrevious}>
            Prev
          </button>
        )}
        {onNext && (
          <button
            className={imageLightboxNavButtonVariants({ side: "next" })}
            type="button"
            aria-label="Next image"
            onClick={onNext}>
            Next
          </button>
        )}
      </div>
    </Overlay>
  );
}
