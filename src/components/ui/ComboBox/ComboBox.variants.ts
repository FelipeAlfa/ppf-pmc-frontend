import { cva } from "class-variance-authority";

export const comboBoxVariants = cva(
  "relative",
  {
    variants: {
      open: {
        true: "z-10",
      },
    },
  }
);

export const comboBoxLabelVariants = cva(
  "pointer-events-none flex h-full w-full items-center px-4 pr-[46px] text-sm tracking-wider text-foreground/50 font-liberation-sans",
  {
    variants: {
      hidden: {
        true: "hidden",
      },
    },
  }
);

export const comboBoxButtonVariants = cva(
  "h-full w-full border-0 bg-transparent px-4 pr-[46px] text-left text-sm tracking-wider text-foreground outline-none font-liberation-sans",
  {
    variants: {
      empty: {
        true: "absolute inset-0",
      },
    },
  }
);

export const comboBoxOptionsVariants = cva(
  "absolute top-full inset-x-0 bg-white shadow-lg",
  {
    variants: {
      open: {
        true: "block",
        false: "hidden",
      },
    },
  }
);

export const comboBoxOptionVariants = cva(
  "cursor-pointer px-4 py-2 text-sm tracking-wider text-foreground font-liberation-sans",
  {
    variants: {
      highlighted: {
        true: "bg-[#EEEEEE]",
      },
      selected: {
        true: "bg-brand-blue",
      },
    },
    compoundVariants: [
      {
        highlighted: true,
        selected: true,
        className: "bg-brand-blue",
      },
    ],
  }
);
