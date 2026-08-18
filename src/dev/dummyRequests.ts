import { EventResults } from "@/types";
import { dummyEventResultList } from "./dummyData";
import { createDummyRequest } from "./dummyDataUtils";

export const dummyGetEventList = createDummyRequest(
  (params) => {
    const result: EventResults = {
      events: dummyEventResultList(10),
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
