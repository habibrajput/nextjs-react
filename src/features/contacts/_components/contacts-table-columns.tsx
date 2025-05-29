'use client';

import type { DataTableRowAction } from '@/types/data-table';
import { Column, ColumnDef } from '@tanstack/react-table';
import { CalendarIcon, Ellipsis } from 'lucide-react';
import * as React from 'react';

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { formatDate } from '@/lib/format';
import { Contact } from '@/features/contacts/_types/contact';

interface GetContactsTableColumnsProps {

  groupOptions: { id: number; name: string }[];
  setRowAction: React.Dispatch<
    React.SetStateAction<DataTableRowAction<Contact> | null>
  >;
}

export function getContactsTableColumns({
  groupOptions,
  setRowAction
}: GetContactsTableColumnsProps): ColumnDef<Contact>[] {
  return [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all'
          className='translate-y-0.5'
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Select row'
          className='translate-y-0.5'
        />
      ),
      enableSorting: false,
      enableHiding: false,
      size: 40
    },
    {
      id: 'full_name',
      header: 'Full Name',
      accessorFn: (row) => `${row.firstName} ${row.lastName}`,
      cell: ({ row }) => {
        const { firstName, lastName } = row.original;
        return (
          <span>
            {firstName} {lastName}
          </span>
        );
      },
      meta: {
        label: 'Full Name',
      },
      enableColumnFilter: true
    },
    {
      id: 'email',
      accessorKey: 'email',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Email' />
      ),
      cell: ({ row }) => {
        return (
          <div className='flex items-center gap-2'>
            <span className='max-w-[31.25rem] truncate font-medium'>
              {row.getValue('email')}
            </span>
          </div>
        );
      },
      meta: {
        label: 'Email',
        placeholder: 'Search email...',
        variant: 'text'
      },
      enableColumnFilter: true
    },
    {
      id: 'groups',
      accessorKey: 'groups',
      header: ({ column }: { column: Column<Contact, unknown> }) => (
        <DataTableColumnHeader column={column} title='Groups' />
      ),
      cell: ({ cell }) => {
        const groups = cell.getValue<Contact['group']>();
        if (!Array.isArray(groups)) return null;

        return (
          <div className='flex flex-wrap gap-1'>
            {groups.map((group) => (
              <div className='flex flex-nowrap' key={group.id}>
                <span className='rounded-md bg-gray-200 px-2 py-1 text-xs text-gray-800'>
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
        options: groupOptions.map((group) => ({
          label: group.name,
          value: group.id
        }))
      }
    },
    {
      accessorKey: 'smsPhoneNumber',
      header: 'SMS Phone',
      meta: {
        label: 'SMS Phone',
      }
    },
    {
      accessorKey: 'whatsAppPhoneNumber',
      header: "What's app Phone",
      meta: {
        label: 'Whats app Phone',
      }
    },
    // {
    //   id: 'groups',
    //   accessorKey: 'groups',
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title='Groups' />
    //   ),
    //   cell: ({ cell }) => {
    //     const statusAll = ['todo', 'in-progress', 'done', 'canceled'];
    //     const status = statusAll.find(
    //       (status) => status === cell.getValue<Contact['status']>()
    //     );
    //
    //     if (!status) return null;
    //
    //     // const Icon = getStatusIcon(status);
    //
    //     return (
    //       <Badge variant='outline' className='py-1 [&>svg]:size-3.5'>
    //         {/*<Icon />*/}
    //         <span className='capitalize'>{status}</span>
    //       </Badge>
    //     );
    //   },
    //   meta: {
    //     label: 'Status',
    //     variant: 'multiSelect',
    //     // options: tasks.status.enumValues.map((status) => ({
    //     //   label: status.charAt(0).toUpperCase() + status.slice(1),
    //     //   value: status,
    //     //   count: statusCounts[status],
    //     //   icon: getStatusIcon(status)
    //     // })),
    //     icon: CircleDashed
    //   },
    //   enableColumnFilter: true
    // },
    // {
    //   id: 'priority',
    //   accessorKey: 'priority',
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title='Priority' />
    //   ),
    //   cell: ({ cell }) => {
    //     const priority = tasks.priority.enumValues.find(
    //       (priority) => priority === cell.getValue<Contact['priority']>()
    //     );
    //
    //     if (!priority) return null;
    //
    //     const Icon = getPriorityIcon(priority);
    //
    //     return (
    //       <Badge variant='outline' className='py-1 [&>svg]:size-3.5'>
    //         <Icon />
    //         <span className='capitalize'>{priority}</span>
    //       </Badge>
    //     );
    //   },
    //   meta: {
    //     label: 'Priority',
    //     variant: 'multiSelect',
    //     options: tasks.priority.enumValues.map((priority) => ({
    //       label: priority.charAt(0).toUpperCase() + priority.slice(1),
    //       value: priority,
    //       count: priorityCounts[priority],
    //       icon: getPriorityIcon(priority)
    //     })),
    //     icon: ArrowUpDown
    //   },
    //   enableColumnFilter: true
    // },
    // {
    //   id: 'estimatedHours',
    //   accessorKey: 'estimatedHours',
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title='Est. Hours' />
    //   ),
    //   cell: ({ cell }) => {
    //     const estimatedHours = cell.getValue<number>();
    //     return <div className='w-20 text-right'>{estimatedHours}</div>;
    //   },
    //   meta: {
    //     label: 'Est. Hours',
    //     variant: 'range',
    //     range: [estimatedHoursRange.min, estimatedHoursRange.max],
    //     unit: 'hr',
    //     icon: Clock
    //   },
    //   enableColumnFilter: true
    // },
    {
      id: 'createdAt',
      accessorKey: 'createdAt',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Created At' />
      ),
      cell: ({ cell }) => formatDate(cell.getValue<Date>()),
      meta: {
        label: 'Created At',
        variant: 'dateRange',
        icon: CalendarIcon
      },
      enableColumnFilter: true
    },
    {
      id: 'actions',
      cell: function Cell({ row }) {
        const [isUpdatePending, startUpdateTransition] = React.useTransition();

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                aria-label='Open menu'
                variant='ghost'
                className='data-[state=open]:bg-muted flex size-8 p-0'
              >
                <Ellipsis className='size-4' aria-hidden='true' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-40'>
              <DropdownMenuItem
                onSelect={() => setRowAction({ row, variant: 'update' })}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup
                    value={row.original.label}
                    onValueChange={(value) => {
                      // startUpdateTransition(() => {
                      //   toast.promise(
                      //     updateContact({
                      //       id: row.original.id,
                      //       label: value as Contact['label']
                      //     }),
                      //     {
                      //       loading: 'Updating...',
                      //       success: 'Label updated',
                      //       error: (err) => getErrorMessage(err)
                      //     }
                      //   );
                      // });
                    }}
                  >
                    {/*{tasks.label.enumValues.map((label) => (*/}
                    {/*  <DropdownMenuRadioItem*/}
                    {/*    key={label}*/}
                    {/*    value={label}*/}
                    {/*    className='capitalize'*/}
                    {/*    disabled={isUpdatePending}*/}
                    {/*  >*/}
                    {/*    {label}*/}
                    {/*  </DropdownMenuRadioItem>*/}
                    {/*))}*/}
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={() => setRowAction({ row, variant: 'delete' })}
              >
                Delete
                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      size: 40
    }
  ];
}
