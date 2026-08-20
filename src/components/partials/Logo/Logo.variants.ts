import { cva } from "class-variance-authority";

export const logoVariants = cva(
  "block h-10 max-h-full w-max",
  {
    variants: {
      small: {
        true: "h-[30px]",
      },
    },
    defaultVariants: {
      small: false,
    },
  }
);
