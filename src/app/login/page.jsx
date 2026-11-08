"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { safeRedirect, withParams } from "@/lib/safeRedirect";
import { toast } from "react-toastify";
import { Mail, Lock } from "lucide-react";

const SOCIAL_ERRORS = {
  access_denied: "Sign-in was cancelled. Please try again.",
  account_not_linked:
    "This email is already registered with a different sign-in method.",
  unable_to_link_account:
    "We couldn't link this account. Try signing in with your email and password.",
  email_not_found: "Your provider did not share an email address.",
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");

  // Error toast when the provider sends the user back with ?error=...
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("error");
    if (!code) return;

    toast.error(
      SOCIAL_ERRORS[code] || "Social sign-in failed. Please try again.",
      { toastId: "social-error" },
    );

    params.delete("error");
    params.delete("error_description");
    const rest = params.toString();
    window.history.replaceState(null, "", rest ? `/login?${rest}` : "/login");
  }, []);

  // Pressing Back from the provider can restore this page with buttons stuck on "Redirecting..."
  useEffect(() => {
    const reset = (e) => {
      if (e.persisted) setSocialLoading("");
    };
    window.addEventListener("pageshow", reset);
    return () => window.removeEventListener("pageshow", reset);
  }, []);

  const getTarget = () =>
    safeRedirect(new URLSearchParams(window.location.search).get("redirect"));

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    const target = getTarget();

    await authClient.signIn.email({
      email: email.trim(),
      password,
      fetchOptions: {
        onSuccess: () => {
          toast.success("Welcome back! Login successful.");
          router.replace(target);
          router.refresh();
        },
        onError: (ctx) => {
          toast.error(ctx.error?.message || "Invalid email or password");
          setLoading(false);
        },
      },
    });
  };

  const handleSocialLogin = async (provider) => {
    setSocialLoading(provider);
    const target = getTarget();

    // The browser leaves for the provider. The success toast is shown by
    // SocialAuthToast on the page the user lands on.
    const { error } = await authClient.signIn.social({
      provider,
      callbackURL: withParams(target, { social: provider }),
      errorCallbackURL:
        target === "/"
          ? "/login"
          : `/login?redirect=${encodeURIComponent(target)}`,
    });

    if (error) {
      toast.error(
        error.message || "Could not start social sign-in. Please try again.",
      );
      setSocialLoading("");
    }
  };

  const busy = loading || !!socialLoading;

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold uppercase tracking-wider text-gray-900 dark:text-white">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Sign in to manage and join community events
          </p>
        </div>

        {/* Social Authentication Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleSocialLogin("google")}
            disabled={busy}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm disabled:opacity-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            {socialLoading === "google" ? "Redirecting..." : "Google"}
          </button>

          <button
            type="button"
            onClick={() => handleSocialLogin("github")}
            disabled={busy}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm disabled:opacity-50"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            {socialLoading === "github" ? "Redirecting..." : "GitHub"}
          </button>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-gray-200 dark:border-gray-800 w-full" />
          <span className="bg-white dark:bg-gray-900 px-3 text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 absolute">
            Or continue with email
          </span>
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleLogin} noValidate className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Mail size={16} />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0b3c3d] text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Lock size={16} />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0b3c3d] text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={busy}
            className="w-full bg-[#f07b42] hover:bg-[#e06a35] dark:bg-[#e06a35] dark:hover:bg-[#c95926] text-white py-3 rounded-full font-bold uppercase text-xs tracking-wider shadow transition-all duration-200 disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="text-center text-xs text-gray-500 dark:text-gray-400">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-[#0b3c3d] dark:text-emerald-400 font-bold hover:underline"
          >
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}
