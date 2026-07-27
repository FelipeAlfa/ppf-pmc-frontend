"use client";

import { createContext, useContext, useRef } from "react";

type RegionActions = {
  add(name: string, ref: HTMLElement): void;
  remove(name: string): void;
  get(...regionNames: string[]): RegionRegistry[string][];
}

type RegionRegistry = {
  [regionName: string]: {
    name: string;
    domElement: HTMLElement;
  };
};

const RegionsContext = createContext<RegionActions>({} as RegionActions);

export const useRegions = () => {
  const ctx = useContext(RegionsContext);
  if (!ctx) throw new Error("useRegions must be used within a RegionsProvider");
  return ctx;
};

export function RegionsProvider({ children }: { children: React.ReactNode }) {
  const registry = useRef<RegionRegistry>({});
  
  const add = (name: string, element: HTMLElement
  ) => {
    if (registry.current[name]) {
      throw new Error(
        `Region with name ${name} already exists. Please use a different name.`
      );
    }

    registry.current[name] = {
      name,
      domElement: element,
    };
  };

  const remove = (name: string) => {
    delete registry.current[name];
  };

  const get = (...regionNames: string[]) => {
    if (regionNames.length) {
      return regionNames
        .map((name) => registry.current[name])
        .filter(Boolean);
    }

    return Object.values(registry.current);
  };

  return (
    <RegionsContext.Provider value={{ add, remove, get }}>
      {children}
    </RegionsContext.Provider>
  );
}
