import Pluralizer from "@/components/ui/Pluralizer/Pluralizer";
import Thumbnail from "@/components/ui/Thumbnail/Thumbnail";
import Link from 'next/link';

interface PhotoResultProps {
  code: number;
  eventName: string;
  locationName: string;
  date: number;
  thumbnailUrl: string;
  link: string;
}

export default function PhotoResult({
  code,
  eventName,
  locationName,
  date,
  thumbnailUrl,
  link
}: PhotoResultProps) {
  return (
    <div className="relative block">
      <Link href={link}>
        <Thumbnail src={thumbnailUrl} alt={eventName} />
      </Link>
      <div className="mt-4 font-helvetica-neue text-foreground">
        {/* <div className="my-1 text-xs font-light">{date}</div>
        <Link className="text-[15px] font-medium" href={eventLink}>
          {name}
        </Link>
        <div className="my-1 text-xs font-light">{location}</div>
        <div className="mt-1 text-xs font-light tracking-wider">
          <Pluralizer count={imageCount} singular="$n image" plural="$n images" />
        </div> */}
      </div>
    </div>
  );
}
