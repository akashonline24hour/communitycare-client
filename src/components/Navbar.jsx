"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Logged out successfully!");
          router.push("/login");
        },
        onError: (ctx) => {
          toast.error(ctx.error?.message || "Failed to log out");
        },
      },
    });
  };

  return (
    <nav className="bg-[#0b3c3d] dark:bg-[#072425] text-white shadow-lg sticky top-0 z-50 border-b border-emerald-900/50 dark:border-emerald-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo / Brand Name */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              href="/"
              className="text-base sm:text-lg font-bold tracking-wider uppercase text-white hover:text-emerald-300 dark:hover:text-emerald-400 transition-colors"
            >
              HERMIONE COMMUNITY EVENTS
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <Link
              href="/events"
              className="hover:text-emerald-300 dark:hover:text-emerald-400 transition-colors"
            >
              Upcoming Events
            </Link>
            <Link
              href="/gallery"
              className="hover:text-emerald-300 dark:hover:text-emerald-400 transition-colors"
            >
              Gallery
            </Link>
            <Link
              href="/newsletter"
              className="hover:text-emerald-300 dark:hover:text-emerald-400 transition-colors"
            >
              Newsletter
            </Link>
          </div>

          {/* Right side: Controls & Profile */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />

            {isPending ? (
              <div className="w-10 h-10 rounded-full bg-emerald-800/60 dark:bg-emerald-900/60 animate-pulse" />
            ) : session ? (
              <div className="relative">
                <div
                  className="relative flex items-center cursor-pointer group"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <Image
                    src={
                      session.user.image ||
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
                    }
                    alt={session.user.name || "User Avatar"}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full border-2 border-emerald-400 dark:border-emerald-500 object-cover shadow-sm group-hover:scale-105 transition-transform"
                  />

                  {/* Hover Display Name */}
                  <span className="absolute bottom-[-36px] left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-800 text-white text-xs px-2.5 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {session.user.name}
                  </span>
                </div>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div
                    className="absolute right-0 mt-3 w-52 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-xl shadow-xl py-2 ring-1 ring-black/5 z-50 border border-gray-100 dark:border-gray-800"
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800">
                      <p className="text-sm font-semibold truncate">
                        {session.user.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {session.user.email}
                      </p>
                    </div>
                    <Link
                      href="/events/create"
                      className="block px-4 py-2 text-sm hover:bg-emerald-50 dark:hover:bg-gray-800 transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Create Event
                    </Link>
                    <Link
                      href="/events/manage"
                      className="block px-4 py-2 text-sm hover:bg-emerald-50 dark:hover:bg-gray-800 transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Manage Events
                    </Link>
                    <Link
                      href="/events/joined"
                      className="block px-4 py-2 text-sm hover:bg-emerald-50 dark:hover:bg-gray-800 transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Joined Events
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 border-t border-gray-100 dark:border-gray-800 font-medium transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-transparent hover:bg-emerald-600 dark:hover:bg-emerald-700 border border-white dark:border-emerald-300 text-white px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase shadow transition-all duration-200"
              >
                LOG IN
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
