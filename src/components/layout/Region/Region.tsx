"use client";

import { useRegions } from "@/context/RegionContext";
import type { AppRegion } from "@/context/RegionContext";
import { useCallback, useRef } from "react";

interface RegionProps {
  region: AppRegion;
  children?: React.ReactNode;
}

export default function Region({
  region,
  children
}: RegionProps) {
  const { add, remove } = useRegions();
  const htmlElementRef = useRef<HTMLDivElement | null>(null);

  const setRegionRef = useCallback((element: HTMLDivElement | null) => {
    if (htmlElementRef.current) {
      remove(region);
    }

    htmlElementRef.current = element;

    if (element) {
      add(region, element);
    }
  }, [add, region, remove]);

  return (
    <div data-region={region} ref={setRegionRef}>
      {children}
    </div>
  );
}
