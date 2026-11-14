"use client";

import { useEffect } from "react";

/**
 * The site follows the client's concepts, which are light only. This
 * clears any dark preference saved by the earlier design so returning
 * visitors see the same pages as everyone else.
 */
export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.documentElement.classList.remove("dark");
    try {
      localStorage.removeItem("theme");
    } catch {
      // Storage can be unavailable; nothing to clear then.
    }
  }, []);

  return <>{children}</>;
}
