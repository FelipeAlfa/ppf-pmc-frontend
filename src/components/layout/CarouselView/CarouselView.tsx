import type { ReactNode } from "react";
import CarouselViewEmbla from "./CarouselViewEmbla";

interface CarouselViewProps<D> {
  items: D[];
  renderItem: (item: D, index: number) => ReactNode;
  renderPreview?: (item: D, index: number) => ReactNode;
}

export default function CarouselView<D>({
  items,
  renderItem,
  renderPreview,
}: CarouselViewProps<D>) {
  return (
    <CarouselViewEmbla
      previews={renderPreview
        ? items.map((item, index) => renderPreview(item, index))
        : undefined}>
      {items.map((item, index) => (
        <li
          key={index}
          className="flex min-w-0 flex-[0_0_82%] items-center sm:flex-[0_0_56%] lg:flex-[0_0_38%] xl:flex-[0_0_30%]">
          {renderItem(item, index)}
        </li>
      ))}
    </CarouselViewEmbla>
  );
}
