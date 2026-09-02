import Await from "@/components/core/Await";
import Container from "@/components/layout/Container/Container";
import ContentWithSidebar from "@/components/layout/ContentWithSidebar/ContentWithSidebar";
import SearchFilterList from "@/components/domains/search/SearchFilterList";
import SearchBar from "@/components/domains/search/SearchBar";
import Sticky from "@/components/layout/Sticky/Sticky";
import EventSuspenseFallback from "@/components/domains/events/EventSuspenseFallback";
import SearchParamsStateProvider from "@/context/SearchParamsStateContext";
import { dummyGetEventResults, dummyGetFilters } from "@/lib/dummy-api/requests";
import SearchFilters from "@/components/domains/search/SearchFilters";
import {
  readSearchParamsState,
  type PageSearchParams,
} from "@/lib/searchParamsState";
import SearchFiltersSuspenseFallback from "@/components/domains/search/SearchFiltersSuspenseFallback";
import EventResultsList from "@/components/domains/events/EventResultsList";
import ResultsProvider from "@/context/ResultsContext";
import type { Metadata } from "next";
import { cache } from "react";

interface EventsPageProps {
  searchParams: Promise<PageSearchParams>;
}

const getEventResults = cache((encodedSearchParams: string) => {
  const eventResultParams = readSearchParamsState({ q: encodedSearchParams });

  return dummyGetEventResults(eventResultParams);
});

export async function generateMetadata({
  searchParams,
}: EventsPageProps): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const eventResults = await getEventResults(getEncodedSearchParams(resolvedSearchParams));

  return {
    title: getResultsTitle("Search events", eventResults.totalRecords),
  };
}

export default async function EventsPage({
  searchParams,
}: EventsPageProps) {
  const resolvedSearchParams = await searchParams;
  const eventResultParams = readSearchParamsState(resolvedSearchParams);
  const filtersPromise = dummyGetFilters({
    people: [],
    locations: [],
    photographers: []
  });
  const eventResultsPromise = getEventResults(getEncodedSearchParams(resolvedSearchParams));

  return (
    <>
      <Sticky name="searchBar" stack="globalHeader" z={95}>
        <SearchBar initialSearchType="events" />
      </Sticky>
      <Container verticalSpacing>
        <SearchParamsStateProvider>
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
                  <ResultsProvider
                    baseParams={eventResultParams}
                    initialResults={eventResults}
                    type="events">
                    <EventResultsList />
                  </ResultsProvider>
                )}
              </Await>
            </section>
          </ContentWithSidebar>
        </SearchParamsStateProvider>
      </Container>
    </>
  );
}

function getEncodedSearchParams(searchParams: PageSearchParams) {
  const encodedSearchParams = searchParams.q;

  return Array.isArray(encodedSearchParams)
    ? encodedSearchParams[0] ?? ""
    : encodedSearchParams ?? "";
}

function getResultsTitle(label: string, totalRecords: number) {
  return `${label} (${totalRecords} result${totalRecords === 1 ? "" : "s"}) - Patrick McMullan`;
}
