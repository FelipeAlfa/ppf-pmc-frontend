"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ViewType } from "@/types";
import {
  faColumns,
  faGrip,
  faPhotoFilm,
} from "@fortawesome/free-solid-svg-icons";
import {
  createContext,
  ReactElement,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { viewSwitcherButtonVariants } from "./ViewSwitcher.variants";

const viewSwitcherCookieMaxAge = 60 * 60 * 24 * 365;

const viewSwitcherViewConfig = {
  grid: {
    icon: faGrip,
    label: "Grid",
  },
  editorial: {
    icon: faColumns,
    label: "Editorial",
  },
  carousel: {
    icon: faPhotoFilm,
    label: "Carousel",
  },
} satisfies Record<ViewType, {
  icon: typeof faGrip;
  label: string;
}>;

interface ViewSwitcherContextValue {
  activeViewName: ViewType;
  selectView(viewName: ViewType): void;
}

interface ViewSwitcherProviderProps {
  children: ReactNode;
  initialView?: ViewType;
  name: string;
}

interface ViewSwitcherControlsProps {
  views: ViewType[];
}

interface ViewSwitcherViewProps {
  children: ReactElement;
  name: ViewType;
}

const ViewSwitcherContext = createContext<ViewSwitcherContextValue | undefined>(undefined);

function useViewSwitcher() {
  const context = useContext(ViewSwitcherContext);

  if (context === undefined) {
    throw new Error("ViewSwitcher components must be used within ViewSwitcher.Provider");
  }

  return context;
}

export function ViewSwitcherProvider({
  children,
  initialView = "grid",
  name,
}: ViewSwitcherProviderProps) {
  const cookieKey = useMemo(() => `view-switcher-${name}`, [name]);
  const [activeViewName, setActiveViewName] = useState(initialView);
  const selectView = useCallback((viewName: ViewType) => {
    setActiveViewName(viewName);
    document.cookie = `${cookieKey}=${viewName}; path=/; max-age=${viewSwitcherCookieMaxAge}; SameSite=Lax`;
  }, [cookieKey]);
  const contextValue = useMemo(() => ({
    activeViewName,
    selectView,
  }), [activeViewName, selectView]);

  return (
    <ViewSwitcherContext.Provider value={contextValue}>
      {children}
    </ViewSwitcherContext.Provider>
  );
}

export function ViewSwitcherControls({
  views,
}: ViewSwitcherControlsProps) {
  const {
    activeViewName,
    selectView,
  } = useViewSwitcher();

  if (views.length <= 1) {
    return null;
  }

  return (
    <div className="inline-flex overflow-hidden">
      {views.map((view, index) => {
        const isActive = view === activeViewName;
        const config = viewSwitcherViewConfig[view];
        const label = config.label ?? `View ${index + 1}`;

        return (
          <button
            key={view}
            type="button"
            className={viewSwitcherButtonVariants({ active: isActive })}
            aria-label={label}
            aria-pressed={isActive}
            onClick={() => selectView(view)}>
            <FontAwesomeIcon icon={config.icon} className="h-3.5 w-3.5" />
            <span className="text-[10px] font-medium leading-none">
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function ViewSwitcherView({
  children,
  name,
}: ViewSwitcherViewProps) {
  const { activeViewName } = useViewSwitcher();

  return activeViewName === name ? children : null;
}

const ViewSwitcher = {
  Provider: ViewSwitcherProvider,
  Controls: ViewSwitcherControls,
  View: ViewSwitcherView,
};

export default ViewSwitcher;
