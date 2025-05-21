'use client';

import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';

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
  authToken: string | null
): Promise<Array<Contact>> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const rawResponse = await fetch(`${baseUrl}/contacts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    }
  });

  if (!rawResponse.ok) {
    const errorBody = await rawResponse.text();
    throw new Error(`Request failed: ${rawResponse.status} - ${errorBody}`);
  }

  return await rawResponse.json();
};

const useContacts = () => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ['posts'],
    queryFn: () => fetchContacts(session?.user?.token ?? ''),
    suspense: true,
  });
};

export { useContacts, fetchContacts };
