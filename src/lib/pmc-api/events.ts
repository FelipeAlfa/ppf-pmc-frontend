import { pmcRequest } from "./client";
import type { EventSearchParams, PmcLegacyResponse, PmcRequestParams } from "./types";

export type EventsResponse = PmcLegacyResponse<{
  events?: unknown[];
  pagination?: unknown;
}>;

export type EventResponse = PmcLegacyResponse<{
  event?: unknown;
}>;

export function searchEvents(params: EventSearchParams = {}) {
  return pmcRequest<EventsResponse>("/events/search.json", {
    method: "GET",
    params,
    auth: "none",
  });
}

export function listEvents(params: PmcRequestParams = {}) {
  return pmcRequest<EventsResponse>("/events/list.json", {
    method: "GET",
    params,
    auth: "none",
  });
}

export function getEvent(id: string | number) {
  return pmcRequest<EventResponse>("/events/info.json", {
    method: "GET",
    params: { id },
    auth: "none",
  });
}

export function findEventBySlugOrId(slugOrId: string | number) {
  return pmcRequest<EventResponse>("/events/find_by_slug_or_id.json", {
    method: "GET",
    params: { slug_or_id: slugOrId },
    auth: "none",
  });
}
