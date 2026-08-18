import type { NextRequest } from "next/server";
import { searchEvents } from "@/lib/pmc-api/events";
import { pmcErrorResponse, pmcJsonResponse } from "@/lib/pmc-api/route";

export async function GET(request: NextRequest) {
  try {
    const response = await searchEvents(
      Object.fromEntries(request.nextUrl.searchParams),
    );

    return pmcJsonResponse(response);
  }
  catch (error) {
    return pmcErrorResponse(error);
  }
}
