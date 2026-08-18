"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { PmcQueryState } from "@/lib/pmc-api/types";

type PmcQueryOptions<TData> = {
  key: readonly unknown[];
  enabled?: boolean;
  fetcher: (signal: AbortSignal) => Promise<TData>;
};

export type PmcQueryResult<TData> = PmcQueryState<TData> & {
  refetch: () => Promise<TData | null>;
};

export function usePmcQuery<TData>({
  key,
  enabled = true,
  fetcher,
}: PmcQueryOptions<TData>): PmcQueryResult<TData> {
  const [state, setState] = useState<PmcQueryState<TData>>({
    data: null,
    error: null,
    loading: false,
  });
  const abortControllerRef = useRef<AbortController | null>(null);
  const fetcherRef = useRef(fetcher);
  const queryKey = useMemo(() => JSON.stringify(key), [key]);

  useEffect(() => {
    fetcherRef.current = fetcher;
  });

  const refetch = useCallback(async () => {
    abortControllerRef.current?.abort();

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      const data = await fetcherRef.current(abortController.signal);
      setState({ data, error: null, loading: false });
      return data;
    }
    catch (error) {
      if (abortController.signal.aborted) return null;

      const resolvedError = error instanceof Error
        ? error
        : new Error("Unexpected query error.");

      setState((currentState) => ({
        ...currentState,
        error: resolvedError,
        loading: false,
      }));

      return null;
    }
  }, []);

  useEffect(() => {
    if (!enabled) {
      abortControllerRef.current?.abort();
      return;
    }

    void refetch();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [enabled, queryKey, refetch]);

  return {
    ...state,
    loading: enabled && !state.error && (state.loading || state.data === null),
    refetch,
  };
}
