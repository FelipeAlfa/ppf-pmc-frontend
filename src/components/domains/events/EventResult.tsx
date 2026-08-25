import Pluralizer from "@/components/ui/Pluralizer/Pluralizer";
import Thumbnail from "@/components/ui/Thumbnail/Thumbnail";
import Link from 'next/link';
import { shortDate } from "@/lib/date";

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
  const formattedDate = shortDate(date);

  return (
    <Link href={eventLink} className="group relative block">
      <article>
        <div className="transition-opacity duration-150 ease-linear group-hover:opacity-90">
          <Thumbnail src={thumbnailUrl} alt={name} cover={thumbnailCover} />
        </div>
        <div className="mt-3 font-helvetica-neue text-foreground">
          <div className="text-[11px] font-light uppercase tracking-wider text-foreground/60">
            {formattedDate}
          </div>
          <div className="mt-1 block text-[15px] font-medium leading-snug underline-offset-3 group-hover:underline">
            {name}
          </div>
          <div className="mt-1 text-xs font-light leading-snug text-foreground/70">
            {location}
          </div>
          <div className="mt-2 text-[11px] font-light uppercase tracking-wider text-foreground/55">
            <Pluralizer count={imageCount} singular="$n image" plural="$n images" />
          </div>
        </div>
      </article>
    </Link>
  );
}
