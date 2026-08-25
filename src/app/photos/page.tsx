import Container from "@/components/layout/Container/Container";
import ContentWithSidebar from "@/components/layout/ContentWithSidebar/ContentWithSidebar";
import ParamFilters from "@/components/partials/ParamFilters/ParamFilters";
import SearchBar from "@/components/partials/SearchBar/SearchBar";
import Sticky from "@/components/layout/Sticky/Sticky";
import { Metadata } from "next";
import ParamFiltersProvider from "@/context/ParamFiltersContext";
import PhotoFilters from "@/components/domains/photos/PhotoFilters";
import { dummyGetFilters, dummyGetParamFilterDetails, dummyGetPhotoResults } from "@/lib/dummy/dummyRequests";
import Await from "@/components/core/Await";
import LoadingBar from "@/components/ui/LoadingBar/LoadingBar";
import PhotoResults from "@/components/domains/photos/PhotoResults";
import Pagination from "@/components/ui/Pagination/Pagination";

export const metadata: Metadata = {
  title: "Search photos",
  description: "Patrick McMullan Website",
};

export default async function PhotosPage() {
  const photoResultsPromise = dummyGetPhotoResults();
  const filtersPromise = dummyGetFilters();
  const paramFilterDetailsPromise = dummyGetParamFilterDetails();

  return (
    <>
      <Sticky name="searchBar" stack="globalHeader">
        <SearchBar initialSearchType="photos" />
      </Sticky>
      <Container verticalSpacing>
        <ParamFiltersProvider>
          <ContentWithSidebar
            title="Filter photos"
            sidebar={(
              <Await promise={filtersPromise} suspense={<LoadingBar />}>
                {(filters) => <PhotoFilters filters={filters} />}
              </Await>
            )}>
            <section>
              <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                <div>
                  <h1 className="text-2xl font-bold uppercase tracking-wider">
                    Photos
                  </h1>
                  <p className="mt-1 text-sm">
                    <Await promise={photoResultsPromise} suspense="Loading...">
                      {(photoResults) => photoResults.totalRecords + ' results'}
                    </Await>
                  </p>
                </div>
                <Await promise={paramFilterDetailsPromise} suspense={null}>
                  {(paramFilterDetails) => (
                    <ParamFilters details={paramFilterDetails} />
                  )}
                </Await>
              </div>
              <Await
                promise={photoResultsPromise}
                suspense={"loading..."}>
                {(photoResults) => (
                  <>
                    <PhotoResults photoResults={photoResults} />
                    {photoResults.photos.length > 0 && (
                      <Pagination
                        currentPage={photoResults.currentPage}
                        totalPages={photoResults.totalPages} />
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
