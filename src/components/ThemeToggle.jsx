"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full bg-emerald-800/40 hover:bg-emerald-800/70 text-emerald-100 transition-colors text-xs font-semibold flex items-center justify-center w-9 h-9"
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
