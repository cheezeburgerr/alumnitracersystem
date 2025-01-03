import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"
import { Bell } from "lucide-react"

const notifications = [
    {
        id: 1,
        title: "New Assignment Posted",
        description: "Check out the new assignment for Math 101.",
        date: "2025-01-01",
        image: "../src/assets/psu_logo.png",
        status: "unread",
    },
    {
        id: 2,
        title: "Meeting Reminder",
        description: "Don't forget about the team meeting tomorrow.",
        date: "2024-12-31",
        image: "../src/assets/psu_logo.png",
        status: "read",
    },
    {
        id: 3,
        title: "System Maintenance",
        description: "The portal will be down for maintenance this weekend.",
        date: "2024-12-30",
        image: "../src/assets/psu_logo.png",
        status: "read",
    },
    {
        id: 4,
        title: "Holiday Announcement",
        description: "University will be closed on New Year's Day.",
        date: "2025-01-01",
        image: "../src/assets/psu_logo.png",
        status: "unread",
    },
];

export default function NotificationBox() {
    return (
        <>
            <Sheet>
                <SheetTrigger>
                    <Bell size={18} />
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle className="mb-3">Notifications</SheetTitle>
                        <SheetDescription className="divide-y">
                            {notifications.map((notification) => (
                                <Notification key={notification.id} {...notification} />
                            ))}
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </>
    );
}

export function Notification({ title, description, date, image, status }) {
    return (
        <div
            className={`flex items-start gap-4 p-2 rounded `}
        >
            <div className="relative">
                {status == "unread" && (
                    <div className="absolute top-0 left-0 p-1.5 z-10 rounded-full bg-primary"></div>
                )}
            <Avatar>
                <AvatarImage src={image} alt="Notification" />
                <AvatarFallback>PSU</AvatarFallback>
            </Avatar>
            </div>
            <div>
                <p className="font-bold ">{title}</p>
                <p className="text-sm text-gray-500">{description}</p>
                <p className="text-xs text-gray-400">{date}</p>
            </div>
        </div>
    );
}
