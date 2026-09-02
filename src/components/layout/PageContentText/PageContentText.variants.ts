import { cva } from "class-variance-authority";

export const pageContentTextVariants = cva(
  "max-w-250 text-lg font-extralight leading-7 text-foreground/60",
  {
    variants: {
      center: {
        true: "mx-auto text-center",
        false: "",
      },
    },
    defaultVariants: {
      center: false,
    },
  }
);
