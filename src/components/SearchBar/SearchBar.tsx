"use client";

import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import Autocomplete from '../Autocomplete/Autocomplete';
import ComboBox from '../ComboBox/ComboBox';
import Container from '../Container/Container';
import {
  dummyGetAutocompleteResults,
} from '@/lib/dummy/dummyRequests';

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const [searchType, setSearchType] = useState("photos");
  const [optionsPromise, setOptionsPromise] = useState<
    ReturnType<typeof dummyGetAutocompleteResults> | null
  >();

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      if (searchValue.length >= 2) {
        setOptionsPromise(dummyGetAutocompleteResults());
      }
      else {
        setOptionsPromise(null);
      }
    }, 500);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [searchValue]);

  const onSubmitEvent = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="overflow-visible bg-(--search-bar-color,#EEEEEE) py-4">
      <Container>
        <form className="flex flex-row flex-wrap gap-2" onSubmit={onSubmitEvent}>
          <div className="w-full md:w-auto md:grow">
            <Autocomplete
              label="Search by name, event, location or photographer"
              value={searchValue}
              onChange={setSearchValue}
              options={optionsPromise}
              onSelect={(selectedOption) => setSearchValue(selectedOption.label)} />
          </div>
          <div className="grow md:grow-0">
            <ComboBox
              value={searchType}
              onChange={setSearchType}
              options={[
                {label: "Photos", value: "photos"},
                {label: "Events", value: "events"},
              ]}/>
          </div>
          <div className="">
            <Button variant="primary" type="submit" className="block w-full">
              Search
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
}
