"use client";

import { useId, useState } from "react";
import { Minus, Plus } from "lucide-react";
import Container from "@/components/ui/Container";
import { faqs } from "./content";

/**
 * Frequently asked questions: the heading on the left and an accordion of
 * white rows on the right. Each row is a button that states whether its
 * answer is open; several can be open at once.
 */
export default function HomeFAQ() {
  const [open, setOpen] = useState<Set<number>>(new Set());
  const base = useId();

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <section
      id="faqs"
      aria-labelledby="faqs-heading"
      className="bg-mint py-14 sm:py-20 scroll-mt-24"
    >
      <Container className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14 items-start">
        <div className="lg:sticky lg:top-28">
          <p className="t-eyebrow text-forest-700">FAQs</p>
          <h2 id="faqs-heading" className="mt-3 t-h2 text-forest">
            {faqs.title}
          </h2>
        </div>
        <ul className="list-none m-0 p-0 space-y-2.5">
          {faqs.items.map((item, i) => {
            const isOpen = open.has(i);
            const panel = `${base}-a${i}`;
            const button = `${base}-q${i}`;
            return (
              <li key={item.q} className="bg-white rounded-lg border border-[#dfe8e3]">
                <h3>
                  <button
                    id={button}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panel}
                    onClick={() => toggle(i)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left text-[0.98rem] font-medium text-ink hover:text-forest-700 rounded-lg cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700/40"
                  >
                    {item.q}
                    {isOpen ? (
                      <Minus className="w-5 h-5 shrink-0 text-forest-700" aria-hidden="true" />
                    ) : (
                      <Plus className="w-5 h-5 shrink-0 text-forest-700" aria-hidden="true" />
                    )}
                  </button>
                </h3>
                <div
                  id={panel}
                  role="region"
                  aria-labelledby={button}
                  hidden={!isOpen}
                  className="px-5 pb-5 space-y-3 text-[0.95rem] leading-relaxed text-muted"
                >
                  {item.a.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
