import EventResult from "@/components/domains/events/EventResult";
import GridView from "@/components/layout/GridView/GridView";
import type { EventResults } from "@/types";

interface EventResultsProps {
  eventResults: EventResults;
  showPagination?: boolean;
  thumbnailCover?: boolean;
}

export default function EventResults({
  eventResults,
  thumbnailCover,
}: EventResultsProps) {
  return (
    <GridView
      items={eventResults.events}
      renderItem={(eventData) => (
        <EventResult
          date={eventData.date}
          name={eventData.name}
          location={eventData.location}
          imageCount={eventData.imageCount}
          thumbnailUrl={eventData.thumbnailUrl}
          thumbnailCover={thumbnailCover}
          eventLink={eventData.link} />
      )} />
  );
}
