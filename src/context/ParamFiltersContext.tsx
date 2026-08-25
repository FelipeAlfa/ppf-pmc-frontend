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

type ParamFilterValueType = "number" | "string" | "string[]";
type ParamFilterParsedValue = string | number | Array<string | number>;

interface ParamFilterConfig {
  label: string;
  parser?: (value: string) => ParamFilterParsedValue;
  value: ParamFilterValueType;
}

export interface ParamFilter {
  key: string;
  label: string;
  value: string;
  rawValue: string;
}

interface ParamFiltersContextValue {
  isPending: boolean;
  pushSearchParams(nextSearchParams: URLSearchParams): void;
  resetParams(searchParams: URLSearchParams, exceptKey?: string): void;
}

interface ParamFiltersProviderProps {
  children: ReactNode;
  resetParamsOnChange?: string[];
}

const paramFilterConfigs: Record<string, ParamFilterConfig> = {
  date: {
    label: "Date",
    parser: parseDateParam,
    value: "string",
  },
  event: {
    label: "Event",
    parser: parseIdsParam,
    value: "string[]",
  },
  location: {
    label: "Location",
    parser: parseIdsParam,
    value: "string[]",
  },
  person: {
    label: "Person",
    parser: parseIdsParam,
    value: "string[]",
  },
  photographer: {
    label: "Photographer",
    parser: parseIdsParam,
    value: "string[]",
  },
  p: {
    label: "Page",
    parser: parseNumberParam,
    value: "number",
  },
  q: {
    label: "Search",
    value: "string",
  },
};

const defaultResetParamsOnChange = ["p", "page"];
const ParamFiltersContext = createContext<ParamFiltersContextValue | undefined>(undefined);

export default function ParamFiltersProvider({
  children,
  resetParamsOnChange = defaultResetParamsOnChange,
}: ParamFiltersProviderProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const pushSearchParams = useCallback((nextSearchParams: URLSearchParams) => {
    const queryString = nextSearchParams.toString();
    const href = queryString ? `${pathname}?${queryString}` : pathname;

    startTransition(() => {
      router.push(href);
    });
  }, [pathname, router, startTransition]);
  const resetParams = useCallback((searchParams: URLSearchParams, exceptKey?: string) => {
    resetParamsOnChange.forEach((key) => {
      if (key !== exceptKey) {
        searchParams.delete(key);
      }
    });
  }, [resetParamsOnChange]);

  return (
    <ParamFiltersContext.Provider
      value={{
        isPending,
        pushSearchParams,
        resetParams,
      }}>
      {children}
    </ParamFiltersContext.Provider>
  );
}

function useParamFiltersContext() {
  const context = useContext(ParamFiltersContext);

  if (context === undefined) {
    throw new Error("useParamFilters must be used within ParamFiltersProvider");
  }

  return context;
}

