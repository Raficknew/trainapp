"use client";
import { redirect } from "next/navigation";
import { useTranslations } from "next-intl";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/features/auth/client/auth-client";
import { useCurrentRouteName } from "@/hooks/useCurrentRouteName";
import { cn } from "@/lib/utils";
import { SignOutButton } from "../atoms/SignOutButton";

export function AvatarDropDown() {
  const { data } = authClient.useSession();
  const t = useTranslations();
  const currentRoute = useCurrentRouteName();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar>
            <AvatarImage
              src={data?.user.image ?? undefined}
              alt="user-picture"
            />
            <AvatarFallback>{data?.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem
            className={cn(currentRoute === "profile" && "pointer-events-none")}
            onClick={() => redirect("/athlete/profile")}
          >
            {t("Routes.profile")}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <SignOutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
