import type { NextRequest } from "next/server";
import { searchImages } from "@/lib/pmc-api/images";
import { pmcErrorResponse, pmcJsonResponse } from "@/lib/pmc-api/common/route";

export async function GET(request: NextRequest) {
  try {
    const response = await searchImages(
      Object.fromEntries(request.nextUrl.searchParams),
    );

    return pmcJsonResponse(response);
  }
  catch (error) {
    return pmcErrorResponse(error);
  }
}
