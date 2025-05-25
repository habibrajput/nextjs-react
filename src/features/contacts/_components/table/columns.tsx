// columns.tsx

import { Column, ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { Checkbox } from "@/components/ui/checkbox";
import { CellAction } from './cell-action';
import { Contact } from '../../_types/contact';

export const getContactColumns = (groupOptions: { id: number;name: string;}[]): ColumnDef<Contact>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: 'Id'
  },
  {
    id: 'Full Name',
    header: 'Name',
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    cell: ({ row }) => {
      const { firstName, lastName } = row.original;
      return <span>{firstName} {lastName}</span>;
    },
    enableColumnFilter: true,
  },
  {
    id: 'Groups',
    accessorKey: 'groups',
    header: ({ column }: { column: Column<Contact, unknown> }) => (
      <DataTableColumnHeader column={column} title="Groups" />
    ),
    cell: ({ cell }) => {
      const groups = cell.getValue<Contact['group']>();
      if (!Array.isArray(groups)) return null;

      return (
        <div className="flex flex-wrap gap-1">
          {groups.map((group) => (
            <div className='flex flex-nowrap' key={group.id}>
              <span className="px-2 py-1 text-xs bg-gray-200 rounded-md text-gray-800">
                {group.name}
              </span>
            </div>
          ))}
        </div>
      );
    },
    enableColumnFilter: true,
    meta: {
      label: 'Groups',
      variant: 'multiSelect',
      options: groupOptions.map(group => ({
        label: group.name,
        value: group.name
      })),
    },
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: "smsPhoneNumber",
    header: 'SMS Phone'
  },
  {
    accessorKey: "whatsAppPhoneNumber",
    header: "What's app Phone"
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
