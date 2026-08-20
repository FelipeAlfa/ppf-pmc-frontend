import type { CalendarDate } from "@/utils";

export type Picker = "date" | "month" | "year";

export type CalendarPickerState =
  | "default"
  | "selected"
  | "future"
  | "previousMonth"
  | "nextMonth"
  | "today";

export const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const monthLabels = Array.from({ length: 12 }, (_, month) => (
  new Intl.DateTimeFormat("en-US", { month: "short" }).format(new Date(2000, month, 1))
));

export const currentYear = new Date().getFullYear();

export const isSameDate = (left: Date, right: Date) => (
  left.getFullYear() === right.getFullYear()
  && left.getMonth() === right.getMonth()
  && left.getDate() === right.getDate()
);

export const getDatePickerState = (
  calendarDate: CalendarDate,
  isSelected: boolean,
): CalendarPickerState => {
  if (calendarDate.isFuture) return "future";
  if (isSelected) return "selected";
  if (calendarDate.isToday) return "today";
  if (calendarDate.isPreviousMonth) return "previousMonth";
  if (calendarDate.isNextMonth) return "nextMonth";

  return "default";
};

export const getSimplePickerState = (
  isSelected: boolean,
  isDisabled = false,
): CalendarPickerState => {
  if (isDisabled) return "future";
  if (isSelected) return "selected";
  return "default";
};
