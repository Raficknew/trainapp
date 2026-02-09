"use client";
import { authClient } from "@/features/auth/client/auth-client";

export default function SignInPage() {
  const signInWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div>
      <h1>Sign In</h1>
      <button type="submit" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    </div>
  );
}
