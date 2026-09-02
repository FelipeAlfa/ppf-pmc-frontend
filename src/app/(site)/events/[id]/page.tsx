import Container from "@/components/layout/Container/Container";
import ContentWithSidebar from "@/components/layout/ContentWithSidebar/ContentWithSidebar";
import SearchBar from "@/components/domains/search/SearchBar";
import { longDate } from "@/lib/date";
import Sticky from "@/components/layout/Sticky/Sticky";
import SearchFilters from "@/components/domains/search/SearchFilters";
import SearchParamsStateProvider from "@/context/SearchParamsStateContext";
import { ViewSwitcherControls, ViewSwitcherProvider } from "@/components/ui/ViewSwitcher/ViewSwitcher";
import { dummyGetEventInfo, dummyGetFilters, dummyGetPhotoResults } from "@/lib/dummy-api/requests";
import type { Metadata } from "next";
import { cache } from "react";
import PhotoResultsList from "@/components/domains/photos/PhotoResultsList";
import ResultsProvider from "@/context/ResultsContext";

interface EventDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

const getEventData = cache((id: string) => (
  dummyGetEventInfo({ id })
));

export async function generateMetadata({
  params,
}: EventDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const eventData = await getEventData(id);

  return {
    title: (eventData?.name ?? "Event") + " - Patrick McMullan",
  };
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { id } = await params;
  const [eventData, photoResults, {people, locations, photographers}] = await Promise.all([
    getEventData(id),
    dummyGetPhotoResults({}),
    dummyGetFilters({
      people: [],
      locations: [],
      photographers: [],
    }),
  ]);

  if (!eventData) return null;

  return (
    <>
      <Sticky name="searchBar" stack="globalHeader" z={95}>
        <SearchBar initialSearchType="events" />
      </Sticky>
      <Container verticalSpacing>
        <SearchParamsStateProvider pathname="/photos">
          <ViewSwitcherProvider name="event-page">
            <ContentWithSidebar
              title="Filter photos"
              sidebar={
                <SearchFilters
                  people={people}
                  locations={locations}
                  photographers={photographers} />
              }>
              <section>
                <header className="mb-8 border-b border-[#eeeeee] pb-6">
                  <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
                    <div>
                      <h1 className="text-2xl font-bold tracking-wider md:text-3xl">
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
                <ResultsProvider
                  baseParams={{ events: [id] }}
                  initialResults={photoResults}
                  type="photos">
                  <PhotoResultsList />
                </ResultsProvider>
              </section>
            </ContentWithSidebar>
          </ViewSwitcherProvider>
        </SearchParamsStateProvider>
      </Container>
    </>
  );
}
