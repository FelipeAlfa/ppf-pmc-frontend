import Link from "next/link";
import PhotoActions from "./PhotoActions";
import Image from "next/image";

interface PhotoEditorialItemProps {
  code: number;
  name: string;
  thumbnailUrl: string;
  withActions?: boolean;
}

export default function PhotoEditorialItem({
  code,
  name,
  thumbnailUrl,
  withActions = false,
}: PhotoEditorialItemProps) {
  return (
    <article className="group relative overflow-hidden rounded-[5px] bg-foreground/5">
      <Link href={`/photo/${code}`} className="block" aria-label={name}>
        <div>
          <Image
            width={640}
            height={640}
            className="block h-auto w-full"
            src={thumbnailUrl}
            alt={name} />
        </div>
      </Link>
      <div className="pointer-events-none absolute inset-0 flex items-end bg-black/65 p-2 opacity-0 transition-opacity duration-150 ease-linear group-hover:opacity-100">
        <div className="w-full font-helvetica-neue text-white text-center">
          <div className="text-sm font-medium leading-snug">
            {name}
          </div>
          <div className="mt-1 text-xs font-light leading-snug text-white/75">
            {code}
          </div>
          {withActions && (
            <div className="pointer-events-auto mt-3 rounded-sm bg-white/90 p-1">
              <PhotoActions photoName={name} />
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
