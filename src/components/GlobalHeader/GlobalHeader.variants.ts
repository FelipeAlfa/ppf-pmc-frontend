import { cva } from "class-variance-authority";

export const globalHeaderVariants = cva(
  "fixed z-[100] block h-20 w-full border-b border-[#e8e8e8] bg-white p-4 shadow-[0_2px_4px_0_rgba(50,50,50,0.05)] transition-[box-shadow,top] duration-200 ease-in-out",
  {
    variants: {
      hidden: {
        false: "top-0",
        true: "-top-20 shadow-none",
      },
    },
    defaultVariants: {
      hidden: false,
    },
  }
);

export const featuresVariants = cva(
  "fixed top-0 bottom-0 right-full z-[100] block h-screen w-full max-w-[360px] bg-white p-6 shadow-[0_0_6px_rgba(0,0,0,0.3)] transition-transform duration-300 ease-in-out xl:static xl:grid xl:h-full xl:max-w-full xl:grid-cols-[auto_1fr_auto] xl:gap-4 xl:bg-transparent xl:p-0 xl:shadow-none 2xl:grid-cols-[1fr_auto_1fr]",
  {
    variants: {
      active: {
        true: "translate-x-full xl:translate-x-0 xl:transition-none",
      },
    },
  }
);

export const navLinkVariants = cva(
  "inline-block rounded-[2px] px-4 py-2 font-liberation-sans text-base text-foreground uppercase no-underline transition-colors duration-100 ease-linear hover:bg-brand-blue hover:text-white xl:px-2 xl:text-xs 2xl:text-sm",
  {
    variants: {
      active: {
        true: "bg-brand-blue text-white",
      },
      variant: {
        default: "",
        cart: "inline-flex flex-row flex-nowrap items-center justify-center hover:bg-transparent hover:text-foreground hover:opacity-80",
        book: "block bg-brand-blue p-4 text-center text-white xl:px-4 xl:py-3",
      },
    },
    defaultVariants: {
      active: false,
      variant: "default",
    },
  }
);
