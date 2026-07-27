import { cva } from "class-variance-authority";

export const thumbnailVariants = cva(
  "relative block h-auto w-full box-content overflow-hidden rounded-[5px] p-0 md:h-0 md:pb-[var(--thumbnail-padding-bottom)]",
  {
    variants: {
      cover: {
        false: "[--thumbnail-padding-bottom:100%]",
        true: "[--thumbnail-padding-bottom:70%]",
      },
    },
    defaultVariants: {
      cover: false,
    },
  }
);

export const thumbnailImageWrapperVariants = cva(
  "overflow-hidden rounded-[5px]",
  {
    variants: {
      cover: {
        true: "md:absolute md:inset-0 md:flex md:h-full md:w-full md:flex-col md:flex-nowrap md:items-center md:justify-center",
      },
    },
    defaultVariants: {
      cover: false,
    },
  }
);

export const thumbnailImageVariants = cva(
  "relative block h-auto w-full md:h-full",
  {
    variants: {
      cover: {
        false: "md:object-contain",
        true: "md:object-cover",
      },
    },
    defaultVariants: {
      cover: false,
    },
  }
);
