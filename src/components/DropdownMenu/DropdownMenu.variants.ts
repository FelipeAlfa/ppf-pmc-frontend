import { cva } from "class-variance-authority";

export const dropdownMenuVariants = cva(
  "relative inline-block",
  {
    variants: {
      open: {
        true: "z-10",
      },
    },
  }
);

export const dropdownMenuOptionsVariants = cva(
  "absolute top-[calc(100%+4px)] left-0 m-0 min-w-full list-none border border-[#d9d9d9] bg-white py-1 shadow-md",
  {
    variants: {
      open: {
        true: "block",
        false: "hidden",
      },
    },
  }
);
