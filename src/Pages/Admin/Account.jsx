import { Separator } from "@/Components/ui/separator"


import AccountSettings from "./AccountSettings"
import { AccountForm } from "./AccountForm"

export default function Account() {
  return (
    <AccountSettings>
        <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <AccountForm />
    </div>
    </AccountSettings>
  )
}