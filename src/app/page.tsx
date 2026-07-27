import Container from "@/components/Container/Container";
import EventItem from "@/components/EventItem/EventItem";
import GridView from "@/components/GridView/GridView";
import SearchBar from "@/components/SearchBar/SearchBar";
import Slideshow from "@/components/Slideshow/Slideshow";
import { eventsDummyData, slideshowDummyData } from "@/dev/dummyData";

export default function Home() {
  return (
    <div>
      <Slideshow slides={slideshowDummyData} />
      <SearchBar />
      <Container verticalSpacing>
        <GridView
          items={eventsDummyData}
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
      </Container>
    </div>
  );
}
