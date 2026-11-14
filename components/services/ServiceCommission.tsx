import type { LucideIcon } from "lucide-react";
import ButtonLink from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import IconCircle, { type IconTone } from "@/components/ui/IconCircle";
import type { ServicePageContent } from "./types";

/**
 * "… Support You Can Commission": the five kinds of support as a list,
 * each with a coloured icon circle, a serif title and its full text. It
 * closes with how every assignment is framed and the button that scrolls
 * to the enquiry form.
 */
export default function ServiceCommission({
  services,
  icons,
  tones,
}: {
  services: ServicePageContent["services"];
  icons: LucideIcon[];
  tones: IconTone[];
}) {
  const { scope } = services;

  return (
    <section
      id="commission"
      aria-labelledby="commission-heading"
      className="pt-14 pb-16 sm:pb-20 scroll-mt-24"
    >
      <Container narrow>
        <h2 id="commission-heading" className="t-h2 text-forest">
          {services.title}
        </h2>

        <ul className="mt-8 list-none m-0 p-0 space-y-7">
          {services.items.map((item, i) => (
            <li
              key={item.id}
              id={item.id}
              className="flex gap-4 sm:gap-6 scroll-mt-28"
            >
              <IconCircle icon={icons[i]} tone={tones[i] ?? "forest"} size="md" />
              <div className="min-w-0 pt-1">
                <h3 className="t-h3 text-forest-700">{item.title}</h3>
                <p className="mt-1.5 t-body text-ink">{item.statement}</p>
                <p className="mt-2 t-body text-muted">{item.text}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-12 rounded-2xl bg-cream px-5 py-7 sm:px-8">
          <h3 className="t-h3 text-forest">{scope.title}</h3>
          {scope.paragraphs.map((p) => (
            <p key={p} className="mt-3 t-body text-muted">
              {p}
            </p>
          ))}
        </div>

        <div className="mt-10 text-center">
          <ButtonLink href={scope.button.href}>{scope.button.label}</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
