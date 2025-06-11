'use client';

import { useQuery } from '@tanstack/react-query';
import { commonApiServices } from '@/services/commonApiServices';

const fetchContacts = async (queryParm: string) => {
  return await commonApiServices.get(`/contacts?${queryParm}`);
};

function useContacts(searchParams: string) {
  return useQuery({
    queryKey: ['contacts', searchParams],
    queryFn: () => fetchContacts(searchParams)
  });
}

export { useContacts, fetchContacts };
