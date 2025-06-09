'use client';

import * as React from 'react';

import type { DataTableRowAction } from '@/types/data-table';
import { DataTable } from '@/components/data-table/data-table';
import { useDataTable } from '@/hooks/use-data-table';
import { getContactsTableColumns } from '@/features/contacts/_components/contacts-table-columns';
import { DataTableToolbar } from '@/components/ui/table/data-table-toolbar';
import { DataTableSortList } from '@/components/data-table/data-table-sort-list';
import { DataTableAdvancedToolbar } from '@/components/data-table/data-table-advanced-toolbar';
import { DataTableFilterList } from '@/components/data-table/data-table-filter-list';
import { DataTableFilterMenu } from '@/components/data-table/data-table-filter-menu';
import type { Contact } from '@/features/contacts/_types/types';
import { useFeatureFlags } from '../feature-flags-provider';
import { ContactsTableActionBar } from '../contact-table-action-bar';
import { useContacts } from '../../_hooks/use-contacts';
import { useSearchParams } from 'next/navigation';
import { useGroups } from '../../_hooks/use-groups';

interface Group {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  creatorId: number;
}

interface GroupResponse {
  _metaData: {
    statusCode: number;
    message: string;
  };
  data: Group[];
}

export function ContactsTable() {
  const searchParamsClient = useSearchParams().toString();
  const { data: getContacts, isFetching } = useContacts(searchParamsClient);
  const { data: getGroups } = useGroups<GroupResponse>();
  const { enableAdvancedFilter, filterFlag } = useFeatureFlags();
  
  const contacts = getContacts?.data?.items ?? [];
  const pageCount = getContacts?.data?.meta?.totalPages ?? 1
  const groupOptions = getGroups?.data ?? []

  const [rowAction, setRowAction] = React.useState<DataTableRowAction<Contact> | null>(null);
  const columns = React.useMemo(
    () =>
      getContactsTableColumns({
        setRowAction,
        groupOptions
      }),
    []
  );

  const { table, shallow, debounceMs, throttleMs } = useDataTable({
    data: contacts,
    columns,
    pageCount,
    enableAdvancedFilter,
    shallow: false,
    clearOnDefault: true,
    getRowId: (originalRow) => originalRow.id,
    initialState: {
      sorting: [{ id: 'createdAt', desc: true }],
      columnPinning: { right: ['actions'] }
    }
  });

  return (
    <>
      <DataTable
        table={table}
        isLoading={isFetching}
        actionBar={<ContactsTableActionBar table={table}
        />
        }
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
