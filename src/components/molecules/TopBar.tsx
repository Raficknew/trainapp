"use client";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRouter } from "next/navigation";

export function TopBar({ title }: { title: string }) {
  const router = useRouter();
  return (
    <nav className="flex w-full items-center sm:justify-start sm:gap-4 justify-between sm:p-8 p-4">
      <div className="p-2 bg-muted rounded-sm cursor-pointer border-2 border-border">
        <HugeiconsIcon
          icon={ArrowLeft01Icon}
          onClick={() => router.back()}
          size={16}
        />
      </div>
      <h2 className="sm:text-2xl text-xl font-semibold">{title}</h2>
      <div className="w-9" />
    </nav>
  );
}
