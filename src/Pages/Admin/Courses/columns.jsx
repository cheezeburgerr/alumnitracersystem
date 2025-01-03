import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "../../../Components/DatatableColumnHeader";
import { API_BASE_URL } from "../../../Components/api";
import { toast } from "../../../hooks/use-toast";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";

// Define the columns, accepting `data` and `setData` as arguments.
export const columns = ({ data, setData }) => [
  {
    accessorKey: "course_name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Student Number" />;
    },
    cell: ({ row }) => {
      return <p className="flex items-center gap-2"><Badge variant="outline">{row.original.course_code}</Badge>{row.original.course_name}</p>;
    },
  },
  
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Created" />;
    },
    cell: ({ row }) => {
      return <p>{moment(row.original.created_at).format('MMMM DD, YYYY')}</p>;
    },
    id: 'created_at',
    
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.id;
      const adminData = JSON.parse(localStorage.getItem('admin'));
      // Define the archive function
      const handleArchive = async () => {
        try {
          // Make an API request to update the alumni status to 'Archived'
          await axios.patch(`${API_BASE_URL}/alumni/${id}/archive`, { status: "Archived",
            user_ID: adminData.id
           });

          // Update the data after archiving the alumni
          const updatedData = data.filter((item) => item.id !== id); // Remove the archived alumni
          setData(updatedData); // Update the state

          toast({
            title: "Alumnus archived successfully.",
            description: new Date().toString(),
          });
        } catch (error) {
          console.error("Error archiving alumni:", error);
          toast({
            title: "Failed to archive alumni.",
            description: new Date().toString(),
            variant: 'destructive',
          });
        }
      };

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
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem>
              <Link to={`/admin/view-alumni/${id}`}>View Alumni</Link>
            </DropdownMenuItem> */}
            <DropdownMenuItem >Archive</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
