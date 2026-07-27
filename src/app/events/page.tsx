
import Container from "@/components/Container/Container";
import EventItem from "@/components/EventItem/EventItem";
import GridView from "@/components/GridView/GridView";
import { eventsDummyData } from "@/dev/dummyData";

export default function EventsPage() {
  return (
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
            eventLink={eventData.link} />
        )} />
    </Container>
  );
}
