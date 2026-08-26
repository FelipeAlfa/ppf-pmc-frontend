import Container from "@/components/layout/Container/Container";
import ContentWithSidebar from "@/components/layout/ContentWithSidebar/ContentWithSidebar";
import ParamFilters from "@/components/partials/SearchFilterList/SearchFilterList";
import SearchBar from "@/components/partials/SearchBar/SearchBar";
import Sticky from "@/components/layout/Sticky/Sticky";
import { Metadata } from "next";
import ParamStateProvider from "@/context/ParamStateContext";
import { dummyGetFilters, dummyGetPhotoResults } from "@/lib/dummy/dummyRequests";
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
import CarouselView from "@/components/layout/CarouselView/CarouselView";
import Image from "next/image";
import { readSearchParamsState, type PageSearchParams } from "@/lib/searchParams";

export const metadata: Metadata = {
  title: "Search photos",
  description: "Patrick McMullan Website",
};

interface PhotosPageProps {
  searchParams: Promise<PageSearchParams>;
}

export default async function PhotosPage({
  searchParams,
}: PhotosPageProps) {
  const resolvedSearchParams = await searchParams;
  const photoResultParams = readSearchParamsState(resolvedSearchParams);
  const photoResultsPromise = dummyGetPhotoResults({
    ...photoResultParams,
    limit: 64,
  });
  const filtersPromise = dummyGetFilters({
    limit: 12,
    people: 12,
    events: 12,
    locations: 12,
    photographers: 12
  });
  const photoResultsView = (await cookies()).get("view-switcher-photo-results")?.value;
  const photoResultsViewType = isViewType(photoResultsView) ? photoResultsView : "grid";

  return (
    <>
      <Sticky name="searchBar" stack="globalHeader">
        <SearchBar initialSearchType="photos" />
      </Sticky>
      <Container verticalSpacing>
        <ParamStateProvider>
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
                        <CarouselView
                          items={photoResults.photos}
                          renderItem={(photoData) => (
                            <PhotoEditorialItem
                              code={photoData.code}
                              name={photoData.name}
                              thumbnailUrl={photoData.thumbnailUrl}
                              withActions />
                          )}
                          renderPreview={(photoData) => (
                            <Image
                              src={photoData.thumbnailUrl}
                              alt={photoData.name}
                              width={64}
                              height={64}
                              className="block h-full w-full object-cover" />
                          )} />
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
        </ParamStateProvider>
      </Container>
    </>
  );
}
