import Image from "next/image";
import {
  thumbnailImageVariants,
  thumbnailImageWrapperVariants,
  thumbnailVariants,
} from "./Thumbnail.variants";

interface ThumbnailProps {
  src: string;
  alt: string;
  cover?: boolean;
}

export default function Thumbnail({
  src,
  alt,
  cover = false,
}: ThumbnailProps) {
  return (
    <span className={thumbnailVariants({ cover })}>
      <span className="relative block md:absolute md:inset-0 md:flex md:h-full md:w-full md:flex-col md:flex-nowrap md:items-center md:justify-center md:overflow-hidden">
        <span className={thumbnailImageWrapperVariants({ cover })}>
          <Image
            className={thumbnailImageVariants({ cover })}
            src={src}
            alt={alt}
            width={400}
            height={400} />
        </span>
      </span>
    </span>
  );
}
