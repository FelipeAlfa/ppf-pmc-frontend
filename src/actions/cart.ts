"use server";

import { revalidatePath } from "next/cache";
import {
  addCartItem,
  removeCartItem,
  updateCartItem,
} from "@/lib/pmc-api/cart";
import type { CartItemInput, PmcRequestParams } from "@/lib/pmc-api/types";

export async function addCartItemAction(input: CartItemInput) {
  const response = await addCartItem(input);
  revalidatePath("/cart");
  return response.shopping_cart ?? null;
}

export async function updateCartItemAction(input: PmcRequestParams) {
  const response = await updateCartItem(input);
  revalidatePath("/cart");
  return response.shopping_cart ?? null;
}

export async function removeCartItemAction(input: PmcRequestParams) {
  const response = await removeCartItem(input);
  revalidatePath("/cart");
  return response.shopping_cart ?? null;
}
