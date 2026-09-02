import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex min-h-10 cursor-pointer items-center justify-center rounded-xs border px-4 text-center text-xs uppercase tracking-wider transition-colors duration-100 ease-linear font-liberation-sans",
  {
    variants: {
      variant: {
        primary: "border-brand-blue bg-brand-blue text-white hover:border-brand-blue/80 hover:bg-brand-blue/80 focus:border-brand-blue/80 focus:bg-brand-blue/80",
        secondary: "border-white bg-white text-foreground",
        danger: "border-[#d92d20] bg-[#d92d20] text-white",
        outline: "border-foreground bg-transparent text-foreground",
        ghost: "border-transparent bg-transparent text-foreground hover:bg-foreground/5 focus:bg-foreground/5 disabled:cursor-not-allowed disabled:text-foreground/35 disabled:hover:bg-transparent disabled:focus:bg-transparent",
      },
    },
    defaultVariants: {
      variant: "secondary",
    },
  }
);
