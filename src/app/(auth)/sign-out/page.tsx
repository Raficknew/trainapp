import { redirect } from "next/navigation";
import { authClient } from "@/features/auth/client/auth-client";

export default async function SignOutPage() {
  return await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        redirect("/sign-in");
      },
    },
  });
}
