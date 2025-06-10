import { SearchParams } from "nuqs";

export type QueryParams = {
    page?: number;
    perPage?: number;
}

export interface GetContactsTableColumnsProps {
    groupOptions: { id: number; name: string }[];
    setRowAction: React.Dispatch<
        React.SetStateAction<DataTableRowAction<Contact> | null>
    >;
}

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

export type PageProps = {
    searchParams: Promise<SearchParams>;
};

export type CreateContactFormProps = {
    onCancel: () => void;
    onSuccess: () => void;
  };