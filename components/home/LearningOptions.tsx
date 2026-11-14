import { FileText, Monitor, Users, type LucideIcon } from "lucide-react";
import ButtonLink from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import IconCircle from "@/components/ui/IconCircle";
import { learningOptions } from "./content";

const icons: Record<string, LucideIcon> = {
  foundation: Monitor,
  cpd: Users,
  organisational: FileText,
};

/**
 * The three ways to learn: a card each with its photograph, a green icon
 * set over the photograph's lower edge, the title, its line, the
 * description and a button.
 */
export default function LearningOptions() {
  return (
    <section
      id="learning-options"
      aria-labelledby="options-heading"
      className="pb-14 sm:pb-20 scroll-mt-24"
    >
      <Container>
        <h2 id="options-heading" className="sr-only">
          Ways to learn
        </h2>
        <ul className="list-none m-0 p-0 grid gap-6 md:grid-cols-3">
          {learningOptions.map((o) => (
            <li
              key={o.id}
              className="flex flex-col bg-white rounded-xl border border-[#e3e9e5] overflow-hidden shadow-[0_18px_40px_-30px_rgba(15,61,46,0.4)]"
            >
              <img
                src={o.image}
                alt={o.imageAlt}
                width={800}
                height={450}
                loading="lazy"
                className="w-full aspect-[16/9] object-cover"
              />
              <div className="relative flex flex-col flex-1 px-6 pb-6 pt-11">
                <IconCircle
                  icon={icons[o.id] ?? Monitor}
                  className="absolute -top-7 left-6 ring-4 ring-white"
                />
                <h3 className="text-[1.08rem] font-bold text-forest leading-snug">{o.title}</h3>
                <p className="mt-2 text-[0.95rem] font-medium text-forest-700">{o.tagline}</p>
                <div className="mt-3 space-y-3 text-[0.95rem] leading-relaxed text-muted flex-1">
                  {o.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
                <ButtonLink href={o.button.href} variant="outline" className="mt-6 self-start">
                  {o.button.label}
                </ButtonLink>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
