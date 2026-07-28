import { cva } from "class-variance-authority";

export const contentWithSidebarAsideVariants = cva("shrink-0 transition-width duration-200 ease-linear", {
  variants: {
    collapsed: {
      false: "w-64",
      true: "w-9",
    },
  },
  defaultVariants: {
    collapsed: false,
  },
});

export const contentWithSidebarTitleVariants = cva("pr-3 text-xs font-bold uppercase tracking-wider transition duration-200 ease-linear", {
  variants: {
    collapsed: {
      false: "delay-300 opacity-100",
      true: "opacity-0",
    },
  },
  defaultVariants: {
    collapsed: false,
  },
});

export const contentWithSidebarContentVariants = cva("mt-5 transform transition duration-200 ease-linear", {
  variants: {
    collapsed: {
      false: "opacity-100",
      true: "opacity-0 -translate-x-4",
    },
  },
  defaultVariants: {
    collapsed: false,
  },
});
