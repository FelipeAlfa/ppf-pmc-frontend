import PhotoResult from "@/components/domains/photos/PhotoResult";
import GridView from "@/components/layout/GridView/GridView";
import type { PhotoResults } from "@/types";

interface PhotoResultsProps {
  photoResults: PhotoResults;
}

export default function PhotoResults({
  photoResults,
}: PhotoResultsProps) {
  return (
    <GridView
      items={photoResults.photos}
      renderItem={(photoData) => (
        <PhotoResult
          code={photoData.code}
          eventName={photoData.eventName}
          locationName={photoData.locationName}
          date={photoData.date}
          thumbnailUrl={photoData.thumbnailUrl}
          link={photoData.link} />
      )} />
  );
}
