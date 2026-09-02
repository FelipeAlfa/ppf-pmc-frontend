import { cva } from "class-variance-authority";

export const containerVariants = cva(
  "container mx-auto px-4 md:px-8 lg:px-12 xl:px-16",
  {
    variants: {
      verticalSpacingSize: {
        medium: "my-4 md:my-8",
        large: "my-8 md:my-12 lg:my-20",
      },
    },
  }
);
