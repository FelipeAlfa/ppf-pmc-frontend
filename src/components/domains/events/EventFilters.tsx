"use client";

import Calendar from "@/components/ui/Calendar/Calendar";
import { useParamFilters } from "@/context/ParamFiltersContext";

export default function EventFilters() {
  const { getParam, setParam, isPending } = useParamFilters();
  const date = getParam("date");
  const calendarValue = typeof date === "number" ? date : undefined;
  
  return (
    <div className="relative">
      <Calendar
        value={Number.isFinite(calendarValue) ? calendarValue : undefined}
        onSelect={(datetime) => {
          setParam("date", datetime);
        }} />
      {isPending && (
        <div
          className="absolute inset-0 flex items-center justify-center rounded-sm bg-white/70"
          role="status"
          aria-label="Loading events">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-foreground/20 border-t-brand-blue" />
        </div>
      )}
    </div>
  );
}
