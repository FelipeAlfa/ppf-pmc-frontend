import { createDummyRequest, asLimit } from "./dummyUtils";
import {
  dummyAutocompleteResultList,
  dummyEventResultList,
  dummyPhotoResultList,
  dummySeachFilterEventList,
  dummySeachFilterLocationList,
  dummySeachFilterPersonList,
  dummySeachFilterPhotographerList,
  dummySlideList
} from "./dummyData";

export const dummyGetSlideshow = createDummyRequest(dummySlideList);

export const dummyGetAutocompleteResults = createDummyRequest(dummyAutocompleteResultList);

export const dummyGetEventResults = createDummyRequest(({ limit }) => ({
  events: dummyEventResultList(limit),
  totalPages: 19,
  totalRecords: 125,
  currentPage: 1,
}));

export const dummyGetPhotoResults = createDummyRequest(({ limit }) => ({
  photos: dummyPhotoResultList(limit),
  totalPages: 19,
  totalRecords: 125,
  currentPage: 1
}));

export const dummyGetFilters = createDummyRequest(({
  limit,
  people,
  events,
  locations,
  photographers
}) => {
  const limits = {
    people: asLimit(people, limit),
    events: asLimit(events, limit),
    locations: asLimit(locations, limit),
    photographers: asLimit(photographers, limit),
  };

  return {
    people: limits.people > 0 ? dummySeachFilterPersonList(limits.people) : undefined,
    events: limits.events > 0 ? dummySeachFilterEventList(limits.events) : undefined,
    locations: limits.locations > 0 ? dummySeachFilterLocationList(limits.locations) : undefined,
    photographers: limits.photographers > 0 ? dummySeachFilterPhotographerList(limits.photographers) : undefined,
  };
});

export const dummyGetEvent = createDummyRequest(({ id }) => {
  if (!id) return null;

  const [, , count] = String(id).split("-");

  return {
    id: id,
    name: `Event Name ${count}`,
    date: new Date(2022, 1, 1).getTime(),
    location: `Event ${count} Location`,
  };
});
