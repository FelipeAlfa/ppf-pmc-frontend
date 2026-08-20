import { useState } from "react";
import { lineVariants } from "./HamburgerButton.variants";

interface HamburgerButtonProps {
  onClick: () => void,
  isActive?: boolean,
}

export default function HamburgerButton(
  {
    onClick,
    isActive = false,
  }: HamburgerButtonProps
) {
  const [animation, setAnimation] = useState(false);
  const onClickEvent = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    onClick();
    if (!animation) setAnimation(true);
  };

  const label = isActive ? "Close menu" : "Open menu";

  return (
    <button
      type="button"
      onClick={onClickEvent}
      className={"block w-10.5 h-10.5 relative p-0 border-0 bg-transparent cursor-pointer"}
      aria-label={label}>
      <span className={lineVariants({
        shape: isActive ? "line-1-active" : "line-1",
        animation: animation ? (isActive ? "line-1-animation-active" : "line-1-animation") : undefined
      })} />
      <span className={lineVariants({
        shape: isActive ? "line-2-active" : "line-2",
        animation: animation ? (isActive ? "line-2-animation-active" : "line-2-animation") : undefined
      })} />
      <span className={lineVariants({
        shape: isActive ? "line-3-active" : "line-3",
        animation: animation ? (isActive ? "line-3-animation-active" : "line-3-animation") : undefined
      })} />
    </button>
  );
};
