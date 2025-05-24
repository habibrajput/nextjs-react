'use client';

import { useGroups } from '../hooks/use-groups';
import { ProductTable } from './table';
import { useContacts } from "@/hooks/contact/useContacts";
import { getContactColumns } from './table/columns';

export default function ContactTableWrapper() {
    const contacts: any = useContacts();
    const { data: groupsData = [] } = useGroups();

    const typedGroupsData =
        (Array.isArray((groupsData as any)?.data)
            ? ((groupsData as { data: Array<{ id: number; name: string }> }).data)
            : []) as Array<{ id: number; name: string }>;

    const groupOptions = typedGroupsData.map((group) => ({
        id: group.id,
        name: group.name,
    }));

    const columns = getContactColumns(groupOptions);
    return (
        <ProductTable
            data={contacts.data.data.items}
            totalItems={contacts.data.data.meta.totalItems}
            columns={columns}
        />
    )
}