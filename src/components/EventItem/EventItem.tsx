import Pluralizer from '../Pluralizer/Pluralizer';
import Thumbnail from '../Thumbnail/Thumbnail';
import Link from 'next/link';

interface EventItemProps {
  date: number;
  name: string;
  location: string;
  imageCount: number;
  thumbnailUrl: string;
  thumbnailCover?: boolean;
  eventLink: string;
}

export default function EventItem({
  date,
  name,
  location,
  imageCount,
  thumbnailUrl,
  eventLink,
  thumbnailCover = false
}: EventItemProps) {
  return (
    <div className="relative block">
      <Link href={eventLink}>
        <Thumbnail src={thumbnailUrl} alt={name} cover={thumbnailCover} />
      </Link>
      <div className="mt-4 font-helvetica-neue text-foreground">
        <div className="my-1 text-xs font-light">{date}</div>
        <Link className="text-[15px] font-medium" href={eventLink}>
          {name}
        </Link>
        <div className="my-1 text-xs font-light">{location}</div>
        <div className="mt-1 text-xs font-light tracking-wider">
          <Pluralizer count={imageCount} singular="$n image" plural="$n images" />
        </div>
      </div>
    </div>
  );
}
