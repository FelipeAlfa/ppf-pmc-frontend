import { ViewType } from "@/types";

interface PhotoSuspenseFallbackProps {
  viewType: ViewType;
}

export default function PhotoSuspenseFallback({ viewType }: PhotoSuspenseFallbackProps) {
  if (viewType === "grid") {
    return (
      <div aria-label="Loading photo results">
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }, (_, index) => (
            <li key={index}>
              <div className="aspect-4/3 animate-pulse rounded bg-foreground/10" />
              <div className="my-3 space-y-2">
                <div className="mx-auto h-4 w-3/4 animate-pulse rounded bg-foreground/10" />
                <div className="mx-auto h-3 w-1/4 animate-pulse rounded bg-foreground/10" />
                <div className="mx-auto h-3 w-1/2 animate-pulse rounded bg-foreground/10" />
                <div className="mx-auto h-3 w-2/5 animate-pulse rounded bg-foreground/10" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (viewType === "editorial") {
    const itemHeights = [
      "h-72",
      "h-48",
      "h-80",
      "h-56",
      "h-64",
      "h-96",
      "h-52",
      "h-72",
      "h-60",
      "h-80",
      "h-48",
      "h-72",
    ];

    return (
      <div aria-label="Loading editorial photo results">
        <ul className="columns-1 gap-2 md:columns-2 md:gap-4 lg:columns-3 xl:columns-4">
          {itemHeights.map((heightClassName, index) => (
            <li key={index} className="mb-4 break-inside-avoid">
              <div className={`${heightClassName} animate-pulse rounded bg-foreground/10`} />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (viewType === "carousel") {
    return (
      <div aria-label="Loading carousel photo results" className="relative min-w-0 w-full">
        <div>
          <ul className="grid w-full grid-cols-3 gap-4">
            <li>
              <div className="aspect-square animate-pulse rounded-[5px] bg-foreground/10" />
            </li>
            <li>
              <div className="aspect-square animate-pulse rounded-[5px] bg-foreground/10" />
            </li>
            <li>
              <div className="aspect-square animate-pulse rounded-[5px] bg-foreground/10" />
            </li>
          </ul>
        </div>
        <div className="mt-4 flex justify-center gap-2 overflow-x-auto pb-1">
          {Array.from({ length: 8 }, (_, index) => (
            <div
              key={index}
              className="h-12 w-12 shrink-0 animate-pulse rounded-sm bg-foreground/10" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div aria-label="Loading photo results">
      <div className="h-96 animate-pulse rounded bg-foreground/10" />
    </div>
  );
}
