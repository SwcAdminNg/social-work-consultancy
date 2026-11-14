import type { LucideIcon } from "lucide-react";
import PageTitle from "@/components/ui/PageTitle";
import type { IconTone } from "@/components/ui/IconCircle";
import ServiceApproach from "./ServiceApproach";
import ServiceCommission from "./ServiceCommission";
import ServiceEnquiry from "./ServiceEnquiry";
import type { ServicePageContent } from "./types";

export type EnquiryTone = "cream" | "slate";

// A service page in the handovers' sequence and the concepts' look: the
// title band and photograph, the service described, the support you can
// commission with its enquiry button, then the enquiry form.
export default function ServicePage({
  content,
  icons,
  iconTones,
  tone = "cream",
}: {
  content: ServicePageContent;
  icons: LucideIcon[];
  // One colour per item, in order.
  iconTones: IconTone[];
  // Background of the closing enquiry band.
  tone?: EnquiryTone;
}) {
  const { opening } = content;
  return (
    <>
      <PageTitle
        title={opening.title}
        image={opening.image}
        imageAlt={opening.imageAlt}
        imageWidth={opening.imageWidth}
        imageHeight={opening.imageHeight}
      />
      <ServiceApproach approach={content.approach} />
      <ServiceCommission services={content.services} icons={icons} tones={iconTones} />
      <ServiceEnquiry enquiry={content.enquiry} sourcePage={content.path} tone={tone} />
    </>
  );
}
