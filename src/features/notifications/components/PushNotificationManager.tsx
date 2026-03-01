"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import {
  sendNotification,
  subscribeUser,
  unsubscribeUser,
} from "@/features/notifications/actions/actions";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function PushNotificationManager() {
  const t = useTranslations();
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null,
  );
  const [message, setMessage] = useState("");

  // biome-ignore lint/correctness/useExhaustiveDependencies: code from guide
  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      setIsSupported(true);
      registerServiceWorker();
    }
  }, []);

  async function registerServiceWorker() {
    const registration = await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
      updateViaCache: "none",
    });
    const sub = await registration.pushManager.getSubscription();
    setSubscription(sub);
  }

  async function subscribeToPush() {
    const registration = await navigator.serviceWorker.ready;
    const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    if (!vapidKey) {
      console.error("VAPID public key is not set");
      return;
    }
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidKey),
    });
    setSubscription(sub);
    const serializedSub = JSON.parse(JSON.stringify(sub));
    await subscribeUser(serializedSub);
  }

  async function unsubscribeFromPush() {
    await subscription?.unsubscribe();
    setSubscription(null);
    await unsubscribeUser();
  }

  async function sendTestNotification() {
    if (subscription) {
      await sendNotification(message);
      setMessage("");
    }
  }

  if (!isSupported) {
    return <p>{t("PushNotifications.notSupported")}</p>;
  }

  return (
    <div>
      <h3>{t("PushNotifications.title")}</h3>
      {subscription ? (
        <>
          <p>{t("PushNotifications.subscribed")}</p>
          <button type="button" onClick={unsubscribeFromPush}>
            {t("PushNotifications.unsubscribe")}
          </button>
          <input
            type="text"
            placeholder={t("PushNotifications.messagePlaceholder")}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="button" onClick={sendTestNotification}>
            {t("PushNotifications.sendTest")}
          </button>
        </>
      ) : (
        <>
          <p>{t("PushNotifications.notSubscribed")}</p>
          <button type="button" onClick={subscribeToPush}>
            {t("PushNotifications.subscribe")}
          </button>
        </>
      )}
    </div>
  );
}
