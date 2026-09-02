"use client";

import { useCallback, useEffect, useState, useTransition } from 'react';
import Button from "@/components/ui/Button/Button";
import Autocomplete from "@/components/ui/Autocomplete/Autocomplete";
import ComboBox from "@/components/ui/ComboBox/ComboBox";
import Container from "@/components/layout/Container/Container";
import {
  dummyGetAutocompleteResults,
} from '@/lib/dummy-api/requests';
import { useRouter } from "next/navigation";
import {
  SearchParamsState,
  writeSearchParamsState,
} from "@/lib/searchParamsState";

type SearchType = "photos" | "events";

interface SearchBarProps {
  initialSearchType?: SearchType;
}

const searchTypeOptions: {label: string, value: SearchType}[] = [
  {label: "Photos", value: "photos"},
  {label: "Events", value: "events"},
];

const isSearchType = (value: string): value is SearchType => (
  searchTypeOptions.some((option) => option.value === value)
);

export default function SearchBar({ initialSearchType = "photos" }: SearchBarProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [searchValue, setSearchValue] = useState("");
  const [searchType, setSearchType] = useState(initialSearchType);
  const [optionsPromise, setOptionsPromise] = useState<
    ReturnType<typeof dummyGetAutocompleteResults> | null
  >();

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      if (searchValue.length >= 2) {
        setOptionsPromise(dummyGetAutocompleteResults(12));
      }
      else {
        setOptionsPromise(null);
      }
    }, 500);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [searchValue]);

  const doSearch = useCallback((params: Partial<SearchParamsState>) => {
    if (isPending) return;
    const url = searchType === "photos" ? "/photos" : "/events";
    const searchParams = writeSearchParamsState(params);
    const queryString = searchParams.toString();
    const href = queryString ? `${url}?${queryString}` : url;

    if (href === `${window.location.pathname}${window.location.search}`) {
      return;
    }

    startTransition(() => {
      router.push(href);
    });
  }, [isPending, router, searchType, startTransition]);

  return (
    <div className="overflow-visible bg-(--search-bar-color,#EEEEEE) py-4">
      <Container>
        <form
          className="flex flex-row flex-wrap gap-2"
          aria-busy={isPending}
          onSubmit={(event) => {
            event.preventDefault();
            doSearch({text: searchValue});
          }}>
          <div className="w-full md:w-auto md:grow">
            <Autocomplete
              label="Search by name, event, location or photographer"
              value={searchValue}
              disabled={isPending}
              onChange={setSearchValue}
              options={optionsPromise}
              onSelect={(selectedOption) => {
                setSearchValue("");
                switch (selectedOption.group) {
                  case "People":
                    doSearch({people: [selectedOption.data.id]});
                    break;
                  case "Events":
                    doSearch({events: [selectedOption.data.id]});
                    break;
                  case "Locations":
                    doSearch({locations: [selectedOption.data.id]});
                    break;
                  case "Photographers":
                    doSearch({photographers: [selectedOption.data.id]});
                    break;
                }
              }} />
          </div>
          <div className="grow md:grow-0">
            <ComboBox
              value={searchType}
              onChange={(value) => {
                if (isSearchType(value)) {
                  setSearchType(value);
                }
              }}
              options={searchTypeOptions}/>
          </div>
          <div className="">
            <Button
              variant="primary"
              type="submit"
              className="block w-full"
              disabled={isPending}>
              Search
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
}
