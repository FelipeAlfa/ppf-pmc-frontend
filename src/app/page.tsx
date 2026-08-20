import Button from "@/components/ui/Button/Button";
import Container from "@/components/layout/Container/Container";
import EventResults from "@/components/domains/events/EventResults";
import SearchBar from "@/components/partials/SearchBar/SearchBar";
import Slideshow from "@/components/partials/Slideshow/Slideshow";
import Sticky from "@/components/layout/Sticky/Sticky";
import { Metadata } from "next";
import {
  dummyGetEventResults,
  dummyGetSlideshow,
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
        <EventResults
          eventResults={eventResults}
          showPagination={false}
          thumbnailCover />
        <div className="flex justify-center mt-16">
          <Button variant="primary" behavior="link" href="/events">
            View all
          </Button>
        </div>
      </Container>
    </div>
  );
}
