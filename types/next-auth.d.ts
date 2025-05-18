declare module 'next-auth' {
  declare module 'next-auth' {
    //For JWT
    interface User extends DefaultUser {
      id:number;
      firstName?: string;
      lastName?: string;
      token?: string;
      refreshToken?: string;
      roles: [];
    }

    interface Session {
      user: {
        id:number;
        firstName?: string;
        lastName?: string;
        token?: string;
        refreshToken?: string;
        roles: [];
      } & DefaultSession['user'];
    }
  }
}

interface CredentialsInputs {
  email: string;
  password: string;
}
