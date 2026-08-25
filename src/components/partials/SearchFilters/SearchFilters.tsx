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
  people,
  events,
  locations,
  photographers
}: SearchFiltersProps) {
  const {
    addParamValue,
    getParam,
    isPending,
    removeParamValue,
    setParam,
  } = useParamFilters();
  const accordionItems = useMemo(() => {
    const items: [
      title: string,
      param: string,
      options: FilterOption[],
    ][] = [];

    if (!!people) {
      items.push(["People", "person", people]);
    }
    if (!!events) {
      items.push(["Events", "event", events]);
    }
    if (!!locations) {
      items.push(["Locations", "location", locations]);
    }
    if (!!photographers) {
      items.push(["Photographers", "photographer", photographers]);
    }

    return items;
  }, [people, events, locations, photographers]);
  
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
      {!!accordionItems.length && (
        <div className="mt-4">
          <Accordion
            defaultOpenItems={withDate ? undefined : [0]}
            items={accordionItems.map(([title, param, options]) => ({
              title,
              content: (
                <SearchFilterItems
                  filterOptions={options}
                  paramName={param}
                  selectedValues={getParamValues(getParam(param))}
                  onAdd={addParamValue}
                  onRemove={removeParamValue} />
              ),
              disabled: options.length === 0
            }))}
          />
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
  selectedValues: string[];
  onAdd: (paramName: string, id: string) => void;
  onRemove: (paramName: string, id: string) => void;
}

const normalizeFilterText = (text: string) => (
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase()
);

const filterOptionsLimit = 5;

const getParamValues = (value: unknown) => {
  if (Array.isArray(value)) {
    return value.map(String);
  }

  if (value === undefined) {
    return [];
  }

  return [String(value)];
};

function SearchFilterItems({
  filterOptions,
  paramName,
  selectedValues,
  onAdd,
  onRemove
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
        {visibleOptions.map((filterOption) => {
          const selected = selectedValues.includes(filterOption.id);

          return (
            <li key={filterOption.id}>
              <button
                type="button"
                aria-pressed={selected}
                className={`inline-flex cursor-pointer items-center gap-1 px-1 text-left hover:text-brand-blue ${selected ? "opacity-25" : ""}`.trim()}
                onClick={() => {
                  if (filterString) setFilterString("");

                  if (selected) {
                    onRemove(paramName, filterOption.id);
                  }
                  else {
                    onAdd(paramName, filterOption.id);
                  }
                }}>
                {filterOption.name}
              </button>
            </li>
          );
        })}
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
