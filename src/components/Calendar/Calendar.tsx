"use client";

import { useMemo } from "react";
import { getMonthCalendar } from "@/utils";

interface CalendarProps {
  month?: number;
  year?: number;
  className?: string;
}

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Calendar({
  month = new Date().getMonth(),
  year = new Date().getFullYear(),
  className = "",
}: CalendarProps) {
  const calendar = useMemo(() => getMonthCalendar(month, year), [month, year]);
  const monthLabel = useMemo(() => (
    new Intl.DateTimeFormat("en-US", {
      month: "long",
      year: "numeric",
    }).format(new Date(year, month, 1))
  ), [month, year]);

  return (
    <section className={`flex w-full flex-col gap-3 max-w-100 ${className}`.trim()}>
      <header className="flex items-center justify-between">
        <h2 className="m-0 text-base font-semibold">{monthLabel}</h2>
      </header>

      <div
        className="grid grid-cols-7 gap-1 text-xs font-semibold uppercase text-[#666]"
        aria-hidden="true">
        {weekDays.map((weekDay) => (
          <span key={weekDay} className="min-w-0 text-center">
            {weekDay}
          </span>
        ))}
      </div>

      <div className="flex flex-col" role="grid" aria-label={monthLabel}>
        {calendar.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7" role="row">
            {week.map((day, dayIndex) => (
              <div
                key={`${weekIndex}-${dayIndex}`}
                className="px-2"
                role="gridcell">
                <button type="button" className="aspect-square w-full cursor-pointer text-xs hover:bg-foreground/5 focus:bg-foreground/5">
                  {day}
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
