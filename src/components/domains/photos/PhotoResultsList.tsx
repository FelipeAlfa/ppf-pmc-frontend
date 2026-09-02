"use client";

import Image from "next/image";
import CarouselView from "@/components/layout/CarouselView/CarouselView";
import EditorialView from "@/components/layout/EditorialView/EditorialView";
import GridView from "@/components/layout/GridView/GridView";
import SearchPagination from "@/components/domains/search/SearchPagination";
import { ViewSwitcherView } from "@/components/ui/ViewSwitcher/ViewSwitcher";
import { useResults } from "@/context/ResultsContext";
import type { PhotoResults } from "@/types";
import PhotoEditorialItem from "./PhotoEditorialItem";
import PhotoGridItem from "./PhotoGridItem";

export default function PhotoResultsList() {
  const { results } = useResults<PhotoResults>();

  return (
    <>
      <ViewSwitcherView name="grid">
        <GridView
          items={results.photos}
          renderItem={(photoData) => (
            <PhotoGridItem
              code={photoData.code}
              name={photoData.name}
              eventName={photoData.eventName}
              date={photoData.date}
              thumbnailUrl={photoData.thumbnailUrl}
              withActions />
          )} />
      </ViewSwitcherView>
      <ViewSwitcherView name="editorial">
        <EditorialView
          items={results.photos}
          renderItem={(photoData) => (
            <PhotoEditorialItem
              code={photoData.code}
              name={photoData.name}
              thumbnailUrl={photoData.thumbnailUrl}
              withActions />
          )} />
      </ViewSwitcherView>
      <ViewSwitcherView name="carousel">
        <CarouselView
          items={results.photos}
          renderItem={(photoData) => (
            <PhotoEditorialItem
              code={photoData.code}
              name={photoData.name}
              thumbnailUrl={photoData.thumbnailUrl}
              withActions />
          )}
          renderPreview={(photoData) => (
            <Image
              src={photoData.thumbnailUrl}
              alt={photoData.name}
              width={64}
              height={64}
              className="block h-full w-full object-cover" />
          )} />
      </ViewSwitcherView>
      {results.photos.length > 0 && (
        <SearchPagination
          currentPage={results.currentPage}
          totalPages={results.totalPages} />
      )}
    </>
  );
}
