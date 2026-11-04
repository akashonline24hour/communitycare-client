"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ThemeToggle from "@/components/ThemeToggle";
import {
  Star,
  Menu,
  X,
  PlusCircle,
  Calendar,
  CheckSquare,
  LogOut,
  Sparkles,
  Images,
  Mail,
  ChevronDown,
} from "lucide-react";

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Logged out successfully!");
          setDropdownOpen(false);
          router.push("/login");
        },
        onError: (ctx) => {
          toast.error(ctx.error?.message || "Failed to log out");
        },
      },
    });
  };

  return (
    <nav className="bg-[#0b3c3d]/95 dark:bg-[#072425]/95 backdrop-blur-md text-white shadow-xl sticky top-0 z-50 border-b border-emerald-900/40 dark:border-emerald-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo / Brand Name */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              href="/"
              className="flex items-center gap-2.5 text-base sm:text-lg font-bold tracking-wider uppercase group"
            >
              <div className="p-2.5 rounded-2xl bg-emerald-900/40 dark:bg-emerald-950/60 border border-emerald-700/40 shadow-inner group-hover:scale-105 transition-transform">
                <Star className="w-5 h-5 text-emerald-400 dark:text-emerald-300 fill-emerald-400/20" />
              </div>
              <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-orange-400 bg-clip-text text-transparent font-extrabold tracking-tight">
                <span className="hidden sm:inline">HERMIONE</span> COMMUNITY
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 text-xs font-bold uppercase tracking-wider">
            <Link
              href="/events"
              className="hover:text-emerald-300 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5"
            >
              <Calendar size={15} className="text-[#f07b42]" /> Upcoming Events
            </Link>
            <Link
              href="/gallery"
              className="hover:text-emerald-300 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5"
            >
              <Images size={15} className="text-[#f07b42]" /> Gallery
            </Link>
            <Link
              href="/newsletter"
              className="hover:text-emerald-300 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5"
            >
              <Mail size={15} className="text-[#f07b42]" /> Newsletter
            </Link>
          </div>

          {/* Right side: Controls, Profile & Mobile Hamburger Button */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <ThemeToggle />

            {isPending ? (
              <div className="w-10 h-10 rounded-full bg-emerald-800/60 dark:bg-emerald-900/60 animate-pulse" />
            ) : session ? (
              <div className="relative" ref={dropdownRef}>
                {/* User Avatar Trigger */}
                <div
                  className="flex items-center gap-2 cursor-pointer group p-1 rounded-full bg-emerald-900/30 border border-emerald-700/40 hover:border-emerald-400 transition-all"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden shadow-sm">
                    <Image
                      src={
                        session.user.image ||
                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
                      }
                      alt={session.user.name || "User Avatar"}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <ChevronDown
                    size={14}
                    className="text-emerald-300 hidden sm:block mr-1 group-hover:translate-y-0.5 transition-transform"
                  />
                </div>

                {/* Modern Dropdown Menu Popover */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-60 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-3xl shadow-2xl py-3 px-2 z-50 border border-gray-100 dark:border-gray-800 animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* User Info Header */}
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 mb-2 space-y-0.5">
                      <p className="text-sm font-bold truncate text-gray-900 dark:text-white">
                        {session.user.name}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 truncate">
                        {session.user.email}
                      </p>
                    </div>

                    {/* Navigation Items with Icons */}
                    <div className="space-y-1">
                      <Link
                        href="/events/create"
                        className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 hover:text-[#0b3c3d] dark:hover:text-emerald-300 transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <div className="p-1.5 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-[#f07b42]">
                          <PlusCircle size={15} />
                        </div>
                        <span>Create Event</span>
                      </Link>

                      <Link
                        href="/events/manage"
                        className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 hover:text-[#0b3c3d] dark:hover:text-emerald-300 transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <div className="p-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-[#0b3c3d] dark:text-emerald-400">
                          <Calendar size={15} />
                        </div>
                        <span>Manage Events</span>
                      </Link>

                      <Link
                        href="/events/joined"
                        className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 hover:text-[#0b3c3d] dark:hover:text-emerald-300 transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <div className="p-1.5 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                          <CheckSquare size={15} />
                        </div>
                        <span>Joined Events</span>
                      </Link>
                    </div>

                    <hr className="my-2 border-gray-100 dark:border-gray-800" />

                    {/* Logout Button */}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors"
                    >
                      <div className="p-1.5 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-500">
                        <LogOut size={15} />
                      </div>
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-[#f07b42] hover:bg-[#e06a35] dark:bg-[#e06a35] dark:hover:bg-[#c95926] text-white px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase shadow-md transition-all duration-200"
              >
                Log In
              </Link>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-emerald-900/40 hover:bg-emerald-800/60 transition-colors text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#072b2c] dark:bg-[#051a1b] border-t border-emerald-900/50 px-6 py-5 space-y-4 animate-in fade-in slide-in-from-top-2">
          <Link
            href="/events"
            className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider hover:text-emerald-300 py-2 border-b border-emerald-900/30"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Calendar size={16} className="text-[#f07b42]" /> Upcoming Events
          </Link>
          <Link
            href="/gallery"
            className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider hover:text-emerald-300 py-2 border-b border-emerald-900/30"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Images size={16} className="text-[#f07b42]" /> Gallery
          </Link>
          <Link
            href="/newsletter"
            className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider hover:text-emerald-300 py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Mail size={16} className="text-[#f07b42]" /> Newsletter
          </Link>
        </div>
      )}
    </nav>
  );
}
