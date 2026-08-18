export type PmcAuthMode = "none" | "optional" | "required";

export type PmcHttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export type PmcRequestParams = Record<
  string,
  string | number | boolean | null | undefined
>;

export type PmcLegacyResponse<TData extends Record<string, unknown> = Record<string, unknown>> =
  TData & {
    status?: "success" | "error" | "fail" | string;
    message?: string;
    error?: string;
    errors?: unknown;
  };

export type PmcQueryState<TData> = {
  data: TData | null;
  error: Error | null;
  loading: boolean;
};

export type PmcMutationState<TData> = PmcQueryState<TData>;

export type EventSearchParams = PmcRequestParams & {
  query?: string;
  page?: number;
  per?: number;
};

export type ImageSearchParams = PmcRequestParams & {
  page?: number;
  per?: number;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type CartItemInput = PmcRequestParams & {
  image_id?: string | number;
  imageId?: string | number;
};
