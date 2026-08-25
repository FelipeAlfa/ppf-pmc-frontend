import { cva } from "class-variance-authority";

export const contentWithSidebarAsideVariants = cva("shrink-0 transition-[width] duration-200 ease-linear", {
  variants: {
    collapsed: {
      false: "w-full sm:w-72",
      true: "w-full sm:w-9",
    },
  },
  defaultVariants: {
    collapsed: false,
  },
});

export const contentWithSidebarPanelVariants = cva(
  "opacity-0 transition-[top,opacity] duration-200 ease-linear data-[sidebar-ready=true]:opacity-100 box-content -mx-4",
  {
    variants: {
      fixed: {
        false: "w-[calc(100%+2rem)] overflow-visible",
        true: "fixed z-90 w-80 overflow-auto overscroll-contain [scrollbar-gutter:stable]",
      },
    },
    defaultVariants: {
      fixed: false,
    },
  }
);

export const contentWithSidebarPanelInnerVariants = cva(
  "px-4",
  {
    variants: {
      fixed: {
        false: "",
        true: "py-4 md:py-8",
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
      false: "opacity-100 sm:delay-150",
      true: "opacity-100 sm:opacity-0 sm:duration-75",
    },
  },
  defaultVariants: {
    collapsed: false,
  },
});

export const contentWithSidebarContentVariants = cva("mt-5 transform overflow-visible transition-[max-height,opacity,transform] duration-200 ease-linear sm:transition", {
  variants: {
    collapsed: {
      false: "max-h-none opacity-100 translate-y-0 sm:delay-150",
      true: "max-h-0 opacity-0 sm:max-h-none sm:-translate-x-4 sm:duration-75",
    },
  },
  defaultVariants: {
    collapsed: false,
  },
});
