'use client';

import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { apiServices } from '@/services/apiServices';

const fetchContacts = async (
  authToken: string
) => {
  return await apiServices.get('/contacts', authToken);
};

const useContacts = () => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ['posts'],
    queryFn: () => fetchContacts(session?.user?.token ?? ''),
    enabled: false,
    suspense: true,
  });
};

export { useContacts, fetchContacts };
