import { CredentialsSignin } from '@auth/core/errors';

export class InvalidLoginError extends CredentialsSignin {
  code = 'Invalid identifier or password';
}
