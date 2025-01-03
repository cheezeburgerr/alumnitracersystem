import { Separator } from "@/Components/ui/separator"
import { ProfileForm } from "./ProfileForm"
import Settings from "./Settings"

export default function SettingsProfilePage() {
  return (
    <Settings>
        <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <ProfileForm />
    </div>
    </Settings>
  )
}