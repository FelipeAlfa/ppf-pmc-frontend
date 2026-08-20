
import Await from "@/components/core/Await";
import Container from "@/components/layout/Container/Container";
import ContentWithSidebar from "@/components/layout/ContentWithSidebar/ContentWithSidebar";
import ParamFilters from "@/components/partials/ParamFilters/ParamFilters";
import SearchBar from "@/components/partials/SearchBar/SearchBar";
import Sticky from "@/components/layout/Sticky/Sticky";
import { Metadata } from "next";
import EventFilters from "@/components/domains/events/EventFilters";
import EventResults from "@/components/domains/events/EventResults";
import EventResultsFallback from "@/components/domains/events/EventResultsFallback";
import ParamFiltersProvider from "@/context/ParamFiltersContext";
import { dummyGetEventResults } from "@/lib/dummy/dummyRequests";
import Pagination from "@/components/ui/Pagination/Pagination";

export const metadata: Metadata = {
  title: "Search events",
  description: "Patrick McMullan Website",
};

export default async function EventsPage() {
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
            sidebar={<EventFilters />}>
            <section>
              <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                <div>
                  <h1 className="text-2xl font-bold uppercase tracking-wider">
                    Events
                  </h1>
                  <p className="mt-1 text-sm">
                    <Await promise={eventResultsPromise} suspense="Loading...">
                      {(eventResults) => eventResults.events.length + ' results'}
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
