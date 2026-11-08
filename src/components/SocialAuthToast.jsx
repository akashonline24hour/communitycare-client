"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

// Shows the success toast after Google/GitHub sign-in, then cleans the URL
export default function SocialAuthToast() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (isPending) return;

    const params = new URLSearchParams(window.location.search);
    const provider = params.get("social");
    if (!provider) return;

    if (session) {
      const name = provider === "github" ? "GitHub" : "Google";
      toast.success(
        params.get("new")
          ? `Account created successfully with ${name}!`
          : `Welcome back! Signed in with ${name}.`,
        { toastId: "social-auth" },
      );
    }

    // Remove the social flags from the URL so the toast doesn't repeat on reload
    params.delete("social");
    params.delete("new");
    const rest = params.toString();
    const path = window.location.pathname;
    router.replace(rest ? `${path}?${rest}` : path);
  }, [isPending, session, router]);

  return null;
}
