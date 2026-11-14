import {
  Binoculars,
  HeartHandshake,
  Landmark,
  Scale,
  ShieldCheck,
  Target,
  UsersRound,
  FileCheck2,
  type LucideIcon,
} from "lucide-react";
import ButtonLink from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import IconCircle from "@/components/ui/IconCircle";
import { GoldRule } from "@/components/ui/SectionHeading";
import { mission, opening, purpose, values, vision } from "./content";

// One icon per value, in the order the values are listed.
const valueIcons: LucideIcon[] = [
  UsersRound,
  Scale,
  FileCheck2,
  HeartHandshake,
  ShieldCheck,
];

/**
 * The About Us page as drawn in the client's concept: a cream panel with
 * the page title and the large rounded photograph, the vision and mission
 * cards, the purpose section, and the five values in a cream panel.
 */
export default function About() {
  return (
    <>
      {/* Opening */}
      <section aria-labelledby="page-title" className="pt-6 sm:pt-8">
        <Container>
          <div className="bg-cream rounded-2xl overflow-hidden">
            <div className="px-4 sm:px-10 pt-10 pb-8 text-center">
              <h1 id="page-title" className="t-display text-forest">
                {opening.titleLead} {opening.titleBold}
              </h1>
              <p className="mt-3 t-lead text-ink/85">{opening.tagline}</p>
              <div className="mt-5 max-w-3xl mx-auto space-y-3 t-body text-muted">
                {opening.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
            <img
              src={opening.image}
              alt={opening.imageAlt}
              width={1672}
              height={941}
              fetchPriority="high"
              className="w-full aspect-[4/3] sm:aspect-[16/7] object-cover rounded-2xl"
              style={{ objectPosition: "50% 35%" }}
            />
          </div>
        </Container>
      </section>

      {/* Vision and mission */}
      <section aria-label="Vision and mission" className="pt-4">
        <Container>
          <div className="grid gap-4 md:grid-cols-2">
            <article className="bg-cream rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row gap-5 sm:gap-6">
              <IconCircle icon={Binoculars} tone="forest" size="xl" />
              <div>
                <h2 className="t-h2 text-forest">{vision.label}</h2>
                <p className="mt-3 t-body text-ink/85">{vision.statement}</p>
              </div>
            </article>
            <article className="bg-cream rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row gap-5 sm:gap-6">
              <IconCircle icon={Target} tone="slate" size="xl" />
              <div>
                <h2 className="t-h2 text-forest">{mission.label}</h2>
                <p className="mt-3 t-body text-ink/85">{mission.statement}</p>
                <p className="mt-3 t-body text-muted">{mission.paragraph}</p>
              </div>
            </article>
          </div>
        </Container>
      </section>

      {/* Purpose */}
      <section aria-labelledby="purpose-title" className="py-14 sm:py-16">
        <Container narrow>
          <div className="text-center">
            <h2 id="purpose-title" className="t-h2 text-forest">
              {purpose.title}
            </h2>
            <GoldRule className="mx-auto mt-4" />
          </div>
          <div className="mt-8 space-y-4 t-lead text-ink/85 max-w-3xl mx-auto">
            {purpose.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
            {purpose.chapters.map((c) => (
              <div key={c.id}>
                <h3 className="t-h3 text-forest">{c.title}</h3>
                <div className="mt-3 space-y-3 t-body text-muted">
                  {c.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-[#e6ebe8] p-6 sm:p-8 text-center">
            <p className="t-eyebrow text-forest-700">{purpose.invitation.label}</p>
            <h3 className="mt-2 t-h3 text-forest">{purpose.invitation.title}</h3>
            <div className="mt-3 space-y-2 t-body text-muted max-w-2xl mx-auto">
              {purpose.invitation.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <ButtonLink href={purpose.invitation.button.href} className="mt-6">
              {purpose.invitation.button.label}
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section aria-labelledby="values-title" className="pb-16">
        <Container>
          <div className="bg-cream rounded-2xl px-3 py-10 sm:px-6 sm:py-12">
            <div className="text-center max-w-3xl mx-auto px-2">
              <h2 id="values-title" className="t-h2 text-forest">
                {values.title}
              </h2>
              <p className="mt-4 t-body text-muted">{values.intro}</p>
            </div>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5 list-none m-0 p-0">
              {values.items.map((v, i) => (
                <li
                  key={v.title}
                  className="bg-white rounded-xl p-5 text-center flex flex-col items-center"
                >
                  <IconCircle
                    icon={valueIcons[i] ?? Landmark}
                    tone="goldSoft"
                    size="lg"
                    className="!text-forest-700"
                  />
                  <h3 className="mt-4 font-serif text-[1.15rem] leading-snug font-semibold text-forest">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/85">
                    {v.statement}
                  </p>
                  <p className="mt-2 text-[0.88rem] leading-relaxed text-muted">
                    {v.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </>
  );
}
