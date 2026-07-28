"use client";

import { useEffect, useRef, useState } from "react";
import { stickyContentVariants } from "./Sticky.variants";
import {
  getStickyCSSName,
  getStickyStackExpression,
} from "./Sticky.utils";

interface StickyProps {
  name: string;
  hide?: boolean;
  stack?: string | string[];
  z?: number;
  children?: React.ReactNode;
}

export default function Sticky({
  name,
  hide = false,
  stack,
  z,
  children,
}: StickyProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const heightRef = useRef(0);
  const [hidden, setHidden] = useState(false);
  const cssName = getStickyCSSName(name);
  const effectiveHidden = hide && hidden;
  const stackExpression = getStickyStackExpression(stack);

  useEffect(() => {
    const element = contentRef.current;
    if (!element) return;

    const root = document.documentElement;
    const heightProperty = `--layout-height-${cssName}`;
    const offsetProperty = `--layout-offset-${cssName}`;
    const safeTopProperty = `--layout-safe-top-${cssName}`;
    const safeHeightProperty = `--layout-safe-height-${cssName}`;

    const updateLayoutVariables = () => {
      const height = element.getBoundingClientRect().height;
      heightRef.current = height;
      root.style.setProperty(heightProperty, `${height}px`);
      root.style.setProperty(offsetProperty, effectiveHidden ? "0px" : `${height}px`);
      root.style.setProperty(safeTopProperty, stackExpression);
      root.style.setProperty(safeHeightProperty, `calc(100dvh - ${stackExpression})`);
      element.dataset.stickyReady = "true";
    };

    updateLayoutVariables();

    const resizeObserver = new ResizeObserver(updateLayoutVariables);
    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
      root.style.removeProperty(heightProperty);
      root.style.removeProperty(offsetProperty);
      root.style.removeProperty(safeTopProperty);
      root.style.removeProperty(safeHeightProperty);
      delete element.dataset.stickyReady;
    };
  }, [cssName, effectiveHidden, stackExpression]);

  useEffect(() => {
    if (!hide) return;

    const delta = 5;
    let lastScrollTop = 0;
    let stickyIsHidden = false;

    const onScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (Math.abs(scrollTop - lastScrollTop) <= delta) return;

      if (scrollTop > lastScrollTop) {
        if (!stickyIsHidden && scrollTop > heightRef.current) {
          stickyIsHidden = true;
          setHidden(true);
        }
      }
      else if (scrollTop < lastScrollTop) {
        if (stickyIsHidden) {
          stickyIsHidden = false;
          setHidden(false);
        }
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [hide]);

  return (
    <div
      ref={contentRef}
      data-sticky={name}
      data-sticky-ready="false"
      className={stickyContentVariants({ hidden: effectiveHidden })}
      style={{
        zIndex: z,
        top: effectiveHidden ? `calc(var(--layout-height-${cssName}, 0px) * -1)` : `var(--layout-safe-top-${cssName}, 0px)`
      }}>
      {children}
    </div>
  );
}
