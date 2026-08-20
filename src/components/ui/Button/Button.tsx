"use client";

import { buttonVariants } from "./Button.variants";

type ButtonVariant = "primary" | "secondary" | "danger" | "outline" | "ghost";
type ButtonBehavior = "button" | "link";

// Mapeo de comportamiento → props nativas
type BehaviorPropsMap = {
  button: React.ButtonHTMLAttributes<HTMLButtonElement>;
  link: React.AnchorHTMLAttributes<HTMLAnchorElement>;
};

// Props del componente: se adaptan según el behavior
type ButtonProps<B extends ButtonBehavior = "button"> =
  BehaviorPropsMap[B] & {
    behavior?: B;
    variant?: ButtonVariant;
  };

const behaviorTagMap: Record<ButtonBehavior, React.ElementType> = {
  button: "button",
  link: "a",
};

export default function Button<B extends ButtonBehavior = "button">(
  props: ButtonProps<B>
) {
  const {
    behavior = "button",
    variant = "secondary",
    className,
    ...remainingProps
  } = props;

  const Tag = behaviorTagMap[behavior] as React.ElementType;

  return (
    <Tag
      className={`${buttonVariants({ variant })} ${className ?? ""}`.trim()}
      {...remainingProps}
    />
  );
}
