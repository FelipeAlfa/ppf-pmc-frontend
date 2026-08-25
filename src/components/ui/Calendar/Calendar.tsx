"use client";

import { useMemo, useState } from "react";
import { getMonthCalendar } from "@/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { calendarPickerVariants } from "./Calendar.variants";
import {
  currentYear,
  getDatePickerState,
  getSimplePickerState,
  isSameDate,
  monthLabels,
  type Picker,
  weekDays,
} from "./Calendar.utils";

interface CalendarProps {
  value?: number;
  onSelect?(datetime: number): void;
  className?: string;
}

export default function Calendar({
  value,
  onSelect,
  className = "",
}: CalendarProps) {
  const selectedDate = useMemo(() => (
    value === undefined ? null : new Date(value)
  ), [value]);
  const [picker, setPicker] = useState<Picker>("date");
  const [pickerDate, setPickerDate] = useState(() => selectedDate ?? new Date());
  const month = pickerDate.getMonth();
  const year = pickerDate.getFullYear();
  const selectedMonth = selectedDate?.getMonth();
  const selectedYear = selectedDate?.getFullYear();
  const calendar = useMemo(() => getMonthCalendar(month, year), [month, year]);
  const pickerLabel = useMemo(() => {
    if (picker === "year") return String(year);

    return new Intl.DateTimeFormat("en-US", {
      month: picker === "date" ? "long" : undefined,
      year: "numeric",
    }).format(new Date(year, month, 1));
  }, [month, picker, year]);
  const yearPickerStart = Math.floor(year / 12) * 12;
  const nextYearPickerStart = yearPickerStart + 12;
  const nextDatePickerYear = new Date(year, month + 1, 1).getFullYear();
  const nextPickerIsDisabled = (
    (picker === "date" && nextDatePickerYear > currentYear)
    || (picker === "month" && year >= currentYear)
    || (picker === "year" && nextYearPickerStart > currentYear)
  );

  const movePicker = (direction: -1 | 1) => {
    if (direction > 0 && nextPickerIsDisabled) return;

    setPickerDate((currentDate) => {
      if (picker === "date") {
        return new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1);
      }

      if (picker === "month") {
        return new Date(currentDate.getFullYear() + direction, currentDate.getMonth(), 1);
      }

      return new Date(currentDate.getFullYear() + (direction * 12), currentDate.getMonth(), 1);
    });
  };

  const selectDate = (date: Date) => {
    const datetime = date.getTime();

    setPickerDate(date);
    onSelect?.(datetime);
  };

  const selectMonth = (nextMonth: number) => {
    setPickerDate((currentDate) => (
      new Date(currentDate.getFullYear(), nextMonth, 1)
    ));
    setPicker("date");
  };

  const selectYear = (nextYear: number) => {
    setPickerDate((currentDate) => (
      new Date(nextYear, currentDate.getMonth(), 1)
    ));
    setPicker("month");
  };

  const openNextPicker = () => {
    if (picker === "date") {
      setPicker("month");
    }
    else if (picker === "month") {
      setPicker("year");
    }
  };

  return (
    <div className={`flex w-full flex-col gap-2 rounded-sm border border-foreground/15 bg-white shadow-md ${className}`.trim()}>
      <div className="border-b border-foreground/15 p-2">
        <div className="grid grid-cols-[2rem_1fr_2rem] items-center gap-1">
          <button
            type="button"
            onClick={() => movePicker(-1)}
            className="h-8 w-8 cursor-pointer rounded text-xs hover:bg-foreground/5 focus:bg-foreground/5">
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          <button
            type="button"
            disabled={picker === "year"}
            onClick={openNextPicker}
            className="h-8 cursor-pointer rounded text-xs font-semibold text-foreground/80 uppercase hover:bg-foreground/5 focus:bg-foreground/5 disabled:cursor-default disabled:hover:bg-transparent disabled:focus:bg-transparent">
            {pickerLabel}
          </button>
          <button
            type="button"
            onClick={() => movePicker(1)}
            disabled={nextPickerIsDisabled}
            className="h-8 w-8 cursor-pointer rounded text-xs hover:bg-foreground/5 focus:bg-foreground/5 disabled:cursor-not-allowed disabled:text-foreground/30 disabled:hover:bg-transparent disabled:focus:bg-transparent">
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </div>
      </div>
      <div className="border-b border-foreground/15 p-2">
        {picker === "date" && (
          <>
            <div
              className="grid grid-cols-7 gap-1 text-xs font-semibold text-[#666] capitalize"
              aria-hidden="true">
              {weekDays.map((weekDay) => (
                <span key={weekDay} className="min-w-0 text-center">
                  {weekDay}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1" role="grid" aria-label={pickerLabel}>
              {calendar.flat().map((calendarDate) => {
                const isSelected = Boolean(
                  selectedDate && isSameDate(calendarDate.date, selectedDate)
                );

                return (
                  <div
                    key={calendarDate.date.getTime()}
                    role="gridcell">
                    <button
                      type="button"
                      disabled={calendarDate.isFuture}
                      onClick={() => selectDate(calendarDate.date)}
                      className={calendarPickerVariants({
                        state: getDatePickerState(calendarDate, isSelected),
                      })}>
                      {calendarDate.day}
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}
        {picker === "month" && (
          <div className="grid grid-cols-3 gap-1" role="grid" aria-label={pickerLabel}>
            {monthLabels.map((monthLabel, monthIndex) => (
              <button
                key={monthLabel}
                type="button"
                onClick={() => selectMonth(monthIndex)}
                className={`${calendarPickerVariants({
                  state: getSimplePickerState(
                    selectedMonth === monthIndex && selectedYear === year,
                  ),
                })} font-semibold uppercase`.trim()}>
                {monthLabel}
              </button>
            ))}
          </div>
        )}
        {picker === "year" && (
          <div className="grid grid-cols-3 gap-1" role="grid" aria-label={pickerLabel}>
            {Array.from({ length: 12 }, (_, index) => yearPickerStart + index).map((yearOption) => {
              const isDisabled = yearOption > currentYear;

              return (
                <button
                  key={yearOption}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => selectYear(yearOption)}
                  className={`${calendarPickerVariants({
                    state: getSimplePickerState(yearOption === selectedYear, isDisabled),
                  })} font-semibold uppercase`.trim()}>
                  {yearOption}
                </button>
              );
            })}
          </div>
        )}
      </div>
      <div className="border-b border-foreground/15 px-2 pb-2">
        <button
          type="button"
          onClick={() => selectDate(new Date())}
          className="h-8 w-full cursor-pointer rounded text-xs font-semibold text-brand-blue uppercase hover:bg-foreground/5 focus:bg-foreground/5">
          Today
        </button>
      </div>
    </div>
  );
}
