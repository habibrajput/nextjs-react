import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import router from 'next/router';
import { CatchHttpError } from '@/lib/catch-http-error';

export class CommonApiServices {
  private async isServerComponent() {
    return typeof window === 'undefined';
  }

  private async getToken() {
    if (await this.isServerComponent()) {
      const session = await auth();
      return session.user?.token ?? '';
    } else {
      const { getSession } = await import('next-auth/react');
      const session = await getSession();
      return session?.user?.token ?? '';
    }
  }

  private async handleResponse(response: Response) {
    const responseData = await response.json();
    const { error, statusCode, message } = responseData._metaData;

    if (statusCode === 401) {
      if (await this.isServerComponent()) {
        redirect('/signin');
      }

      await router.push('/signin');
    }

    if (statusCode === 409) {
      throw new CatchHttpError(error, statusCode, message);
    }

    return responseData;
  }

  async get(path: string) {
    const token = await this.getToken();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    );

    return this.handleResponse(response);
  }

  async post<T = any>(path: string, body: any): Promise<T> {
    const token = await this.getToken();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
      }
    );

    return this.handleResponse(response);
  }
}

export const commonApiServices = new CommonApiServices();
