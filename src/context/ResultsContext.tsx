"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname, useSearchParams } from "next/navigation";
import type { EventResults, PhotoResults } from "@/types";
import {
  readSearchParamsState,
  writeSearchParamsState,
  type SearchParamsState,
} from "@/lib/searchParamsState";

type ResultsData = EventResults | PhotoResults;
type ResultsType = "events" | "photos";

interface ResultsContextValue<R extends ResultsData = ResultsData> {
  results: R;
  isPending: boolean;
  goToPage(page: number): void;
  nextPage(): void;
  previousPage(): void;
}

interface ResultsProviderProps<R extends ResultsData> {
  baseParams?: Partial<SearchParamsState>;
  children: ReactNode;
  initialResults: R;
  type?: ResultsType;
}

const ResultsContext = createContext<ResultsContextValue | undefined>(undefined);

export default function ResultsProvider<R extends ResultsData>({
  baseParams,
  children,
  initialResults,
  type,
}: ResultsProviderProps<R>) {
  const selectedType = type ?? inferResultsType(initialResults);
  const encodedBaseParams = writeSearchParamsState(baseParams ?? {}).toString();
  const resultsKey = `${selectedType}:${encodedBaseParams}`;

  return (
    <ResultsProviderContent
      baseParams={baseParams}
      key={resultsKey}
      initialResults={initialResults}
      type={selectedType}>
      {children}
    </ResultsProviderContent>
  );
}

function ResultsProviderContent<R extends ResultsData>({
  baseParams,
  children,
  initialResults,
  type,
}: ResultsProviderProps<R> & {
  type: ResultsType;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const requestControllerRef = useRef<AbortController | null>(null);
  const [results, setResults] = useState(initialResults);
  const [isPending, setIsPending] = useState(false);
  const loadPage = useCallback(async (
    page: number,
    pageSearchParams = new URLSearchParams(window.location.search)
  ) => {
    requestControllerRef.current?.abort();

    const requestController = new AbortController();
    requestControllerRef.current = requestController;
    const requestSearchParamsState = {
      ...readSearchParamsState(pageSearchParams),
      ...baseParams,
      page,
    };
    const requestSearchParams = writeSearchParamsState(requestSearchParamsState);

    requestSearchParams.set("type", type);
    requestSearchParams.set("page", String(page));
    setIsPending(true);

    try {
      const response = await fetch(`/api/results?${requestSearchParams.toString()}`, {
        signal: requestController.signal,
      });

      if (!response.ok) {
        throw new Error("Could not load results");
      }

      const nextResults = await response.json() as R;

      setResults(nextResults);
    }
    catch (error) {
      if (!(error instanceof DOMException && error.name === "AbortError")) {
        console.error(error);
      }
    }
    finally {
      if (requestControllerRef.current === requestController) {
        setIsPending(false);
        requestControllerRef.current = null;
      }
    }
  }, [baseParams, type]);
  const goToPage = useCallback((page: number) => {
    if (isPending || !Number.isFinite(page)) {
      return;
    }

    const lastPage = Math.max(1, results.totalPages);
    const nextPage = Math.min(Math.max(1, Math.floor(page)), lastPage);

    if (nextPage === results.currentPage) {
      return;
    }

    const currentSearchParamsState = readSearchParamsState(searchParams);
    const nextSearchParamsState = {
      ...currentSearchParamsState,
      ...baseParams,
      page: nextPage === 1 ? null : nextPage,
    };
    const nextSearchParams = writeSearchParamsState(nextSearchParamsState);
    const queryString = nextSearchParams.toString();
    const href = queryString ? `${pathname}?${queryString}` : pathname;

    window.history.pushState(null, "", href);
    void loadPage(nextPage, nextSearchParams);
  }, [baseParams, isPending, loadPage, pathname, results.currentPage, results.totalPages, searchParams]);
  const nextPage = useCallback(() => {
    goToPage(results.currentPage + 1);
  }, [goToPage, results.currentPage]);
  const previousPage = useCallback(() => {
    goToPage(results.currentPage - 1);
  }, [goToPage, results.currentPage]);

  useEffect(() => {
    const handlePopState = () => {
      const nextSearchParams = new URLSearchParams(window.location.search);
      const page = readSearchParamsState(nextSearchParams).page ?? 1;

      void loadPage(page, nextSearchParams);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [loadPage]);

  useEffect(() => () => {
    requestControllerRef.current?.abort();
  }, []);

  const value = useMemo<ResultsContextValue>(() => ({
    results,
    isPending,
    goToPage,
    nextPage,
    previousPage,
  }), [goToPage, isPending, nextPage, previousPage, results]);

  return (
    <ResultsContext.Provider value={value}>
      {children}
    </ResultsContext.Provider>
  );
}

export function useResults<R extends ResultsData = ResultsData>() {
  const context = useContext(ResultsContext);

  if (context === undefined) {
    throw new Error("useResults must be used within ResultsProvider");
  }

  return context as ResultsContextValue<R>;
}

function inferResultsType(results: ResultsData): ResultsType {
  return "photos" in results ? "photos" : "events";
}
