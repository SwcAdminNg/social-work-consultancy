import Container from "@/components/ui/Container";
import type { ServicePageContent } from "./types";

/**
 * The service described: a centred serif title with its introduction,
 * then the three explanatory strands as subheadings in a readable
 * left-aligned column, as the handovers place them in the main text area.
 */
export default function ServiceApproach({
  approach,
}: {
  approach: ServicePageContent["approach"];
}) {
  const [first, second, ...rest] = approach.paragraphs;

  return (
    <section aria-labelledby="approach-heading" className="pt-12 sm:pt-16">
      <Container narrow>
        <div className="text-center max-w-3xl mx-auto">
          <h2 id="approach-heading" className="t-h2 text-forest">
            {approach.title}
          </h2>
          {[first, second].filter(Boolean).map((p) => (
            <p key={p} className="mt-4 t-lead text-ink/85">
              {p}
            </p>
          ))}
        </div>

        <div className="mt-8 space-y-4 max-w-[68ch] mx-auto">
          {rest.map((p) => (
            <p key={p} className="t-body text-muted">
              {p}
            </p>
          ))}
        </div>

        <div className="mt-10 space-y-10 max-w-[68ch] mx-auto">
          {approach.strands.map((strand) => (
            <div key={strand.id} id={`approach-${strand.id}`} className="scroll-mt-28">
              <h3 className="t-h3 text-forest">{strand.title}</h3>
              <p className="mt-3 t-body font-medium text-ink">{strand.statement}</p>
              {strand.paragraphs.map((p) => (
                <p key={p} className="mt-3 t-body text-muted">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
