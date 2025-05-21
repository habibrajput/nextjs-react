'use client';

import { ProductTable } from './table';
import { columns } from './table/columns';
import { useContacts } from "@/hooks/contact/useContacts";

export default function ContactTableWrapper() {
    const contacts: any = useContacts();
    return (
        <ProductTable
            data={contacts.data.data.items}
            totalItems={contacts.data.data.meta.totalItems}
            columns={columns}
        />
    )
}