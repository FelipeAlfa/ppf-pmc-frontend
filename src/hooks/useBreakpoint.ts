"use client";

import { BREAKPOINT } from "@/constants";
import { useEffect, useRef } from "react";

type BreakpointName = keyof typeof BREAKPOINT;

const sortedBreakpoints = (Object.keys(BREAKPOINT) as BreakpointName[])
  .sort((breakpointNameA, breakpointNameB) => {
    return (
      BREAKPOINT[breakpointNameB] - BREAKPOINT[breakpointNameA]
    );
  })
  .map((breakpointName) => ({
    name: breakpointName,
    size: BREAKPOINT[breakpointName],
  }));

const getCurrentBreakpointName = (): BreakpointName => {
  return sortedBreakpoints.find(
    (breakpoint) => window.innerWidth >= breakpoint.size
  )?.name ?? "XS";
};

export default function useBreakpoint(
  onChangeBreakpoint: (
    currentBreakpoint: BreakpointName,
    previousBreakpoint: BreakpointName | null,
  ) => void
) {
  const onChangeBreakpointRef = useRef(onChangeBreakpoint);

  useEffect(() => {
    onChangeBreakpointRef.current = onChangeBreakpoint;
  }, [onChangeBreakpoint]);

  useEffect(() => {
    let currentBreakpointName = getCurrentBreakpointName();

    onChangeBreakpointRef.current(currentBreakpointName, null);

    const resizeEvent = () => {
      const newBreakpointName = getCurrentBreakpointName();

      if (newBreakpointName === currentBreakpointName) return;

      onChangeBreakpointRef.current(newBreakpointName, currentBreakpointName);
      currentBreakpointName = newBreakpointName;
    };

    window.addEventListener("resize", resizeEvent);

    return () => {
      window.removeEventListener("resize", resizeEvent);
    };
  }, []);
}
