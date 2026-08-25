"use client";

import Accordion from "@/components/ui/Accordion/Accordion";
import Calendar from "@/components/ui/Calendar/Calendar";
import { useParamFilters } from "@/context/ParamFiltersContext";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo, useState } from "react";

type FilterOption = {
  id: string;
  name: string;
}

interface SearchFiltersProps {
  withDate?: boolean;
  people?: FilterOption[]
  events?: FilterOption[]
  locations?: FilterOption[]
  photographers?: FilterOption[]
}

export default function SearchFilters({
  withDate = false,
  people = [],
  events = [],
  locations = [],
  photographers = []
}: SearchFiltersProps) {
  const { getParam, setParam, isPending } = useParamFilters();
  const withAccordion = people.length > 0 || events.length > 0 || locations.length > 0 || photographers.length > 0;
  
  return (
    <div className="relative">
      {withDate && (() => {
        const date = getParam("date");
        const calendarValue = typeof date === "number" ? date : undefined;

        return (
          <Calendar
            value={Number.isFinite(calendarValue) ? calendarValue : undefined}
            onSelect={(datetime) => {
              setParam("date", datetime);
            }} />
        );
      })()}
      {withAccordion && (
        <div className="mt-4">
          <Accordion
            items={[
              {
                title: "People",
                content: (
                  <SearchFilterItems
                    filterOptions={people}
                    paramName="person"
                    onSelect={setParam} />
                ),
                disabled: people.length === 0
              },
              {
                title: "Events",
                content: (
                  <SearchFilterItems
                    filterOptions={events}
                    paramName="event"
                    onSelect={setParam} />
                ),
                disabled: events.length === 0
              },
              {
                title: "Locations",
                content: (
                  <SearchFilterItems
                    filterOptions={locations}
                    paramName="location"
                    onSelect={setParam} />
                ),
                disabled: locations.length === 0
              },
              {
                title: "Photographers",
                content: (
                  <SearchFilterItems
                    filterOptions={photographers}
                    paramName="photographer"
                    onSelect={setParam} />
                ),
                disabled: photographers.length === 0
              },
            ]}  />
        </div>
      )}
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

interface SearchFilterListProps {
  filterOptions: FilterOption[];
  paramName: string;
  onSelect: (paramName: string, id: string) => void;
}

const normalizeFilterText = (text: string) => (
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase()
);

const filterOptionsLimit = 5;

function SearchFilterItems({
  filterOptions,
  paramName,
  onSelect
}: SearchFilterListProps) {
  const [filterString, setFilterString] = useState("");
  const [expanded, setExpanded] = useState(false);
  const normalizedFilterString = normalizeFilterText(filterString.trim());
  const filteredOptions = useMemo(() => {
    if (!normalizedFilterString) return filterOptions;

    return filterOptions.filter((filterOption) => (
      normalizeFilterText(filterOption.name).includes(normalizedFilterString)
    ));
  }, [filterOptions, normalizedFilterString]);
  const canToggleOptions = filteredOptions.length > filterOptionsLimit;
  const visibleOptions = expanded
    ? filteredOptions
    : filteredOptions.slice(0, filterOptionsLimit);

  return (
    <>
      <input
        type="search"
        placeholder={`Filter ${paramName}`}
        className="mb-4 h-10 w-full rounded border border-foreground/15 px-4 text-sm tracking-wider text-foreground font-liberation-sans outline-brand-blue"
        autoComplete="off"
        value={filterString}
        onChange={(e) => setFilterString(e.target.value)}
      />
      <ul className="flex flex-col gap-1">
        {visibleOptions.map((filterOption) => (
          <li key={filterOption.id}>
            <button
              type="button"
              className="inline text-left cursor-pointer px-1 hover:text-brand-blue"
              onClick={() => {
                if (filterString) setFilterString("");
                onSelect(paramName, filterOption.id);
              }}>
              {filterOption.name}
            </button>
          </li>
        ))}
      </ul>
      {canToggleOptions && (
        <button
          type="button"
          className="mt-2 bg-foreground/5 w-8 inline-flex h-8 cursor-pointer items-center justify-center rounded-sm text-xs text-foreground/80 transition-colors duration-100 ease-linear hover:text-brand-blue focus-visible:text-brand-blue focus-visible:outline-none"
          aria-label={expanded ? `Show fewer ${paramName} filters` : `Show all ${paramName} filters`}
          aria-expanded={expanded}
          onClick={() => setExpanded((currentExpanded) => !currentExpanded)}>
          <FontAwesomeIcon icon={expanded ? faMinus : faPlus} />
        </button>
      )}
      {filteredOptions.length === 0 && (
        <p className="py-2 text-sm text-foreground/60">
          No results
        </p>
      )}
    </>
  );
}
