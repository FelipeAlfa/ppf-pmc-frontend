import { cva } from "class-variance-authority";

export const imageLightboxNavButtonVariants = cva(
  "absolute top-1/2 hidden h-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/50 bg-black/40 px-4 text-xs font-bold uppercase tracking-wider text-white transition-colors duration-100 ease-linear hover:bg-black/70 md:inline-flex",
  {
    variants: {
      side: {
        previous: "left-0",
        next: "right-0",
      },
    },
  }
);
