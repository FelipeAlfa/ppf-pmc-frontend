import Container from "@/components/layout/Container/Container";
import ContentWithSidebar from "@/components/layout/ContentWithSidebar/ContentWithSidebar";
import ParamFilters from "@/components/domains/search/SearchFilterList";
import SearchBar from "@/components/domains/search/SearchBar";
import Sticky from "@/components/layout/Sticky/Sticky";
import SearchParamsStateProvider from "@/context/SearchParamsStateContext";
import { dummyGetFilters, dummyGetPhotoResults } from "@/lib/dummy-api/requests";
import Await from "@/components/core/Await";
import PhotoSuspenseFallback from "@/components/domains/photos/PhotoSuspenseFallback";
import SearchFilters from "@/components/domains/search/SearchFilters";
import { cookies } from "next/headers";
import { isViewType } from "@/types";
import { ViewSwitcherControls, ViewSwitcherProvider } from "@/components/ui/ViewSwitcher/ViewSwitcher";
import {
  readSearchParamsState,
  type PageSearchParams,
} from "@/lib/searchParamsState";
import SearchFiltersSuspenseFallback from "@/components/domains/search/SearchFiltersSuspenseFallback";
import PhotoResultsList from "@/components/domains/photos/PhotoResultsList";
import ResultsProvider from "@/context/ResultsContext";
import type { Metadata } from "next";
import { cache } from "react";

interface PhotosPageProps {
  searchParams: Promise<PageSearchParams>;
}

const getPhotoResults = cache((encodedSearchParams: string) => {
  const photoResultParams = readSearchParamsState({ q: encodedSearchParams });

  return dummyGetPhotoResults(photoResultParams);
});

export async function generateMetadata({
  searchParams,
}: PhotosPageProps): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const encodedSearchParams = getEncodedSearchParams(resolvedSearchParams);
  const photoResultParams = readSearchParamsState({ q: encodedSearchParams });
  const photoResults = await getPhotoResults(encodedSearchParams);
  const titleLabel = photoResultParams.text ?? "Search photos";

  return {
    title: getResultsTitle(titleLabel, photoResults.totalRecords),
    description: "Patrick McMullan Website",
  };
}

export default async function PhotosPage({
  searchParams,
}: PhotosPageProps) {
  const resolvedSearchParams = await searchParams;
  const photoResultParams = readSearchParamsState(resolvedSearchParams);
  const photoResultsPromise = getPhotoResults(getEncodedSearchParams(resolvedSearchParams));
  const filtersPromise = dummyGetFilters({
    people: [],
    events: [],
    locations: [],
    photographers: []
  });
  const photoResultsView = (await cookies()).get("view-switcher-photo-results")?.value;
  const photoResultsViewType = isViewType(photoResultsView) ? photoResultsView : "grid";

  return (
    <>
      <Sticky name="searchBar" stack="globalHeader" z={95}>
        <SearchBar initialSearchType="photos" />
      </Sticky>
      <Container verticalSpacing>
        <SearchParamsStateProvider>
          <ContentWithSidebar
            title="Filter photos"
            sidebar={(
              <Await promise={filtersPromise} suspense={<SearchFiltersSuspenseFallback placehold="lists" />}>
                {({ events, people, locations, photographers }) => (
                  <SearchFilters
                    events={events}
                    people={people}
                    locations={locations}
                    photographers={photographers} />
                )}
              </Await>
            )}>
            <ViewSwitcherProvider name="photo-results" initialView={photoResultsViewType}>
              <section>
                <div className="mb-6 flex flex-col gap-4">
                  <div className="flex justify-between">
                    <div>
                      <h1 className="text-2xl font-bold uppercase tracking-wider">
                        Photos
                      </h1>
                      <p className="mt-1 text-sm">
                        <Await promise={photoResultsPromise} suspense="">
                          {(photoResults) => photoResults.totalRecords + ' results'}
                        </Await>
                      </p>
                    </div>
                    <div className="">
                      <ViewSwitcherControls views={["grid", "editorial", "carousel"]} />
                    </div>
                  </div>
                  <ParamFilters />
                </div>
                <Await
                  promise={photoResultsPromise}
                  suspense={<PhotoSuspenseFallback viewType={photoResultsViewType} />}>
                  {(photoResults) => (
                    <ResultsProvider
                      baseParams={photoResultParams}
                      initialResults={photoResults}
                      type="photos">
                      <PhotoResultsList />
                    </ResultsProvider>
                  )}
                </Await>
              </section>
            </ViewSwitcherProvider>
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
