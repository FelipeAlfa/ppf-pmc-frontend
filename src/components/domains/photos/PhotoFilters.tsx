"use client";

import { useParamFilters } from "@/context/ParamFiltersContext";

interface PhotoFiltersProps {
  filters: {
    people: {id: string, name: string}[];
    events: {id: string, name: string}[];
    locations: {id: string, name: string}[];
    photographers: {id: string, name: string}[];
  };
}

export default function PhotoFilters({
  filters
}: PhotoFiltersProps) {
  const { getParam, setParam, isPending } = useParamFilters();
  
  return (
    <div className="relative">
      
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
