import type { Metadata } from "next";
import PageTitle from "@/components/ui/PageTitle";
import { PrivacyContent } from "@/components/privacy/PrivacyContent";
import { absoluteUrl, shareImage, site } from "@/lib/site";

const path = "/privacy-policy";
const title = "Privacy Policy";
const fullTitle = `${title} | ${site.name}`;
const description =
  "Privacy Policy, Terms of Use and Safeguarding Statement for Social Work Consultancy Ltd: how we collect, use and protect your information.";
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

export default function PrivacyPolicyPage() {
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
        title="Privacy Policy"
        subtitle="How we collect, use and protect your information, the terms of using our platform, and our safeguarding commitments."
      >
        <p className="mt-5 inline-flex items-center rounded-full bg-white border border-[#ece3cf] px-4 py-1.5 t-eyebrow text-forest-700">
          Last updated {updated}
        </p>
      </PageTitle>
      <PrivacyContent />
    </>
  );
}
