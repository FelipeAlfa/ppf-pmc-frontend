import { cva } from "class-variance-authority";

export const viewSwitcherButtonVariants = cva(
  "inline-flex h-9 w-9 cursor-pointer items-center justify-center text-foreground transition-colors duration-150 hover:bg-foreground/10",
  {
    variants: {
      active: {
        true: "bg-foreground text-background hover:bg-foreground",
        false: "",
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);
