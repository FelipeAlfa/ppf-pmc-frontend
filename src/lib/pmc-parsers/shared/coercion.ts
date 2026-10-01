import { isArray, isBoolean, isNumber, isRecord, isString, type UnknownRecord } from "./guards";

export function asRecord(value: unknown): UnknownRecord {
  return isRecord(value) ? value : {};
}

export function asString(value: unknown, fallback = ""): string {
  return isString(value) ? value : fallback;
}

export function asNullableString(value: unknown): string | null {
  if (!isString(value)) {
    return null;
  }

  const normalizedValue = value.trim();

  return normalizedValue === "" ? null : normalizedValue;
}

export function asNumber(value: unknown, fallback = 0): number {
  if (isNumber(value)) {
    return value;
  }

  if (isString(value)) {
    const numberValue = Number(value.trim());

    return Number.isFinite(numberValue) ? numberValue : fallback;
  }

  return fallback;
}

export function asNullableNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const numberValue = asNumber(value, Number.NaN);

  return Number.isFinite(numberValue) ? numberValue : null;
}

export function asBoolean(value: unknown, fallback = false): boolean {
  if (isBoolean(value)) {
    return value;
  }

  if (!isString(value)) {
    return fallback;
  }

  const normalizedValue = value.trim().toLowerCase();

  if (["true", "1", "yes"].includes(normalizedValue)) {
    return true;
  }

  if (["false", "0", "no"].includes(normalizedValue)) {
    return false;
  }

  return fallback;
}

export function asArray<T>(
  value: unknown,
  parser: (item: unknown, index: number) => T,
): T[] {
  return isArray(value) ? value.map(parser) : [];
}

export function asStringArray(value: unknown): string[] {
  return asArray(value, (item) => asNullableString(item))
    .filter((item): item is string => item !== null);
}
