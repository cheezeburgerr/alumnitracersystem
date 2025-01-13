
import { Separator } from "@/Components/ui/separator";
import { SidebarNav } from "../../Components/SidebarNav";
import AlumniLayout from "../../Layouts/AlumniLayout";
import SettingsProfilePage from "./ProfilePage";

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/profile/edit",
  },
  {
    title: "About",
    href: "/profile/edit/details",
  },
  {
    title: "Security and Log In",
    href: "/profile/edit/security",
  },

];

export default function Settings({ children }) {
  return (
    
      <AlumniLayout>
      {/* <div className="md:hidden">
        <img
          src="/examples/forms-light.png"
          width={1280}
          height={791}
          alt="Forms"
          className="block dark:hidden"
        />
        <img
          src="/examples/forms-dark.png"
          width={1280}
          height={791}
          alt="Forms"
          className="hidden dark:block"
        />
      </div> */}
      <div className=" space-y-6 lg:p-10 pb-16 md:block">
        {/* <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" /> */}
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5 lg:sticky top-10">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
  
      </AlumniLayout>
  );
}
