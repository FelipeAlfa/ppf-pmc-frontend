"use client";

import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import Autocomplete from '../Autocomplete/Autocomplete';
import { createFetchMock } from '@/utils.dev';
import ComboBox from '../ComboBox/ComboBox';
import Container from '../Container/Container';

const fetchOptions = createFetchMock(1000, [
  {label: "Linkin park", group: "Men band", data: ""},
  {label: "Limp Bizkit", group: "Men band", data: ""},
  {label: "Slipknot", group: "Men band", data: ""},
  {label: "Evanescence", group: "Women band", data: ""},
  {label: "System of a Down", group: "Men band", data: ""},
  {label: "Rammstein", group: "Men band", data: ""},
  {label: "Avril Lavigne", group: "Women band", data: ""},
  {label: "Nirvana", data: ""},
]);

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const [searchType, setSearchType] = useState("photos");
  const [optionsPromise, setOptionsPromise] = useState<
    ReturnType<typeof fetchOptions> | null
  >();

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      if (searchValue.length >= 2) {
        setOptionsPromise(fetchOptions(searchValue));
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
    console.log('submit', {searchValue});
  };

  return (
    <div className="overflow-visible bg-(--search-bar-color,#EEEEEE) p-4 sm:px-8">
      <Container>
        <form className="flex flex-col gap-4 sm:flex-row sm:flex-wrap md:flex-nowrap" onSubmit={onSubmitEvent}>
          <div className="grow">
            <Autocomplete
              label="Search by name, event, location or photographer"
              value={searchValue}
              onChange={setSearchValue}
              options={optionsPromise}
              onSelect={(selectedOption) => setSearchValue(selectedOption.label)} />
          </div>
          <div>
            <ComboBox
              value={searchType}
              onChange={setSearchType}
              options={[
                {label: "Photos", value: "photos"},
                {label: "Events", value: "events"},
              ]}/>
          </div>
          <div className="w-full md:w-auto">
            <Button variant="primary" type="submit" className="block w-full">
              Search
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
}
