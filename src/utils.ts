import { CSSProperties } from "react";

type classNameArgumentString = string | boolean | null | undefined;
type classNameArgumentObject = {[className: string]: boolean};

export const classNames = (
  ...classConditionArguments: (classNameArgumentString | classNameArgumentObject)[]
): string => (
  classConditionArguments
    .reduce((classNamesAccumulator, classConditions) => {
      if (typeof classConditions === 'string' && !!classConditions) {
        return [...classNamesAccumulator, classConditions];
      }

      if (typeof classConditions === 'object' && !!classConditions) {
        return [
          ...classNamesAccumulator,
          ...Object.keys(classConditions)
            .filter(className => (
              className !== ''
              && className !== 'undefined'
              && classConditions[className]
            )),
        ];
      }
      
      return classNamesAccumulator;
    }, [] as classNameArgumentString[])
    .filter((className, index, classNamesAccumulator) => (
      Boolean(className)
      && (classNamesAccumulator.indexOf(className) === index)
    ))
    .join(" ")
);

export const fromKebabToCamel = (str: string) => str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());

export const fromCamelToKebab = (str: string) => str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

export const stringElement = (
  tag: keyof HTMLElementTagNameMap,
  classNameOrAttributes?: string | Record<string, string> | null,
  ...children: (string)[]
) => {
  const attributes = !!classNameOrAttributes && typeof classNameOrAttributes === 'string'
    ? !!classNameOrAttributes ? ` class="${classNameOrAttributes}"` : ''
    : !!classNameOrAttributes ? Object.entries(classNameOrAttributes)
      .map(([attribute, value]) => ` ${attribute === 'className' ? 'class' : fromCamelToKebab(attribute)}="${value}"`)
      .join('') : '';

  return `<${tag}${attributes}>${children.join('')}</${tag}>`;
};

export const cssStyles = (
  styles: Record<string, CSSProperties>
) => {
  return Object.entries(styles)
    .map(([selector, css]) => `${selector}{${Object.entries(css)
      .map(([property, value]) => `${fromCamelToKebab(property)}:${value};`)
      .join('')}}`)
    .join('');
};

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
