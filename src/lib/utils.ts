import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isActiveRoute = (pathname: string, routeHref: string): boolean => {
  return pathname === routeHref || pathname.startsWith(`${routeHref}/`);
};
