"use client";

import { useRegions } from "@/context/RegionContext";
import { createRef, useEffect } from "react";

interface RegionProps {
  name: string;
  children?: React.ReactNode;
}

export default function Region({
  name,
  children
}: RegionProps) {
  const { add, remove } = useRegions();
  const htmlElementRef = createRef<HTMLDivElement>();

  useEffect(() => {
    if (htmlElementRef.current) {
      add(name, htmlElementRef.current);
      return () => remove(name);
    }
  }, [name, add, remove, htmlElementRef]);

  return (
    <div data-region={name} ref={htmlElementRef}>
      {children}
    </div>
  );
}
