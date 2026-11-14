import {
  BarChart3,
  BookOpen,
  FileText,
  Lightbulb,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import ButtonLink from "@/components/ui/Button";
import IconCircle, { type IconTone } from "@/components/ui/IconCircle";
import { approach, audiences, expect, offer, opening } from "./content";

// Icons and colours for the five expectations, as in the concept.
const expectMarks: { icon: LucideIcon; tone: IconTone }[] = [
  { icon: UsersRound, tone: "gold" },
  { icon: BookOpen, tone: "slate" },
  { icon: Lightbulb, tone: "goldSoft" },
  { icon: FileText, tone: "mint" },
  { icon: BarChart3, tone: "gold" },
];

/**
 * The E-Learning page as drawn in the client's concept: a white panel on
 * a cream page holding the title, the photograph, the learning offer, its
 * audiences and approach, what learners can expect, and the next step.
 */
export default function Elearning() {
  return (
    <div className="bg-cream py-6 sm:py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <article
          aria-labelledby="page-title"
          className="bg-white rounded-2xl px-4 py-8 sm:px-8 sm:py-10 lg:px-12 shadow-[0_24px_60px_-45px_rgba(15,61,46,0.4)]"
        >
          <h1 id="page-title" className="t-display text-forest text-center">
            {opening.title}
          </h1>
          <img
            src={opening.image}
            alt={opening.imageAlt}
            width={opening.imageWidth}
            height={opening.imageHeight}
            fetchPriority="high"
            className="mt-6 w-full aspect-[4/3] sm:aspect-[16/7] object-cover rounded-2xl"
            style={{ objectPosition: "50% 40%" }}
          />

          <div className="mt-10 max-w-4xl">
            <section aria-labelledby="offer-title">
              <h2 id="offer-title" className="t-h2 text-forest">
                {offer.title}
              </h2>
              <div className="mt-4 space-y-3 t-body text-ink/85">
                {offer.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>

            <section aria-labelledby="audiences-title" className="mt-10">
              <h2 id="audiences-title" className="t-h3 text-forest !text-[1.5rem]">
                {audiences.title}
              </h2>
              <p className="mt-2 t-body text-ink/85">{audiences.intro}</p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2 list-none m-0 p-0">
                {audiences.items.map((a) => (
                  <li key={a.id} className="rounded-xl bg-cream p-5">
                    <h3 className="font-semibold text-forest">{a.title}</h3>
                    <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted">
                      {a.text}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[0.92rem] text-muted">{audiences.note}</p>
            </section>

            {approach.strands.map((s) => (
              <section key={s.id} aria-labelledby={`${s.id}-title`} className="mt-10">
                <h2 id={`${s.id}-title`} className="t-h3 text-forest !text-[1.5rem]">
                  {s.title}
                </h2>
                <div className="mt-3 space-y-3 t-body text-ink/85">
                  <p className="font-medium text-ink">{s.statement}</p>
                  {s.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </section>
            ))}

            <section aria-labelledby="expect-title" className="mt-10">
              <h2 id="expect-title" className="t-h3 text-forest !text-[1.5rem]">
                {expect.title}
              </h2>
              <ul className="mt-5 space-y-5 list-none m-0 p-0">
                {expect.items.map((item, i) => {
                  const mark = expectMarks[i % expectMarks.length];
                  return (
                    <li key={item.id} className="flex gap-4 sm:gap-5">
                      <IconCircle icon={mark.icon} tone={mark.tone} size="md" />
                      <div className="pt-1">
                        <h3 className="font-semibold text-[1.05rem] text-ink">
                          {item.title}
                        </h3>
                        {item.paragraphs.map((p) => (
                          <p key={p} className="mt-1 text-[0.95rem] leading-relaxed text-muted">
                            {p}
                          </p>
                        ))}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          </div>

          <section
            aria-labelledby="next-title"
            className="mt-12 pt-10 border-t border-[#ece6d6] text-center max-w-3xl mx-auto"
          >
            <h2 id="next-title" className="t-h3 text-forest !text-[1.5rem]">
              {expect.next.title}
            </h2>
            <div className="mt-3 space-y-2 t-body text-ink/85">
              {expect.next.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <ButtonLink href={expect.next.primary.href} className="mt-6">
              {expect.next.primary.label}
            </ButtonLink>
            <p className="mt-6 text-[0.85rem] leading-relaxed text-muted">
              {expect.next.clarification}
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
