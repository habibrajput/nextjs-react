import CredentialProvider from 'next-auth/providers/credentials';
import { NextAuthConfig } from 'next-auth';
import { attemptLogin } from '@/hooks/auth/use-auth';

const authConfig = {
  providers: [
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
          console.error('Login error:', error);
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
    // async jwt( token, user ) {
    //   return { ...token, ...user };
    // },
    // async session({ session, token }: { session: any; token: any; user: any }) {
    //   session.user = token as any;
    //   return session;
    // }
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