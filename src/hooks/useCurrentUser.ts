"use client";

import { useCallback } from "react";
import { fetchPmcRoute } from "./pmcRouteFetch";
import { usePmcQuery } from "./usePmcQuery";
import type { CurrentUserResponse } from "@/lib/pmc-api/auth";

export function useCurrentUser() {
  return usePmcQuery<CurrentUserResponse>({
    key: ["current-user"],
    fetcher: useCallback(
      (signal) => fetchPmcRoute("/api/me", {}, signal),
      [],
    ),
  });
}
