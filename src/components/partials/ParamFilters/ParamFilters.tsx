"use client";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParamFilters } from "@/context/ParamFiltersContext";

export default function ParamFilters() {
  const {
    filters,
    isPending,
    removeParam,
  } = useParamFilters();
  const visibleFilters = filters.filter((filter) => filter.key !== "p");

  if (visibleFilters.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      <ul
        className={`flex flex-wrap justify-start gap-2 md:justify-end ${isPending ? "pointer-events-none opacity-60" : ""}`.trim()}
        aria-label="Applied filters"
        aria-busy={isPending}>
        {visibleFilters.map((filter) => (
          <li
            key={`${filter.key}:${filter.value}`}
            className="inline-flex items-center gap-1 rounded-xs border border-brand-blue/50 bg-brand-blue/5 px-2 py-1 text-xs text-black">
            <span>
              <span className="font-medium">{filter.label}:</span>{" "}
              <span>{filter.value}</span>
            </span>
            <button
              type="button"
              disabled={isPending}
              onClick={() => {
                removeParam(filter.key, filter.rawValue);
              }}
              className="inline-flex h-4 w-4 cursor-pointer items-center justify-center rounded text-foreground/60 hover:bg-foreground/10 hover:text-foreground focus:bg-foreground/10 focus:text-foreground disabled:cursor-not-allowed"
              aria-label={`Remove ${filter.label} filter`}>
              <FontAwesomeIcon icon={faXmark} className="h-3 w-3" />
            </button>
          </li>
        ))}
      </ul>
      {isPending && (
        <div
          className="absolute inset-0 flex items-center justify-center rounded-sm bg-white/70"
          role="status"
          aria-label="Updating filters">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-foreground/20 border-t-brand-blue" />
        </div>
      )}
    </div>
  );
}
