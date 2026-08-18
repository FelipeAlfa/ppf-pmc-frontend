import { pmcRequest } from "./common/client";
import type { PmcLegacyResponse, PmcRequestParams } from "./common/types";

export type LightboxesResponse = PmcLegacyResponse<{
  lightboxes?: unknown[];
}>;

export type LightboxResponse = PmcLegacyResponse<{
  lightbox?: unknown;
}>;

export function listLightboxes(params: PmcRequestParams = {}) {
  return pmcRequest<LightboxesResponse>("/lightboxes/list.json", {
    method: "GET",
    params,
    auth: "required",
  });
}

export function getLightbox(id: string | number) {
  return pmcRequest<LightboxResponse>("/lightboxes/info.json", {
    method: "GET",
    params: { id },
    auth: "required",
  });
}

export function createLightbox(input: PmcRequestParams) {
  return pmcRequest<LightboxResponse>("/lightboxes/create.json", {
    method: "POST",
    body: input,
    auth: "required",
  });
}

export function updateLightbox(input: PmcRequestParams) {
  return pmcRequest<LightboxResponse>("/lightboxes/update.json", {
    method: "PUT",
    body: input,
    auth: "required",
  });
}

export function deleteLightbox(id: string | number) {
  return pmcRequest<LightboxResponse>("/lightboxes/delete.json", {
    method: "DELETE",
    params: { id },
    auth: "required",
  });
}
