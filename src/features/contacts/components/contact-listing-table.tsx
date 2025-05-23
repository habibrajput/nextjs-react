'use client';

import { useContacts } from '../hooks/use-contacts';
import { ProductTable } from './product-tables';
import { columns } from './product-tables/columns';

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