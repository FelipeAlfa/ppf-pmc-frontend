import { pmcRequest } from "./common/client";
import type { EventSearchParams, PmcLegacyResponse, PmcRequestParams } from "./common/types";

export type EventsResponse = PmcLegacyResponse<{
  events?: unknown[];
  pagination?: unknown;
}>;

export type EventResponse = PmcLegacyResponse<{
  event?: unknown;
}>;

export function searchEvents(params: EventSearchParams = {}) {
  return pmcRequest<EventsResponse>("/events", {
    method: "GET",
    params,
    auth: "none",
  });
}

export function getEventBySlugOrId(slugOrId: string | number) {
  return pmcRequest<EventResponse>("/events/find_by_slug_or_id.json", {
    method: "GET",
    params: { slug_or_id: slugOrId },
    auth: "none",
  });
}
