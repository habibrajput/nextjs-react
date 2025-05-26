"use client";

import type { DataTableRowAction } from "@/types/data-table";
import * as React from "react";

import { DataTable } from "@/components/data-table/data-table";
import { useDataTable } from "@/hooks/use-data-table";
import { ContactsTableActionBar } from "./contact-table-action-bar";
import { useContacts } from "../_hooks/use-contacts";
import { useGroups } from "../_hooks/use-groups";

export function ContactsTable() {
    const { enableAdvancedFilter, filterFlag } = useFeatureFlags();

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

    const [
        { data, pageCount },
        statusCounts,
        priorityCounts,
        estimatedHoursRange,
    ] = React.use(promises);

    const [rowAction, setRowAction] =
        React.useState<DataTableRowAction<Task> | null>(null);

    const columns = React.useMemo(
        () =>
            getContactsTableColumns({
                statusCounts,
                priorityCounts,
                estimatedHoursRange,
                setRowAction,
            }),
        [statusCounts, priorityCounts, estimatedHoursRange],
    );

    const { table, shallow, debounceMs, throttleMs } = useDataTable({
        data,
        columns,
        pageCount,
        enableAdvancedFilter,
        initialState: {
            sorting: [{ id: "createdAt", desc: true }],
            columnPinning: { right: ["actions"] },
        },
        getRowId: (originalRow) => originalRow.id,
        shallow: false,
        clearOnDefault: true,
    });

    return (
        <>
            <DataTable
                table={table}
                actionBar={<ContactsTableActionBar table={table} />}
            >
                {/* {enableAdvancedFilter ? (
                    <DataTableAdvancedToolbar table={table}>
                        <DataTableSortList table={table} align="start" />
                        {filterFlag === "advancedFilters" ? (
                            <DataTableFilterList
                                table={table}
                                shallow={shallow}
                                debounceMs={debounceMs}
                                throttleMs={throttleMs}
                                align="start"
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
                        <DataTableSortList table={table} align="end" />
                    </DataTableToolbar>
                )} */}
            </DataTable>
            {/* <UpdateContactsSheet
                open={rowAction?.variant === "update"}
                onOpenChange={() => setRowAction(null)}
                task={rowAction?.row.original ?? null}
            /> */}
            {/* <DeleteTasksDialog
                open={rowAction?.variant === "delete"}
                onOpenChange={() => setRowAction(null)}
                tasks={rowAction?.row.original ? [rowAction?.row.original] : []}
                showTrigger={false}
                onSuccess={() => rowAction?.row.toggleSelected(false)}
            /> */}
        </>
    );
}

function useFeatureFlags(): { enableAdvancedFilter: any; filterFlag: any; } {
    throw new Error("Function not implemented.");
}
