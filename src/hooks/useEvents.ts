"use client";

import { useCallback } from "react";
import { fetchPmcRoute } from "./pmcRouteFetch";
import { usePmcQuery } from "./usePmcQuery";
import type { EventsResponse } from "@/lib/pmc-api/events";
import type { EventSearchParams } from "@/lib/pmc-api/types";

export function useEvents(params: EventSearchParams = {}) {
  return usePmcQuery<EventsResponse>({
    key: ["events", params],
    fetcher: useCallback(
      (signal) => fetchPmcRoute("/api/events", params, signal),
      [params],
    ),
  });
}
