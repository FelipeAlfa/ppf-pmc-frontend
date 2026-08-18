"use client";

import { useCallback, useMemo } from "react";
import { fetchPmcRoute } from "./pmcRouteFetch";
import { usePmcQuery } from "./usePmcQuery";
import type { ImagesResponse } from "@/lib/pmc-api/images";
import type { PmcRequestParams } from "@/lib/pmc-api/types";

export function useEventImages(eventId: string | number, params: PmcRequestParams = {}) {
  const queryParams = useMemo(
    () => ({
      ...params,
      event_id: eventId,
    }),
    [eventId, params],
  );

  return usePmcQuery<ImagesResponse>({
    key: ["event-images", queryParams],
    enabled: Boolean(eventId),
    fetcher: useCallback(
      (signal) => fetchPmcRoute("/api/images", queryParams, signal),
      [queryParams],
    ),
  });
}
