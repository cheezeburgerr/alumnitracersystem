"use client";

// import { ColumnDef } from "@tanstack/react-table";

import { MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"; 
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ArrowUpDown } from "lucide-react"
import { Link } from "react-router-dom";
import { DataTableColumnHeader } from "../../../Components/DatatableColumnHeader";

// Define the shape of our data.
export const columns = [
    {
        accessorKey: "student_ID",
        header: ({ column }) => {
            return (
                // <Button
                //     variant="ghost"
                //     onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                // >
                //     Student Number
                //     <ArrowUpDown className="ml-2 h-4 w-4" />
                // </Button>
                <DataTableColumnHeader column={column} title="Student Number" />
            )
        },
    },
    {
        accessorKey: "full_name",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Name" />
            )
        },
    },
    {
        accessorKey: "course",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Course" />
            )
        },
        cell: ({ row }) => {
            
            
            return (
                <>
                    <p>{row.original.course.course_name}</p>
                </>
               
            )
        },
    },
    // {
    //     accessorKey: "status",
    //     header: ({ column }) => {
    //         return (
    //             <DataTableColumnHeader column={column} title="Status" />
    //         )
    //     },
    //     cell: ({ row }) => {
    //         const status = row.getValue("status"); 
           

    //         return (
    //             <Badge variant={status == 'Employed' ? 'default' : status == 'Unemployed' ? 'red' : 'outline'}>
    //                 {status}
    //             </Badge>
    //         );
    //     },
    // },
    
{
    accessorKey: "email",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Email" />
            )
        },
    },
{
    id: "actions",
        cell: ({ row }) => {
            
            const id = row.original.id; 
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        {/* <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(payment.id)}
                        >
                            Copy payment ID
                        </DropdownMenuItem> */}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem><Link to={`/admin/view-alumni/${id}`}>View Alumni</Link></DropdownMenuItem>
                        <DropdownMenuItem>Archive</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    }
];
