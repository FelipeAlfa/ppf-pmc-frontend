import type { NextRequest } from "next/server";
import { getCart } from "@/lib/pmc-api/cart";
import { pmcErrorResponse, pmcJsonResponse } from "@/lib/pmc-api/route";

export async function GET(request: NextRequest) {
  try {
    const response = await getCart(
      Object.fromEntries(request.nextUrl.searchParams),
    );

    return pmcJsonResponse(response);
  }
  catch (error) {
    return pmcErrorResponse(error);
  }
}
