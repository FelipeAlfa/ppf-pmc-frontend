import { faCartPlus, faCloudArrowDown, faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface PhotoActionsProps {
  photoName: string;
}

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

export default function PhotoActions({ photoName }: PhotoActionsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-1 font-helvetica-neue">
        {photoActions.map((action) => (
          <button
            key={action.key}
            type="button"
            className="inline-flex cursor-pointer items-center gap-1.5 py-1.5 px-2 text-[10px] font-medium rounded-sm tracking-wide text-foreground transition-colors duration-150 hover:border-foreground hover:bg-foreground/10"
            aria-label={action.ariaLabel.replace("$name", photoName)}>
            <span className="relative inline-flex h-3.5 w-3.5 items-center justify-center text-foreground/80">
              <FontAwesomeIcon icon={action.icon} className="h-3.5! w-3.5!" />
            </span>
            <span>{action.label}</span>
          </button>
        ))}
      </div>
  );
}
