import Container from "@/components/layout/Container/Container";
import ContentWithSidebar from "@/components/layout/ContentWithSidebar/ContentWithSidebar";
import SearchBar from "@/components/partials/SearchBar/SearchBar";
import { longDate } from "@/lib/date";
import Sticky from "@/components/layout/Sticky/Sticky";
import SearchFilters from "@/components/partials/SearchFilters/SearchFilters";
import ParamFiltersProvider from "@/context/ParamFiltersContext";
import { ViewSwitcherControls, ViewSwitcherProvider, ViewSwitcherView } from "@/components/ui/ViewSwitcher/ViewSwitcher";
import GridView from "@/components/layout/GridView/GridView";
import PhotoGridItem from "@/components/domains/photos/PhotoGridItem";
import { dummyGetEvent, dummyGetPhotoResults } from "@/lib/dummy/dummyRequests";
import EditorialView from "@/components/layout/EditorialView/EditorialView";
import PhotoEditorialItem from "@/components/domains/photos/PhotoEditorialItem";
import CarouselView from "@/components/layout/CarouselView/CarouselView";
import Image from "next/image";

interface EventDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EventDetailPage({  }: EventDetailPageProps) {
  const [eventData, photoResults] = await Promise.all([
    dummyGetEvent(),
    dummyGetPhotoResults(),
  ]);

  return (
    <>
      <Sticky name="searchBar" stack="globalHeader">
        <SearchBar initialSearchType="events" />
      </Sticky>
      <Container verticalSpacing>
        dada
        <ParamFiltersProvider>
          <ViewSwitcherProvider name="event-page">
            <ContentWithSidebar
              title="Filter photos"
              sidebar={<SearchFilters people={[]} events={[]} locations={[]} photographers={[]} />}>
              <section>
                <header className="mb-8 border-b border-[#eeeeee] pb-6">
                  <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
                    <div>
                      <h1 className="text-2xl font-bold uppercase tracking-wider md:text-3xl">
                        {eventData.name}
                      </h1>
                      <div className="mt-4 space-y-1 text-sm leading-6">
                        <p>{eventData.location}</p>
                        <p>{longDate(eventData.date)}</p>
                        <p>Photo - PMC Staff / PMC</p>
                        <p className="mt-6 max-w-3xl text-sm leading-6 text-foreground/50">
                          Don&apos;t see your picture? Did we get your name wrong? Do you know someone we don&apos;t? Click Here
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center sm:items-end justify-between gap-4">
                      <ViewSwitcherControls views={["grid", "editorial", "carousel"]} />
                      <p className="text-sm font-bold uppercase tracking-wider">
                        {photoResults.photos.length} Images
                      </p>
                    </div>
                  </div>
                </header>
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
              </section>
            </ContentWithSidebar>
          </ViewSwitcherProvider>
        </ParamFiltersProvider>
      </Container>
    </>
  );
}
