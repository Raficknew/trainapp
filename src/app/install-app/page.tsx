import { InitialInstallPrompt } from "@/features/notifications/components/InitialInstallPrompt";
import { PushNotificationManager } from "@/features/notifications/components/PushNotificationManager";

export default function InstallAppPage() {
  return (
    <div>
      <PushNotificationManager />
      <InitialInstallPrompt />
    </div>
  );
}
