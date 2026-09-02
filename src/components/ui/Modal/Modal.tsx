"use client";

import { createContext, useEffect, useState, useContext } from "react";
import { createPortal } from "react-dom";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRegionElement } from "@/context/RegionContext";
import Overlay from "@/components/ui/Overlay/Overlay";

interface ModalProps {
  active?: boolean;
  children: React.ReactNode;
  label?: string;
  onClose: () => void;
  onCloseComplete?: () => void;
}

interface ModalWindowProps {
  actions?: React.ReactNode;
  children: React.ReactNode;
  title?: React.ReactNode;
}

interface ModalCloseButtonProps {
  label?: string;
}

interface ModalContextValue {
  active: boolean;
  label: string;
  onClose: () => void;
}

type ModalComponent = ((props: ModalProps) => React.ReactPortal | null) & {
  CloseButton: typeof ModalCloseButton;
  Window: typeof ModalWindow;
};

const ModalContext = createContext<ModalContextValue | undefined>(undefined);
const modalExitAnimationDuration = 200;

const useModalContext = () => {
  const context = useContext(ModalContext);

  if (context === undefined) {
    throw new Error("Modal components must be used within Modal");
  }

  return context;
};

const Modal = function Modal({
  active = true,
  children,
  label = "Modal",
  onClose,
  onCloseComplete,
}: ModalProps) {
  const container = useRegionElement("mainModal");
  const [present, setPresent] = useState(active);

  useEffect(() => {
    if (active) {
      window.setTimeout(() => {
        setPresent(true);
      }, 0);

      return;
    }

    const timeout = window.setTimeout(() => {
      setPresent(false);
      onCloseComplete?.();
    }, modalExitAnimationDuration);

    return () => window.clearTimeout(timeout);
  }, [active, onCloseComplete]);

  if (!container || !present) {
    return null;
  }

  return createPortal(
    <Overlay active={active} onBackgroundClick={onClose}>
      <div
        className="flex h-full w-full flex-col items-center justify-center overflow-visible"
        role="dialog"
        aria-modal="true"
        aria-label={label}>
        <ModalContext.Provider value={{ active, label, onClose }}>
          {children}
        </ModalContext.Provider>
      </div>
    </Overlay>,
    container
  );
} as ModalComponent;

function ModalWindow({
  actions,
  children,
  title,
}: ModalWindowProps) {
  const { active } = useModalContext();

  return (
    <div
      className={`flex max-h-full w-full max-w-6xl p-4 md:p-6 ${active ? "animate-modal-window-enter" : "animate-modal-window-exit"}`}
      onMouseDown={(event) => event.stopPropagation()}>
      <section className="flex max-h-full w-full flex-col bg-white text-foreground shadow-xl will-change-transform">
        <header className="flex min-h-14 flex-none items-center justify-between gap-4 border-b border-foreground/10 px-4 py-3 md:px-6">
          <div className="min-w-0 text-sm font-bold uppercase tracking-wider">
            {title}
          </div>
          <Modal.CloseButton />
        </header>
        <div className="min-h-0 flex-1 overflow-auto p-4 md:p-6">
          {children}
        </div>
        {actions && (
          <footer className="flex flex-none flex-wrap justify-end gap-2 border-t border-foreground/10 px-4 py-3 md:px-6">
            {actions}
          </footer>
        )}
      </section>
    </div>
  );
}

function ModalCloseButton({
  label,
}: ModalCloseButtonProps) {
  const { label: modalLabel, onClose } = useModalContext();

  return (
    <button
      type="button"
      className="inline-flex h-9 w-9 flex-none cursor-pointer items-center justify-center rounded-sm border border-foreground/20 bg-white text-foreground transition-colors duration-100 ease-linear hover:bg-foreground hover:text-white"
      aria-label={label ?? `Close ${modalLabel}`}
      onClick={onClose}>
      <FontAwesomeIcon icon={faXmark} className="h-4 w-4" />
    </button>
  );
}

Modal.CloseButton = ModalCloseButton;
Modal.Window = ModalWindow;

export default Modal;
