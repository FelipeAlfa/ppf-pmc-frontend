
import Await from "@/components/core/Await";
import Container from "@/components/layout/Container/Container";
import ContentWithSidebar from "@/components/layout/ContentWithSidebar/ContentWithSidebar";
import SearchFilterList from "@/components/domains/search/SearchFilterList";
import SearchBar from "@/components/domains/search/SearchBar";
import Sticky from "@/components/layout/Sticky/Sticky";
import EventSuspenseFallback from "@/components/domains/events/EventSuspenseFallback";
import ParamStateProvider from "@/context/ParamStateContext";
import { dummyGetEventResults, dummyGetFilters } from "@/lib/dummy/dummyRequests";
import Pagination from "@/components/ui/Pagination/Pagination";
import SearchFilters from "@/components/domains/search/SearchFilters";
import GridView from "@/components/layout/GridView/GridView";
import EventItem from "@/components/domains/events/EventItem";
import { readSearchParamsState, type PageSearchParams } from "@/lib/searchParams";
import SearchFiltersSuspenseFallback from "@/components/domains/search/SearchFiltersSuspenseFallback";

interface EventsPageProps {
  searchParams: Promise<PageSearchParams>;
}

export default async function EventsPage({
  searchParams,
}: EventsPageProps) {
  const resolvedSearchParams = await searchParams;
  const eventResultParams = readSearchParamsState(resolvedSearchParams);
  const filtersPromise = dummyGetFilters({
    limit: 12,
    people: 12,
    locations: 12,
    photographers: 12
  });
  const eventResultsPromise = dummyGetEventResults({
    ...eventResultParams,
    limit: 12,
  });

  return (
    <>
      <Sticky name="searchBar" stack="globalHeader">
        <SearchBar initialSearchType="events" />
      </Sticky>
      <Container verticalSpacing>
        <ParamStateProvider>
          <ContentWithSidebar
            title="Filter events"
            sidebar={
              <Await promise={filtersPromise} suspense={<SearchFiltersSuspenseFallback />}>
                {({ people, locations, photographers }) => (
                  <SearchFilters
                    withDate
                    people={people}
                    locations={locations}
                    photographers={photographers} />
                )}
              </Await>
            }>
            <section>
              <div className="mb-6 flex flex-col gap-4">
                <div>
                  <h1 className="text-2xl font-bold uppercase tracking-wider">
                    Events
                  </h1>
                  <p className="mt-1 text-sm">
                    <Await promise={eventResultsPromise} suspense="">
                      {(eventResults) => eventResults.totalRecords + ' results'}
                    </Await>
                  </p>
                </div>
                <SearchFilterList />
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
                          id={eventData.id}
                          date={eventData.date}
                          name={eventData.name}
                          location={eventData.location}
                          imageCount={eventData.imageCount}
                          thumbnailUrl={eventData.thumbnailUrl} />
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
        </ParamStateProvider>
      </Container>
    </>
  );
}
