"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

export type NavLink = {
  label: string;
  href: string;
};

type NavDropdownProps = {
  label: string;
  items: NavLink[];
};

export function NavDropdown({ label, items }: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:hover:text-white"
      >
        {label}
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label={label}
          className="absolute left-0 top-full z-10 mt-2 w-56 rounded-xl border border-black/5 bg-white p-2 shadow-lg shadow-black/5 dark:border-white/10 dark:bg-neutral-900"
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function MobileNavAccordion({ label, items }: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="border-b border-black/5 last:border-b-0 dark:border-white/10">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center justify-between py-3 text-left text-base font-medium text-neutral-800 dark:text-neutral-100"
      >
        {label}
        <ChevronDown
          className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div id={panelId} className="flex flex-col gap-1 pb-3 pl-3">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
