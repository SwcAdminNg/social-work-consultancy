"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MobileNavAccordion, NavDropdown, type NavLink } from "./nav-dropdown";
import { ThemeToggle } from "./theme-toggle";

type NavEntry =
  | { label: string; href: string; items?: undefined }
  | { label: string; href?: undefined; items: NavLink[] };

const navigation: NavEntry[] = [
  { label: "Home", href: "/" },
  {
    label: "Who We Are",
    items: [
      { label: "About Us", href: "/who-we-are/about" },
      { label: "Our Team", href: "/who-we-are/team" },
      { label: "Our Values", href: "/who-we-are/values" },
    ],
  },
  {
    label: "What We Do",
    items: [
      { label: "Consultancy", href: "/what-we-do/consultancy" },
      { label: "Training", href: "/what-we-do/training" },
      { label: "Research", href: "/what-we-do/research" },
    ],
  },
  {
    label: "Work With Us",
    items: [
      { label: "Careers", href: "/work-with-us/careers" },
      { label: "Volunteer", href: "/work-with-us/volunteer" },
      { label: "Partnerships", href: "/work-with-us/partnerships" },
    ],
  },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMobileOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:border-white/10 dark:bg-neutral-950/95 dark:supports-[backdrop-filter]:bg-neutral-950/80">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3"
          onClick={() => setMobileOpen(false)}
        >
          <Image
            src="/logo/swc-dark-logo.png"
            alt="Social Work Consultancy Ltd"
            width={244}
            height={244}
            className="h-50 w-50 object-contain sm:h-51 sm:w-51"
            priority
          />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {navigation.map((entry) =>
            entry.items ? (
              <NavDropdown
                key={entry.label}
                label={entry.label}
                items={entry.items}
              />
            ) : (
              <Link
                key={entry.label}
                href={entry.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  pathname === entry.href
                    ? "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-white"
                    : "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:hover:text-white"
                }`}
              >
                {entry.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <Link
            href="/contact"
            className="rounded-full bg-emerald-800 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-900"
          >
            Contact Us
          </Link>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-panel"
            className="flex h-10 w-10 items-center justify-center rounded-full text-neutral-700 transition-colors hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800"
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav-panel"
        className={`overflow-hidden border-t border-black/5 bg-white transition-[max-height] duration-300 ease-in-out lg:hidden dark:border-white/10 dark:bg-neutral-950 ${
          mobileOpen ? "max-h-[calc(100vh-5rem)] overflow-y-auto" : "max-h-0"
        }`}
      >
        <nav
          aria-label="Mobile"
          className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6"
        >
          {navigation.map((entry) =>
            entry.items ? (
              <MobileNavAccordion
                key={entry.label}
                label={entry.label}
                items={entry.items}
              />
            ) : (
              <Link
                key={entry.label}
                href={entry.href}
                className={`rounded-lg px-3 py-3 text-base font-medium ${
                  pathname === entry.href
                    ? "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-white"
                    : "text-neutral-800 hover:bg-neutral-100 dark:text-neutral-100 dark:hover:bg-neutral-800"
                }`}
              >
                {entry.label}
              </Link>
            ),
          )}
          <Link
            href="/contact"
            className="mt-2 rounded-full bg-emerald-800 px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-emerald-900"
          >
            Contact Us
          </Link>
        </nav>
      </div>
    </header>
  );
}
