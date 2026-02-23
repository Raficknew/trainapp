import {
  Activity01Icon,
  Calendar03Icon,
  DashboardSquare01Icon,
  PlusSignIcon,
  User02Icon,
} from "@hugeicons/core-free-icons";
import type { ReactNode } from "react";
import { Sidebar } from "@/components/organisms/Sidebar";

const routes = [
  {
    name: "Dashboard",
    href: "/athlete/dashboard",
    icon: DashboardSquare01Icon,
  },
  { name: "Calendar", href: "/athlete/calendar", icon: Calendar03Icon },
  { name: "Create", href: "/training/create", icon: PlusSignIcon },
  { name: "Progress", href: "/athlete/progress", icon: Activity01Icon },
  { name: "Profile", href: "/athlete/profile", icon: User02Icon },
];

export default async function AthleteLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      {children}
      <Sidebar routes={routes} />
    </>
  );
}
