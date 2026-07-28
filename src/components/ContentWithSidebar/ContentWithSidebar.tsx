"use client";

import { useEffect, useRef, useState } from "react";
import {
  contentWithSidebarAsideVariants,
  contentWithSidebarContentVariants,
  contentWithSidebarTitleVariants,
} from "./ContentWithSidebar.variants";

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

  useEffect(() => {
    const root = document.documentElement;
    const sidebar = sidebarRef.current;
    const sidebarPanel = sidebarPanelRef.current;
    let animationFrameId = 0;

    if (!sidebar || !sidebarPanel) return;

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
      root.style.removeProperty("--layout-footer-visible-height");
      sidebarPanel.style.removeProperty("--sidebar-fixed-left");
      delete sidebarPanel.dataset.sidebarReady;
    };

  }, []);

  return (
    <div className="flex flex-nowrap gap-6 lg:gap-8">
      <aside ref={sidebarRef} className={contentWithSidebarAsideVariants({ collapsed })} aria-label={title}>
        <div
          ref={sidebarPanelRef}
          data-sidebar-ready="false"
          className="fixed z-90 overflow-auto overscroll-contain py-8 opacity-0 transition-[top,opacity] duration-200 ease-linear data-[sidebar-ready=true]:opacity-100 w-64 px-4 -mx-4"
          style={{
            height: "calc(100dvh - var(--layout-offset-global-header, 0px) - var(--layout-offset-search-bar, 0px) - var(--layout-footer-visible-height, 0px))",
            left: "var(--sidebar-fixed-left, 0px)",
            top: "calc(var(--layout-offset-global-header, 0px) + var(--layout-offset-search-bar, 0px))",
          }}>
          <div className="flex items-center gap-3">
            <button
              className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-sm bg-brand-darkgray text-sm transition-colors duration-100 ease-linear hover:border-brand-blue hover:text-brand-blue"
              type="button"
              aria-expanded={!collapsed}
              aria-label={collapsed ? `Expand ${title}` : `Collapse ${title}`}
              onClick={() => setCollapsed((value) => !value)}>
              {collapsed ? "+" : "-"}
            </button>
            <h2 className={contentWithSidebarTitleVariants({ collapsed })}>
              {title}
            </h2>
          </div>
          <div className={contentWithSidebarContentVariants({ collapsed })}>
            {sidebar}
          </div>
        </div>
      </aside>
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