export function useParamFilters() {
  const {
    isPending,
    pushSearchParams,
    resetParams,
  } = useParamFiltersContext();
  const searchParams = useSearchParams();
  const getConfig = useCallback((key: string) => (
    paramFilterConfigs[key]
  ), []);
  const getParam = useCallback((key: string) => {
    const config = getConfig(key);

    if (config === undefined) {
      return undefined;
    }

    const rawValues = searchParams.getAll(key).filter(Boolean);

    if (rawValues.length === 0) {
      return undefined;
    }

    if (config.value === "string[]") {
      return rawValues.flatMap((rawValue) => {
        const parsedValue = parseParamValue(config, rawValue);

        return Array.isArray(parsedValue) ? parsedValue : [String(parsedValue)];
      });
    }

    return parseParamValue(config, rawValues[0]);
  }, [getConfig, searchParams]);
  const filters = useMemo(() => (
    Array
      .from(searchParams.entries())
      .flatMap(([key, rawValue]) => {
        const config = getConfig(key);

        if (config === undefined || rawValue === "") {
          return [];
        }

        const parsedValue = parseParamValue(config, rawValue);
        const values = config.value === "string[]"
          ? asParamValueList(parsedValue)
          : [parsedValue];

        return values.map((value) => ({
          key,
          label: config.label,
          rawValue: String(value),
          value: formatParamValue(key, value),
        }));
      })
  ), [getConfig, searchParams]);
  const setParam = useCallback((key: string, value: ParamFilterParsedValue) => {
    const config = getConfig(key);

    if (isPending || config === undefined) {
      return;
    }

    const nextSearchParams = new URLSearchParams(searchParams.toString());
    const serializedValue = serializeParamValue(config, value);

    if (serializedValue === "") {
      nextSearchParams.delete(key);
    }
    else {
      nextSearchParams.set(key, serializedValue);
    }

    resetParams(nextSearchParams, key);
    pushSearchParams(nextSearchParams);
  }, [getConfig, isPending, pushSearchParams, resetParams, searchParams]);
  const addParamValue = useCallback((key: string, value: string | number) => {
    const config = getConfig(key);

    if (isPending || config === undefined || config.value !== "string[]") {
      return;
    }

    const nextSearchParams = new URLSearchParams(searchParams.toString());
    const currentValues = nextSearchParams
      .getAll(key)
      .flatMap((rawValue) => asParamValueList(parseParamValue(config, rawValue)))
      .map(String);
    const nextValues = uniqueParamValues([
      ...currentValues,
      String(value),
    ]);

    nextSearchParams.set(key, serializeParamValue(config, nextValues));
    resetParams(nextSearchParams, key);
    pushSearchParams(nextSearchParams);
  }, [getConfig, isPending, pushSearchParams, resetParams, searchParams]);
  const removeParamValue = useCallback((key: string, value: string | number) => {
    const config = getConfig(key);

    if (isPending || config === undefined || config.value !== "string[]") {
      return;
    }

    const nextSearchParams = new URLSearchParams(searchParams.toString());
    const remainingValues = uniqueParamValues(
      nextSearchParams
        .getAll(key)
        .flatMap((rawValue) => asParamValueList(parseParamValue(config, rawValue)))
        .map(String)
        .filter((currentValue) => currentValue !== String(value))
    );

    nextSearchParams.delete(key);

    if (remainingValues.length > 0) {
      nextSearchParams.set(key, serializeParamValue(config, remainingValues));
    }

    resetParams(nextSearchParams);
    pushSearchParams(nextSearchParams);
  }, [getConfig, isPending, pushSearchParams, resetParams, searchParams]);
  const removeParam = useCallback((key: string, value?: string) => {
    const config = getConfig(key);

    if (isPending || config === undefined) {
      return;
    }

    const nextSearchParams = new URLSearchParams(searchParams.toString());

    if (config.value === "string[]" && value !== undefined) {
      const remainingValues = nextSearchParams
        .getAll(key)
        .flatMap((rawValue) => asParamValueList(parseParamValue(config, rawValue)))
        .filter((currentValue) => String(currentValue) !== value);

      nextSearchParams.delete(key);

      if (remainingValues.length > 0) {
        nextSearchParams.set(key, serializeParamValue(config, remainingValues));
      }
    }
    else {
      nextSearchParams.delete(key);
    }

    resetParams(nextSearchParams);
    pushSearchParams(nextSearchParams);
  }, [getConfig, isPending, pushSearchParams, resetParams, searchParams]);

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

function parseParamValue(config: ParamFilterConfig, value: string) {
  return config.parser?.(value) ?? value;
}

function serializeParamValue(config: ParamFilterConfig, value: ParamFilterParsedValue) {
  if (Array.isArray(value)) {
    return value.join(",");
  }

  return String(value);
}

function formatParamValue(key: string, value: ParamFilterParsedValue) {
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

function parseDateParam(value: string) {
  const datetime = Number(value);

  return Number.isFinite(datetime) ? datetime : value;
}

function parseNumberParam(value: string) {
  const number = Number(value);

  return Number.isFinite(number) ? number : value;
}

function parseIdsParam(value: string) {
  return value
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
}
