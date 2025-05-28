import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from '@/lib/auth';

const PUBLIC_ROUTES = ["/", "/signin"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  const session = await auth();

  if (!session && !isPublicRoute) {
    const redirectUrl = new URL("/signin", request.url);
    redirectUrl.searchParams.set("callbackUrl", request.url); 
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"], 
};
