import { EventResults } from "@/types";
import { createDummyRequest } from "./dummyDataUtils";
import {
  dummyEventResultList,
  dummySlideList
} from "./dummyData";

export const dummyGetEventResults = createDummyRequest(
  (params) => {
    const result: EventResults = {
      events: dummyEventResultList(params.limit),
      total: 100,
      page: 1,
      limit: params.limit,
    };

    return result;
  },
  {
    limit: 4
  }
);

export const dummyGetSlideshow = createDummyRequest(dummySlideList(25));

export const dummyGetAutocompleteResults = createDummyRequest([
  {label: "Linkin park", group: "Men band", data: ""},
  {label: "Limp Bizkit", group: "Men band", data: ""},
  {label: "Slipknot", group: "Men band", data: ""},
  {label: "Evanescence", group: "Women band", data: ""},
  {label: "System of a Down", group: "Men band", data: ""},
  {label: "Rammstein", group: "Men band", data: ""},
  {label: "Avril Lavigne", group: "Women band", data: ""},
  {label: "Nirvana", data: ""},
]);
