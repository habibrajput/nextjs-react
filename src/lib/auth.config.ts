import { NextAuthConfig } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import { BASE_URL } from './constants';
import GithubProvider from 'next-auth/providers/github';

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
      async authorize(credentials) {
        const user = {
          email: credentials?.email as string,
          password: credentials?.password as string
        };

        // return (
        //   (await fetch(BASE_URL + '/auth/login', {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(user)
        //   })
        //     .then((response) => {
        //       return response;
        //     })
        //     .catch((error) => {
        //       console.log("->>>>>>>authconfg",error);
        //       throw new Error(error.response.data.message);
        //     })) || null
        // );
        try {
          const getUser = await fetch(BASE_URL + '/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
          });

          if (getUser.status !== 401) {
            console.log('->>>if', getUser.status);
            return getUser;
          }
          console.log('->>>else', await getUser.json());
          return null;
        } catch (error) {
          console.log('->>>>>>>authconfg', error);
        }
      }
    })
  ],
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