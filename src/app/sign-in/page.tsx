"use client";
import { useTranslations } from "next-intl";
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
    <div>
      <h1>{t("SignInPage.title")}</h1>
      <button type="submit" onClick={signInWithGoogle}>
        {t("SignInPage.signInWithGoogle")}
      </button>
    </div>
  );
}
