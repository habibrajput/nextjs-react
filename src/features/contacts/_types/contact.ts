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
  status: "active" | "inactive" | "archived";
  priority: "low" | "medium" | "high";
  tags: string[];
};

export type Group = {
  id: number;
  name: string;
};