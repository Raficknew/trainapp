"use client";

import { authClient } from "@/features/auth/auth-client";

export default function SignInPage() {
  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div>
      <h1>Sign In</h1>
      <button type="submit" onClick={handleGoogleSignIn}>
        Sign in with Google
      </button>
    </div>
  );
}
