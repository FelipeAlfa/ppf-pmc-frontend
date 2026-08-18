import Container from "@/components/Container/Container";
import ContentWithSidebar from "@/components/ContentWithSidebar/ContentWithSidebar";
import FilterList from "@/components/FilterList/FilterList";
import PhotoGrid from "@/components/PhotoGrid/PhotoGrid";
import SearchBar from "@/components/SearchBar/SearchBar";
import {
  eventsDummyData,
  filterGroupsDummyData,
  photosDummyData,
} from "@/lib/dummy/dummyData";

interface EventDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { id } = await params;
  const event = eventsDummyData[Number(id) - 1] ?? eventsDummyData[0];

  return (
    <>
      <SearchBar />
      <Container verticalSpacing>
        <ContentWithSidebar
          title="Filter photos"
          sidebar={<FilterList groups={filterGroupsDummyData} />}>
          <section>
            <header className="mb-8 border-b border-[#eeeeee] pb-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <h1 className="text-2xl font-bold uppercase tracking-wider md:text-3xl">
                    {event.name}
                  </h1>
                  <div className="mt-4 space-y-1 text-sm leading-6">
                    <p>{event.location}</p>
                    <p>{new Intl.DateTimeFormat("en", { dateStyle: "full" }).format(event.date)}</p>
                    <p>Photo - PMC Staff / PMC</p>
                  </div>
                </div>
                <p className="text-sm font-bold uppercase tracking-wider">
                  {photosDummyData.length} Images
                </p>
              </div>
              <p className="mt-6 max-w-3xl text-sm leading-6">
                Dummy event detail content while we migrate the legacy AngularJS photo browsing flow.
              </p>
            </header>
            <PhotoGrid photos={photosDummyData} />
          </section>
        </ContentWithSidebar>
      </Container>
    </>
  );
}
