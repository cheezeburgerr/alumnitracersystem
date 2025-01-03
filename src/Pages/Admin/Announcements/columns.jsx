import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "../../../Components/DatatableColumnHeader";
import axios from "axios";
import { API_BASE_URL } from "../../../Components/api";
import { toast } from "../../../hooks/use-toast";
import { Link } from "react-router-dom";
import moment from "moment";


import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useState } from "react";


// Define the shape of our data.
export const columns = ({ data, setData }) => [
  {
    accessorKey: "announcement_title",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
    cell: ({ row }) => <p><Badge variant="outline">{row.original.status}</Badge><span className="font-semibold ms-1">{row.original.announcement_title}</span></p>,
  },
  {
    accessorKey: "start_date",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Start Date" />,
    cell: ({ row }) => <p>{moment(row.original.start_date).format('MMMM D, YYYY, h:mm a')}</p>,
  },
  {
    accessorKey: "end_date",
    header: ({ column }) => <DataTableColumnHeader column={column} title="End Date" />,
    cell: ({ row }) => <p>{moment(row.original.end_date).format('MMMM D, YYYY, h:mm a')}</p>,
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const [isDialogOpen, setIsDialogOpen] = useState(false);

      const id = row.original.id;
      const adminData = JSON.parse(localStorage.getItem('admin'));
      const handleArchive = async (status1) => {
        try {
          await axios.patch(`${API_BASE_URL}/announcement/${id}/archive`, { status: status1, user_ID: adminData.id });

          const updatedData = data.filter((item) => item.id !== id);
          setData(updatedData); // Update state to remove the announcement

          toast({
            title: `Announcement ${status1 === 'Archived' ? 'archived' : 'unarchived'} successfully.`,
            description: new Date().toString(),
          });
        } catch (error) {
          console.error("Error archiving/unarchiving announcement:", error);
          toast({
            title: `Failed to ${status1 === 'Archived' ? 'archive' : 'unarchive'} announcement.`,
            description: new Date().toString(),
            variant: 'destructive',
          });
        }
      };

      const handleDelete = async () => {
        try {
          await axios.delete(`${API_BASE_URL}/announcements/${id}`,
            {
              data: { user_ID: adminData.id },
            }
          );

          const updatedData = data.filter((item) => item.id !== id);
          setData(updatedData); // Update state to remove the announcement

          toast({
            title: `Announcement deleted successfully.`,
            description: new Date().toString(),
          });
        } catch (error) {
          console.error("Error archiving/unarchiving announcement:", error);
          toast({
            title: `Failed to delete announcement.`,
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
            <DropdownMenuItem>
              <Link to={`/admin/announcements/view/${id}`}>View Announcement</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                handleArchive(row.original.status === "Active" ? "Archived" : "Active")
              }
            >
              {row.original.status === "Active" ? "Archive" : "Unarchive"}
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => setIsDialogOpen(true)}
            >
              Delete Announcement
            </DropdownMenuItem>
          </DropdownMenuContent>

         
          <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete this record.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    handleDelete();
                    setIsDialogOpen(false);
                  }}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenu>
      );
    },
  }

];
