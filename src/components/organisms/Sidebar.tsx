"use client";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { useCurrentRouteName } from "@/hooks/useCurrentRouteName";
import { cn } from "@/lib/utils";
import type { Route } from "@/types/types";
import { AvatarDropDown } from "../molecules/AvatarDropDown";

export function SideBar({ routes }: { routes: Route[] }) {
  const currentRoute = useCurrentRouteName();

  return (
    <div className="fixed bottom-0 w-full bg-[#111111] py-4 sm:py-8 sm:w-fit sm:h-full sm:px-4  sm:flex-col flex sm:gap-5">
      <div className="sm:flex hidden self-center">LOGO</div>
      <div className="flex sm:flex-col justify-evenly w-full sm:gap-4 ">
        {routes.map((route) => {
          const isCurrentRoute = currentRoute === route.key;
          const isCreateTrainingRoute = route.key === "create";
          return (
            <Link
              className={cn(
                "flex flex-col items-center",
                isCreateTrainingRoute && "sm:order-1",
                isCurrentRoute && "pointer-events-none",
              )}
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
              <p className="sm:hidden text-xs">{route.name}</p>
            </Link>
          );
        })}
      </div>
      <div className="sm:flex hidden self-center mt-auto">
        <AvatarDropDown />
      </div>
    </div>
  );
}
