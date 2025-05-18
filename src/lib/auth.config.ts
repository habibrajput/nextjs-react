import { NextAuthConfig } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import { BackEndUrl } from './constants';
import { use } from 'react';

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
      async authorize(credentials) {
        const user = {
          email: credentials?.email as string,
          password: credentials?.password as string
        };

        const res = await fetch(BackEndUrl + "/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: user.email,
            password: user.password
          })
        });
        
        const getUser = await res.json()

        if (getUser) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    })
  ],
  pages: {
    signIn: '/' //sigin page
  },
  callbacks:{
    async jwt({token,user}){
      if (user){

      }
    }
  }
} satisfies NextAuthConfig;

export default authConfig;
// https://www.youtube.com/watch?v=Jrolu1_G9FI
https://youtu.be/khNwrFJ-Xqs?t=3233