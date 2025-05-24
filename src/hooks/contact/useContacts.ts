'use client';

import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { apiServices } from '@/services/apiServices';

export type Contact = {
  id: number;
  creatorId: number;
  firstName: string;
  lastName: string;
  email: string;
  smsPhoneNumber: string;
  whatsAppPhoneNumber: string;
  company: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  creator: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  groups: {
    id: number;
    name: string;
  };
};

const fetchContacts = async (
  authToken: string
) => {
  return await apiServices.get('/contacts', authToken);
};

const useContacts = () => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ['contacts'],
    queryFn: () => fetchContacts(session?.user?.token ?? ''),
    suspense: true,
  });
};

export { useContacts, fetchContacts };
