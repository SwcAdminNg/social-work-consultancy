import { ChevronDown, Heart, Share2, Users, type LucideIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { learningCategories } from "./content";

const icons: Record<string, LucideIcon> = {
  skills: Users,
  digital: Share2,
  law: Heart,
};

/**
 * "Explore Learning That Reflects Your Responsibilities": three pale green
 * cards, each with its icon, title, line and description, and the area's
 * learning themes one click away.
 */
export default function LearningCategories() {
  return (
    <section
      id="learning-areas"
      aria-labelledby="areas-heading"
      className="pb-12 scroll-mt-24"
    >
      <Container>
        <SectionHeading
          id="areas-heading"
          eyebrow="Our course categories"
          title={learningCategories.title}
          intro={learningCategories.intro}
          className="max-w-4xl"
        />
        <ul className="list-none m-0 p-0 mt-10 grid gap-5 md:grid-cols-3 items-start">
          {learningCategories.items.map((c) => {
            const Icon = icons[c.id] ?? Users;
            return (
              <li key={c.id} className="bg-mint rounded-xl p-6">
                <div className="flex gap-4">
                  <Icon className="w-9 h-9 shrink-0 text-forest-700" strokeWidth={1.75} aria-hidden="true" />
                  <div>
                    <h3 className="text-[1.05rem] font-bold text-forest leading-snug">{c.title}</h3>
                    <p className="mt-1.5 text-[0.93rem] font-medium text-forest-700">{c.tagline}</p>
                  </div>
                </div>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-muted">{c.text}</p>
                <details className="group mt-4">
                  <summary className="inline-flex items-center gap-1.5 list-none cursor-pointer text-[0.93rem] font-semibold text-forest-700 hover:text-forest rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700/40 [&::-webkit-details-marker]:hidden">
                    {learningCategories.themesLabel}
                    <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <ul className="mt-3 space-y-2 text-[0.92rem] text-ink list-none p-0">
                    {c.themes.map((t) => (
                      <li key={t} className="flex gap-2.5">
                        <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                        {t}.
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
