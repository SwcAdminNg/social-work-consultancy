"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";

type NavChild = { name: string; href: string; note?: string };
type NavItem = { name: string; href?: string; children?: NavChild[] };

// The navigation drawn in the client's concepts.
export const navItems: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Who We Are", href: "/about-us" },
  {
    name: "What We Do",
    children: [
      {
        name: "E-Learning and Professional Development",
        href: "/e-learning",
        note: "Practical learning for practice",
      },
      {
        name: "Research and Evaluation",
        href: "/research-and-evaluation",
        note: "Evidence to inform better decisions",
      },
      {
        name: "Policy and Advocacy",
        href: "/policy-and-advocacy",
        note: "Turning evidence into better policy",
      },
    ],
  },
  {
    name: "Work With Us",
    children: [
      {
        name: "Partner With Us",
        href: "/partner-with-us",
        note: "Collaborate on learning, research and policy",
      },
      {
        name: "Careers and Volunteering",
        href: "/careers-and-volunteering",
        note: "Contribute your skills",
      },
      {
        name: "Mentorship Programme",
        href: "/mentorship",
        note: "Learn alongside experienced practitioners",
      },
    ],
  },
];

// Height of the header bar.
export const HEADER_HEIGHT = 76;

const isActive = (pathname: string, item: NavItem) =>
  item.href
    ? pathname === item.href
    : (item.children ?? []).some((c) => pathname.startsWith(c.href));

/**
 * Site header, as in the concepts: a white bar with the approved logo on
 * the left, the four navigation items and the green Contact Us button on
 * the right. The two grouped items open a small menu on click, hover or
 * keyboard. On phones the items move into a panel under the bar.
 */
export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  // Set when a mouse opened the menu by hovering, so the click that
  // usually follows keeps it open instead of closing it again.
  const hoverOpened = useRef(false);

  // Close menus when the route changes (adjusted during render).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(null);
    setMobileOpen(false);
  }

  // Escape and outside clicks close any open menu.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobileOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpen(null);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  const linkBase =
    "relative inline-flex items-center gap-1 h-11 px-3 xl:px-4 text-[0.95rem] font-medium no-underline rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700/40";
  const underline = (active: boolean) =>
    `absolute left-3 right-3 xl:left-4 xl:right-4 -bottom-0.5 h-[2px] rounded-full bg-gold transition-opacity ${
      active ? "opacity-100" : "opacity-0"
    }`;

  return (
    <header
      ref={navRef}
      className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[#e6ebe8]"
    >
      <nav
        aria-label="Primary"
        className="mx-auto max-w-6xl px-4 sm:px-6 h-[76px] flex items-center gap-6"
      >
        <Link
          href="/"
          className="flex items-center shrink-0 no-underline rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700/40"
          aria-label="Social Work Consultancy Ltd home"
        >
          <img
            src="/images/logo/swc-dark-logo-trim.png"
            alt="Social Work Consultancy Ltd"
            width={1322}
            height={386}
            className="h-11 sm:h-12 w-auto object-contain"
          />
        </Link>

        <ul className="hidden lg:flex items-center gap-1 list-none m-0 p-0 ml-auto">
          {navItems.map((item) => {
            const active = isActive(pathname, item);
            if (item.href) {
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`${linkBase} ${active ? "text-forest" : "text-ink hover:text-forest-700"}`}
                  >
                    {item.name}
                    <span className={underline(active)} aria-hidden="true" />
                  </Link>
                </li>
              );
            }
            const expanded = open === item.name;
            const menuId = `menu-${item.name.toLowerCase().replace(/\s+/g, "-")}`;
            return (
              <li
                key={item.name}
                className="relative"
                onPointerEnter={(e) => {
                  if (e.pointerType !== "mouse") return;
                  hoverOpened.current = true;
                  setOpen(item.name);
                }}
                onPointerLeave={(e) => {
                  if (e.pointerType !== "mouse") return;
                  hoverOpened.current = false;
                  setOpen((o) => (o === item.name ? null : o));
                }}
              >
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={menuId}
                  onClick={() => {
                    if (expanded && hoverOpened.current) {
                      hoverOpened.current = false;
                      return;
                    }
                    setOpen(expanded ? null : item.name);
                  }}
                  className={`${linkBase} cursor-pointer ${active ? "text-forest" : "text-ink hover:text-forest-700"}`}
                >
                  {item.name}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                  <span className={underline(active)} aria-hidden="true" />
                </button>
                <div
                  id={menuId}
                  hidden={!expanded}
                  className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[22rem]"
                >
                  <ul className="list-none m-0 p-2 bg-white rounded-xl border border-[#e6ebe8] shadow-[0_24px_50px_-24px_rgba(15,61,46,0.35)]">
                    {item.children!.map((child) => {
                      const current = pathname === child.href;
                      return (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            aria-current={current ? "page" : undefined}
                            className={`block px-4 py-3 rounded-lg no-underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700/40 ${
                              current ? "bg-mint" : "hover:bg-cream"
                            }`}
                          >
                            <span className="block text-[0.95rem] font-semibold text-forest">
                              {child.name}
                            </span>
                            {child.note && (
                              <span className="block mt-0.5 text-[0.82rem] text-muted">
                                {child.note}
                              </span>
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>

        <Link
          href="/contact"
          aria-current={pathname === "/contact" ? "page" : undefined}
          className="hidden lg:inline-flex items-center h-11 px-6 rounded-full bg-forest-700 text-white text-[0.95rem] font-semibold no-underline hover:bg-forest transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-forest-700/40"
        >
          Contact Us
        </Link>

        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="lg:hidden ml-auto inline-flex items-center justify-center w-11 h-11 rounded-full text-forest hover:bg-mint cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700/40"
        >
          {mobileOpen ? (
            <X className="w-6 h-6" aria-hidden="true" />
          ) : (
            <Menu className="w-6 h-6" aria-hidden="true" />
          )}
        </button>
      </nav>

      {mobileOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden border-t border-[#e6ebe8] bg-white max-h-[calc(100dvh-76px)] overflow-y-auto"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4">
            <ul className="list-none m-0 p-0 divide-y divide-[#eef1ef]">
              {navItems.map((item) => (
                <li key={item.name} className="py-2">
                  {item.href ? (
                    <Link
                      href={item.href}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className={`block py-2 text-[1.05rem] font-semibold no-underline ${
                        pathname === item.href ? "text-forest-700" : "text-forest"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <>
                      <p className="pt-2 pb-1 t-eyebrow text-gold-600">{item.name}</p>
                      <ul className="list-none m-0 p-0">
                        {item.children!.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              aria-current={pathname === child.href ? "page" : undefined}
                              className={`block py-2 text-[1rem] no-underline ${
                                pathname === child.href
                                  ? "text-forest-700 font-semibold"
                                  : "text-ink"
                              }`}
                            >
                              {child.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="mt-4 flex items-center justify-center h-12 rounded-full bg-forest-700 text-white font-semibold no-underline hover:bg-forest"
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
