import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Variant = "primary" | "gold" | "outline" | "light";

const tones: Record<Variant, string> = {
  primary:
    "bg-forest-700 text-white hover:bg-forest focus-visible:ring-forest-700/40",
  gold: "bg-gold text-forest hover:bg-gold-600 hover:text-white focus-visible:ring-gold/50",
  outline:
    "bg-white text-forest-700 ring-1 ring-inset ring-forest-700/30 hover:bg-mint focus-visible:ring-forest-700/40",
  light:
    "bg-white/10 text-white ring-1 ring-inset ring-white/50 hover:bg-white hover:text-forest focus-visible:ring-white/50",
};

export const buttonClass = (variant: Variant = "primary", extra = "") =>
  `group inline-flex items-center justify-center gap-2 min-h-12 px-6 py-3 rounded-full text-[0.95rem] font-semibold text-center no-underline transition-colors duration-200 focus-visible:outline-none focus-visible:ring-4 ${tones[variant]} ${extra}`;

/**
 * The rounded button used across the site: green by default, with gold,
 * outline and on-photo variants. Internal paths use client navigation;
 * in-page anchors, mail and external links use a plain anchor.
 */
export default function ButtonLink({
  href,
  children,
  variant = "primary",
  arrow = true,
  className = "",
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}) {
  const content = (
    <>
      {children}
      {arrow && (
        <ArrowRight
          className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      )}
    </>
  );
  const cls = buttonClass(variant, className);
  const external = /^https?:\/\//.test(href);
  if (href.startsWith("/") && !href.startsWith("//")) {
    return (
      <Link href={href} className={cls} onClick={onClick}>
        {content}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className={cls}
      onClick={onClick}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {content}
    </a>
  );
}

/** A text link with an arrow, like the concepts' "Find out more" links. */
export function ArrowLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const cls = `group inline-flex items-center gap-1.5 text-[0.95rem] font-semibold text-forest-700 hover:text-forest no-underline rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700/40 ${className}`;
  const content = (
    <>
      {children}
      <ArrowRight
        className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </>
  );
  return href.startsWith("/") ? (
    <Link href={href} className={cls}>
      {content}
    </Link>
  ) : (
    <a href={href} className={cls}>
      {content}
    </a>
  );
}
