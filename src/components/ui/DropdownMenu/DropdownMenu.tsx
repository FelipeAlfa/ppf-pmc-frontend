"use client";

import { useId, useRef } from "react";
import useDropdown from "@/hooks/useDropdown";
import Link from "next/link";
import {
  dropdownMenuOptionsVariants,
  dropdownMenuVariants,
} from "./DropdownMenu.variants";

type DropdownMenuOption = {
  name: string;
  href?: string;
  action?: () => boolean;
};

interface DropdownMenuProps {
  button: React.ReactNode;
  options?: DropdownMenuOption[];
}

export default function DropdownMenu({
  button,
  options = [],
}: DropdownMenuProps) {
  const menuId = useId();
  const buttonId = `${menuId}-button`;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLElement | null)[]>([]);
  const { dropdownRef, isOpen, open, close } = useDropdown<HTMLDivElement>();
  const hasOptions = options.length > 0;
  const menuIsOpen = isOpen && hasOptions;

  const onButtonClick = () => {
    if (!hasOptions) return;

    if (menuIsOpen) {
      close();
    }
    else {
      open();
    }
  };

  const focusOption = (index: number) => {
    optionRefs.current[index]?.focus();
  };

  const openAndFocusOption = (index: number) => {
    if (!hasOptions) return;

    open();
    requestAnimationFrame(() => focusOption(index));
  };

  const closeAndFocusButton = () => {
    close();
    buttonRef.current?.focus();
  };

  const onButtonKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (!hasOptions) return;

    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openAndFocusOption(0);
    }
    else if (event.key === "ArrowUp") {
      event.preventDefault();
      openAndFocusOption(options.length - 1);
    }
    else if (event.key === "Escape") {
      event.preventDefault();
      close();
    }
    else if (event.key === "Tab") {
      close();
    }
  };

  const onOptionKeyDown = (
    event: React.KeyboardEvent<HTMLElement>,
    index: number,
  ) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      focusOption((index + 1) % options.length);
    }
    else if (event.key === "ArrowUp") {
      event.preventDefault();
      focusOption((index - 1 + options.length) % options.length);
    }
    else if (event.key === "Home") {
      event.preventDefault();
      focusOption(0);
    }
    else if (event.key === "End") {
      event.preventDefault();
      focusOption(options.length - 1);
    }
    if (event.key === "Escape") {
      event.preventDefault();
      closeAndFocusButton();
    }
    else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.currentTarget.click();
    }
    else if (event.key === "Tab") {
      close();
    }
  };

  const getCommonOptionProps = <E extends HTMLElement>(index: number) => ({
    className: "block w-full cursor-pointer whitespace-nowrap border-0 bg-white px-4 py-2 text-left text-sm tracking-wider text-foreground no-underline outline-none font-liberation-sans hover:bg-brand-blue hover:text-white focus-visible:bg-brand-blue focus-visible:text-white",
    ref: (element: E) => {
      optionRefs.current[index] = element;
    },
    role: "menuitem",
    tabIndex: -1,
    onClick: () => {
      options[index].action?.();
      close();
    },
    onKeyDown: (event: React.KeyboardEvent<E>) => onOptionKeyDown(event, index),
  });

  return (
    <div ref={dropdownRef} className={dropdownMenuVariants({ open: menuIsOpen })}>
      <button
        id={buttonId}
        ref={buttonRef}
        type="button"
        className="cursor-pointer disabled:cursor-default"
        disabled={!hasOptions}
        aria-haspopup="menu"
        aria-expanded={menuIsOpen}
        aria-controls={hasOptions ? menuId : undefined}
        onClick={onButtonClick}
        onKeyDown={onButtonKeyDown}>
        {button}
      </button>

      <ul
        id={menuId}
        className={dropdownMenuOptionsVariants({ open: menuIsOpen })}
        role="menu"
        aria-labelledby={buttonId}
        aria-hidden={!menuIsOpen}>
        {menuIsOpen && options.map((option, index) => (
          <li key={index} className="m-0 p-0">
            {option.href ? (
              <Link
                {...getCommonOptionProps(index)}
                href={option.href}>
                {option.name}
              </Link>
            ) : (
              <button
                {...getCommonOptionProps(index)}
                type="button">
                {option.name}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
