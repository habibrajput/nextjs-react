'use client';

import type { DataTableRowAction } from '@/types/data-table';
import * as React from 'react';

import { DataTable } from '@/components/data-table/data-table';
import { useDataTable } from '@/hooks/use-data-table';
import { ContactsTableActionBar } from './contact-table-action-bar';
import { useContacts } from '../_hooks/use-contacts';
import { Contact } from '@/features/contacts/_types/contact';
import { getContactsTableColumns } from '@/features/contacts/_components/contacts-table-columns';
import { useGroups } from '@/features/contacts/_hooks/use-groups';
import { DataTableToolbar } from '@/components/ui/table/data-table-toolbar';
import { DataTableSortList } from '@/components/data-table/data-table-sort-list';

export function ContactsTable() {
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

  const { enableAdvancedFilter, filterFlag } = useFeatureFlags();
  // Using the custom hook
  const contacts = useContacts();

  const [rowAction, setRowAction] =
    React.useState<DataTableRowAction<Contact> | null>(null);

  const columns = React.useMemo(
    () =>
      getContactsTableColumns({
        // estimatedHoursRange,
        groupOptions,
        setRowAction
      }),
    []
  );

  const { table, shallow, debounceMs, throttleMs } = useDataTable({
    data: contacts.data.data.items,
    columns,
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
          <DataTableToolbar table={table}>
            <DataTableSortList table={table} align='end' />
          </DataTableToolbar>
        ) : // <DataTableAdvancedToolbar table={table}>
        //   <DataTableSortList table={table} align="start" />
        //   {filterFlag === "advancedFilters" ? (
        //     <DataTableFilterList
        //       table={table}
        //       shallow={shallow}
        //       debounceMs={debounceMs}
        //       throttleMs={throttleMs}
        //       align="start"
        //     />
        //   ) : (
        //     <DataTableFilterMenu
        //       table={table}
        //       shallow={shallow}
        //       debounceMs={debounceMs}
        //       throttleMs={throttleMs}
        //     />
        //   )}
        // </DataTableAdvancedToolbar>
        null}
      </DataTable>
    </>
  );
}

function useFeatureFlags(): {
  enableAdvancedFilter: boolean;
  filterFlag: boolean;
} {
  return {
    enableAdvancedFilter: true, // Toggle advanced filter functionality
    filterFlag: false // Example of another flag
  };
}
