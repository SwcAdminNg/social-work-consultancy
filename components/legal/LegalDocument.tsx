import type { LucideIcon } from "lucide-react";

export type LegalSection = {
  id: string;
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  // Cream tone for a closing contact or action card.
  tone?: "default" | "gold";
};

/**
 * A long document: a sticky table of contents on large screens and the
 * sections as bordered cards with their icons. Used by the privacy and
 * terms pages.
 */
export default function LegalDocument({
  intro,
  sections,
}: {
  intro?: React.ReactNode;
  sections: LegalSection[];
}) {
  return (
    <section aria-label="Document" className="py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        <aside className="hidden lg:block lg:col-span-4">
          <nav aria-label="Contents" className="sticky top-28 rounded-2xl bg-mint p-5">
            <p className="t-eyebrow text-forest-700">Contents</p>
            <ol className="mt-3 list-none m-0 p-0 space-y-0.5">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[0.92rem] font-medium text-ink no-underline hover:bg-white hover:text-forest transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700/40"
                    >
                      <Icon className="w-4 h-4 shrink-0 text-forest-700" aria-hidden="true" />
                      {section.title}
                    </a>
                  </li>
                );
              })}
            </ol>
          </nav>
        </aside>

        <div className="lg:col-span-8 space-y-5">
          {intro && <div className="rounded-2xl bg-cream p-6 sm:p-8">{intro}</div>}
          {sections.map((section) => {
            const Icon = section.icon;
            const accent = section.tone === "gold";
            return (
              <article
                key={section.id}
                id={section.id}
                aria-labelledby={`${section.id}-title`}
                className={`scroll-mt-28 rounded-2xl p-6 sm:p-8 ${
                  accent ? "bg-cream border border-[#ece3cf]" : "bg-white border border-[#e3e9e5]"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`flex items-center justify-center w-11 h-11 shrink-0 rounded-full ${
                      accent ? "bg-gold text-white" : "bg-mint-200 text-forest-700"
                    }`}
                  >
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <h2 id={`${section.id}-title`} className="t-h3 text-forest">
                    {section.title}
                  </h2>
                </div>
                <div className="mt-5 space-y-4 t-body text-muted">{section.children}</div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// A bulleted point inside a section.
export function Point({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3.5">
      <span className="mt-[0.6rem] w-1.5 h-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
      <span>{children}</span>
    </li>
  );
}

// Emphasised words inside a point.
export function Term({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold text-ink">{children}</strong>;
}
