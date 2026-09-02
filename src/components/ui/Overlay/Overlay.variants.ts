import { cva } from "class-variance-authority";

export const overlayVariants = cva(
  "fixed inset-0 z-[110] block h-full w-full bg-black/70 backdrop-blur-[1px]",
  {
    variants: {
      active: {
        false: "pointer-events-none animate-overlay-fade-out",
        true: "pointer-events-auto animate-overlay-fade-in",
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);
