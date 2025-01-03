

import * as React from "react";
import { ChevronRight, User2, Home, Calendar, BookOpen, Archive, List, Clock, Check, ChevronsUpDown, Megaphone, GraduationCap, Book, ListCheck, ChartArea, ChartPie, Users2, Search } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// import { SearchForm } from "@/components/search-form";
// import { VersionSwitcher } from "@/components/version-switcher";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
    Input
} from "@/components/ui/input";

import SearchBox from "./SearchBox";
import {
    Label
} from "@/components/ui/label";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarFooter,
} from "@/components/ui/sidebar";


// This is sample data.
const data = {
    versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
    navMain: [
        {
            title: "Home",
            url: "#",
            isOpen: true,
            icon: Home,
            items: [
                {
                    title: "Dashboard",
                    url: "/admin/dashboard",
                    icon: null,
                    isActive: true,
                },
                {
                    title: "Calendar",
                    url: "/admin/calendar",
                    icon: null,
                },
            ],
        },
        {
            title: "Alumni",
            url: "#",
            icon: BookOpen,
            items: [
                {
                    title: "Master List",
                    url: "/admin/masterlist",
                    icon: null,
                },
                {
                    title: "Archive",
                    url: "/admin/archive",
                    icon: null,
                },
            ],
        },
        {
            title: "Announcements",
            url: "#",
            icon: Megaphone,
            items: [
                {
                    title: "Active",
                    url: "/admin/announcements/active",
                    icon: null,
                },
                {
                    title: "Archive",
                    url: "/admin/announcements/archive",
                    icon: null,
                },
            ],
        },

        {
            title: "Analytics",
            url: "#",
            icon: ChartPie,
            items: [
                {
                    title: "Alumni",
                    url: "/admin/analytics/alumni",
                    icon: null,
                },
                {
                    title: "Employment",
                    url: "#",
                    icon: null,
                },
            ],
        },

        {
            title: "Programs",
            url: "/admin/programs",
            icon: Book,
            isNonSubbed: true, // Custom property to identify non-subbed items
        },
        {
            title: "Official List",
            url: "/admin/officiallist",
            icon: ListCheck,
            isNonSubbed: true, // Custom property to identify non-subbed items
        },
    ],
};



import { Avatar, AvatarImage, AvatarFallback } from "@/Components/ui/avatar"


export function AppSidebar({ ...props }) {

    const location = useLocation();

    // console.log(location);
    const [admin, setAdmin] = React.useState(() => {
        const storedUser = localStorage.getItem('admin');
        return storedUser ? JSON.parse(storedUser) : null;
    });


    const handleLogout = () => {
        // Remove the access token from localStorage
        localStorage.removeItem("admin_access_token");
        localStorage.removeItem("admin");

        // Optionally, you can redirect the user to the login page or home page
        window.location.href = "/admin/login"; // or wherever you want to redirect after logout
    };

    return (
        <Sidebar {...props}>
            <SidebarHeader className="mb-">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className="flex gap-2 items-center p-2">
                            <img src="/src/assets/psu_logo.png" alt="PSU Logo" className="h-8" />
                            <div className="">
                                <p className="text-md font-semibold m-0">Alumni Tracer System</p>
                                <p className=" text-xs m-0">San Carlos City Campus</p>
                            </div>
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className="gap-0">
                {/* Render non-subbed items */}
                <SidebarGroup>
                
                    <SearchBox />
                </SidebarGroup>

                {/* Render subbed items */}
                <SidebarGroup className="space-y-2">
                    <SidebarGroupLabel>Platform</SidebarGroupLabel>
                    {data.navMain
                        .filter((item) => !item.isNonSubbed) // Filter subbed items
                        .map((item) => {
                            // Check if the current path matches any of the sub-item URLs
                            const isCurrentPathActive = item.items.some(
                                (subItem) => subItem.url === location.pathname
                            );

                            return (
                                <Collapsible
                                    key={item.title}
                                    title={item.title}
                                    defaultOpen={isCurrentPathActive || item.isOpen}
                                    className="group/collapsible"
                                >
                                    <SidebarGroup className="p-0">
                                        <SidebarGroupLabel
                                            asChild
                                            className={`group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground $`}
                                        >
                                            <CollapsibleTrigger>
                                                {item.icon && <item.icon className="mr-2" />} {item.title}{" "}
                                                <ChevronRight className={`ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90`} />
                                            </CollapsibleTrigger>
                                        </SidebarGroupLabel>
                                        <CollapsibleContent>
                                            <SidebarGroupContent>
                                                <SidebarMenu>
                                                    {item.items.map((subItem) => (
                                                        <SidebarMenuItem key={subItem.title} className="ml-4">
                                                            <SidebarMenuButton asChild isActive={subItem.url === location.pathname}>
                                                                <Link to={subItem.url}>
                                                                    {subItem.icon && <subItem.icon className="mr-2" />} {subItem.title}
                                                                </Link>
                                                            </SidebarMenuButton>
                                                        </SidebarMenuItem>
                                                    ))}
                                                </SidebarMenu>
                                            </SidebarGroupContent>
                                        </CollapsibleContent>
                                    </SidebarGroup>
                                </Collapsible>
                            );
                        })}

                </SidebarGroup>


                <SidebarGroup>

                    <SidebarGroupLabel>Information</SidebarGroupLabel>
                    <SidebarMenu>
                        {data.navMain
                            .filter((item) => item.isNonSubbed) // Filter non-subbed items
                            .map((item) => (
                                <SidebarMenuItem key={item.title} >
                                    <SidebarMenuButton asChild isActive={item.url === location.pathname}>
                                        <Link to={item.url}>
                                            {item.icon && <item.icon className="mr-2" />} {item.title}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarRail />
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        {admin && (

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton className="h-full">
                                        <div className="flex justify-between w-full items-center">
                                            <div className="flex gap-2 items-center">
                                                <Avatar className="size-7">
                                                    <AvatarImage src={admin && admin.image} />
                                                    <AvatarFallback>{admin.name.slice(0, 1)}</AvatarFallback>
                                                </Avatar>{admin.name}
                                            </div>
                                            <ChevronsUpDown size={16} />
                                        </div>
                                    </SidebarMenuButton>

                                </DropdownMenuTrigger>
                                <DropdownMenuContent side="top">
                                    <DropdownMenuItem><Link to="/admin/account">Account</Link></DropdownMenuItem>
                                    <DropdownMenuItem onClick={handleLogout}>Sign out</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
