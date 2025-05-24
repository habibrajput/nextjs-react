import CredentialProvider from 'next-auth/providers/credentials';
import { AuthValidity, CredentialsSignin, DecodedJWT, NextAuthConfig, User, UserObject } from 'next-auth';
import { jwtDecode } from 'jwt-decode';

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

          const token: DecodedJWT = jwtDecode(response.data.token);
          const refreshToken: DecodedJWT = jwtDecode(response.data.refreshToken);

          // Extract the user from the access token
          const user: UserObject = {
            id: response.id,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            email: response.data.email,
            roles: response.data.roles
          };

          // Extract the auth validity from the tokens
          const validity: AuthValidity = {
            validUntil: token.exp,
            refreshUntil: refreshToken.exp
          };

          return {
            id: refreshToken.jti,
            user: user,
            validity: validity
          } as User;
        } catch (error) {
          throw error;
        }
      }
    })
  ],
  logger: {
    error() { }
  },
  pages: {
    signIn: '/signin'
  },
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user, account }: { token: string, user: string, account: string }) {
      // Initial signin contains a 'User' object from authorize method
      if (user && account) {
        console.debug("Initial signin");
        return { ...token, data: user };
      }

      // The current access token is still valid
      if (Date.now() < token.data.validity.valid_until * 1000) {
        console.debug("Access token is still valid");
        return token;
      }

      // The current access token has expired, but the refresh token is still valid
      if (Date.now() < token.data.validity.refresh_until * 1000) {
        console.debug("Access token is being refreshed");
        return await refreshAccessToken(token);
      }

      // The current access token and refresh token have both expired
      // This should not really happen unless you get really unlucky with
      // the timing of the token expiration because the middleware should
      // have caught this case before the callback is called
      // i will con...
      console.debug("Both tokens have expired");
      return { ...token, error: "RefreshTokenExpired" } as JWT;
    },
    async session({ session, token, user }) {
      session.user = token.data.user;
      session.validity = token.data.validity;
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