import { cva } from "class-variance-authority";

export const loadingOverlayCircleVariants = cva(
  "animate-spin rounded-full border-2 border-foreground/20 border-t-brand-blue",
  {
    variants: {
      small: {
        false: "h-8 w-8",
        true: "h-5 w-5",
      },
    },
    defaultVariants: {
      small: false,
    },
  }
);
