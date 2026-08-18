"use client";

import { useCallback } from "react";
import {
  addCartItemAction,
  removeCartItemAction,
  updateCartItemAction,
} from "@/actions/cart";
import { fetchPmcRoute } from "./pmcRouteFetch";
import { usePmcMutation } from "./usePmcMutation";
import { usePmcQuery } from "./usePmcQuery";
import type { CartResponse } from "@/lib/pmc-api/cart";
import type { CartItemInput, PmcRequestParams } from "@/lib/pmc-api/types";

export function useCart(params: PmcRequestParams = {}) {
  const query = usePmcQuery<CartResponse>({
    key: ["cart", params],
    fetcher: useCallback(
      (signal) => fetchPmcRoute("/api/cart", params, signal),
      [params],
    ),
  });
  const addItem = usePmcMutation<CartItemInput, unknown>({
    mutation: addCartItemAction,
    onSuccess: () => void query.refetch(),
  });
  const updateItem = usePmcMutation<PmcRequestParams, unknown>({
    mutation: updateCartItemAction,
    onSuccess: () => void query.refetch(),
  });
  const removeItem = usePmcMutation<PmcRequestParams, unknown>({
    mutation: removeCartItemAction,
    onSuccess: () => void query.refetch(),
  });

  return {
    ...query,
    addItem,
    updateItem,
    removeItem,
  };
}
