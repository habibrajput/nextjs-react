import { cookies } from 'next/headers';

export const getAccessToken = () => {
  const token = cookies().get('access_token')?.value;
  return token ? `Bearer ${token}` : '';
};
