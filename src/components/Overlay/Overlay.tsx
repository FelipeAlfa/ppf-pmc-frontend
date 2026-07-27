"use client";

import { useEffect } from "react";
import { overlayVariants } from "./Overlay.variants";

interface OverlayProps {
  active?: boolean;
  onBackgroundClick?: (event: React.MouseEvent) => void;
  children?: React.ReactNode;
}

export default function Overlay({
  active = false,
  children,
  onBackgroundClick
}: OverlayProps) {
  useEffect(() => {
    const {documentElement: doc} = document;

    if (active) {
      doc.classList.add("overflow-hidden");
    }
    else {
      doc.classList.remove("overflow-hidden");
    }

    return () => doc.classList.remove("overflow-hidden");
  }, [active]);

  return (
    <div className={overlayVariants({ active })} onMouseDown={onBackgroundClick && ((event) => {
      event.preventDefault();
      event.stopPropagation();
      onBackgroundClick(event);
    })}>
      <div className="relative flex h-full w-full flex-col flex-nowrap items-center justify-center">
        {children}
      </div>
    </div>
  );
}
