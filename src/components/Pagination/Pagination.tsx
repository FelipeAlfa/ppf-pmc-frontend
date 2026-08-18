import Button from "../Button/Button";

export default function Pagination() {
  return (
    <nav className="mt-8 flex flex-row flex-wrap items-center justify-center gap-2" aria-label="Pagination">
      <Button type="button" variant="outline">
        &lt;&lt; First
      </Button>
      <Button type="button" variant="outline">
        &lt; Previous
      </Button>
      <div className="flex flex-row items-center gap-2 text-sm">
        <input
          className="h-10 w-16 rounded-xs border border-foreground bg-white px-2 text-center text-sm"
          type="number"
          min="1"
          defaultValue="1"
          aria-label="Current page" />
        <span className="whitespace-nowrap">
          of 12
        </span>
      </div>
      <Button type="button" variant="outline">
        Next &gt;
      </Button>
      <Button type="button" variant="outline">
        Last &gt;&gt;
      </Button>
    </nav>
  );
}
