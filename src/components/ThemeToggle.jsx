"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-900/30 border border-emerald-700/40 animate-pulse" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-emerald-900/40 hover:bg-emerald-800/60 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/80 text-amber-300 dark:text-amber-200 border border-emerald-700/40 hover:border-emerald-400 shadow-inner transition-all duration-300 focus:outline-none cursor-pointer group overflow-hidden"
      aria-label="Toggle Theme"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <div className="relative w-5 h-5 flex items-center justify-center transition-transform duration-500 ease-out group-hover:rotate-45">
        {isDark ? (
          <Sun
            size={18}
            className="text-amber-400 fill-amber-400/20 stroke-[2.2]"
          />
        ) : (
          <Moon
            size={18}
            className="text-amber-300 fill-amber-300/20 stroke-[2.2] -rotate-12"
          />
        )}
      </div>
    </button>
  );
}
