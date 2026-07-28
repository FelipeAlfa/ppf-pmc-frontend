"use client";

import { useState } from "react";
import Image from "next/image";
import GridView from "../GridView/GridView";
import ImageLightbox from "../ImageLightbox/ImageLightbox";

interface PhotoGridItem {
  id: number;
  title: string;
  alt: string;
  imageSrc: string;
}

interface PhotoGridProps {
  photos: PhotoGridItem[];
}

export default function PhotoGrid({ photos }: PhotoGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activePhoto = activeIndex === null ? undefined : photos[activeIndex];

  const goToPrevious = () => {
    setActiveIndex((index) => {
      if (index === null) return index;
      return index === 0 ? photos.length - 1 : index - 1;
    });
  };

  const goToNext = () => {
    setActiveIndex((index) => {
      if (index === null) return index;
      return index === photos.length - 1 ? 0 : index + 1;
    });
  };

  return (
    <>
      <GridView
        items={photos}
        renderItem={(photo, index) => (
          <button
            className="group block w-full cursor-pointer border-0 bg-transparent p-0 text-left"
            type="button"
            onClick={() => setActiveIndex(index)}>
            <span className="relative block aspect-[4/5] w-full overflow-hidden bg-[#eeeeee]">
              <Image
                className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                src={photo.imageSrc}
                alt={photo.alt}
                fill
                sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" />
            </span>
            <span className="mt-2 block text-xs uppercase tracking-wider text-foreground">
              {photo.title}
            </span>
          </button>
        )} />
      <ImageLightbox
        active={activeIndex !== null}
        image={activePhoto && {
          src: activePhoto.imageSrc,
          alt: activePhoto.alt,
          title: activePhoto.title,
        }}
        currentIndex={activeIndex ?? undefined}
        totalItems={photos.length}
        onClose={() => setActiveIndex(null)}
        onPrevious={goToPrevious}
        onNext={goToNext} />
    </>
  );
}
