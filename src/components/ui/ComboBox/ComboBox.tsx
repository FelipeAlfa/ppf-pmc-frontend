"use client";

import { useCallback, useId, useState } from "react";
import useDropdown from "@/hooks/useDropdown";
import { SVGChevronDown, SVGChevronUp } from "../Svg/Svg.component";
import {
  comboBoxButtonVariants,
  comboBoxLabelVariants,
  comboBoxOptionVariants,
  comboBoxOptionsVariants,
  comboBoxVariants,
} from "./ComboBox.variants";

type ComboBoxOption = {
  label: string;
  value: string;
}

interface ComboBoxProps {
  value?: string;
  label?: string;
  options?: ComboBoxOption[];
  onChange?: (value: string) => void;
}

export default function ComboBox({
  value ,
  label = "Select an option",
  options = [],
  onChange
}: ComboBoxProps) {
  const { dropdownRef, isOpen, open, close } = useDropdown<HTMLDivElement>();
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const comboBoxId = useId();
  const labelId = `${comboBoxId}-label`;
  const optionsId = `${comboBoxId}-options`;
  const currentOption = options.find((option) => option.value === value);

  const handleSelectOption = useCallback((option: ComboBoxOption) => {
    onChange?.(option.value);
    close();
  }, [close, onChange]);

  const buttonKeydownEvent = useCallback((event: React.KeyboardEvent) => {
    if (!isOpen) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightedIndex((prevIndex) => (prevIndex + 1) % options.length);
    }
    else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightedIndex((prevIndex) => (prevIndex - 1 + options.length) % options.length);
    }
    else if (event.key === "Enter") {
      event.preventDefault();
      handleSelectOption(options[highlightedIndex]);
    }
    else if (event.key === "Escape") {
      event.preventDefault();
      close();
    }
    else if (event.key === "Tab") {
      close();
    }
  }, [close, highlightedIndex, isOpen, options, handleSelectOption]);

  const buttonClickEvent = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    if (isOpen) {
      close();
    }
    else {
      open();
    }
  }, [open, close, isOpen]);

  return (
    <div className={comboBoxVariants({ open: isOpen })} ref={dropdownRef}>
      <div className="relative h-10 overflow-hidden rounded-xs bg-white">
        <label
          className={comboBoxLabelVariants({ hidden: !!currentOption })}
          id={labelId}
          htmlFor={comboBoxId}>
          {label}
        </label>
        <button
          className={comboBoxButtonVariants({ empty: !currentOption })}
          id={comboBoxId}
          type="button"
          onClick={buttonClickEvent}
          onKeyDown={buttonKeydownEvent}
          role="combobox"
          aria-label={label}
          aria-controls={optionsId}
          aria-expanded={isOpen ? "true" : "false"}
          aria-haspopup="listbox"
          aria-labelledby={labelId}>
          {currentOption?.label}
          <span className="pointer-events-none absolute top-1/2 right-4 flex h-3.5 w-3.5 -translate-y-1/2 items-center justify-center">
            {isOpen ? <SVGChevronUp size={14} /> : <SVGChevronDown size={14} />}
          </span>
        </button>
      </div>
      <div className={comboBoxOptionsVariants({ open: isOpen })}>
        {isOpen && (
          <ul className="m-0 list-none p-0" id={optionsId} role="listbox" hidden={!isOpen}>
            {options.map((option, index) => (
              <li
                key={index}
                className={comboBoxOptionVariants({
                  selected: option.value === value,
                  highlighted: index === highlightedIndex,
                })}
                onMouseDown={() => handleSelectOption(option)}
                onMouseEnter={() => setHighlightedIndex(index)}
                onMouseLeave={() => setHighlightedIndex(-1)}
                role="option"
                aria-selected={option.value === value}>
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
