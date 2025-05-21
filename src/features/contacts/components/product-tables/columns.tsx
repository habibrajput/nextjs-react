'use client';
import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { Product } from '@/constants/data';
import { Column, ColumnDef } from '@tanstack/react-table';
import { CheckCircle2, Text, XCircle } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox"

import { CellAction } from './cell-action';
import { CATEGORY_OPTIONS } from './options';

export const columns: ColumnDef<Product>[] = [
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
  // {
  //   id: 'firstName',
  //   accessorKey: 'firstName',
  //   header: ({ column }: { column: Column<Product, unknown> }) => (
  //     <DataTableColumnHeader column={column} title='firstName' />
  //   ),
  //   cell: ({ cell }) => <div>{cell.getValue<Product['firstName']>()}</div>,
  //   meta: {
  //     label: 'firstName',
  //     placeholder: 'Search products...',
  //     variant: 'text',
  //     icon: Text
  //   },
  //   enableColumnFilter: true
  // },
  {
    accessorKey: 'creator.firstName',
    header: 'Creator'
  },
  {
    accessorKey: 'firstName',
    header: 'lastName'
  },
  {
    accessorKey: 'lastName',
    header: 'lastName'
  },
  {
    accessorKey:"smsPhoneNumber",
    header: 'SMS Phone Number'
  },
  // {
  //   id: 'email',
  //   accessorKey: 'email',
  //   header: ({ column }: { column: Column<Product, unknown> }) => (
  //     <DataTableColumnHeader column={column} title='email' />
  //   ),
  //   cell: ({ cell }) => {
  //     const status = cell.getValue<Product['email']>();
  //     const Icon = status === 'active' ? CheckCircle2 : XCircle;

  //     return (
  //       <Badge variant='outline' className='capitalize'>
  //         <Icon />
  //         {status}
  //       </Badge>
  //     );
  //   },
  //   enableColumnFilter: true,
  //   meta: {
  //     label: 'categories',
  //     variant: 'multiSelect',
  //     options: CATEGORY_OPTIONS
  //   }
  // },
  {
    accessorKey: 'email',
    header: 'email'
  },
  {
    accessorKey: 'description',
    header: 'DESCRIPTION'
  },

  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
