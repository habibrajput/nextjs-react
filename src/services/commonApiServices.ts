import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export class CommonApiServices {
  private async getToken() {
    if (typeof window === 'undefined') {
      const session = await auth();
      return session.user?.token ?? '';
      // return getServerToken();
    } else {
      // const token = useAuthStore.getState().token;
      // return token ? `Bearer ${token}` : '';
    }
  }

  private async handleResponse(response: Response) {
    const responseData = await response.json();
 
    //import { useEffect } from 'react';router.push('/signin'); for client-side navigation
    if (responseData._metaData.statusCode === 401) {
      redirect('/signin');
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
    // const responseData = await response.json();
    return this.handleResponse(response);
  }
}

export const commonApiServices = new CommonApiServices();
