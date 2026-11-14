import { Check } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { learningApproach } from "./content";

/**
 * "Learning That Strengthens What You Do in Practice": the centred heading
 * and introduction, then the learning platform note beside the seven
 * things the learning approach supports you to do.
 */
export default function LearningApproach() {
  const { platform } = learningApproach;
  return (
    <section
      id="learning"
      aria-labelledby="learning-heading"
      className="pt-14 sm:pt-20 pb-10 scroll-mt-24"
    >
      <Container>
        <SectionHeading
          id="learning-heading"
          eyebrow="Learning"
          title={learningApproach.title}
          intro={learningApproach.paragraphs}
          className="max-w-4xl"
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] items-start">
          <div className="bg-cream rounded-xl overflow-hidden">
            <img
              src={platform.image}
              alt={platform.imageAlt}
              width={900}
              height={560}
              loading="lazy"
              className="w-full aspect-[16/10] object-cover"
            />
            <div className="p-6 space-y-3 t-body text-muted">
              {platform.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>

          <div>
            <h3 className="t-h3 text-forest">{learningApproach.supports}</h3>
            <ul className="list-none m-0 p-0 mt-5 grid gap-4 sm:grid-cols-2">
              {learningApproach.outcomes.map((o) => (
                <li key={o.title} className="flex gap-3">
                  <span
                    className="mt-0.5 inline-flex items-center justify-center w-7 h-7 shrink-0 rounded-full bg-forest-700 text-white"
                    aria-hidden="true"
                  >
                    <Check className="w-4 h-4" />
                  </span>
                  <p className="text-[0.95rem] leading-relaxed text-muted">
                    <strong className="block font-semibold text-forest">{o.title}</strong>
                    {o.text}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-6 t-body text-ink">{learningApproach.closing}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
