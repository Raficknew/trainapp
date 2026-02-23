import {
  AnalyticsUpIcon,
  Calendar03Icon,
  DashboardSquare01Icon,
  PlusSignIcon,
  User02Icon,
} from "@hugeicons/core-free-icons";
import type { ReactNode } from "react";
import { AvatarDropDown } from "@/components/molecules/AvatarDropDown";
import { NavBar } from "@/components/organisms/NavBar";

const routes = [
  {
    name: "Dashboard",
    href: "/athlete/dashboard",
    icon: DashboardSquare01Icon,
  },
  { name: "Calendar", href: "/athlete/calendar", icon: Calendar03Icon },
  { name: "Create", href: "/training/create", icon: PlusSignIcon },
  { name: "Progress", href: "/athlete/progress", icon: AnalyticsUpIcon },
  { name: "Profile", href: "/athlete/profile", icon: User02Icon },
];

export default async function AthleteLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <div className="sm:hidden fixed right-0 top-0">
        <AvatarDropDown />
      </div>
      <div className="sm:ml-28">{children}</div>
      <NavBar routes={routes} />
    </>
  );
}
