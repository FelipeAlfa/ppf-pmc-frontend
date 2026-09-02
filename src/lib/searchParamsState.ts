export type PageSearchParams = Record<string, string | string[] | undefined>;

export interface SearchParamsState {
  text: string | null;
  people: string[];
  events: string[];
  locations: string[];
  photographers: string[];
  page: number | null;
  date: number | null;
}

const encodedSearchParamsKey = "q";

const emptySearchParamsState: SearchParamsState = {
  text: null,
  people: [],
  events: [],
  locations: [],
  photographers: [],
  page: null,
  date: null,
};

export const readSearchParamsState = (
  searchParams: PageSearchParams | Pick<URLSearchParams, "get">
) => (
  decodeSearchParamsState(
    hasSearchParamGetter(searchParams)
      ? searchParams.get(encodedSearchParamsKey)
      : searchParams[encodedSearchParamsKey]
  )
);

export const writeSearchParamsState = (
  state: Partial<SearchParamsState>
) => {
  const searchParams = new URLSearchParams();
  const encodedState = encodeSearchParamsState(state);

  if (encodedState) {
    searchParams.set(encodedSearchParamsKey, encodedState);
  }

  return searchParams;
};

function createEmptySearchParamsState() {
  const result: SearchParamsState = {
    text: emptySearchParamsState.text,
    people: [],
    events: [],
    locations: [],
    photographers: [],
    page: emptySearchParamsState.page,
    date: emptySearchParamsState.date,
  };
  
  return result;
}

function encodeSearchParamsState(
  state: Partial<SearchParamsState>
) {
  const normalizedState = normalizeSearchParamsState(state);

  if (isEmptySearchParamsState(normalizedState)) {
    return "";
  }

  return encodeBase64Url(JSON.stringify(compactSearchParamsState(normalizedState)));
}

function decodeSearchParamsState(
  value: string | string[] | undefined | null
): SearchParamsState {
  const encodedValue = Array.isArray(value) ? value[0] : value;

  if (!encodedValue) {
    return createEmptySearchParamsState();
  }

  try {
    const parsedData = JSON.parse(decodeBase64Url(encodedValue)) as Partial<SearchParamsState>;

    return normalizeSearchParamsState(parsedData);
  } catch {
    return createEmptySearchParamsState();
  }
}

function normalizeSearchParamsState(
  state: Partial<SearchParamsState>
): SearchParamsState {
  return {
    text: normalizeStringValue(state.text),
    people: normalizeStringList(state.people),
    events: normalizeStringList(state.events),
    locations: normalizeStringList(state.locations),
    photographers: normalizeStringList(state.photographers),
    page: normalizeNumber(state.page),
    date: normalizeNumber(state.date),
  };
}

function compactSearchParamsState(
  state: SearchParamsState
): Partial<SearchParamsState> {
  const compactState: Partial<SearchParamsState> = {};

  if (state.text !== null) {
    compactState.text = state.text;
  }

  if (state.people.length > 0) {
    compactState.people = state.people;
  }

  if (state.events.length > 0) {
    compactState.events = state.events;
  }

  if (state.locations.length > 0) {
    compactState.locations = state.locations;
  }

  if (state.photographers.length > 0) {
    compactState.photographers = state.photographers;
  }

  if (state.page !== null) {
    compactState.page = state.page;
  }

  if (state.date !== null) {
    compactState.date = state.date;
  }

  return compactState;
}

function normalizeStringList(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return Array.from(new Set(
    value
      .map(String)
      .map((item) => item.trim())
      .filter(Boolean)
  ));
}

function normalizeStringValue(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  const normalizedValue = value.trim();

  return normalizedValue !== "" ? normalizedValue : null;
}

function normalizeNumber(value: unknown) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const number = Number(value);

  return Number.isFinite(number) ? number : null;
}

function isEmptySearchParamsState(state: SearchParamsState) {
  return state.text === null
    && state.people.length === 0
    && state.events.length === 0
    && state.locations.length === 0
    && state.photographers.length === 0
    && state.page === null
    && state.date === null;
}

function encodeBase64Url(value: string) {
  const bytes = new TextEncoder().encode(value);
  let binary = "";

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary)
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

function decodeBase64Url(value: string) {
  const base64 = value
    .replaceAll("-", "+")
    .replaceAll("_", "/")
    .padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(base64);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));

  return new TextDecoder().decode(bytes);
}

function hasSearchParamGetter(
  searchParams: PageSearchParams | Pick<URLSearchParams, "get">
): searchParams is Pick<URLSearchParams, "get"> {
  return typeof (searchParams as Pick<URLSearchParams, "get">).get === "function";
}
