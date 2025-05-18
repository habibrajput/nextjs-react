"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Stepper, Step, StepIndicator, StepContent, StepTitle, StepDescription, StepperFooter } from "@/components/ui/stepper"
import { Check, CreditCard, Home, User } from "lucide-react";
import { Icons } from "@/components/icons"
import { UploadContactsForm } from "@/features/contacts/components/add-contact/upload-contact-form"
import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel,  useReactTable} from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const data: Payment[] = [
    {
        id: "m5gr84i9",
        amount: 316,
        status: "success",
        email: "ken99@example.com",
    },
    {
        id: "3u1reuv4",
        amount: 242,
        status: "success",
        email: "Abe45@example.com",
    },
    {
        id: "derv1ws0",
        amount: 837,
        status: "processing",
        email: "Monserrat44@example.com",
    },
    {
        id: "5kma53ae",
        amount: 874,
        status: "success",
        email: "Silas22@example.com",
    },
    {
        id: "bhqecj4p",
        amount: 721,
        status: "failed",
        email: "carmella@example.com",
    },
]

export type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
}

export const columns: ColumnDef<Payment>[] = [
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
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("status")}</div>
        ),
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
        accessorKey: "amount",
        header: () => <div className="text-right">Amount</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"))

            // Format the amount as a dollar amount
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)

            return <div className="text-right font-medium">{formatted}</div>
        },
    },
]

export function DataTableDemo() {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="w-full">
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

type FormProps = {
    onCancel: () => void
    onSuccess: () => void
}

export default function StepperDemo({ onCancel, onSuccess }: FormProps) {
    const [activeStep, setActiveStep] = useState(0)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        city: "",
        payment: "",
    })

    const handleNext = () => {
        setActiveStep((prev) => Math.min(prev + 1, 3))
    }

    const handleBack = () => {
        setActiveStep((prev) => Math.max(prev - 1, 0))
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const steps = [
        {
            title: "Upload your file",
            description: "Select a file containing your contacts to import.",
            icon: <User className="h-5 w-5" />,
            content: (
                <div className="grid gap-4">
                    <h1 className="text-2xl font-semibold">Upload your file</h1>
                    <UploadContactsForm onCancel={onCancel} onSuccess={onSuccess} />
                </div>
            ),
        },
        {
            title: "Mapping data",
            description: "Select the contact attribute that corresponds to your data. You can select existing attributes, create new ones, or choose not to import some data.",
            icon: <Home className="h-5 w-5" />,
            content: (
                <div className="grid gap-4">
                    <h1 className="text-2xl font-semibold"> Mapping data </h1>
                    <DataTableDemo />
                </div>
            ),
        },
        {
            title: "Select a list",
            description: "Add your contacts to an existing list or create a new one.",
            icon: <CreditCard className="h-5 w-5" />,
            content: (
                <div className="grid gap-4">
                    <h1 className="text-2xl font-semibold">  Select a list </h1>
                    <div className="grid gap-2">
                        <Label htmlFor="payment">Card Number</Label>
                        <Input
                            id="payment"
                            name="payment"
                            value={formData.payment}
                            onChange={handleChange}
                            placeholder="4242 4242 4242 4242"
                        />
                    </div>
                </div>
            ),
        },
        // {
        //     title: "Complete",
        //     description: "Order submitted successfully",
        //     icon: <Check className="h-5 w-5" />,
        //     content: (
        //         <div className="text-center py-4">
        //             <h1 className="text-2xl font-semibold">Basic Details</h1>
        //             <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
        //                 <Check className="h-8 w-8 text-green-600" />
        //             </div>
        //             <h3 className="text-lg font-medium">Order Complete!</h3>
        //             <p className="text-muted-foreground mt-2">
        //                 Thank you for your order. You will receive a confirmation email shortly.
        //             </p>
        //         </div>
        //     ),
        // },
    ]

    return (
        <div className="container w-full py-5">
            <div className="flex gap-6">
                <div className="w-1/3 bg-muted rounded-xl py-5 px-3">
                    <Stepper
                        activeStep={activeStep}
                        orientation="vertical"
                    >
                        {steps.map((step, index) => (
                            <Step key={index} index={index} >
                                <StepIndicator index={index} icon={step.icon} total={steps.length} />
                                <StepContent>
                                    <StepTitle>{step.title} <span className="text-sm text-muted-foreground underline font-semibold cursor-pointer">Edit</span></StepTitle>
                                    <StepDescription>{step.description}</StepDescription>
                                </StepContent>
                            </Step>
                        ))}
                        <StepperFooter>
                            <Button
                                className="rounded-lg p-2"
                                variant="outline"
                                onClick={handleBack}
                                disabled={activeStep === 0}
                            >
                                <Icons.chevronLeft
                                    onClick={handleBack}
                                    className="mr-2 h-4 w-4"
                                />
                            </Button>
                            <Button
                                className="rounded-lg p-2"
                                variant="outline"
                                onClick={handleNext}
                                disabled={activeStep === steps.length - 1}
                            >
                                <Icons.chevronRight
                                    onClick={handleNext}
                                    className="mr-2 h-4 w-4"
                                />
                            </Button>
                        </StepperFooter>
                    </Stepper>
                </div>
                <div className="w-2/3">{steps[activeStep].content}</div>
            </div>
        </div>
    )
}
