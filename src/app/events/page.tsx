
import Await from "@/components/core/Await";
import Container from "@/components/layout/Container/Container";
import ContentWithSidebar from "@/components/layout/ContentWithSidebar/ContentWithSidebar";
import ParamFilters from "@/components/partials/ParamFilters/ParamFilters";
import SearchBar from "@/components/partials/SearchBar/SearchBar";
import Sticky from "@/components/layout/Sticky/Sticky";
import { Metadata } from "next";
import EventResults from "@/components/domains/events/EventResults";
import EventResultsFallback from "@/components/domains/events/EventResultsFallback";
import ParamFiltersProvider from "@/context/ParamFiltersContext";
import { dummyGetEventResults } from "@/lib/dummy/dummyRequests";
import Pagination from "@/components/ui/Pagination/Pagination";
import SearchFilters from "@/components/partials/SearchFilters/SearchFilters";

export const metadata: Metadata = {
  title: "Search events",
  description: "Patrick McMullan Website",
};

export default async function EventsPage() {
  const eventResultsPromise = dummyGetEventResults({
    limit: 12,
  });

  const eventFilters = [
    {id: "1", name: "Event 1"},
    {id: "2", name: "Event 2"},
    {id: "3", name: "Event 3"},
    {id: "4", name: "Event 4"},
    {id: "5", name: "Event 5"},
    {id: "6", name: "Event 6"},
    {id: "7", name: "Event 7"},
    {id: "8", name: "Event 8"},
    {id: "9", name: "Event 9"},
    {id: "10", name: "Event 10"},
    {id: "11", name: "Event 11"},
    {id: "12", name: "Event 12"},
    {id: "13", name: "Event 13"},
  ];

  const personFilters = [
    {id: "1", name: "Person 1"},
    {id: "2", name: "Person 2"},
    {id: "3", name: "Person 3"},
    {id: "4", name: "Person 4"},
  ];

  return (
    <>
      <Sticky name="searchBar" stack="globalHeader">
        <SearchBar initialSearchType="events" />
      </Sticky>
      <Container verticalSpacing>
        <ParamFiltersProvider>
          <ContentWithSidebar
            title="Filter events"
            sidebar={<SearchFilters withDate events={eventFilters} people={personFilters} />}>
            <section>
              <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
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
                suspense={<EventResultsFallback />}>
                {(eventResults) => (
                  <>
                    <EventResults eventResults={eventResults} />
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
