"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useTransition,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { shortDate } from "@/lib/date";
import {
  readSearchParamsState,
  writeSearchParamsState,
  type SearchParamsState,
} from "@/lib/searchParams";

type ParamFilterRawValue = string | number;
type ParamFilterParsedValue = ParamFilterRawValue | ParamFilterRawValue[];

export interface ParamFilter {
  key: string;
  label: string;
  value: string;
  rawValue: string;
}

interface ParamStateContextValue {
  isPending: boolean;
  pushSearchParams(nextSearchParams: URLSearchParams): void;
  resetParamsOnChange: string[];
}

interface ParamStateProviderProps {
  children: ReactNode;
  pathname?: string;
  resetParamsOnChange?: string[];
}

const paramFilterLabels: Record<string, string> = {
  date: "Date",
  event: "Event",
  location: "Location",
  person: "Person",
  photographer: "Photographer",
  p: "Page",
  q: "Search",
};

const defaultResetParamsOnChange = ["p", "page"];
const ParamStateContext = createContext<ParamStateContextValue | undefined>(undefined);
const paramStateKeys: Record<string, keyof SearchParamsState> = {
  date: "date",
  event: "events",
  location: "locations",
  p: "page",
  person: "people",
  photographer: "photographers",
  q: "text",
};

export default function ParamStateProvider({
  children,
  pathname,
  resetParamsOnChange = defaultResetParamsOnChange,
}: ParamStateProviderProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const currentPathname = usePathname();
  const selectedPathname = pathname ?? currentPathname;
  
  const pushSearchParams = useCallback((nextSearchParams: URLSearchParams) => {
    const queryString = nextSearchParams.toString();
    const href = queryString ? `${selectedPathname}?${queryString}` : selectedPathname;

    if (href === `${window.location.pathname}${window.location.search}`) {
      return;
    }

    startTransition(() => {
      router.push(href);
    });
  }, [selectedPathname, router, startTransition]);

  return (
    <ParamStateContext.Provider
      value={{
        isPending,
        pushSearchParams,
        resetParamsOnChange,
      }}>
      {children}
    </ParamStateContext.Provider>
  );
}

function useParamStateContext() {
  const context = useContext(ParamStateContext);

  if (context === undefined) {
    throw new Error("useParamState must be used within ParamStateProvider");
  }

  return context;
}

