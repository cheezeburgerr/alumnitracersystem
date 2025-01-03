import { Separator } from "@/Components/ui/separator"
import { ProfileForm } from "./ProfileForm"
import Settings from "./Settings"
import { DetailsForm } from "./DetailsForm"

export default function DetailsPage() {
  return (
    <Settings>
        <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">About</h3>
        <p className="text-sm text-muted-foreground">
          This is where your address, educational and work information stores.
        </p>
      </div>
      <Separator />
      <DetailsForm />
    </div>
    </Settings>
  )
}