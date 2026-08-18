"use server";

import { revalidatePath } from "next/cache";
import {
  createLightbox,
  deleteLightbox,
  updateLightbox,
} from "@/lib/pmc-api/lightboxes";
import type { PmcRequestParams } from "@/lib/pmc-api/common/types";

export async function createLightboxAction(input: PmcRequestParams) {
  const response = await createLightbox(input);
  revalidatePath("/lightboxes");
  return response.lightbox ?? null;
}

export async function updateLightboxAction(input: PmcRequestParams) {
  const response = await updateLightbox(input);
  revalidatePath("/lightboxes");
  return response.lightbox ?? null;
}

export async function deleteLightboxAction(id: string | number) {
  const response = await deleteLightbox(id);
  revalidatePath("/lightboxes");
  return response.lightbox ?? null;
}
