'use client';

import type { DataTableRowAction } from '@/types/data-table';
import { Column, ColumnDef } from '@tanstack/react-table';
import {
  CalendarIcon, Ellipsis, Copy, MailSearch, PhoneCall, UserSearch,
  Users, Crown, MapPin, Calendar
} from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Card, CardContent } from '@/components/ui/card';
import { GetContactsTableColumnsProps } from '../_types/types';

function OverlappedCards({
  groups: groupList,
  maxVisible = 3,
}: {
  groups: any[],
  maxVisible?: number
}) {
  const visibleGroups = groupList.slice(0, maxVisible)
  const remainingCount = Math.max(0, groupList.length - maxVisible)

  return (
    <div className="flex items-center">
      {visibleGroups.map((group, index) => (
        <HoverCard key={group.id}>
          <HoverCardTrigger asChild>
            <div
              className={`${index > 0 ? "-ml-6" : ""} relative cursor-pointer 
                transition-all duration-300 hover:scale-105 hover:z-10`}
              style={{ zIndex: visibleGroups.length - index }}
            >
              <Card className="w-20 h-12 shadow-lg border-2 border-white">
                <CardContent
                  className={`p-2 ${group.color} text-white rounded-md h-full flex items-center justify-center`}
                >
                  <span className="text-xs font-semibold">{group.avatar}</span>
                </CardContent>
              </Card>
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="w-80" side="top">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 ${group.color} rounded-lg flex items-center justify-center`}>
                  <span className="text-white font-bold text-lg">{group.avatar}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-lg">{group.name}</h4>
                  <p className="text-sm text-muted-foreground">{group.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span>{group.members} members</span>
                </div>
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-muted-foreground" />
                  <span>{group.lead}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>{new Date(group.created).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{group.location}</span>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      ))}

      {remainingCount > 0 && (
        <div
          className="-ml-6 w-20 h-12 bg-gray-100 border-2 border-white shadow-lg rounded-md
            flex items-center justify-center cursor-pointer
            transition-all duration-300 hover:scale-105 hover:bg-gray-200"
        >
          <span className="text-gray-600 font-medium text-xs">+{remainingCount}</span>
        </div>
      )}
    </div>
  )
}


export function getContactsTableColumns({
  setRowAction,
  groupOptions
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
      size: 30
    },
    {
      id: 'fullName',
      accessorKey: 'firstName',
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
      enableColumnFilter: true,
      meta: {
        label: 'Full Name',
        icon: UserSearch
      },
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
      enableColumnFilter: true,
      enableSorting: false,
      meta: {
        label: 'Email',
        placeholder: 'Search email...',
        variant: 'text',
        icon: MailSearch
      },
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
              <Badge key={group.id} variant="outline" className="bg-green-100 text-green-800 border-green-200 font-medium">
                <Users className="w-3 h-3 mr-1" />
                {group.name}
              </Badge>
            ))}
            {/* <OverlappedCards groups={groups}/> */}
          </div>
        );
      },
      enableColumnFilter: true,
      enableSorting: false,
      size: 150,
      meta: {
        label: 'Groups',
        variant: 'multiSelect',
        icon: Users,
        options: groupOptions.map((group) => ({
          label: group.name,
          value: group.name
        }))
      }
    },
    {
      accessorKey: 'smsPhoneNumber',
      header: 'SMS Phone',
      cell: ({ cell }) => {
        const phoneNumber = cell.getValue<string>();
        return (
          <div className='flex items-center gap-2'>
            <span className='max-w-[31.25rem] truncate font-medium'>
              {phoneNumber}
            </span>
            <Button
              variant='ghost'
              className='opacity-0 hover:opacity-100 focus:outline-2 focus:outline-offset-2 focus:outline-green-100 active:bg-green-100'
              size='icon'
              onClick={() => navigator.clipboard.writeText(phoneNumber)}
            >
              <Copy className='size-4 ' />
            </Button>
          </div>
        );
      },
      enableColumnFilter: true,
      meta: {
        label: 'SMS Phone',
        icon: PhoneCall
      },
    },
    {
      accessorKey: 'whatsAppPhoneNumber',
      cell: ({ cell }) => {
        const whatsAppPhoneNumber = cell.getValue<string>();
        return (
          <div className='flex items-center gap-2'>
            <span className='max-w-[31.25rem] truncate font-medium'>
              {whatsAppPhoneNumber}
            </span>
            <Button
              variant='ghost'
              className='opacity-0 hover:opacity-100 focus:outline-2 focus:outline-offset-2 focus:outline-gray-150 active:bg-gray-200'
              size='icon'
              onClick={() =>
                navigator.clipboard.writeText(whatsAppPhoneNumber)
              }
            >
              <Copy className='size-4' />
            </Button>
          </div>
        );
      },
      enableColumnFilter: true,
      header: "What's app Phone",
      meta: {
        label: 'Whats app Phone',
        icon: PhoneCall
      }
    },
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
