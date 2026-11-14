import { ArrowLink } from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { services } from "./content";

/**
 * The three core service areas on a pale green band: a white card each,
 * photograph on top, the service's title, its line and opening paragraph,
 * and a link through to the service page, which carries the rest.
 */
export default function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="bg-mint py-14 sm:py-20 scroll-mt-24"
    >
      <Container>
        <SectionHeading
          id="services-heading"
          eyebrow="Our services"
          title={services.title}
          intro={services.intro}
        />
        <ul className="list-none m-0 p-0 mt-10 grid gap-6 md:grid-cols-3">
          {services.items.map((item) => (
            <li
              key={item.id}
              id={item.id}
              className="flex flex-col bg-white rounded-xl overflow-hidden shadow-[0_18px_40px_-28px_rgba(15,61,46,0.45)] scroll-mt-24"
            >
              <img
                src={item.image}
                alt={item.imageAlt}
                width={800}
                height={500}
                loading="lazy"
                className="w-full aspect-[16/10] object-cover"
                style={{ objectPosition: item.focus }}
              />
              <div className="flex flex-col flex-1 p-6">
                <h3 className="t-h3 text-forest">{item.title}</h3>
                <p className="mt-2 text-[0.95rem] font-medium text-forest-700">
                  {item.tagline}
                </p>
                <p className="mt-3 t-body text-muted flex-1">{item.paragraphs[0]}</p>
                <ArrowLink href={item.button.href} className="mt-5 self-start">
                  {item.button.label}
                </ArrowLink>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
