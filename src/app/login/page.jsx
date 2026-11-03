"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    await authClient.signIn.email({
      email,
      password,
      fetchOptions: {
        onSuccess: () => {
          toast.success("Welcome back!");
          router.push("/");
        },
        onError: (ctx) => {
          toast.error(ctx.error?.message || "Invalid credentials");
          setLoading(false);
        },
      },
    });
  };

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

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0b3c3d] text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0b3c3d] text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
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
