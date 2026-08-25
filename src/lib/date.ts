export type DateInput = Date | number | string | null | undefined;

const dateOnlyPattern = /^(\d{4})-(\d{2})-(\d{2})$/;

const isValidDate = (date: Date) => !Number.isNaN(date.getTime());

const parseDateObject = (date: Date) => (
  isValidDate(date) ? date : null
);

const parseDate = (value: DateInput): Date | null => {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  if (value instanceof Date) {
    return isValidDate(value) ? new Date(value.getTime()) : null;
  }

  if (typeof value === "number") {
    return Number.isFinite(value) ? parseDateObject(new Date(value)) : null;
  }

  const normalizedValue = value.trim();

  if (normalizedValue === "") {
    return null;
  }

  const dateOnlyMatch = normalizedValue.match(dateOnlyPattern);

  if (dateOnlyMatch) {
    const [, year, month, day] = dateOnlyMatch;

    return parseDateObject(new Date(Number(year), Number(month) - 1, Number(day)));
  }

  const timestamp = Number(normalizedValue);

  if (Number.isFinite(timestamp)) {
    return parseDateObject(new Date(timestamp));
  }

  return parseDateObject(new Date(normalizedValue));
};

const formatDate = (
  value: DateInput,
  options: Intl.DateTimeFormatOptions,
) => {
  const date = parseDate(value);

  return date === null ? "" : new Intl.DateTimeFormat("en-US", options).format(date);
};

export const shortDate = (value: DateInput) => (
  formatDate(value, {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
);

export const longDate = (value: DateInput) => (
  formatDate(value, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })
);
