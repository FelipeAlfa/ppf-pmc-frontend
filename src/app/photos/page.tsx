import Container from "@/components/layout/Container/Container";
import ContentWithSidebar from "@/components/layout/ContentWithSidebar/ContentWithSidebar";
import ParamFilters from "@/components/partials/ParamFilters/ParamFilters";
import SearchBar from "@/components/partials/SearchBar/SearchBar";
import Sticky from "@/components/layout/Sticky/Sticky";
import { Metadata } from "next";
import ParamFiltersProvider from "@/context/ParamFiltersContext";
import { dummyGetFilters, dummyGetParamFilterDetails, dummyGetPhotoResults } from "@/lib/dummy/dummyRequests";
import Await from "@/components/core/Await";
import LoadingBar from "@/components/ui/LoadingBar/LoadingBar";
import PhotoSuspenseFallback from "@/components/domains/photos/PhotoSuspenseFallback";
import Pagination from "@/components/ui/Pagination/Pagination";
import SearchFilters from "@/components/partials/SearchFilters/SearchFilters";
import { cookies } from "next/headers";
import { isViewType } from "@/types";
import { ViewSwitcherControls, ViewSwitcherProvider, ViewSwitcherView } from "@/components/ui/ViewSwitcher/ViewSwitcher";
import GridView from "@/components/layout/GridView/GridView";
import PhotoGridItem from "@/components/domains/photos/PhotoGridItem";
import EditorialView from "@/components/layout/EditorialView/EditorialView";
import PhotoEditorialItem from "@/components/domains/photos/PhotoEditorialItem";

export const metadata: Metadata = {
  title: "Search photos",
  description: "Patrick McMullan Website",
};

export default async function PhotosPage() {
  const photoResultsPromise = dummyGetPhotoResults();
  const filtersPromise = dummyGetFilters();
  const paramFilterDetailsPromise = dummyGetParamFilterDetails();
  const photoResultsView = (await cookies()).get("view-switcher-photo-results")?.value;
  const photoResultsViewType = isViewType(photoResultsView) ? photoResultsView : "grid";

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
                        <Await promise={photoResultsPromise} suspense="Loading...">
                          {(photoResults) => photoResults.totalRecords + ' results'}
                        </Await>
                      </p>
                    </div>
                    <div className="">
                      <ViewSwitcherControls views={["grid", "editorial", "carousel"]} />
                    </div>
                  </div>
                  <Await promise={paramFilterDetailsPromise} suspense={null}>
                    {(paramFilterDetails) => (
                      <ParamFilters details={paramFilterDetails} />
                    )}
                  </Await>
                </div>
                <Await
                  promise={photoResultsPromise}
                  suspense={<PhotoSuspenseFallback viewType={photoResultsViewType} />}>
                  {(photoResults) => (
                    <>
                      <ViewSwitcherView name="grid">
                        <GridView
                          items={photoResults.photos}
                          renderItem={(photoData) => (
                            <PhotoGridItem
                              code={photoData.code}
                              name={photoData.name}
                              eventName={photoData.eventName}
                              date={photoData.date}
                              thumbnailUrl={photoData.thumbnailUrl}
                              withActions />
                          )} />
                      </ViewSwitcherView>
                      <ViewSwitcherView name="editorial">
                        <EditorialView
                          items={photoResults.photos}
                          renderItem={(photoData) => (
                            <PhotoEditorialItem
                              code={photoData.code}
                              name={photoData.name}
                              thumbnailUrl={photoData.thumbnailUrl}
                              withActions />
                          )} />
                      </ViewSwitcherView>
                      <ViewSwitcherView name="carousel">
                        <div>CarouselView</div>
                      </ViewSwitcherView>
                      {photoResults.photos.length > 0 && (
                        <Pagination
                          currentPage={photoResults.currentPage}
                          totalPages={photoResults.totalPages} />
                      )}
                    </>
                  )}
                </Await>
              </section>
            </ViewSwitcherProvider>
          </ContentWithSidebar>
        </ParamFiltersProvider>
      </Container>
    </>
  );
}
