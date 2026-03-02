import {
  AnalyticsUpIcon,
  Calendar03Icon,
  DashboardSquare01Icon,
  PlusSignIcon,
  User02Icon,
} from "@hugeicons/core-free-icons";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { AvatarDropDown } from "@/components/molecules/AvatarDropDown";
import { SideBar } from "@/components/organisms/Sidebar";
import type { Route } from "@/types/types";

export default async function AthleteLayout({
  children,
}: {
  children: ReactNode;
}) {
  const t = await getTranslations();
  const routes: Route[] = [
    {
      name: t("Routes.dashboard"),
      href: "/athlete/dashboard",
      icon: DashboardSquare01Icon,
      key: "dashboard",
    },
    {
      name: t("Routes.calendar"),
      href: "/athlete/calendar",
      icon: Calendar03Icon,
      key: "calendar",
    },
    {
      name: t("Routes.create"),
      href: "/create",
      icon: PlusSignIcon,
      key: "create",
    },
    {
      name: t("Routes.progress"),
      href: "/athlete/progress",
      icon: AnalyticsUpIcon,
      key: "progress",
    },
    {
      name: t("Routes.profile"),
      href: "/athlete/profile",
      icon: User02Icon,
      key: "profile",
    },
  ];

  return (
    <>
      <div className="sm:hidden fixed right-0 top-0">
        <AvatarDropDown />
      </div>
      <div className="sm:ml-24">{children}</div>
      <SideBar routes={routes} />
    </>
  );
}
