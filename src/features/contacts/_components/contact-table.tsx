'use client';

import type { DataTableRowAction } from '@/types/data-table';
import * as React from 'react';
import { use } from 'react';

import { DataTable } from '@/components/data-table/data-table';
import { useDataTable } from '@/hooks/use-data-table';
import { ContactsTableActionBar } from './contact-table-action-bar';
import { Contact } from '@/features/contacts/_types/contact';
import { getContactsTableColumns } from '@/features/contacts/_components/contacts-table-columns';
import { useGroups } from '@/features/contacts/_hooks/use-groups';
import { DataTableToolbar } from '@/components/ui/table/data-table-toolbar';
import { DataTableSortList } from '@/components/data-table/data-table-sort-list';
import { useFeatureFlags } from './feature-flags-provider';
import { DataTableAdvancedToolbar } from '@/components/data-table/data-table-advanced-toolbar';
import { DataTableFilterList } from '@/components/data-table/data-table-filter-list';
import { DataTableFilterMenu } from '@/components/data-table/data-table-filter-menu';

export function ContactsTable({ promises }: any) {
  const { enableAdvancedFilter, filterFlag } = useFeatureFlags();
  const { data: groupsData = [] } = useGroups();

  const typedGroupsData = (
    Array.isArray((groupsData as any)?.data)
      ? (groupsData as { data: Array<{ id: number; name: string }> }).data
      : []
  ) as Array<{ id: number; name: string }>;

  const groupOptions = typedGroupsData.map((group) => ({
    id: group.id,
    name: group.name
  }));

  const [contacts, groups] = use(promises);
  const [rowAction, setRowAction] =
    React.useState<DataTableRowAction<Contact> | null>(null);

  const columns = React.useMemo(
    () =>
      getContactsTableColumns({
        groupOptions,
        setRowAction
      }),
    []
  );

  const pageCount = contacts.data.meta.totalPages;
  const { table, shallow, debounceMs, throttleMs } = useDataTable({
    data: contacts.data.items,
    columns,
    pageCount,
    enableAdvancedFilter,

    initialState: {
      sorting: [{ id: 'createdAt', desc: true }],
      columnPinning: { right: ['actions'] }
    },
    getRowId: (originalRow) => originalRow.id,
    shallow: false,
    clearOnDefault: true
  });

  return (
    <>
      <DataTable
        table={table}
        actionBar={<ContactsTableActionBar table={table} />}
      >
        {enableAdvancedFilter ? (
          <DataTableAdvancedToolbar table={table}>
            <DataTableSortList table={table} align='start' />
            {filterFlag === 'advancedFilters' ? (
              <DataTableFilterList
                table={table}
                shallow={shallow}
                debounceMs={debounceMs}
                throttleMs={throttleMs}
                align='start'
              />
            ) : (
              <DataTableFilterMenu
                table={table}
                shallow={shallow}
                debounceMs={debounceMs}
                throttleMs={throttleMs}
              />
            )}
          </DataTableAdvancedToolbar>
        ) : (
          <DataTableToolbar table={table}>
            <DataTableSortList table={table} align='end' />
          </DataTableToolbar>
        )}
      </DataTable>
    </>
  );
}
