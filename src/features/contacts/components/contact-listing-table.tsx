'use client';

import { ProductTable } from './product-tables';
import { columns } from './product-tables/columns';
import { useContacts } from "@/hooks/contact/useContacts";

export default function ContactTableWrapper() {
    const contacts: any = useContacts();
    return (
        <ProductTable
            data={contacts.data.data.items}
            totalItems={20}
            columns={columns}
        />
    )
}