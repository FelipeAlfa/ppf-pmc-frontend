import { cva } from "class-variance-authority";

export const contentWithSidebarAsideVariants = cva("shrink-0 transition-[width] duration-200 ease-linear", {
  variants: {
    collapsed: {
      false: "w-full sm:w-64",
      true: "w-full sm:w-9",
    },
  },
  defaultVariants: {
    collapsed: false,
  },
});

export const contentWithSidebarPanelVariants = cva(
  "opacity-0 transition-[top,opacity] duration-200 ease-linear data-[sidebar-ready=true]:opacity-100",
  {
    variants: {
      fixed: {
        false: "px-4 -mx-4 w-full overflow-visible",
        true: "px-4 -mx-4 py-4 md:py-8 fixed z-90 w-64 overflow-auto overscroll-contain",
      },
    },
    defaultVariants: {
      fixed: false,
    },
  }
);

export const contentWithSidebarTitleVariants = cva("whitespace-nowrap pr-3 text-xs font-bold uppercase tracking-wider transition duration-200 ease-linear", {
  variants: {
    collapsed: {
      false: "delay-300 opacity-100",
      true: "opacity-100 sm:opacity-0",
    },
  },
  defaultVariants: {
    collapsed: false,
  },
});

export const contentWithSidebarContentVariants = cva("mt-5 transform overflow-hidden transition-[max-height,opacity,transform] duration-200 ease-linear sm:transition", {
  variants: {
    collapsed: {
      false: "max-h-dvh opacity-100 translate-y-0 sm:max-h-none",
      true: "max-h-0 opacity-0 sm:max-h-none sm:-translate-x-4",
    },
  },
  defaultVariants: {
    collapsed: false,
  },
});
