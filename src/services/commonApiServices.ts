import { auth } from '@/lib/auth';

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
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error?.message || 'API request failed');
    }
    return response.json();
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
    const responseData = await response.json();
    return responseData;
    //return this.handleResponse(response);
  }
}

export const commonApiServices = new CommonApiServices();
