import { cva } from "class-variance-authority";

export const calendarPickerVariants = cva(
  "h-7 w-full rounded text-xs",
  {
    variants: {
      state: {
        default: "cursor-pointer text-foreground/80 hover:bg-foreground/5 focus:bg-foreground/5",
        selected: "cursor-pointer bg-brand-blue text-white shadow hover:bg-brand-blue focus:bg-brand-blue",
        future: "cursor-not-allowed bg-foreground/5 text-foreground/20",
        previousMonth: "cursor-pointer text-foreground/80 opacity-40 hover:bg-foreground/5 focus:bg-foreground/5",
        nextMonth: "cursor-pointer bg-foreground/5 text-foreground/20 opacity-40",
        today: "cursor-pointer font-semibold text-brand-blue hover:bg-foreground/5 focus:bg-foreground/5",
      },
    },
    defaultVariants: {
      state: "default",
    },
  }
);
