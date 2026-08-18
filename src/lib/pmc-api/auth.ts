import { pmcRequest } from "./common/client";
import type { LoginInput, PmcLegacyResponse } from "./common/types";

export type LoginResponse = PmcLegacyResponse<{
  token?: {
    key?: string;
  };
  user?: unknown;
}>;

export type CurrentUserResponse = PmcLegacyResponse<{
  user?: unknown;
}>;

export function login({ email, password }: LoginInput) {
  return pmcRequest<LoginResponse>("/users/authenticate.json", {
    method: "POST",
    body: {
      email: email.toLowerCase(),
      password,
    },
    auth: "none",
  });
}

export function getCurrentUser() {
  return pmcRequest<CurrentUserResponse>("/users/profile.json", {
    method: "GET",
    auth: "required",
  });
}
