import { cva } from "class-variance-authority";

export const socialLinkVariants = cva(
  "flex h-10 w-10 flex-row flex-nowrap items-center justify-center rounded-[2px] transition-colors duration-200 ease-linear xl:h-[30px] xl:w-[30px]",
  {
    variants: {
      white: {
        false: "text-foreground hover:bg-[#EEEEEE]",
        true: "text-white hover:bg-white/20",
      },
    },
    defaultVariants: {
      white: false,
    },
  }
);
