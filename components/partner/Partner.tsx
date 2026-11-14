import {
  BookOpenCheck,
  Briefcase,
  ChartColumn,
  Handshake,
  Mail,
  MapPin,
  Share2,
  Users,
} from "lucide-react";
import ButtonLink from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import IconCircle from "@/components/ui/IconCircle";
import { banner, conversation, process, reasons, ways } from "./content";

const wayIcons = [Users, Briefcase, BookOpenCheck, ChartColumn];
const reasonIcons = [Share2, MapPin, Handshake, Users];

/**
 * The Partner with Us page, as in the client's concept: a rounded
 * photo banner washed in deep green, the four ways to partner as rows,
 * the reasons to partner in a mint panel, how a partnership is built,
 * and a cream panel inviting a partnership conversation by email.
 */
export default function Partner() {
  const mailto = `mailto:${conversation.email}?subject=${encodeURIComponent(conversation.emailSubject)}`;

  return (
    <>
      {/* Opening banner */}
      <section aria-labelledby="page-title" className="pt-4 sm:pt-6">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl bg-forest text-white">
            <img
              src={banner.image}
              alt=""
              width={banner.imageWidth}
              height={banner.imageHeight}
              fetchPriority="high"
              className="absolute inset-0 w-full h-full object-cover object-[70%_30%]"
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-forest/95 via-forest/85 to-forest/70"
              aria-hidden="true"
            />
            <div className="relative grid lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-10 px-6 py-12 sm:px-10 sm:py-16 lg:px-12">
              <h1 id="page-title" className="t-display text-white self-center">
                {banner.titleLead} <span className="text-gold">{banner.titleAccent}</span>
              </h1>
              <span className="hidden lg:block w-px bg-white/40" aria-hidden="true" />
              <div className="space-y-4 self-center">
                {banner.paragraphs.map((p) => (
                  <p key={p} className="t-body text-white/90">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ways to partner */}
      <section id="ways" aria-labelledby="ways-heading" className="py-14 sm:py-20 scroll-mt-24">
        <Container>
          <h2 id="ways-heading" className="t-h2 text-forest text-center">
            {ways.title}
          </h2>
          <ul className="mt-10 list-none m-0 p-0 divide-y divide-[#e6ebe8]">
            {ways.items.map((route, i) => (
              <li
                key={route.id}
                id={`way-${route.id}`}
                className="grid md:grid-cols-[minmax(0,22rem)_auto_minmax(0,1fr)] gap-5 md:gap-8 py-7 scroll-mt-28"
              >
                <div className="flex items-center gap-4 self-start rounded-full bg-cream-200/70 p-2 pr-6">
                  <IconCircle icon={wayIcons[i]} tone="copper" size="lg" />
                  <h3 className="t-h3 text-forest">{route.title}</h3>
                </div>
                <span className="hidden md:block w-px bg-[#dfe5e1]" aria-hidden="true" />
                <div className="space-y-3">
                  <p className="t-body text-ink">{route.statement}</p>
                  {route.paragraphs.map((p) => (
                    <p key={p} className="t-body text-muted">
                      {p}
                    </p>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Why partner */}
      <section aria-labelledby="reasons-heading">
        <Container>
          <div className="rounded-3xl bg-mint px-5 py-10 sm:px-10 sm:py-12">
            <h2 id="reasons-heading" className="t-h2 text-forest">
              {reasons.title}
            </h2>
            <ul className="mt-8 list-none m-0 p-0 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-[#c9dbd3]">
              {reasons.items.map((item, i) => (
                <li key={item.title} className="text-center lg:px-6 first:lg:pl-0 last:lg:pr-0">
                  <IconCircle icon={reasonIcons[i]} tone="forest" size="lg" />
                  <h3 className="mt-4 t-h3 text-forest">{item.title}</h3>
                  <p className="mt-2 t-body text-muted">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* How a partnership is built */}
      <section aria-labelledby="process-heading" className="pt-14 sm:pt-20">
        <Container>
          <h2 id="process-heading" className="t-h2 text-forest">
            {process.title}
          </h2>
          <p className="mt-4 t-lead text-ink">{process.lead}</p>
          <ol className="mt-8 list-none m-0 p-0 grid md:grid-cols-2 gap-x-10 gap-y-7">
            {process.steps.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span
                  className="flex items-center justify-center w-9 h-9 shrink-0 rounded-full bg-gold-100 text-gold-600 font-semibold font-serif"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-[1.05rem] font-semibold text-forest">{step.title}</h3>
                  <p className="mt-1.5 t-body text-muted">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Start a conversation */}
      <section
        id="conversation"
        aria-labelledby="conversation-heading"
        className="py-14 sm:py-20 scroll-mt-24"
      >
        <Container>
          <div className="rounded-3xl bg-cream px-5 py-10 sm:px-10">
            <h2 id="conversation-heading" className="t-h2 text-forest">
              {conversation.title}
            </h2>
            {conversation.paragraphs.map((p) => (
              <p key={p} className="mt-3 t-body text-ink/85 max-w-3xl">
                {p}
              </p>
            ))}
            <div className="mt-8 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
              <a
                href={mailto}
                className="inline-flex items-center gap-3 text-[1.05rem] sm:text-[1.15rem] font-semibold text-forest no-underline hover:text-forest-700 break-all rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700/40"
              >
                <IconCircle icon={Mail} tone="copper" size="sm" />
                {conversation.email}
              </a>
              <span className="hidden md:block self-stretch w-px bg-[#e2d8c2]" aria-hidden="true" />
              <ButtonLink href={mailto}>{conversation.linkLabel}</ButtonLink>
            </div>
            <p className="mt-8 text-[0.88rem] leading-relaxed text-muted max-w-3xl">
              {conversation.notice}
            </p>
            <p className="mt-2 text-[0.88rem] leading-relaxed text-muted max-w-3xl">
              {conversation.disclaimer}
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
