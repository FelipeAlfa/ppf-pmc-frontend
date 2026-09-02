import Image from "next/image";
import { longDate } from "@/lib/date";
import type { PhotoResult } from "@/types";

interface PhotoDetailProps {
  photo: PhotoResult;
}

export default function PhotoDetail({
  photo,
}: PhotoDetailProps) {
  return (
    <article className="grid w-full gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
      <div className="relative min-h-[60vh] overflow-hidden bg-foreground/5">
        <Image
          src={photo.thumbnailUrl}
          alt={photo.name}
          fill
          priority
          sizes="(min-width: 1024px) calc(100vw - 24rem), 100vw"
          className="object-contain" />
      </div>
      <div className="font-helvetica-neue">
        <h1 className="text-2xl font-bold tracking-wider">
          {photo.name}
        </h1>
        <dl className="mt-5 space-y-3 text-sm leading-6">
          <div>
            <dt className="text-xs font-bold uppercase tracking-wider text-foreground/45">
              Code
            </dt>
            <dd>{photo.code}</dd>
          </div>
          <div>
            <dt className="text-xs font-bold uppercase tracking-wider text-foreground/45">
              Event
            </dt>
            <dd>{photo.eventName}</dd>
          </div>
          <div>
            <dt className="text-xs font-bold uppercase tracking-wider text-foreground/45">
              Location
            </dt>
            <dd>{photo.locationName}</dd>
          </div>
          <div>
            <dt className="text-xs font-bold uppercase tracking-wider text-foreground/45">
              Date
            </dt>
            <dd>{longDate(photo.date)}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
