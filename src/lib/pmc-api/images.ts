import { pmcRequest } from "./client";
import type { ImageSearchParams, PmcLegacyResponse, PmcRequestParams } from "./types";

export type ImagesResponse = PmcLegacyResponse<{
  images?: unknown[];
  pagination?: unknown;
  filters?: unknown;
}>;

export type ImageResponse = PmcLegacyResponse<{
  image?: unknown;
}>;

export function searchImages(params: ImageSearchParams = {}) {
  return pmcRequest<ImagesResponse>("/images/filterimageslist.json", {
    method: "GET",
    params,
    auth: "optional",
  });
}

export function getEventImages(params: PmcRequestParams = {}) {
  return pmcRequest<ImagesResponse>("/events/images.json", {
    method: "GET",
    params,
    auth: "optional",
  });
}

export function getImage(id: string | number) {
  return pmcRequest<ImageResponse>("/images/info.json", {
    method: "GET",
    params: { id },
    auth: "optional",
  });
}
