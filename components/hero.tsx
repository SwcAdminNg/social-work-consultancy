import Image from "next/image";
import Link from "next/link";

type QuickLink = {
  label: string;
  href: string;
  variant: "light" | "glass" | "accent";
};

const quickLinks: QuickLink[] = [
  { label: "Home", href: "/", variant: "light" },
  { label: "E-Learning", href: "/e-learning", variant: "glass" },
  { label: "Research", href: "/research", variant: "accent" },
  {
    label: "Policy and Advocacy",
    href: "/policy-and-advocacy",
    variant: "glass",
  },
];

const variantClasses: Record<QuickLink["variant"], string> = {
  light: "bg-white text-neutral-900 hover:bg-neutral-100",
  glass:
    "border border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20",
  accent: "bg-amber-600 text-white hover:bg-amber-700",
};

export function Hero() {
  return (
    <div className="relative">
      <section className="relative isolate flex min-h-[560px] items-center overflow-hidden bg-neutral-900 pb-16 sm:min-h-[640px] sm:pb-20 lg:min-h-[720px]">
        <Image
          src="/home/hero-image.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="flex flex-col gap-1 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              <span className="flex items-center gap-4">
                Empowering Social Work Practice
                <span
                  aria-hidden="true"
                  className="hidden h-px w-16 shrink-0 bg-amber-500 sm:block"
                />
              </span>
              <span>Across Nigeria and Beyond</span>
            </h1>
            <p className="mt-6 max-w-xl text-base text-neutral-200 sm:text-lg">
              Training, research, and consultancy designed to strengthen social
              services and create meaningful community impact.
            </p>
          </div>
        </div>
      </section>

      <div className="relative z-10 mx-auto -mt-10 w-full max-w-5xl px-4 sm:-mt-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-xl px-4 py-4 text-center text-xs font-semibold tracking-wide uppercase shadow-lg shadow-black/10 transition-colors sm:text-sm ${variantClasses[link.variant]}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
