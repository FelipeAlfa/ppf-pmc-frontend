import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex min-h-10 cursor-pointer items-center justify-center rounded-xs border px-4 text-center text-xs uppercase tracking-wider transition-colors duration-100 ease-linear font-liberation-sans",
  {
    variants: {
      variant: {
        primary: "border-brand-blue bg-brand-blue text-white",
        secondary: "border-white bg-white text-foreground",
        danger: "border-[#d92d20] bg-[#d92d20] text-white",
        outline: "border-foreground bg-transparent text-foreground",
      },
    },
    defaultVariants: {
      variant: "secondary",
    },
  }
);
