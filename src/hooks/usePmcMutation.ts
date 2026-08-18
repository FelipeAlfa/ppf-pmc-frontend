"use client";

import { useCallback, useState } from "react";
import type { PmcMutationState } from "@/lib/pmc-api/types";

type PmcMutationOptions<TInput, TData> = {
  mutation: (input: TInput) => Promise<TData>;
  onSuccess?: (data: TData) => void;
};

export type PmcMutationResult<TInput, TData> = PmcMutationState<TData> & {
  mutate: (input: TInput) => Promise<TData | null>;
};

export function usePmcMutation<TInput, TData>({
  mutation,
  onSuccess,
}: PmcMutationOptions<TInput, TData>): PmcMutationResult<TInput, TData> {
  const [state, setState] = useState<PmcMutationState<TData>>({
    data: null,
    error: null,
    loading: false,
  });

  const mutate = useCallback(async (input: TInput) => {
    setState((currentState) => ({
      ...currentState,
      error: null,
      loading: true,
    }));

    try {
      const data = await mutation(input);
      setState({ data, error: null, loading: false });
      onSuccess?.(data);
      return data;
    }
    catch (error) {
      const resolvedError = error instanceof Error
        ? error
        : new Error("Unexpected mutation error.");

      setState((currentState) => ({
        ...currentState,
        error: resolvedError,
        loading: false,
      }));

      return null;
    }
  }, [mutation, onSuccess]);

  return {
    ...state,
    mutate,
  };
}
