"use client";

import { useTranslations } from "next-intl";
import { useEffect, useReducer } from "react";
import { Button } from "@/components/ui/button";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

interface State {
  isIOS: boolean;
  isStandalone: boolean;
  installPrompt: BeforeInstallPromptEvent | null;
}

type Action =
  | {
      type: "SET_INITIAL_STATE";
      payload: { isIOS: boolean; isStandalone: boolean };
    }
  | { type: "SET_INSTALL_PROMPT"; payload: BeforeInstallPromptEvent | null };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_INITIAL_STATE":
      return { ...state, ...action.payload };
    case "SET_INSTALL_PROMPT":
      return { ...state, installPrompt: action.payload };
    default:
      return state;
  }
}

export function InitialInstallPrompt() {
  const t = useTranslations();
  const [state, dispatch] = useReducer(reducer, {
    isIOS: false,
    isStandalone: false,
    installPrompt: null,
  });

  useEffect(() => {
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
      !(window as Window & { MSStream?: unknown }).MSStream;
    const isStandalone = window.matchMedia(
      "(display-mode: standalone)",
    ).matches;

    dispatch({ type: "SET_INITIAL_STATE", payload: { isIOS, isStandalone } });

    const handler = (e: Event) => {
      e.preventDefault();
      dispatch({
        type: "SET_INSTALL_PROMPT",
        payload: e as BeforeInstallPromptEvent,
      });
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = async () => {
    if (!state.installPrompt) {
      return;
    }

    state.installPrompt.prompt();

    const { outcome } = await state.installPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("User accepted the install prompt");
    } else {
      console.log("User dismissed the install prompt");
    }

    dispatch({ type: "SET_INSTALL_PROMPT", payload: null });
  };

  if (state.isStandalone || (!state.isIOS && !state.installPrompt)) {
    return null;
  }

  return (
    <div>
      <h3>{t("InstallApp.title")}</h3>
      {!state.isIOS && state.installPrompt && (
        <Button type="button" variant="default" onClick={handleInstallClick}>
          {t("InstallApp.addToHomeScreen")}
        </Button>
      )}
      {state.isIOS && (
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
