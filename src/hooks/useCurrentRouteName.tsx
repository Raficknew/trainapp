import { usePathname } from "next/navigation";

export const useCurrentRouteName = () => {
  const pathname = usePathname();
  const route = pathname.split("/")[2];
  return route;
};
