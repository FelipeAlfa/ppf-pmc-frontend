import { cva } from "class-variance-authority";

export const accordionIconVariants = cva(
  "shrink-0 text-xs leading-none transition-transform duration-200 ease-linear",
  {
    variants: {
      open: {
        false: "rotate-0",
        true: "rotate-45",
      },
    },
    defaultVariants: {
      open: false,
    },
  }
);

export const accordionPanelVariants = cva(
  "grid transition-[grid-template-rows,opacity] duration-200 ease-linear",
  {
    variants: {
      open: {
        false: "grid-rows-[0fr] opacity-0",
        true: "grid-rows-[1fr] opacity-100",
      },
    },
    defaultVariants: {
      open: false,
    },
  }
);
