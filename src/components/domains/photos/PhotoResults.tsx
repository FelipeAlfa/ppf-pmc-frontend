"use client";

import PhotoResult from "@/components/domains/photos/PhotoResult";
import GridView from "@/components/layout/GridView/GridView";
import ViewSwitcher, { type ViewSwitcherItem } from "@/components/ui/ViewSwitcher/ViewSwitcher";
import type { PhotoResults, ViewType } from "@/types";
import { faImages, faTableCells } from "@fortawesome/free-solid-svg-icons";

const photoResultViews = [
  {
    name: "grid",
    icon: faTableCells,
    label: "Grid",
  },
  {
    name: "editorial",
    icon: faImages,
    label: "Editorial",
  },
  {
    name: "carousel",
    icon: faImages,
    label: "Carousel",
  },
] satisfies ViewSwitcherItem[];

interface PhotoResultsProps {
  photoResults: PhotoResults;
  viewType: ViewType;
}

export default function PhotoResults({
  photoResults,
  viewType,
}: PhotoResultsProps) {
  return (
    <ViewSwitcher.Provider name="photo-results" initialView={viewType}>
      <div className="mb-6 flex justify-end">
        <ViewSwitcher.Controls views={photoResultViews} />
      </div>
      <ViewSwitcher.View name="grid">
        <GridView
          items={photoResults.photos}
          renderItem={(photoData) => (
            <PhotoResult
              code={photoData.code}
              name={photoData.name}
              eventName={photoData.eventName}
              date={photoData.date}
              thumbnailUrl={photoData.thumbnailUrl}
              withActions />
          )} />
      </ViewSwitcher.View>
      <ViewSwitcher.View name="editorial">
        <div>EditorialView</div>
      </ViewSwitcher.View>
      <ViewSwitcher.View name="carousel">
        <div>CarouselView</div>
      </ViewSwitcher.View>
    </ViewSwitcher.Provider>
  );
}
