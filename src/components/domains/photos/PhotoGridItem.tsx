import Thumbnail from "@/components/ui/Thumbnail/Thumbnail";
import { shortDate } from "@/lib/date";
import Link from "next/link";
import PhotoActions from "./PhotoActions";

interface PhotoGridItemProps {
  code: number;
  name: string;
  eventName?: string;
  date?: number;
  thumbnailUrl: string;
  withActions?: boolean;
}

export default function PhotoGridItem({
  code,
  name,
  eventName,
  date,
  thumbnailUrl,
  withActions = false,
}: PhotoGridItemProps) {
  return (
    <article>
      <div className="transition-opacity duration-150 ease-linear group-hover:opacity-90">
        <Link href={`/photo/${code}`}>
          <Thumbnail src={thumbnailUrl} alt={name} />
        </Link>
      </div>
      <div className="my-3 font-helvetica-neue text-foreground text-center">
        <div className="my-1 block text-sm font-medium leading-snug underline-offset-3 group-hover:underline">
          {name}
        </div>
        <div className="text-xs font-light leading-snug text-foreground/70">
          {code}
        </div>
        {!!eventName?.trim() && (
          <div className="text-xs font-light leading-snug text-foreground/70">
            {eventName}
          </div>
        )}
        {!!date && (
          <div className="text-xs font-light leading-snug text-foreground/70">
            {shortDate(date)}
          </div>
        )}
      </div>
      {withActions && <PhotoActions photoName={name} />}
    </article>
  );
}
