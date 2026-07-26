"use client";

import { useLayoutEffect } from "react";

export function ThemeSync() {
  useLayoutEffect(() => {
    const stored = window.localStorage.getItem("theme");
    const theme =
      stored === "light" || stored === "dark"
        ? stored
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";

    if (document.documentElement.getAttribute("data-theme") !== theme) {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, []);

  return null;
}
