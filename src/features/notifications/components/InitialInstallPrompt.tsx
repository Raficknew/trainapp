"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InitialInstallPrompt() {
  const t = useTranslations();
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
        !(window as Window & { MSStream?: unknown }).MSStream,
    );

    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);

    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) {
      return;
    }

    installPrompt.prompt();

    const { outcome } = await installPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("User accepted the install prompt");
    } else {
      console.log("User dismissed the install prompt");
    }

    setInstallPrompt(null);
  };

  if (isStandalone || (!isIOS && !installPrompt)) {
    return null;
  }

  return (
    <div>
      <h3>{t("InstallApp.title")}</h3>
      {!isIOS && installPrompt && (
        <button type="button" onClick={handleInstallClick}>
          {t("InstallApp.addToHomeScreen")}
        </button>
      )}
      {isIOS && (
        <p>
          {t("InstallApp.iosInstructions")}
          <span role="img" aria-label="share icon">
            {" "}
            ⎋{" "}
          </span>
          {t("InstallApp.iosInstructionsPart2")}
          <span role="img" aria-label="plus icon">
            {" "}
            ➕{" "}
          </span>
          .
        </p>
      )}
    </div>
  );
}
