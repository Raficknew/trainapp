import { Logout05Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { redirect } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export function SignOutButton() {
  const t = useTranslations();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghostDestructive">
          <HugeiconsIcon icon={Logout05Icon} />
          {t("Auth.signOut.title")}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {t("Auth.signOut.alertDialogTitle")}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("Auth.signOut.cancel")}</AlertDialogCancel>
          <AlertDialogAction onClick={() => redirect("/sign-out")}>
            {t("Auth.signOut.confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
