export default function PhotoResultsFallback() {
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
