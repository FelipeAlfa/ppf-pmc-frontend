"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export default function useDropdown<TElement extends HTMLElement = HTMLElement>() {
  const dropdownRef = useRef<TElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      const dropdownElement = dropdownRef.current;

      if (!dropdownElement || !(event.target instanceof Node)) return;
      if (dropdownElement.contains(event.target)) return;

      close();
    };

    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [close, isOpen]);

  return {
    dropdownRef,
    isOpen,
    open,
    close,
  };
}
