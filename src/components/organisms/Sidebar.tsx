"use client";
import type { DashboardSquare01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type Route = {
  name: string;
  href: string;
  icon: typeof DashboardSquare01Icon;
};

export function Sidebar({ routes }: { routes: Route[] }) {
  const pathname = usePathname();
  const currentRoute = getCurrentRoute(pathname);

  return (
    <div className="fixed bottom-px w-full bg-[#111111] flex justify-between items-center p-4 border-t-background/20 border-t-[0.5px]">
      {routes.map((route) => {
        const isCurrentRoute = currentRoute === route.name;
        const isCreateTrainingRoute = route.name === "Create";
        return (
          <Link
            className={cn("flex flex-col items-center gap-2")}
            key={route.name}
            href={route.href}
          >
            <div
              className={cn(
                "flex p-2.5 rounded-lg",
                isCurrentRoute && "bg-[#c8ff0038] text-accent",
                isCreateTrainingRoute && "bg-accent text-background",
              )}
            >
              <HugeiconsIcon strokeWidth={2} size={25} icon={route.icon} />
            </div>
            <p className="text-xs">{route.name}</p>
          </Link>
        );
      })}
    </div>
  );
}

const getCurrentRoute = (pathname: string) => {
  return (
    pathname.split("/")[2].charAt(0).toUpperCase() +
    pathname.split("/")[2].slice(1)
  );
};
