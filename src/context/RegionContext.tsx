"use client";

import { createContext, useContext, useRef, useSyncExternalStore } from "react";

export const appRegions = [
  "globalHeader",
  "mainContent",
  "mainModal",
  "modal",
  "globalFooter",
] as const;

export type AppRegion = typeof appRegions[number];

type RegionActions = {
  add(region: AppRegion, ref: HTMLElement): void;
  remove(region: AppRegion): void;
  get(...regions: AppRegion[]): RegisteredRegion[];
  subscribe(listener: () => void): () => void;
}

type RegisteredRegion = {
  region: AppRegion;
  domElement: HTMLElement;
};

type RegionRegistry = Partial<Record<AppRegion, RegisteredRegion>>;

interface RegionsProviderProps {
  children: React.ReactNode;
  regions: readonly AppRegion[];
}

const RegionsContext = createContext<RegionActions | undefined>(undefined);

function isRegisteredRegion(
  region: RegionRegistry[AppRegion]
): region is NonNullable<RegionRegistry[AppRegion]> {
  return region !== undefined;
}

export const useRegions = () => {
  const ctx = useContext(RegionsContext);
  if (!ctx) throw new Error("useRegions must be used within a RegionsProvider");
  return ctx;
};

export function RegionsProvider({
  children,
  regions,
}: RegionsProviderProps) {
  const registry = useRef<RegionRegistry>({});
  const allowedRegions = useRef(new Set<AppRegion>(regions));
  const listeners = useRef(new Set<() => void>());

  const notify = () => {
    listeners.current.forEach((listener) => listener());
  };
  
  const add = (region: AppRegion, element: HTMLElement) => {
    if (!allowedRegions.current.has(region)) {
      throw new Error(`Region ${region} is not registered in RegionsProvider.`);
    }

    if (registry.current[region]) {
      throw new Error(
        `Region ${region} already exists. Please use a different region.`
      );
    }

    registry.current[region] = {
      region,
      domElement: element,
    };
    notify();
  };

  const remove = (region: AppRegion) => {
    delete registry.current[region];
    notify();
  };

  const get = (...requestedRegions: AppRegion[]) => {
    if (requestedRegions.length) {
      return requestedRegions
        .map((region) => registry.current[region])
        .filter(isRegisteredRegion);
    }

    return Object.values(registry.current).filter(isRegisteredRegion);
  };

  const subscribe = (listener: () => void) => {
    listeners.current.add(listener);

    return () => {
      listeners.current.delete(listener);
    };
  };

  return (
    <RegionsContext.Provider value={{ add, remove, get, subscribe }}>
      {children}
    </RegionsContext.Provider>
  );
}

export function useRegionElement(region: AppRegion) {
  const { get, subscribe } = useRegions();

  return useSyncExternalStore(
    subscribe,
    () => get(region)[0]?.domElement ?? null,
    () => null
  );
}
