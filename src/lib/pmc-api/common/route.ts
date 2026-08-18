import { NextResponse } from "next/server";
import { PmcApiError } from "./client";

export function pmcJsonResponse<TData>(data: TData) {
  return NextResponse.json(data);
}

export function pmcErrorResponse(error: unknown) {
  if (error instanceof PmcApiError) {
    return NextResponse.json(
      {
        error: error.message,
        payload: error.payload,
      },
      { status: error.statusCode ?? 500 },
    );
  }

  return NextResponse.json(
    { error: "Unexpected PMC API error." },
    { status: 500 },
  );
}
