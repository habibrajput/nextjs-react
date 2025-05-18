import { NextAuthConfig } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import { BASE_URL } from './constants';
import GithubProvider from 'next-auth/providers/github';
import { CredentialsSignin } from '@auth/core/errors';

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
        throw new InvalidLoginError();
        try {
          const res = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
          });

          if (!res.ok && res.status === 401) {
            // Login failed
            return null;
          }

          const user = await res.json();

          // Validate the returned user object
          if (user && user.id) {
            return user;
          }

          return null;
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      }
    })
  ],
  logger: {
    error() {},
    warn() {},
    debug() {}
  },
  pages: {
    signIn: '/' //sigin page
  },
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.roles = user.roles;
      }
      return token;
    },
    async session({ token, session }: { token: any; session: any }) {
      session.user = {
        id: token.id,
        email: token.email,
        firstName: token.firstName,
        lastName: token.lastName,
        roles: token.roles
      };
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