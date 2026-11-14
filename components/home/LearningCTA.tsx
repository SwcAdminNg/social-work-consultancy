import ButtonLink from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { learningCta } from "./content";

/** The deep green call to action that closes the learning chapter. */
export default function LearningCTA() {
  return (
    <section aria-labelledby="learning-cta-heading" className="pb-14 sm:pb-20">
      <Container>
        <div className="bg-forest text-white rounded-2xl px-6 py-8 sm:px-10 sm:py-10 flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
          <div className="flex-1">
            <h2 id="learning-cta-heading" className="t-h2 text-white">
              {learningCta.title}
            </h2>
            <div className="mt-4 space-y-3 text-[1rem] leading-relaxed text-white/85 max-w-3xl">
              {learningCta.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <p>{learningCta.organisations}</p>
            </div>
          </div>
          <ButtonLink href={learningCta.button.href} variant="gold" className="self-start lg:self-center shrink-0">
            {learningCta.button.label}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
