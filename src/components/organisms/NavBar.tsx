"use client";
import type { DashboardSquare01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { AvatarDropDown } from "../molecules/AvatarDropDown";

type Route = {
  name: string;
  href: string;
  icon: typeof DashboardSquare01Icon;
};

export function NavBar({ routes }: { routes: Route[] }) {
  const pathname = usePathname();
  const currentRoute = getCurrentRoute(pathname);

  return (
    <div className="fixed bottom-0 w-full bg-[#111111] justify-evenly py-4 sm:py-8 sm:w-fit sm:h-full sm:px-4  sm:flex-col flex sm:justify-start  sm:gap-5">
      <div className="sm:flex hidden self-center">LOGO</div>
      {routes.map((route) => {
        const isCurrentRoute = currentRoute === route.name;
        const isCreateTrainingRoute = route.name === "Create";
        return (
          <Link
            className={cn("flex flex-col items-center")}
            key={route.name}
            href={route.href}
          >
            <div
              className={cn(
                "flex p-2.5 rounded-lg mb-1 text-muted-foreground",
                isCurrentRoute && "bg-[#c8ff0038] text-primary",
                isCreateTrainingRoute && "bg-primary text-background",
              )}
            >
              <HugeiconsIcon strokeWidth={2} size={20} icon={route.icon} />
            </div>
            <p className="text-xs">{route.name}</p>
          </Link>
        );
      })}
      <div className="sm:flex hidden self-center mt-auto">
        <AvatarDropDown />
      </div>
    </div>
  );
}

const getCurrentRoute = (pathname: string) => {
  return (
    pathname.split("/")[2].charAt(0).toUpperCase() +
    pathname.split("/")[2].slice(1)
  );
};
