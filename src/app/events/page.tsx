
import Container from "@/components/Container/Container";
import ContentWithSidebar from "@/components/ContentWithSidebar/ContentWithSidebar";
import EventItem from "@/components/EventItem/EventItem";
import FilterList from "@/components/FilterList/FilterList";
import GridView from "@/components/GridView/GridView";
import Pagination from "@/components/Pagination/Pagination";
import SearchBar from "@/components/SearchBar/SearchBar";
import Sticky from "@/components/Sticky/Sticky";
import { Metadata } from "next";
import {
  dummyGetEventResults,
} from "@/lib/dummy/dummyRequests";

export const metadata: Metadata = {
  title: "Search events",
  description: "Patrick McMullan Website",
};

export default async function EventsPage() {
  const [eventResults] = await Promise.all([
    dummyGetEventResults({ limit: 64 }),
  ]);

  return (
    <>
      <Sticky name="searchBar" stack="globalHeader">
        <SearchBar />
      </Sticky>
      <Container verticalSpacing>
        <ContentWithSidebar
          title="Search events"
          sidebar={<FilterList groups={[]} />}>
          <section>
            <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <h1 className="text-2xl font-bold uppercase tracking-wider">
                  Search Results
                </h1>
                <p className="mt-1 text-sm">
                  {eventResults.events.length} Events
                </p>
              </div>
              <p className="text-xs uppercase tracking-wider text-brand-blue">
                Dummy filters for layout validation
              </p>
            </div>
            <GridView
              items={eventResults.events}
              renderItem={(eventData) => (
                <EventItem
                  date={eventData.date}
                  name={eventData.name}
                  location={eventData.location}
                  imageCount={eventData.imageCount}
                  thumbnailUrl={eventData.thumbnailUrl}
                  eventLink={eventData.link} />
              )} />
            <Pagination />
          </section>
        </ContentWithSidebar>
      </Container>
    </>
  );
}
