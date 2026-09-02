import { cva } from "class-variance-authority";

export const autocompleteVariants = cva(
  "relative w-full",
  {
    variants: {
      open: {
        true: "z-[1]",
      },
    },
  }
);

export const labelVariants = cva(
  "pointer-events-none absolute inset-0 flex h-full w-full items-center px-4 text-sm font-semibold tracking-wider text-foreground transition-all duration-150 ease-linear font-liberation-sans truncate",
  {
    variants: {
      hidden: {
        true: "translate-x-[20px] opacity-0",
        false: "translate-x-0 opacity-40",
      },
    },
  }
);

export const optionsVariants = cva(
  "relative m-0 w-full list-none overflow-y-auto p-0",
  {
    variants: {
      open: {
        true: "block max-h-[240px]",
        false: "hidden",
      },
    },
  }
);

export const groupOptionsVariants = cva(
  "m-0 list-none p-0",
  {
    variants: {
      separated: {
        true: "border-t border-foreground/10",
      },
    },
  }
);

export const optionVariants = cva(
  "cursor-pointer px-4 py-2 text-sm tracking-wider text-foreground font-liberation-sans",
  {
    variants: {
      highlighted: {
        true: "bg-foreground/5",
      },
    },
  }
);
