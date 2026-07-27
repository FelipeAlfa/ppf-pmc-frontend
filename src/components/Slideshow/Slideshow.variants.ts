import { cva } from "class-variance-authority";

export const navigationButtonCounterVariants = cva(
  "pointer-events-none absolute top-1/2 block -translate-y-1/2 whitespace-nowrap font-helvetica-neue text-[13px] font-bold opacity-0 transition-opacity duration-300 ease-linear group-hover:opacity-100 group-focus-visible:opacity-100 sm:text-base",
  {
    variants: {
      side: {
        prev: "left-full",
        next: "right-full",
      },
    },
  }
);

export const paginationBulletVariants = cva(
  "block h-full w-full cursor-pointer rounded-full border-2 border-white bg-transparent box-border pointer-events-auto transition-[transform,opacity,background-color] duration-300 ease-linear",
  {
    variants: {
      state: {
        inactive: "scale-0 opacity-0",
        main: "scale-[.6] opacity-100",
        active: "scale-100 bg-white opacity-100",
      },
    },
    defaultVariants: {
      state: "inactive",
    },
  }
);
