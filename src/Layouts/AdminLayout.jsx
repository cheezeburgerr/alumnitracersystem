import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Separator } from "@/components/ui/Separator"
import { Button } from "@/components/ui/button"
import { Search, Sidebar } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle";
import NotificationBox from "../Components/NotificationBox";
import { useToast } from "../hooks/use-toast";
import { Toaster } from "../Components/ui/toaster"

export default function AdminLayout({ children, pageName, breadcrumb, addButton }) {

    const { toast } = useToast()


    return (
        <>


            <SidebarProvider>

                <Toaster />
                <AppSidebar />
                <SidebarInset>
                    <main>
                        <header className="flex sticky top-0 bg-background h-14 shrink-0 z-50 items-center gap-2 border-b px-4 justify-between">
                            <div className="flex items-center gap-2">
                                <SidebarTrigger className="-ml-1" />
                                <Separator orientation="vertical" className="mr-2 h-4" />

                                <div className="hidden md:block">
                                {breadcrumb}
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                {/* <Search size={18} /> */}
                                <NotificationBox />

                                <ModeToggle />
                            </div>

                        </header>
                        <div className="p-4 lg:p-6">
                            <div className="flex justify-between items-center mb-4">
                                {pageName && (
                                    <h1 className="font-semibold text-2xl ">{pageName}</h1>
                                )}
                       

                                    { addButton }
    
                            </div>
                            {children}
                        </div>
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </>
    )
}