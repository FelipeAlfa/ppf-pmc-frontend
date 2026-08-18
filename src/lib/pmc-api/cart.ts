import { pmcRequest } from "./common/client";
import type { CartItemInput, PmcLegacyResponse, PmcRequestParams } from "./common/types";

export type CartResponse = PmcLegacyResponse<{
  shopping_cart?: unknown;
}>;

export function getCart(params: PmcRequestParams = {}) {
  return pmcRequest<CartResponse>("/shopping_carts/info.json", {
    method: "GET",
    params,
    auth: "required",
  });
}

export function addCartItem(input: CartItemInput) {
  return pmcRequest<CartResponse>("/shopping_carts/add_item.json", {
    method: "PUT",
    body: input,
    auth: "required",
  });
}

export function updateCartItem(input: PmcRequestParams) {
  return pmcRequest<CartResponse>("/shopping_carts/update_cart_item.json", {
    method: "PUT",
    body: input,
    auth: "required",
  });
}

export function removeCartItem(input: PmcRequestParams) {
  return pmcRequest<CartResponse>("/shopping_carts/delete_item.json", {
    method: "DELETE",
    params: input,
    auth: "required",
  });
}
