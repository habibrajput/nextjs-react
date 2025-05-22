import CredentialProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import { NextAuthConfig } from 'next-auth';

const authConfig = {
  providers: [
    GithubProvider({}),
    CredentialProvider({
      credentials: {
        email: {
          type: 'email'
        },
        password: {
          type: 'password'
        }
      },
      authorize: async (credentials) => {
        try {
          const rawResponse: Response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(credentials)
            }
          );

          const response = await rawResponse.json();
          return response.data;
        } catch (error) {
          throw error;
        }
      }
    })
  ],
  logger: {
    error() {}
  },
  pages: {
    signIn: '/signin'
  },
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      return { ...token, ...user };
    },
    async session({ session, token }: { session: any; token: any; user: any }) {
      session.user = token as any;
      return session;
    }
  },

  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        maxAge: 60 * 60 * 24
      }
    }
  },

  secret: process.env.AUTH_SECRET
} satisfies NextAuthConfig;

export default authConfig;
// https://www.youtube.com/watch?v=Jrolu1_G9FI
// https://youtu.be/khNwrFJ-Xqs?t=3233