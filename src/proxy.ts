import { NextResponse, type NextRequest } from "next/server";

const allowedSearchParamsByPathname: Record<string, Set<string>> = {
  "/events": new Set([
    "date",
    "p",
    "q",
    "event",
    "location",
    "person",
    "photographer",
  ]),
  "/photos": new Set([
    "p",
    "q",
    "event",
    "location",
    "person",
    "photographer",
  ]),
};

export function proxy(request: NextRequest) {
  const allowedSearchParams = allowedSearchParamsByPathname[request.nextUrl.pathname] ?? new Set();

  const url = request.nextUrl.clone();
  let hasUnknownSearchParams = false;

  Array.from(url.searchParams.keys()).forEach((key) => {
    if (!allowedSearchParams.has(key)) {
      url.searchParams.delete(key);
      hasUnknownSearchParams = true;
    }
  });

  if (hasUnknownSearchParams) {
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\..*).*)",
  ],
};
