import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "./app/actions/session";
import { serverStartTime } from "./app/lib/db";

const publicRoutes = ["/", "/login", "/signup"];

export async function proxy(request: NextRequest) {
  const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname);

  const cookie = (await cookies()).get("session")?.value;
  const payload = await decrypt(cookie);

  const isStale = !payload?.createdAt || payload.createdAt as number < serverStartTime;

  if (!isPublicRoute && isStale) {
    const response = NextResponse.redirect(new URL("/login", request.nextUrl));
    response.cookies.delete("session");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};