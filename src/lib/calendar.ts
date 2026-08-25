export interface CalendarDate {
  day: number;
  date: Date;
  isPreviousMonth: boolean;
  isNextMonth: boolean;
  isPast: boolean;
  isToday: boolean;
  isFuture: boolean;
}

const getStartOfDayTime = (date: Date) => (
  new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
);

export const getMonthCalendar = (
  month: number = new Date().getMonth(),
  year: number = new Date().getFullYear(),
): CalendarDate[][] => {
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstWeekDay = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();
  const previousMonthDays = new Date(year, month, 0).getDate();
  const todayTime = getStartOfDayTime(new Date());
  const createCalendarDate = (
    day: number,
    monthOffset = 0,
  ): CalendarDate => {
    const date = new Date(year, month + monthOffset, day);
    const dateTime = getStartOfDayTime(date);

    return {
      day,
      date,
      isPreviousMonth: monthOffset < 0,
      isNextMonth: monthOffset > 0,
      isPast: dateTime < todayTime,
      isToday: dateTime === todayTime,
      isFuture: dateTime > todayTime,
    };
  };

  const days: CalendarDate[] = [];

  for (let day = firstWeekDay - 1; day >= 0; day -= 1) {
    days.push(createCalendarDate(previousMonthDays - day, -1));
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    days.push(createCalendarDate(day));
  }

  const remainingDays = 7 - (days.length % 7);

  if (remainingDays < 7) {
    for (let day = 1; day <= remainingDays; day += 1) {
      days.push(createCalendarDate(day, 1));
    }
  }

  const calendar: CalendarDate[][] = [];

  for (let index = 0; index < days.length; index += 7) {
    calendar.push(days.slice(index, index + 7));
  }

  return calendar;
};

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
