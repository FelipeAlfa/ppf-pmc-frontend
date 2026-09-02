import type { NextRequest } from "next/server";
import { dummyGetEventResults, dummyGetPhotoResults } from "@/lib/dummy-api/requests";
import { readSearchParamsState } from "@/lib/searchParamsState";

export async function GET(request: NextRequest) {
  const type = request.nextUrl.searchParams.get("type");
  const page = Number(request.nextUrl.searchParams.get("page"));
  const searchParamsState = readSearchParamsState(request.nextUrl.searchParams);

  if (type === "events") {
    const results = await dummyGetEventResults({
      ...searchParamsState,
      page: Number.isFinite(page) ? page : searchParamsState.page,
    });

    return Response.json(results);
  }

  if (type === "photos") {
    const results = await dummyGetPhotoResults({
      ...searchParamsState,
      page: Number.isFinite(page) ? page : searchParamsState.page,
    });

    return Response.json(results);
  }

  return Response.json({
    message: "Invalid results type",
  }, { status: 400 });
}
