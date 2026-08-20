import { EventResults } from "@/types";
import { createDummyRequest } from "./dummyDataUtils";
import {
  dummyAutocompleteResultList,
  dummyEventResultList,
  dummySlideList
} from "./dummyData";

interface DummyGetEventResultsParams extends Record<string, unknown> {
  limit: number;
  p?: number;
}

export const dummyGetEventResults = createDummyRequest<EventResults, DummyGetEventResultsParams>(
  (params) => {
    const limit = Math.max(1, params.limit);
    const totalRecords = 100;
    const totalPages = Math.max(1, Math.ceil(totalRecords / limit));
    const currentPage = Math.min(
      Math.max(1, Math.floor(params.p ?? 1)),
      totalPages,
    );
    const result: EventResults = {
      events: dummyEventResultList(limit),
      totalPages,
      totalRecords,
      currentPage,
    };

    return result;
  },
  {
    limit: 4
  }
);

export const dummyGetSlideshow = createDummyRequest(dummySlideList(25));

export const dummyGetAutocompleteResults = createDummyRequest(dummyAutocompleteResultList(10));

export const dummyGetFilters = createDummyRequest({
  events: [
    {id: 'e-1', name: "Event 1"},
    {id: 'e-2', name: "Event 2"},
    {id: 'e-3', name: "Event 3"},
    {id: 'e-4', name: "Event 4"},
  ],
  people: [
    {id: 'p-1', name: "Person 1"},
    {id: 'p-2', name: "Person 2"},
    {id: 'p-3', name: "Person 3"},
    {id: 'p-4', name: "Person 4"},
  ],
  locations: [
    {id: 'l-1', name: "Location 1"},
    {id: 'l-2', name: "Location 2"},
    {id: 'l-3', name: "Location 3"},
    {id: 'l-4', name: "Location 4"},
  ],
  photographers: [
    {id: 'ph-1', name: "Photographer 1"},
    {id: 'ph-2', name: "Photographer 2"},
    {id: 'ph-3', name: "Photographer 3"},
    {id: 'ph-4', name: "Photographer 4"},
  ],
});

export const dummyGetParamFilterDetails = createDummyRequest({
  events: [
    {id: 'e-1', name: "Event 1"},
    {id: 'e-2', name: "Event 2"},
    {id: 'e-3', name: "Event 3"},
    {id: 'e-4', name: "Event 4"},
  ],
  people: [
    {id: 'p-1', name: "Person 1"},
    {id: 'p-2', name: "Person 2"},
    {id: 'p-3', name: "Person 3"},
    {id: 'p-4', name: "Person 4"},
  ],
  locations: [
    {id: 'l-1', name: "Location 1"},
    {id: 'l-2', name: "Location 2"},
    {id: 'l-3', name: "Location 3"},
    {id: 'l-4', name: "Location 4"},
  ],
  photographers: [
    {id: 'ph-1', name: "Photographer 1"},
    {id: 'ph-2', name: "Photographer 2"},
    {id: 'ph-3', name: "Photographer 3"},
    {id: 'ph-4', name: "Photographer 4"},
  ],
});

// export const dummyGetAutocompleteResults = createDummyRequest([
//   {label: "Linkin park", group: "Men band", data: {}},
//   {label: "Limp Bizkit", group: "Men band", data: ""},
//   {label: "Slipknot", group: "Men band", data: ""},
//   {label: "Evanescence", group: "Women band", data: ""},
//   {label: "System of a Down", group: "Men band", data: ""},
//   {label: "Rammstein", group: "Men band", data: ""},
//   {label: "Avril Lavigne", group: "Women band", data: ""},
//   {label: "Nirvana", data: ""},
// ]);
