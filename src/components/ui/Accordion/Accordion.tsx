"use client";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useId, useState } from "react";
import {
  accordionIconVariants,
  accordionPanelVariants,
} from "./Accordion.variants";

export interface AccordionItem {
  title: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpenItems?: number[];
  multiple?: boolean;
}

export default function Accordion({
  items,
  defaultOpenItems = [],
  multiple = false,
}: AccordionProps) {
  const id = useId();
  const [openItems, setOpenItems] = useState(() => new Set(defaultOpenItems));

  const toggleItem = (index: number) => {
    if (items[index].disabled) return;

    setOpenItems((currentOpenItems) => {
      const nextOpenItems = multiple ? new Set(currentOpenItems) : new Set<number>();

      if (currentOpenItems.has(index)) {
        nextOpenItems.delete(index);
      }
      else {
        nextOpenItems.add(index);
      }

      return nextOpenItems;
    });
  };

  return (
    <div className="w-full divide-y divide-foreground/15 border border-foreground/15 rounded-sm shadow-md">
      {items.map((item, index) => {
        const itemIsOpen = !item.disabled && openItems.has(index);
        const buttonId = `${id}-button-${index}`;
        const panelId = `${id}-panel-${index}`;

        return (
          <section key={index}>
            <h3 className="px-4">
              <button
                id={buttonId}
                type="button"
                className="flex w-full cursor-pointer items-center justify-between gap-4 py-4 text-left text-foreground/80 text-xs font-bold uppercase tracking-wider transition-colors duration-100 ease-linear hover:text-brand-blue focus-visible:text-brand-blue focus-visible:outline-none disabled:cursor-not-allowed disabled:text-foreground/35 disabled:hover:text-foreground/35"
                disabled={item.disabled}
                aria-expanded={itemIsOpen}
                aria-controls={panelId}
                onClick={() => toggleItem(index)}>
                <span>{item.title}</span>
                <span className={accordionIconVariants({ open: itemIsOpen })} aria-hidden="true">
                  <FontAwesomeIcon icon={faPlus} />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              className={accordionPanelVariants({ open: itemIsOpen })}
              role="region"
              aria-labelledby={buttonId}>
              <div className="min-h-0 overflow-hidden text-sm leading-relaxed">
                <div className="mx-4 mb-4">
                  {!item.disabled && item.content}
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
