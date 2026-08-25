
import Await from "@/components/core/Await";
import Container from "@/components/layout/Container/Container";
import ContentWithSidebar from "@/components/layout/ContentWithSidebar/ContentWithSidebar";
import ParamFilters from "@/components/partials/ParamFilters/ParamFilters";
import SearchBar from "@/components/partials/SearchBar/SearchBar";
import Sticky from "@/components/layout/Sticky/Sticky";
import { Metadata } from "next";
import EventSuspenseFallback from "@/components/domains/events/EventSuspenseFallback";
import ParamFiltersProvider from "@/context/ParamFiltersContext";
import { dummyGetEventResults } from "@/lib/dummy/dummyRequests";
import Pagination from "@/components/ui/Pagination/Pagination";
import SearchFilters from "@/components/partials/SearchFilters/SearchFilters";
import GridView from "@/components/layout/GridView/GridView";
import EventItem from "@/components/domains/events/EventItem";

export const metadata: Metadata = {
  title: "Search events",
  description: "Patrick McMullan Website",
};

export default function EventsPage() {
  const eventResultsPromise = dummyGetEventResults({
    limit: 12,
  });

  return (
    <>
      <Sticky name="searchBar" stack="globalHeader">
        <SearchBar initialSearchType="events" />
      </Sticky>
      <Container verticalSpacing>
        <ParamFiltersProvider>
          <ContentWithSidebar
            title="Filter events"
            sidebar={<SearchFilters withDate people={[]} locations={[]} photographers={[]} />}>
            <section>
              <div className="mb-6 flex flex-col gap-4">
                <div>
                  <h1 className="text-2xl font-bold uppercase tracking-wider">
                    Events
                  </h1>
                  <p className="mt-1 text-sm">
                    <Await promise={eventResultsPromise} suspense="Loading...">
                      {(eventResults) => eventResults.totalRecords + ' results'}
                    </Await>
                  </p>
                </div>
                <ParamFilters />
              </div>
              <Await
                promise={eventResultsPromise}
                suspense={<EventSuspenseFallback />}>
                {(eventResults) => (
                  <>
                    <GridView
                      items={eventResults.events}
                      renderItem={(eventData) => (
                        <EventItem
                          date={eventData.date}
                          name={eventData.name}
                          location={eventData.location}
                          imageCount={eventData.imageCount}
                          thumbnailUrl={eventData.thumbnailUrl}
                          eventLink={eventData.link} />
                      )} />
                    {eventResults.events.length > 0 && (
                      <Pagination
                        currentPage={eventResults.currentPage}
                        totalPages={eventResults.totalPages} />
                    )}
                  </>
                )}
              </Await>
            </section>
          </ContentWithSidebar>
        </ParamFiltersProvider>
      </Container>
    </>
  );
}
