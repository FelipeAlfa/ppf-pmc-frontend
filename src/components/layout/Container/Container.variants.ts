import { cva } from "class-variance-authority";

export const containerVariants = cva(
  "container mx-auto px-4 md:px-8 lg:px-12 xl:px-16",
  {
    variants: {
      verticalSpacing: {
        true: "my-4 md:my-8",
      },
    },
  }
);