export function useParamState() {
  const {
    isPending,
    pushSearchParams,
    resetParamsOnChange,
  } = useParamStateContext();
  const searchParams = useSearchParams();
  const searchParamsState = useMemo(() => (
    readSearchParamsState(searchParams)
  ), [searchParams]);
  const getLabel = useCallback((key: string) => (
    paramFilterLabels[key]
  ), []);
  const getParam = useCallback((key: string) => {
    const stateKey = paramStateKeys[key];

    if (stateKey === undefined) {
      return undefined;
    }

    const value = searchParamsState[stateKey];

    if (Array.isArray(value)) {
      return value.length > 0 ? value : undefined;
    }

    if (value === null || value === "" || value === undefined) {
      return undefined;
    }

    return value;
  }, [searchParamsState]);
  const filters = useMemo(() => (
    Object
      .entries(paramStateKeys)
      .flatMap(([key, rawValue]) => {
        const label = getLabel(key);
        const stateValue = searchParamsState[rawValue];

        if (label === undefined || stateValue === null || stateValue === "" || stateValue === undefined) {
          return [];
        }

        const values = Array.isArray(stateValue) ? stateValue : [stateValue];

        return values.map((value) => ({
          key,
          label,
          rawValue: String(value),
          value: formatParamValue(key, value),
        }));
      })
  ), [getLabel, searchParamsState]);
  const setParam = useCallback((key: string, value: ParamFilterParsedValue) => {
    const stateKey = paramStateKeys[key];

    if (isPending || stateKey === undefined) {
      return;
    }

    const nextSearchParamsState = copySearchParamsState(searchParamsState);

    if (isSearchParamsStateListKey(stateKey)) {
      setSearchParamsStateListValue(
        nextSearchParamsState,
        stateKey,
        uniqueParamValues(asParamValueList(value).map(String))
      );
    }
    else {
      setSearchParamsStateValue(nextSearchParamsState, stateKey, String(value));
    }

    resetSearchParamsState(nextSearchParamsState, resetParamsOnChange, key);
    const nextSearchParams = writeSearchParamsState(nextSearchParamsState);

    pushSearchParams(nextSearchParams);
  }, [isPending, pushSearchParams, resetParamsOnChange, searchParamsState]);
  const addParamValue = useCallback((key: string, value: string | number) => {
    const stateKey = paramStateKeys[key];

    if (isPending || stateKey === undefined || !isSearchParamsStateListKey(stateKey)) {
      return;
    }

    const nextSearchParamsState = copySearchParamsState(searchParamsState);
    const currentValue = nextSearchParamsState[stateKey];
    const currentValues = Array.isArray(currentValue) ? currentValue : [];
    const nextValues = uniqueParamValues([
      ...currentValues,
      String(value),
    ]);

    setSearchParamsStateListValue(nextSearchParamsState, stateKey, nextValues);
    resetSearchParamsState(nextSearchParamsState, resetParamsOnChange, key);
    const nextSearchParams = writeSearchParamsState(nextSearchParamsState);

    pushSearchParams(nextSearchParams);
  }, [isPending, pushSearchParams, resetParamsOnChange, searchParamsState]);
  const removeParamValue = useCallback((key: string, value: string | number) => {
    const stateKey = paramStateKeys[key];

    if (isPending || stateKey === undefined || !isSearchParamsStateListKey(stateKey)) {
      return;
    }

    const nextSearchParamsState = copySearchParamsState(searchParamsState);
    const currentValue = nextSearchParamsState[stateKey];
    const remainingValues = uniqueParamValues(
      (Array.isArray(currentValue) ? currentValue : [])
        .filter((currentItem) => currentItem !== String(value))
    );

    setSearchParamsStateListValue(nextSearchParamsState, stateKey, remainingValues);
    resetSearchParamsState(nextSearchParamsState, resetParamsOnChange);
    const nextSearchParams = writeSearchParamsState(nextSearchParamsState);

    pushSearchParams(nextSearchParams);
  }, [isPending, pushSearchParams, resetParamsOnChange, searchParamsState]);
  const removeParam = useCallback((key: string, value?: string) => {
    const stateKey = paramStateKeys[key];

    if (isPending || stateKey === undefined) {
      return;
    }

    const nextSearchParamsState = copySearchParamsState(searchParamsState);

    if (isSearchParamsStateListKey(stateKey) && value !== undefined) {
      const stateValue = nextSearchParamsState[stateKey];
      const remainingValues = (Array.isArray(stateValue) ? stateValue : [])
        .filter((currentValue) => currentValue !== value);

      setSearchParamsStateListValue(nextSearchParamsState, stateKey, remainingValues);
    }
    else {
      clearSearchParamsStateValue(nextSearchParamsState, stateKey);
    }

    resetSearchParamsState(nextSearchParamsState, resetParamsOnChange);
    const nextSearchParams = writeSearchParamsState(nextSearchParamsState);

    pushSearchParams(nextSearchParams);
  }, [isPending, pushSearchParams, resetParamsOnChange, searchParamsState]);

  return {
    addParamValue,
    filters,
    getParam,
    isPending,
    removeParam,
    removeParamValue,
    setParam,
  };
}

function formatParamValue(key: string, value: ParamFilterRawValue) {
  if (key === "date" && typeof value === "number") {
    return shortDate(value);
  }

  return String(value);
}

function asParamValueList(value: ParamFilterParsedValue) {
  return Array.isArray(value) ? value : [value];
}

function uniqueParamValues(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

function copySearchParamsState(
  state: SearchParamsState
): SearchParamsState {
  return {
    ...state,
    people: [...state.people],
    events: [...state.events],
    locations: [...state.locations],
    photographers: [...state.photographers],
  };
}

function resetSearchParamsState(
  state: SearchParamsState,
  resetParamsOnChange: string[],
  exceptKey?: string
) {
  resetParamsOnChange.forEach((key) => {
    if (key === exceptKey) {
      return;
    }

    const stateKey = paramStateKeys[key];

    if (stateKey !== undefined) {
      clearSearchParamsStateValue(state, stateKey);
    }
  });
}

function setSearchParamsStateValue(
  state: SearchParamsState,
  key: keyof SearchParamsState,
  value: string
) {
  if (key === "text") {
    state.text = value !== "" ? value : null;
    return;
  }

  if (key === "date" || key === "page") {
    const number = Number(value);

    state[key] = Number.isFinite(number) ? number : null;
  }
}

function setSearchParamsStateListValue(
  state: SearchParamsState,
  key: keyof SearchParamsState,
  value: string[]
) {
  if (key === "people" || key === "events" || key === "locations" || key === "photographers") {
    state[key] = value;
  }
}

function clearSearchParamsStateValue(
  state: SearchParamsState,
  key: keyof SearchParamsState
) {
  if (key === "text") {
    state.text = null;
    return;
  }

  if (key === "date" || key === "page") {
    state[key] = null;
    return;
  }

  state[key] = [];
}

function isSearchParamsStateListKey(
  key: keyof SearchParamsState
): key is "people" | "events" | "locations" | "photographers" {
  return key === "people"
    || key === "events"
    || key === "locations"
    || key === "photographers";
}
