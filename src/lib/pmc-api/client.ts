import "server-only";

import { cookies } from "next/headers";
import type {
  PmcAuthMode,
  PmcHttpMethod,
  PmcLegacyResponse,
  PmcRequestParams,
} from "./types";

const TOKEN_COOKIE = "pmcRequestToken";
const CART_COOKIE = "pmcShoppingCartId";

type PmcRequestOptions = {
  method?: PmcHttpMethod;
  params?: PmcRequestParams;
  body?: PmcRequestParams;
  auth?: PmcAuthMode;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
};

export class PmcApiError extends Error {
  statusCode?: number;
  payload?: unknown;

  constructor(message: string, statusCode?: number, payload?: unknown) {
    super(message);
    this.name = "PmcApiError";
    this.statusCode = statusCode;
    this.payload = payload;
  }
}

export const pmcCookieNames = {
  token: TOKEN_COOKIE,
  cart: CART_COOKIE,
} as const;

const getApiBaseUrl = () => {
  const baseUrl = process.env.PMC_API_BASE_URL;

  if (!baseUrl) {
    throw new PmcApiError("Missing PMC_API_BASE_URL environment variable.");
  }

  return baseUrl.replace(/\/+$/, "");
};

const buildUrl = (path: string, params?: PmcRequestParams) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(`${getApiBaseUrl()}${normalizedPath}`);

  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  return url;
};

const readToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get(TOKEN_COOKIE)?.value ?? null;
};

const withToken = async (
  auth: PmcAuthMode,
  values: PmcRequestParams = {},
) => {
  if (auth === "none") return values;

  const token = await readToken();

  if (!token && auth === "required") {
    throw new PmcApiError("Unauthorized.", 401);
  }

  return token ? { ...values, token } : values;
};

const getResponseMessage = (payload: unknown, fallback: string) => {
  if (!payload || typeof payload !== "object") return fallback;

  const response = payload as PmcLegacyResponse;
  return response.message ?? response.error ?? fallback;
};

export async function pmcRequest<TResponse>(
  path: string,
  options: PmcRequestOptions = {},
): Promise<TResponse> {
  const method = options.method ?? "GET";
  const auth = options.auth ?? "none";
  const params = method === "GET" || method === "DELETE"
    ? await withToken(auth, options.params)
    : options.params;
  const body = method === "POST" || method === "PUT"
    ? await withToken(auth, options.body ?? options.params)
    : undefined;

  const response = await fetch(buildUrl(path, params), {
    method,
    cache: options.cache,
    next: options.next,
    headers: body
      ? { "Content-Type": "application/json" }
      : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new PmcApiError(
      getResponseMessage(payload, `PMC API request failed with ${response.status}.`),
      response.status,
      payload,
    );
  }

  if (
    payload
    && typeof payload === "object"
    && "status" in payload
    && (payload as PmcLegacyResponse).status
    && (payload as PmcLegacyResponse).status !== "success"
  ) {
    throw new PmcApiError(
      getResponseMessage(payload, "PMC API returned an error."),
      response.status,
      payload,
    );
  }

  return payload as TResponse;
}
