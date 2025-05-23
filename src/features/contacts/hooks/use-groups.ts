'use client';

import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { apiServices } from '@/services/apiServices';

const fetchGroups = async (
  authToken: string
) => {
  return await apiServices.get('/groups', authToken);
};

const useGroups = () => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ['groups'],
    queryFn: () => fetchGroups(session?.user?.token ?? ''),
    suspense: true,
  });
};

export { useGroups, fetchGroups };
