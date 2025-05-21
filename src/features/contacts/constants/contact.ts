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
    group: Group[];
  };

export type Group = {
    id: number;
    name: string;
};