"use client";

import type { PmcRequestParams } from "@/lib/pmc-api/types";

export async function fetchPmcRoute<TData>(
  path: string,
  params: PmcRequestParams = {},
  signal?: AbortSignal,
): Promise<TData> {
  const url = new URL(path, window.location.origin);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  const response = await fetch(url, { signal });
  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      payload && typeof payload === "object" && "error" in payload
        ? String(payload.error)
        : `Request failed with ${response.status}.`,
    );
  }

  return payload as TData;
}
