import NextAuth from 'next-auth';
import authConfig from '@/lib/auth.config';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  if (!req.auth) {
    const url = req.url.replace(req.nextUrl.pathname, '/');
    return Response.redirect(url);
  }
});

export const config = { matcher: ['/dashboard/:path*'] };

// import { NextRequest, NextResponse } from 'next/server';
// import { auth } from '@/lib/auth';
//
// export async function middleware(request: NextRequest) {
//   const path = request.nextUrl.pathname;
//   const session = await auth();
//
//   if (!session && path !== '/login') {
//    // return NextResponse.redirect(new URL('/', request.nextUrl).href);
//   }
//
//   return NextResponse.next();
// }
//
// export const config = {
//   matches: ['/', '/login', '/signup']
// };
//
// export default middleware;
