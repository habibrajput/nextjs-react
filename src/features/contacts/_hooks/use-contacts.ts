'use client';

import { useQuery } from '@tanstack/react-query';
import { commonApiServices } from '@/services/commonApiServices';

const fetchContacts = async (queryParm: string) => {
  return await commonApiServices.get(`/contacts?${queryParm}`);
};

function useContacts(searchParams: string) {
  return useQuery({
    queryKey: ['contacts', searchParams],
    queryFn: () => fetchContacts(searchParams),
    // staleTime: 0,
    // cacheTime: 0,
    // refetchOnWindowFocus: true,
    // refetchOnMount: true,
  });
}

export { useContacts, fetchContacts };
