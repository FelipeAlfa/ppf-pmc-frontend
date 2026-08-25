export default function EventSuspenseFallback() {
  return (
    <div aria-label="Loading event results">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }, (_, index) => (
          <div key={index} className="space-y-3">
            <div className="aspect-4/3 animate-pulse rounded bg-foreground/10" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-foreground/10" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-foreground/10" />
          </div>
        ))}
      </div>
    </div>
  );
}
