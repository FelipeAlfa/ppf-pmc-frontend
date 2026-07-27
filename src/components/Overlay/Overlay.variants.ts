import { cva } from "class-variance-authority";

export const overlayVariants = cva(
  "fixed inset-0 z-[99] block h-full w-full bg-black/70 p-4 backdrop-blur-[1px] transition-opacity duration-300 ease-linear",
  {
    variants: {
      active: {
        false: "pointer-events-none opacity-0",
        true: "pointer-events-auto opacity-100",
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);
