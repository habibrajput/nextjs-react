import NextAuth from 'next-auth';
import authConfig from '@/lib/auth.config';

const { auth } = NextAuth(authConfig);

export default auth(async () => {

  // const url = req.url.replace(req.nextUrl.pathname, '/');
  // return Response.redirect(url);
});

export const config = { matcher: ['/dashboard/:path*'] };
