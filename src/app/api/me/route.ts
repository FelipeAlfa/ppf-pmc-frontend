import { getCurrentUser } from "@/lib/pmc-api/auth";
import { pmcErrorResponse, pmcJsonResponse } from "@/lib/pmc-api/route";

export async function GET() {
  try {
    const response = await getCurrentUser();
    return pmcJsonResponse(response);
  }
  catch (error) {
    return pmcErrorResponse(error);
  }
}
