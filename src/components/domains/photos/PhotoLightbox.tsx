import Image from "next/image";
import { longDate } from "@/lib/date";
import type { PhotoResult } from "@/types";

interface PhotoLightboxProps {
  closeControl?: React.ReactNode;
  photo: PhotoResult;
}

export default function PhotoLightbox({
  closeControl,
  photo,
}: PhotoLightboxProps) {
  return (
    <article className="relative flex min-h-dvh w-full flex-col bg-[radial-gradient(circle_at_center,#262626_0%,#050505_58%,#000_100%)] text-white">
      {closeControl && (
        <div className="absolute top-4 right-4 z-10">
          {closeControl}
        </div>
      )}
      <div className="grid min-h-dvh w-full flex-1 grid-rows-[minmax(0,1fr)_auto] gap-4 p-4 md:p-6">
        <div className="relative min-h-[55vh] w-full">
          <Image
            src={photo.thumbnailUrl}
            alt={photo.name}
            fill
            priority
            sizes="100vw"
            className="object-contain" />
        </div>
        <div className="mx-auto w-full max-w-4xl pb-4 text-center font-helvetica-neue">
          <h1 className="text-lg font-bold tracking-wider md:text-2xl">
            {photo.name}
          </h1>
          <dl className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-1 text-xs leading-5 text-white/70 md:text-sm">
            <div className="flex gap-1">
              <dt className="font-bold uppercase tracking-wider text-white/45">Code</dt>
              <dd>{photo.code}</dd>
            </div>
            <div className="flex gap-1">
              <dt className="font-bold uppercase tracking-wider text-white/45">Event</dt>
              <dd>{photo.eventName}</dd>
            </div>
            <div className="flex gap-1">
              <dt className="font-bold uppercase tracking-wider text-white/45">Location</dt>
              <dd>{photo.locationName}</dd>
            </div>
            <div className="flex gap-1">
              <dt className="font-bold uppercase tracking-wider text-white/45">Date</dt>
              <dd>{longDate(photo.date)}</dd>
            </div>
          </dl>
        </div>
      </div>
    </article>
  );
}
