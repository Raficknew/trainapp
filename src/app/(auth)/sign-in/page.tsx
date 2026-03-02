"use client";
import { GoogleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { authClient } from "@/features/auth/client/auth-client";

export default function SignInPage() {
  const t = useTranslations();
  const signInWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div className="w-full h-screen flex items-center justify-center flex-col gap-4 text-center">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl">{t("Auth.signIn.welcome")}</h1>
        <h2>{t("Auth.signIn.description")}</h2>
      </div>
      <Button className="px-20 py-4" onClick={signInWithGoogle}>
        <HugeiconsIcon icon={GoogleIcon} />
        {t("Auth.signIn.withGoogle")}
      </Button>
    </div>
  );
}
