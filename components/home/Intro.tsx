import ButtonLink from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import ReadMore from "./ReadMore";
import { intro } from "./content";

/**
 * "Building the Knowledge and Capacity Behind Better Services": the rounded
 * photograph on the left and the introduction on the right. The first two
 * paragraphs show; the rest open in place.
 */
export default function Intro() {
  const [first, second, ...rest] = intro.paragraphs;
  return (
    <section id="about" aria-labelledby="intro-heading" className="py-14 sm:py-20 scroll-mt-24">
      <Container className="grid gap-10 lg:grid-cols-2 lg:gap-14 items-center">
        <img
          src={intro.image}
          alt={intro.imageAlt}
          width={1200}
          height={900}
          loading="lazy"
          className="w-full aspect-[4/3] object-cover rounded-2xl shadow-[0_24px_50px_-30px_rgba(15,61,46,0.5)]"
        />
        <div>
          <p className="t-eyebrow text-forest-700">Social Work Consultancy Ltd.</p>
          <h2 id="intro-heading" className="mt-3 t-h2 text-forest">
            {intro.title}
          </h2>
          <div className="mt-5 space-y-4 t-body text-muted">
            <p>{first}</p>
            <p>{second}</p>
          </div>
          <ReadMore more="Read more about our approach" className="t-body text-muted">
            <div className="mt-4 space-y-4">
              {rest.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </ReadMore>
          <div className="mt-7">
            <ButtonLink href={intro.button.href}>{intro.button.label}</ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
