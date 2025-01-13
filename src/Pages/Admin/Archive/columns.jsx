import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "../../../Components/DatatableColumnHeader";
import axios from "axios";
import { API_BASE_URL } from "../../../Components/api";
import { toast } from "../../../hooks/use-toast";
import { Link } from "react-router-dom";

// Define the shape of our data.
export const columns = ({ data, setData }) => [
  {
    accessorKey: "student_ID",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Student Number" />,
  },
  {
    accessorKey: "full_name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
  },
  {
    accessorKey: "course",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Course" />,
    cell: ({ row }) => <p>{row.original.course.course_name}</p>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Employment Status" />;
    },
    cell: ({ row }) => {
      // Check if status.status is null, then set it to "Never-Employed"
      const status = row.original.employment_status?.status?.status || "Never-Employed";
      return <Badge>{status}</Badge>;
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.id;
      const adminData = JSON.parse(localStorage.getItem('admin'));
      // Handle unarchive
      const handleUnarchive = async () => {
        try {
          // Make an API request to update the alumni status to 'Active'
          await axios.patch(`${API_BASE_URL}/alumni/${id}/archive`, { status: "Active", user_ID: adminData.id });

          // Remove the alumni from the data list after successful update
          const updatedData = data.filter((item) => item.id !== id);
          setData(updatedData); // Update state to remove the alumni

          toast({
            title: "Alumnus unarchived successfully.",
            description: new Date().toString(),
          });
        } catch (error) {
          console.error("Error unarchiving alumni:", error);
          toast({
            title: "Failed to archive alumni.",
            description: new Date().toString(),
            variant: 'destructive'
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
            <DropdownMenuItem>
              <Link to={`/admin/view-alumni/${id}`}>View Alumni</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleUnarchive}>Unarchive</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
