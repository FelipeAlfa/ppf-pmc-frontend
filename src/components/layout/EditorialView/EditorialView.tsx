import type { ReactNode } from "react";

const editorialViewClassName = "columns-1 gap-2 md:columns-2 md:gap-4 lg:columns-3 xl:columns-4";

interface EditorialViewProps<D> {
  items: D[];
  renderItem: (item: D, index: number) => ReactNode;
}

export default function EditorialView<D>({
  items,
  renderItem,
}: EditorialViewProps<D>) {
  return (
    <ul className={editorialViewClassName}>
      {items.map((item, index) => (
        <li key={index} className="mb-4 break-inside-avoid">
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  );
}
