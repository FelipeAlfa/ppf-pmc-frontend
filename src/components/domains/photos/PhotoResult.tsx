import Thumbnail from "@/components/ui/Thumbnail/Thumbnail";
import { shortDate } from "@/lib/date";
import { faLightbulb } from "@fortawesome/free-regular-svg-icons";
import {
  faCartPlus,
  faCloudArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const photoActions = [
  {
    key: "cart",
    label: "Cart",
    ariaLabel: "Add $name to cart",
    icon: faCartPlus,
  },
  {
    key: "lightbox",
    label: "Lightbox",
    ariaLabel: "Add $name to lightbox",
    icon: faLightbulb,
  },
  {
    key: "download",
    label: "Download",
    ariaLabel: "Download $name",
    icon: faCloudArrowDown,
  },
];

interface PhotoResultProps {
  code: number;
  name: string;
  eventName?: string;
  date?: number;
  thumbnailUrl: string;
  withActions?: boolean;
}

export default function PhotoResult({
  code,
  name,
  eventName,
  date,
  thumbnailUrl,
  withActions = false,
}: PhotoResultProps) {
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
      {withActions && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-1 font-helvetica-neue">
          {photoActions.map((action) => (
            <button
              key={action.key}
              type="button"
              className="inline-flex cursor-pointer items-center gap-1.5 py-1.5 px-2 text-[10px] font-medium rounded-sm tracking-wide text-foreground transition-colors duration-150 hover:border-foreground hover:bg-foreground/10"
              aria-label={action.ariaLabel.replace("$name", name)}>
              <span className="relative inline-flex h-3.5 w-3.5 items-center justify-center text-foreground/80">
                <FontAwesomeIcon icon={action.icon} className="h-3.5! w-3.5!" />
              </span>
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      )}
    </article>
  );
}
