import { pmcRequest } from "./common/client";
import type { PmcLegacyResponse, PmcRequestParams } from "./common/types";

export type ProductsResponse = PmcLegacyResponse<{
  products?: unknown[];
}>;

export type ProductResponse = PmcLegacyResponse<{
  product?: unknown;
}>;

export function listProducts(params: PmcRequestParams = {}) {
  return pmcRequest<ProductsResponse>("/products/list.json", {
    method: "GET",
    params,
    auth: "none",
  });
}

export function getProduct(id: string | number) {
  return pmcRequest<ProductResponse>("/products/info.json", {
    method: "GET",
    params: { id },
    auth: "none",
  });
}
