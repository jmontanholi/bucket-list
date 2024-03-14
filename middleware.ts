import type { NextRequest } from "next/server";
import { getSession } from "@auth0/nextjs-auth0/edge";

export default async function middleware(request: NextRequest) {
  const session = await getSession();
  const currentUser = session?.user;

  if (!currentUser && request.nextUrl.pathname.startsWith("/dashboard")) {
    return Response.redirect(new URL("/", request.url));
  }

  if (currentUser && !request.nextUrl.pathname.startsWith("/dashboard")) {
    return Response.redirect(new URL("/dashboard", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
