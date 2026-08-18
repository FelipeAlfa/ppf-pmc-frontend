import Button from "@/components/Button/Button";
import Container from "@/components/Container/Container";
import EventItem from "@/components/EventItem/EventItem";
import GridView from "@/components/GridView/GridView";
import SearchBar from "@/components/SearchBar/SearchBar";
import Slideshow from "@/components/Slideshow/Slideshow";
import Sticky from "@/components/Sticky/Sticky";
import { Metadata } from "next";
import {
  dummyGetSlideshow,
  dummyGetEventResults,
} from "@/lib/dummy/dummyRequests";

export const metadata: Metadata = {
  title: "Patrick McMullan",
  description: "Patrick McMullan Website",
};

export default async function Home() {
  const [slideshow, eventResults] = await Promise.all([
    dummyGetSlideshow(),
    dummyGetEventResults({ limit: 12 }),
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
              date={eventData.date}
              name={eventData.name}
              location={eventData.location}
              imageCount={eventData.imageCount}
              thumbnailUrl={eventData.thumbnailUrl}
              thumbnailCover
              eventLink={eventData.link} />
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
