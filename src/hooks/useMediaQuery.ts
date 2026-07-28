"use client";

import { BREAKPOINT } from "@/constants";
import { useSyncExternalStore } from "react";

type BreakpointName = keyof typeof BREAKPOINT;
type BreakpointInput = Lowercase<BreakpointName>;

const getBreakpointName = (breakpoint: BreakpointInput): BreakpointName => {
  return breakpoint.toUpperCase() as BreakpointName;
};

const getMediaQuery = (breakpoint: BreakpointInput) => {
  return `(min-width: ${BREAKPOINT[getBreakpointName(breakpoint)]}px)`;
};

export default function useMediaQuery(breakpoint: BreakpointInput): boolean {
  const mediaQuery = getMediaQuery(breakpoint);

  return useSyncExternalStore(
    (onStoreChange) => {
      const mediaQueryList = window.matchMedia(mediaQuery);

      mediaQueryList.addEventListener("change", onStoreChange);

      return () => {
        mediaQueryList.removeEventListener("change", onStoreChange);
      };
    },
    () => window.matchMedia(mediaQuery).matches,
    () => false
  );
}
