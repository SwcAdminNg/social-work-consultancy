import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { GoldRule } from "@/components/ui/SectionHeading";

// Shown for any address that does not match a page.
export default function NotFound() {
  return (
    <main className="min-h-[100dvh] flex items-center justify-center bg-cream px-4 py-16">
      <div className="max-w-2xl text-center">
        <span className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-forest-700 text-white">
          <Compass className="w-9 h-9" strokeWidth={1.75} aria-hidden="true" />
        </span>
        <p className="mt-8 font-serif text-[5rem] sm:text-[7rem] leading-none font-semibold text-forest">
          404
        </p>
        <h1 className="mt-4 t-h2 text-forest">This page could not be found</h1>
        <GoldRule className="mx-auto mt-5" />
        <p className="mt-5 t-lead text-muted">
          The page you are looking for does not exist or has been moved. Use the
          button below to return to the home page.
        </p>
        <Link
          href="/"
          className="group mt-8 inline-flex items-center justify-center gap-2 min-h-12 px-6 rounded-full bg-forest-700 text-white font-semibold no-underline hover:bg-forest transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-forest-700/40"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
          Return Home
        </Link>
      </div>
    </main>
  );
}
