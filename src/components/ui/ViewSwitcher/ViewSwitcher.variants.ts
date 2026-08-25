import { cva } from "class-variance-authority";

export const viewSwitcherButtonVariants = cva(
  "inline-flex min-h-11 w-14 cursor-pointer flex-col items-center justify-center gap-1 text-foreground transition-colors duration-150",
  {
    variants: {
      active: {
        true: "opacity-100",
        false: "opacity-40",
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);
