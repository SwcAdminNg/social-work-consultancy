import type { Metadata } from "next";
import PageTitle from "@/components/ui/PageTitle";
import { TermsContent } from "@/components/terms/TermsContent";
import { absoluteUrl, shareImage, site } from "@/lib/site";

const path = "/terms-of-service";
const title = "Terms of Service";
const fullTitle = `${title} | ${site.name}`;
const description =
  "Terms of Service for the Social Work Consultancy Ltd (SWCL) learning platform: eligibility, account responsibilities, acceptable use, intellectual property, payments and refunds, availability and termination.";
const updated = "9 July 2026";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: path,
    title: fullTitle,
    description,
    images: [shareImage],
  },
  twitter: {
    card: "summary_large_image",
    title: fullTitle,
    description,
    images: [shareImage],
  },
};

function structuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": absoluteUrl(`${path}#webpage`),
        url: absoluteUrl(path),
        name: fullTitle,
        description,
        isPartOf: { "@id": absoluteUrl("/#website") },
        about: { "@id": absoluteUrl("/#organization") },
        dateModified: "2026-07-09",
        inLanguage: site.language,
      },
      {
        "@type": "BreadcrumbList",
        "@id": absoluteUrl(`${path}#breadcrumb`),
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: title, item: absoluteUrl(path) },
        ],
      },
    ],
  };
}

export default function TermsOfServicePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Escaped so "</script>" in content can never close the tag early.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData()).replace(/</g, "\\u003c"),
        }}
      />
      <PageTitle
        title="Terms of Service"
        subtitle="The terms that apply to every registered user of the SWCL learning platform."
      >
        <p className="mt-5 inline-flex items-center rounded-full bg-white border border-[#ece3cf] px-4 py-1.5 t-eyebrow text-forest-700">
          Last updated {updated}
        </p>
      </PageTitle>
      <TermsContent />
    </>
  );
}
