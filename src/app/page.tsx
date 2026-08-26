import Button from "@/components/ui/Button/Button";
import Container from "@/components/layout/Container/Container";
import SearchBar from "@/components/partials/SearchBar/SearchBar";
import Slideshow from "@/components/partials/Slideshow/Slideshow";
import Sticky from "@/components/layout/Sticky/Sticky";
import { Metadata } from "next";
import {
  dummyGetEventResults,
  dummyGetSlideshow,
} from "@/lib/dummy/dummyRequests";
import GridView from "@/components/layout/GridView/GridView";
import EventItem from "@/components/domains/events/EventItem";

export const metadata: Metadata = {
  title: "Patrick McMullan",
  description: "Patrick McMullan Website",
};

export default async function Home() {
  const [slideshow, eventResults] = await Promise.all([
    dummyGetSlideshow(12),
    dummyGetEventResults({ limit: 12, info: "info here" }),
  ]);

  return (
    <div>
      <Slideshow slides={slideshow} />
      <Sticky name="searchBar" stack="globalHeader">
        <SearchBar />
      </Sticky>
      <Container verticalSpacing>
        <GridView
          items={eventResults.events}
          renderItem={(eventData) => (
            <EventItem
              id={eventData.id}
              date={eventData.date}
              name={eventData.name}
              location={eventData.location}
              imageCount={eventData.imageCount}
              thumbnailUrl={eventData.thumbnailUrl}
              thumbnailCover />
          )} />
        <div className="flex justify-center mt-16">
          <Button variant="primary" behavior="link" href="/events">
            View all
          </Button>
        </div>
      </Container>
    </div>
  );
}
