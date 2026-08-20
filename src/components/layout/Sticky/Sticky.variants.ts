import { cva } from "class-variance-authority";

export const stickyContentVariants = cva(
  "z-[100] block w-full flex-none transition-[box-shadow,top] duration-200 ease-in-out data-[sticky-ready=true]:sticky",
  {
    variants: {
      hidden: {
        false: "shadow-[0_2px_4px_0_rgba(50,50,50,0.05)]",
        true: "shadow-none",
      },
    },
    defaultVariants: {
      hidden: false,
    },
  }
);
