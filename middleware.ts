import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

type Middleware = (request: NextRequest) => NextResponse;

export const WHITE_LIST = ["/login", "/signup"];

const redirectIfAuthenticated: Middleware = (request) => {
  const authSession = request.cookies.get("passcode");

  if (authSession) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  request.cookies.delete("passcode");
  return NextResponse.next();
};

const authenticated: Middleware = (request) => {
  const authSession = request.cookies?.get("passcode")?.value;

  if (!authSession) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.set({
      name: "redirect",
      value: request.url,
    });
    return response;
  }

  return NextResponse.next();
};

export default function middleware(request: NextRequest) {
  if (WHITE_LIST.includes(request.nextUrl.pathname)) {
    return redirectIfAuthenticated(request);
  }

  if (!WHITE_LIST.includes(request.nextUrl.pathname)) {
    return authenticated(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};
