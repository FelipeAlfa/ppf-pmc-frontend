"use client";

import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import {
  contentWithSidebarAsideVariants,
  contentWithSidebarContentVariants,
  contentWithSidebarPanelInnerVariants,
  contentWithSidebarPanelVariants,
  contentWithSidebarTitleVariants,
} from "./ContentWithSidebar.variants";
import useMediaQuery from "@/hooks/useMediaQuery";

interface ContentWithSidebarProps {
  title: string;
  sidebar: React.ReactNode;
  children?: React.ReactNode;
}

export default function ContentWithSidebar({
  title,
  sidebar,
  children,
}: ContentWithSidebarProps) {
  const sidebarRef = useRef<HTMLElement>(null);
  const sidebarPanelRef = useRef<HTMLDivElement>(null);
  const [collapsed, setCollapsed] = useState(false);
  const sm = useMediaQuery("sm");

  useEffect(() => {
    const root = document.documentElement;
    const sidebar = sidebarRef.current;
    const sidebarPanel = sidebarPanelRef.current;
    let animationFrameId = 0;

    if (!sidebar || !sidebarPanel) return;

    const resetFixedSidebarLayout = () => {
      root.style.removeProperty("--layout-footer-visible-height");
      sidebarPanel.style.removeProperty("--sidebar-fixed-left");
    };

    if (!sm) {
      resetFixedSidebarLayout();
      sidebarPanel.dataset.sidebarReady = "true";
      return;
    }

    const updateFixedSidebarLayout = () => {
      const footerElement = document.querySelector("footer");
      const viewportHeight = window.innerHeight;
      const footerRect = footerElement?.getBoundingClientRect();
      const sidebarRect = sidebar.getBoundingClientRect();
      const visibleFooterHeight = footerRect
        ? Math.max(0, viewportHeight - footerRect.top)
        : 0;

      root.style.setProperty("--layout-footer-visible-height", `${visibleFooterHeight}px`);
      sidebarPanel.style.setProperty("--sidebar-fixed-left", `${sidebarRect.left}px`);
      sidebarPanel.dataset.sidebarReady = "true";
    };

    const scheduleFixedSidebarLayoutUpdate = () => {
      window.cancelAnimationFrame(animationFrameId);
      animationFrameId = window.requestAnimationFrame(updateFixedSidebarLayout);
    };

    updateFixedSidebarLayout();

    window.addEventListener("scroll", scheduleFixedSidebarLayoutUpdate, { passive: true });
    window.addEventListener("resize", scheduleFixedSidebarLayoutUpdate);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", scheduleFixedSidebarLayoutUpdate);
      window.removeEventListener("resize", scheduleFixedSidebarLayoutUpdate);
      resetFixedSidebarLayout();
      delete sidebarPanel.dataset.sidebarReady;
    };

  }, [sm]);

  const panelStyle = sm ? {
    height: "calc(100dvh - var(--layout-offset-global-header, 0px) - var(--layout-offset-search-bar, 0px) - var(--layout-footer-visible-height, 0px))",
    left: "var(--sidebar-fixed-left, 0px)",
    top: "calc(var(--layout-offset-global-header, 0px) + var(--layout-offset-search-bar, 0px))",
  } : undefined;

  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:flex-nowrap lg:gap-8">
      <aside ref={sidebarRef} className={contentWithSidebarAsideVariants({ collapsed })} aria-label={title}>
        <div
          ref={sidebarPanelRef}
          data-sidebar-ready={sm ? "false" : "true"}
          className={contentWithSidebarPanelVariants({ fixed: sm })}
          style={panelStyle}>
          <div className={contentWithSidebarPanelInnerVariants({ fixed: sm })}>
            <div className="flex items-center gap-3">
              <button
                className="inline-flex pointer-events-auto h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-sm bg-brand-darkgray text-sm transition-colors duration-100 ease-linear hover:border-brand-blue hover:text-brand-blue"
                type="button"
                aria-expanded={!collapsed}
                aria-label={collapsed ? `Expand ${title}` : `Collapse ${title}`}
                onClick={() => setCollapsed((value) => !value)}>
                <FontAwesomeIcon icon={collapsed ? faPlus : faMinus} className="text-white" />
              </button>
              <h2 className={contentWithSidebarTitleVariants({ collapsed })}>
                {title}
              </h2>
            </div>
            <div className={contentWithSidebarContentVariants({ collapsed })}>
              {sidebar}
            </div>
          </div>
        </div>
      </aside>
      <div className="min-w-0 flex-1">
        {children}
      </div>
    </div>
  );
}
