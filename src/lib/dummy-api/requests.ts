import { createDummyRequest_ } from "./utils_old";
import { createDummyRequest } from "./utils";
import {
  dummyAutocompleteResultList,
  dummyEventResultList,
  dummyPhotoResultList,
  dummySeachFilterEventList,
  dummySeachFilterLocationList,
  dummySeachFilterPersonList,
  dummySeachFilterPhotographerList,
  dummySlideList,
  servicesDummyData
} from "./lists";
import { EVENT_RESULTS_LIMIT, PHOTO_RESULTS_LIMIT } from "@/constants";
import { SearchParamsState } from "../searchParamsState";

export const dummyGetSlideshow = createDummyRequest(dummySlideList);

export const dummyGetAutocompleteResults = createDummyRequest(dummyAutocompleteResultList);

export const dummyGetServices = createDummyRequest(servicesDummyData);

export const dummyGetEventResults = createDummyRequest(({
  page
}: Partial<SearchParamsState> = {}) => {
  const currentPage = asPage(page);
  const pageOffset = ((EVENT_RESULTS_LIMIT ?? 0) * (currentPage - 1));

  return {
    events: dummyEventResultList(EVENT_RESULTS_LIMIT).map((eventResult, index) => ({
      ...eventResult,
      id: `id-event-${pageOffset + index + 1}`,
      name: `Event Name ${pageOffset + index + 1}`,
      location: `Event Location ${pageOffset + index + 1}`,
      link: `/events/${pageOffset + index + 1}`,
    })),
    totalPages: 19,
    totalRecords: 125,
    currentPage,
  };
});

export const dummyGetPhotoResults = createDummyRequest(({
  page
}: Partial<SearchParamsState> = {}) => {
  const currentPage = asPage(page);
  const pageOffset = ((PHOTO_RESULTS_LIMIT ?? 0) * (currentPage - 1));

  return {
    photos: dummyPhotoResultList(PHOTO_RESULTS_LIMIT).map((photoResult, index) => ({
      ...photoResult,
      code: photoResult.code + pageOffset,
      name: photoResult.name,
      eventName: `Event Name ${pageOffset + index + 1}`,
      locationName: `Event Location ${pageOffset + index + 1}`,
      link: `/photos/${photoResult.code + pageOffset}`,
    })),
    totalPages: 19,
    totalRecords: 125,
    currentPage
  };
});

export const dummyGetFilters = createDummyRequest(({
  people, events, locations, photographers
}: Partial<SearchParamsState> = {}) => {
  const dummyLimit = 25;

  return {
    people: people ? dummySeachFilterPersonList(dummyLimit) : undefined,
    events: events ? dummySeachFilterEventList(dummyLimit) : undefined,
    locations: locations ? dummySeachFilterLocationList(dummyLimit) : undefined,
    photographers: photographers ? dummySeachFilterPhotographerList(dummyLimit) : undefined,
  };
});

export const dummyGetEventInfo = createDummyRequest_(({ id }) => {
  if (!id) return null;

  const [, , count] = String(id).split("-");

  return {
    id: id,
    name: `Event Name ${count}`,
    date: new Date(2022, 1, 1).getTime(),
    location: `Event ${count} Location`,
  };
});

function asPage(
  data: string | string[] | number | boolean | null | undefined,
) {
  const page = Number(Array.isArray(data) ? data[0] : data);

  return Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
}
