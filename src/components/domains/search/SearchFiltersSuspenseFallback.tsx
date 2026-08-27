interface SearchFiltersSuspenseFallbackProps {
  placehold?: "date" | "lists" | "date/lists";
}

export default function SearchFiltersSuspenseFallback({
  placehold = "date/lists"
}: SearchFiltersSuspenseFallbackProps) {
  const showDate = placehold === "date" || placehold === "date/lists";
  const showLists = placehold === "lists" || placehold === "date/lists";

  return (
    <div aria-label="Loading filters">
      <div className="flex flex-col gap-6 p-4">
        {showDate && (
          <div className="flex flex-col gap-1">
            <div className="h-3 w-full animate-pulse rounded bg-foreground/10" />
            <div className="h-50 w-full animate-pulse rounded bg-foreground/10" />
            <div className="h-3 w-full animate-pulse rounded bg-foreground/10" />
          </div>
        )}
        {showLists && (
          <div className="flex flex-col gap-1">
            {Array.from({ length: 4 }, (_, index) => (
              <div key={index} className="flex flex-col gap-3">
                <div className="h-5 w-full animate-pulse rounded bg-foreground/10" />
                {!showDate && (index === 0) && (
                  <>
                    <div className="h-2 w-3/4 animate-pulse rounded bg-foreground/10" />
                    <div className="h-2 w-3/4 animate-pulse rounded bg-foreground/10" />
                    <div className="h-2 w-3/4 animate-pulse rounded bg-foreground/10 mb-4" />
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
