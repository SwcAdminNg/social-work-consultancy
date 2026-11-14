import { Briefcase, Check, Globe, GraduationCap, UserRound, Users } from "lucide-react";
import ButtonLink from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import IconCircle, { type IconTone } from "@/components/ui/IconCircle";
import PageTitle from "@/components/ui/PageTitle";
import SectionHeading, { GoldRule } from "@/components/ui/SectionHeading";
import EnquiryForm from "@/components/shared/EnquiryForm";
import { becomeMentor, form, intro, join, offerings, opening } from "./content";

const icons = [UserRound, GraduationCap, Globe, Users, Briefcase];
const tones: IconTone[] = ["forest", "slate", "gold", "forest", "slate"];

/**
 * The Mentorship Programme page in the site's concept style: the title
 * band and photograph, why mentorship matters and what we offer, who can
 * join and how it works, then becoming a mentor beside the enquiry form.
 */
export default function Mentorship() {
  return (
    <>
      <PageTitle
        title={opening.title}
        subtitle={opening.tagline}
        image={opening.image}
        imageAlt={opening.imageAlt}
        imageWidth={opening.imageWidth}
        imageHeight={opening.imageHeight}
      />

      <section aria-labelledby="intro-heading" className="pt-12 sm:pt-16">
        <Container narrow>
          <SectionHeading id="intro-heading" eyebrow={intro.eyebrow} title={intro.title} />
          <div className="mt-6 space-y-4 max-w-[68ch] mx-auto">
            {intro.paragraphs.map((p) => (
              <p key={p} className="t-body text-muted">
                {p}
              </p>
            ))}
          </div>
        </Container>
      </section>

      <section id="offer" aria-labelledby="offer-heading" className="py-14 sm:py-20 scroll-mt-24">
        <Container narrow>
          <SectionHeading
            id="offer-heading"
            eyebrow={offerings.eyebrow}
            title={offerings.title}
            align="left"
          />
          <ul className="mt-8 list-none m-0 p-0 space-y-7">
            {offerings.items.map((item, i) => (
              <li key={item.title} className="flex gap-4 sm:gap-6">
                <IconCircle icon={icons[i]} tone={tones[i]} size="md" />
                <div className="min-w-0 pt-1">
                  <h3 className="t-h3 text-forest-700">{item.title}</h3>
                  <p className="mt-1.5 t-body text-muted">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section id="join" aria-labelledby="join-heading" className="bg-mint py-14 sm:py-20 scroll-mt-20">
        <Container>
          <SectionHeading id="join-heading" eyebrow={join.eyebrow} title={join.title} rule />
          <div className="mt-10 grid lg:grid-cols-2 gap-5">
            <div className="rounded-2xl bg-white border border-[#dce8e2] p-6 sm:p-8">
              <h3 className="t-h3 text-forest">Who Can Join?</h3>
              <p className="mt-2 t-body text-muted">{join.whoLead}</p>
              <ul className="mt-5 list-none m-0 p-0 space-y-3.5">
                {join.who.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-6 h-6 shrink-0 rounded-full bg-forest-700 text-white mt-0.5">
                      <Check className="w-3.5 h-3.5" aria-hidden="true" />
                    </span>
                    <span className="t-body text-ink">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-white border border-[#dce8e2] p-6 sm:p-8">
              <h3 className="t-h3 text-forest">How It Works</h3>
              <ol className="mt-5 list-none m-0 p-0 space-y-5">
                {join.steps.map((step, i) => (
                  <li key={step.title} className="flex gap-4">
                    <span
                      className="flex items-center justify-center w-9 h-9 shrink-0 rounded-full bg-gold-100 text-gold-600 font-serif font-semibold"
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                    <div>
                      <h4 className="text-[1.05rem] font-semibold text-forest">{step.title}</h4>
                      <p className="mt-1 t-body text-muted">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <ButtonLink href={join.button.href} className="mt-7">
                {join.button.label}
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <section
        id="mentor-form"
        aria-labelledby="mentor-heading"
        className="bg-cream py-14 sm:py-20 scroll-mt-20"
      >
        <Container className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] gap-10 lg:gap-14 items-start">
          <div>
            <p className="t-eyebrow text-forest-700">{becomeMentor.eyebrow}</p>
            <h2 id="mentor-heading" className="mt-3 t-h2 text-forest">
              {becomeMentor.title}
            </h2>
            <GoldRule className="mt-5" />
            {becomeMentor.paragraphs.map((p) => (
              <p key={p} className="mt-4 t-body text-ink/85">
                {p}
              </p>
            ))}
            <div className="mt-8 rounded-2xl bg-white border border-[#ece3cf] p-6">
              <h3 className="t-h3 text-forest">{becomeMentor.whyTitle}</h3>
              <p className="mt-2 t-body text-muted">{becomeMentor.why}</p>
            </div>
          </div>
          <EnquiryForm config={form} />
        </Container>
      </section>
    </>
  );
}
