"use client";

import GridView from "@/components/layout/GridView/GridView";
import SearchPagination from "@/components/domains/search/SearchPagination";
import { useResults } from "@/context/ResultsContext";
import type { EventResults } from "@/types";
import EventItem from "./EventItem";

export default function EventResultsList() {
  const { results } = useResults<EventResults>();

  return (
    <>
      <GridView
        items={results.events}
        renderItem={(eventData) => (
          <EventItem
            id={eventData.id}
            date={eventData.date}
            name={eventData.name}
            location={eventData.location}
            imageCount={eventData.imageCount}
            thumbnailUrl={eventData.thumbnailUrl} />
        )} />
      {results.events.length > 0 && (
        <SearchPagination
          currentPage={results.currentPage}
          totalPages={results.totalPages} />
      )}
    </>
  );
}
