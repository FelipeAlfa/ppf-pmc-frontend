import Pluralizer from "@/components/ui/Pluralizer/Pluralizer";
import Thumbnail from "@/components/ui/Thumbnail/Thumbnail";
import Link from 'next/link';

interface EventResultProps {
  date: number;
  name: string;
  location: string;
  imageCount: number;
  thumbnailUrl: string;
  thumbnailCover?: boolean;
  eventLink: string;
}

export default function EventResult({
  date,
  name,
  location,
  imageCount,
  thumbnailUrl,
  eventLink,
  thumbnailCover = false
}: EventResultProps) {
  return (
    <div className="relative block md:p-4 md:rounded-sm md:transition-all md:duration-100 md:border md:border-transparent md:hover:border-foreground/15 md:hover:bg-foreground/2 md:hover:shadow-sm">
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
