import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site";

const serviceLinks = [
  { label: "E-Learning and Professional Development", href: "/e-learning" },
  { label: "Research and Evaluation", href: "/research-and-evaluation" },
  { label: "Policy and Advocacy", href: "/policy-and-advocacy" },
];

const exploreLinks = [
  { label: "About Us", href: "/about-us" },
  { label: "Partner With Us", href: "/partner-with-us" },
  { label: "Careers and Volunteering", href: "/careers-and-volunteering" },
  { label: "Mentorship Programme", href: "/mentorship" },
  { label: "Contact Us", href: "/contact" },
];

const linkTone =
  "text-white/80 hover:text-white no-underline transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold";

function Heading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-[0.95rem] font-semibold text-white mb-4">{children}</h2>;
}

/**
 * The shared footer, in the deep green band the concepts close every page
 * with: the organisation and its description, the services, the rest of
 * the site and the office, then the copyright line.
 */
export default function Footer() {
  const year = new Date().getFullYear();
  const tel = site.phone.replace(/\s+/g, "");

  return (
    <footer className="bg-forest text-white" aria-label="Site footer">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-14 pb-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_0.9fr_1.1fr]">
          <div>
            <Link
              href="/"
              className="inline-block no-underline rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              aria-label="Social Work Consultancy Ltd home"
            >
              <img
                src="/images/logo/swc-dark-logo-trim.png"
                alt="Social Work Consultancy Ltd"
                width={1322}
                height={386}
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="mt-5 text-[0.92rem] leading-relaxed text-white/75 max-w-sm">
              Social Work Consultancy Ltd strengthens social work and social
              services through professional learning, research, policy and
              advocacy. We connect evidence, professional knowledge and local
              understanding to help individuals and organisations improve
              practice.
            </p>
          </div>

          <div>
            <Heading>Services</Heading>
            <ul className="list-none m-0 p-0 space-y-2.5 text-[0.92rem]">
              {serviceLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkTone}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Heading>Explore SWCL</Heading>
            <ul className="list-none m-0 p-0 space-y-2.5 text-[0.92rem]">
              {exploreLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkTone}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Heading>Our office</Heading>
            <ul className="list-none m-0 p-0 space-y-3 text-[0.92rem] text-white/80">
              <li className="flex gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                <span>Flat C3, Okonkwo Estate, Jos, Plateau State, Nigeria.</span>
              </li>
              <li className="flex gap-2.5">
                <Phone className="w-4 h-4 mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                <a href={`tel:${tel}`} className={linkTone}>
                  {site.phone}
                </a>
              </li>
              <li className="flex gap-2.5">
                <Mail className="w-4 h-4 mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                <a href={`mailto:${site.email}`} className={`${linkTone} break-all`}>
                  {site.email}
                </a>
              </li>
            </ul>

          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/15 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-[0.85rem] text-white/70">
          <p>© {year} Social Work Consultancy Ltd. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <span>Jos, Plateau State, Nigeria</span>
            <Link href="/privacy-policy" className={linkTone}>
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className={linkTone}>
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
