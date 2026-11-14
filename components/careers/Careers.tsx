import {
  BookOpen,
  ChevronRight,
  FileText,
  GraduationCap,
  Handshake,
  Megaphone,
  Presentation,
  Settings,
  Sprout,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import Container from "@/components/ui/Container";
import IconCircle from "@/components/ui/IconCircle";
import { GoldRule } from "@/components/ui/SectionHeading";
import { areas, benefits, opening, opportunities } from "./content";
import InterestButton from "./InterestButton";
import InterestForm from "./InterestForm";

const benefitIcons: LucideIcon[] = [UsersRound, Sprout, Handshake];
const areaIcons: LucideIcon[] = [Presentation, FileText, BookOpen, Megaphone];
const opportunityIcons: LucideIcon[] = [UsersRound, GraduationCap, Settings];

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center rounded-full bg-mint-200/70 px-4 py-1.5 text-[0.9rem] text-forest">
      {children}
    </p>
  );
}

/**
 * The Careers and Volunteering page as drawn in the client's concept: the
 * two-column introduction and wide photograph, three benefit columns on
 * cream, the four areas of contribution, three opportunity cards on mint,
 * and the expression-of-interest form.
 */
export default function Careers() {
  return (
    <>
      {/* Introduction */}
      <section aria-labelledby="page-title" className="pt-10 sm:pt-14">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:gap-12 items-start">
            <div>
              <h1 id="page-title" className="t-display text-forest">
                {opening.titleLines.map((line) => (
                  <span key={line} className="block">
                    {line}.
                  </span>
                ))}
              </h1>
              <GoldRule className="mt-5" />
            </div>
            <div className="space-y-3 t-body text-ink/85 lg:pt-2">
              {opening.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <img
            src={opening.image}
            alt={opening.imageAlt}
            width={opening.imageWidth}
            height={opening.imageHeight}
            fetchPriority="high"
            className="mt-8 w-full aspect-[4/3] sm:aspect-[16/7] object-cover rounded-2xl shadow-[0_20px_50px_-30px_rgba(15,61,46,0.45)]"
            style={{ objectPosition: "50% 35%" }}
          />
        </Container>
      </section>

      {/* Benefits */}
      <section aria-labelledby="benefits-title" className="mt-12 bg-cream py-14">
        <Container>
          <div className="text-center">
            <h2 id="benefits-title" className="t-h2 text-forest">
              {benefits.title}
            </h2>
            <GoldRule className="mx-auto mt-4" />
          </div>
          <ul className="mt-10 grid gap-10 md:grid-cols-3 list-none m-0 p-0">
            {benefits.items.map((b, i) => (
              <li key={b.title} className="text-center flex flex-col items-center">
                <IconCircle
                  icon={benefitIcons[i]}
                  tone="forest"
                  size="lg"
                  className="!text-gold"
                />
                <h3 className="mt-4 t-h3 text-forest">{b.title}</h3>
                <p className="mt-2 t-body text-ink/85">{b.statement}</p>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{b.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Ways to contribute */}
      <section aria-labelledby="areas-title" className="py-14">
        <Container>
          <div className="text-center">
            <h2 id="areas-title" className="t-h2 text-forest">
              {areas.title}
            </h2>
            <GoldRule className="mx-auto mt-4" />
            <div className="mt-5">
              <Pill>{areas.note}</Pill>
            </div>
            <div className="mt-5 max-w-3xl mx-auto space-y-2 t-body text-muted">
              {areas.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <ul className="mt-8 space-y-3 list-none m-0 p-0">
            {areas.items.map((a, i) => (
              <li key={a.id}>
                <details className="group rounded-xl border border-[#dfe6e2] bg-white open:border-forest-700/30 open:shadow-[0_16px_40px_-30px_rgba(15,61,46,0.5)]">
                  <summary className="flex items-center gap-4 px-4 py-3 sm:px-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700/40">
                    <IconCircle icon={areaIcons[i]} tone="mint" size="sm" />
                    <h3 className="flex-1 font-serif text-[1.1rem] sm:text-[1.2rem] text-forest">
                      {a.title}
                    </h3>
                    <ChevronRight
                      className="w-5 h-5 text-forest shrink-0 transition-transform group-open:rotate-90"
                      aria-hidden="true"
                    />
                  </summary>
                  <div className="px-4 pb-5 sm:px-5 sm:pl-[4.75rem] space-y-2">
                    <p className="t-body text-ink/85">{a.statement}</p>
                    <p className="text-[0.95rem] leading-relaxed text-muted">{a.text}</p>
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Opportunities */}
      <section aria-labelledby="opportunities-title" className="bg-mint py-14">
        <Container>
          <div className="text-center">
            <h2 id="opportunities-title" className="t-h2 text-forest">
              {opportunities.title}
            </h2>
            <GoldRule className="mx-auto mt-4" />
          </div>
          <ul className="mt-10 grid gap-4 md:grid-cols-3 list-none m-0 p-0">
            {opportunities.items.map((o, i) => (
              <li
                key={o.id}
                id={o.id}
                className="scroll-mt-24 bg-white rounded-2xl p-6 sm:p-7 flex flex-col items-center text-center"
              >
                <IconCircle icon={opportunityIcons[i]} tone="mint" size="md" />
                <h3 className="mt-4 t-h3 text-forest">{o.title}</h3>
                <p className="mt-2 t-body text-ink/85">{o.statement}</p>
                <div className="mt-2 space-y-2 flex-1">
                  {o.paragraphs.map((p) => (
                    <p key={p} className="text-[0.92rem] leading-relaxed text-muted">
                      {p}
                    </p>
                  ))}
                </div>
                <div className="mt-6">
                  <InterestButton type={o.type} label={o.button} />
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <InterestForm />
    </>
  );
}

