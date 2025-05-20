import CredentialProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import { CredentialsSignin } from '@auth/core/errors';
import { NextAuthConfig } from 'next-auth';

class InvalidLoginError extends CredentialsSignin {
  code = 'Invalid identifier or password';
}

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
        const rawResponse: Response = await fetch(`${process.env.API_BASE_URL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
        });
        const response = await rawResponse.json();

        if (response._metaData.statusCode === 401) {
          throw new InvalidLoginError();
        }

        return response.data;
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
      return { ...token, ...user }
    },
    async session({ session, token, user }: { session: any; token: any; user: any }) {
      session.user = token as any;
      return session;
    },
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