"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getCurrentUser, login } from "@/lib/pmc-api/auth";
import { pmcCookieNames, PmcApiError } from "@/lib/pmc-api/client";
import type { LoginInput } from "@/lib/pmc-api/types";

const ONE_WEEK_SECONDS = 60 * 60 * 24 * 7;

export async function loginAction(input: LoginInput) {
  const response = await login(input);
  const token = response.token?.key;

  if (!token) {
    throw new PmcApiError("Login response did not include a token.");
  }

  const cookieStore = await cookies();

  cookieStore.set(pmcCookieNames.token, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ONE_WEEK_SECONDS,
  });

  return response.user ?? null;
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(pmcCookieNames.token);
}

export async function requireUserAction() {
  const response = await getCurrentUser();
  return response.user ?? null;
}

export async function logoutAndRedirectAction(path = "/") {
  await logoutAction();
  redirect(path);
}
