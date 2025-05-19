declare module 'next-auth' {
  export interface UserObject {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    roles: [];
  }

  export interface BackendAccessJWT {
    token: string;
  }

  export interface BackendJWT extends BackendAccessJWT {
    refreshToken: string;
  }

  export interface DecodedJWT extends UserObject {
    token_type: 'refresh' | 'access';
    exp: number;
    iat: number;
    jti: string;
  }

  export interface User {
    tokens: BackendJWT;
    user: UserObject;
    validity: AuthValidity;
  }

  export interface AuthValidity {
    validUntil: number;
    refreshUntil: number;
  }

  export interface Session {
    user: UserObject;
    validity: AuthValidity;
    error: 'RefreshTokenExpired' | 'RefreshAccessTokenError';
  }

  //For JWT
  interface User extends DefaultUser {
    id: number;
    firstName?: string;
    lastName?: string;
    token?: string;
    refreshToken?: string;
    roles: [];
  }

  interface Session {
    user: {
      id: number;
      firstName?: string;
      lastName?: string;
      token?: string;
      refreshToken?: string;
      roles: [];
    } & DefaultSession['user'];
  }
}

interface CredentialsInputs {
  email: string;
  password: string;
}

declare module 'next-auth/jwt' {
  export interface JWT {
    data: User;
    error: 'RefreshTokenExpired' | 'RefreshAccessTokenError';
  }
}
