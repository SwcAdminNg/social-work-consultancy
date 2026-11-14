import { Building2, Mail, MapPin, Phone } from "lucide-react";
import Container from "@/components/ui/Container";
import IconCircle from "@/components/ui/IconCircle";
import { GoldRule } from "@/components/ui/SectionHeading";
import EnquiryForm from "@/components/shared/EnquiryForm";
import { form, reach } from "./content";

/**
 * How to reach us on the left (organisation, office, telephone, email)
 * and the message form on a white card to the right.
 */
export function ContactForm() {
  const { details } = reach;
  const items = [
    { icon: Building2, label: "Organisation", value: details.organisation },
    { icon: MapPin, label: "Our office", value: details.address },
    {
      icon: Phone,
      label: "Telephone",
      value: details.phone,
      href: `tel:${details.phone.replace(/\s/g, "")}`,
    },
    { icon: Mail, label: "Email", value: details.email, href: `mailto:${details.email}` },
  ];

  return (
    <section
      id="message"
      aria-labelledby="reach-heading"
      className="py-14 sm:py-20 scroll-mt-20"
    >
      <Container className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] gap-10 lg:gap-14 items-start">
        <div>
          <p className="t-eyebrow text-forest-700">{reach.eyebrow}</p>
          <h2 id="reach-heading" className="mt-3 t-h2 text-forest">
            {reach.title}
          </h2>
          <GoldRule className="mt-5" />
          {reach.paragraphs.map((p) => (
            <p key={p} className="mt-4 t-body text-muted">
              {p}
            </p>
          ))}

          <ul className="mt-8 list-none m-0 p-0 space-y-5">
            {items.map(({ icon, label, value, href }) => (
              <li key={label} className="flex items-start gap-4">
                <IconCircle icon={icon} tone="mint" size="sm" />
                <div className="min-w-0">
                  <p className="text-[0.85rem] font-semibold text-forest">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      className="mt-0.5 block text-[1rem] text-ink hover:text-forest-700 no-underline rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700/40 [overflow-wrap:anywhere]"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="mt-0.5 text-[1rem] text-ink">{value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <EnquiryForm config={form} />
      </Container>
    </section>
  );
}
