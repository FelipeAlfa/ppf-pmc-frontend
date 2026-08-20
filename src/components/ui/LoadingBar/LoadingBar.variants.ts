import { cva } from "class-variance-authority";

export const loadingBarLineVariants = cva(
  [
    "absolute top-0 right-0 h-full origin-right",
    "bg-[linear-gradient(90deg,transparent,var(--brand-blue),transparent)]",
    "motion-reduce:w-full motion-reduce:animate-none",
  ],
  {
    variants: {
      direction: {
        leftToRight: "animate-loading-bar-left-to-right",
        rightToLeft: "animate-loading-bar-right-to-left",
      },
    },
    defaultVariants: {
      direction: "leftToRight",
    },
  }
);
