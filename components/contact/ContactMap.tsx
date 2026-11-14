import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { location } from "./content";

// Where we are: a short note and the map in a rounded frame on mint.
export function ContactMap() {
  return (
    <section
      id="location"
      aria-labelledby="location-heading"
      className="bg-mint py-14 sm:py-20 scroll-mt-20"
    >
      <Container>
        <SectionHeading
          id="location-heading"
          eyebrow={location.eyebrow}
          title={location.title}
          intro={location.text}
          rule
        />
        <div className="mt-10 relative aspect-[4/3] sm:aspect-[21/9] overflow-hidden rounded-2xl bg-forest border border-[#d5e3dc]">
          <iframe
            src={location.mapSrc}
            title="Map showing the Social Work Consultancy Ltd office in Jos"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </Container>
    </section>
  );
}
