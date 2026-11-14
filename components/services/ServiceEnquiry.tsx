"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, CircleAlert, Info } from "lucide-react";
import { IconSpinner } from "@/components/auth/shared/icons";
import FormField from "@/components/shared/FormField";
import { GoldRule } from "@/components/ui/SectionHeading";
import type { EnquiryTone } from "./ServicePage";
import type { ServicePageContent } from "./types";

type FormValues = {
  name: string;
  email: string;
  organisation: string;
  phone: string;
  message: string;
};

type Errors = Partial<Record<keyof FormValues, string>>;

const emptyForm: FormValues = {
  name: "",
  email: "",
  organisation: "",
  phone: "",
  message: "",
};

// Name, email and the enquiry itself are required; organisation and
// phone are optional, as the handovers ask.
function validate(values: FormValues): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
    errors.email = "Enter a valid email address.";
  if (values.phone.trim() && values.phone.replace(/\D/g, "").length < 7)
    errors.phone = "Enter a phone number we can reach you on, or leave it blank.";
  if (!values.message.trim())
    errors.message = "Tell us about the issue and the support you need.";
  return errors;
}

/**
 * The service page's enquiry: the invitation and what to include on the
 * left; the form on a card to the right. Fields are checked as you leave
 * them, what you typed survives any error, and the confirmation shows
 * only once the enquiry has actually been sent.
 */
export default function ServiceEnquiry({
  enquiry,
  sourcePage,
  tone = "cream",
}: {
  enquiry: ServicePageContent["enquiry"];
  // The page's path, recorded on the message so admins see where it came from.
  sourcePage: string;
  tone?: EnquiryTone;
}) {
  const [form, setForm] = useState<FormValues>(emptyForm);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [failure, setFailure] = useState("");
  const { form: labels, confirmation } = enquiry;

  const update = (name: keyof FormValues) => (value: string) => {
    const next = { ...form, [name]: value };
    setForm(next);
    if (touched[name]) setErrors(validate(next));
  };

  const leave = (name: keyof FormValues) => () => {
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors(validate(form));
  };

  const shown = (name: keyof FormValues) =>
    touched[name] ? errors[name] : undefined;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const all = validate(form);
    setTouched({ name: true, email: true, organisation: true, phone: true, message: true });
    setErrors(all);
    if (Object.keys(all).length > 0) {
      const first = Object.keys(all)[0];
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setFailure("");
    setLoading(true);
    const organisation = form.organisation.trim();
    const phone = form.phone.trim();
    try {
      const res = await fetch("/api/proxy/contact-us", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: form.name.trim(),
          email: form.email.trim(),
          phone_number: phone || undefined,
          subject: organisation
            ? `${labels.subject} from ${organisation}`
            : labels.subject,
          message: organisation
            ? `Organisation: ${organisation}\n\n${form.message}`
            : form.message,
          platform: "NG",
          category: "general",
          source_page: sourcePage,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(
          data.message || "We couldn’t send your enquiry. Please try again.",
        );
      }
      setSent(true);
      setForm(emptyForm);
      setTouched({});
      setErrors({});
    } catch (err) {
      setFailure(
        err instanceof Error
          ? err.message
          : "We couldn’t send your enquiry. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const slate = tone === "slate";

  return (
    <section
      id="enquiry"
      aria-labelledby="enquiry-heading"
      className={`relative overflow-hidden py-14 sm:py-20 scroll-mt-20 ${
        slate ? "bg-[#dce7e4]" : "bg-cream"
      }`}
    >
      {!slate && <Leaf />}
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] gap-10 lg:gap-14 items-start">
        <div className={slate ? "" : "lg:text-center lg:px-6"}>
          <p className="t-eyebrow text-forest-700">{enquiry.eyebrow}</p>
          <h2 id="enquiry-heading" className="mt-3 t-h2 text-forest">
            {enquiry.title}
          </h2>
          {!slate && <GoldRule className="mt-5 lg:mx-auto" />}
          {enquiry.paragraphs.map((p) => (
            <p key={p} className="mt-4 t-body text-ink/85">
              {p}
            </p>
          ))}
          {slate && <GoldRule className="mt-6" />}

          <div className={`mt-8 text-left ${slate ? "" : "lg:max-w-md lg:mx-auto"}`}>
            <p className="text-[0.95rem] font-semibold text-forest">
              {enquiry.helpfulLead}
            </p>
            <ul className="mt-3 list-none m-0 p-0 space-y-2">
              {enquiry.helpful.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[0.95rem] leading-snug text-ink/85"
                >
                  <span
                    className="mt-[0.45rem] w-1.5 h-1.5 shrink-0 rounded-full bg-gold"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white text-ink rounded-2xl p-5 sm:p-8 border border-[#e3e9e5] shadow-[0_24px_60px_-40px_rgba(15,61,46,0.45)]">
          {sent ? (
            <div role="status" className="flex flex-col items-start gap-5 py-6">
              <span className="flex items-center justify-center w-14 h-14 rounded-full bg-forest-700 text-white">
                <Check className="w-7 h-7" aria-hidden="true" />
              </span>
              <div>
                <p className="t-h3 text-forest">{confirmation.title}</p>
                <p className="mt-3 t-body text-muted">{confirmation.text}</p>
              </div>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="group inline-flex items-center gap-2 text-[0.95rem] font-semibold text-forest-700 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700 cursor-pointer"
              >
                Send another enquiry
                <ArrowRight
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <p className="t-h3 text-forest">{labels.heading}</p>
              <p className="mt-1 text-[0.9rem] text-muted">{labels.replyNote}</p>

              <div className="mt-6 space-y-4">
                {failure && (
                  <div
                    role="alert"
                    className="flex items-start gap-2.5 p-4 rounded-lg bg-red-50 text-red-700 text-[0.9rem] font-medium"
                  >
                    <CircleAlert className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
                    {failure}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    name="name"
                    label={labels.labels.name}
                    autoComplete="name"
                    value={form.name}
                    onChange={update("name")}
                    onBlur={leave("name")}
                    error={shown("name")}
                  />
                  <FormField
                    name="email"
                    label={labels.labels.email}
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    value={form.email}
                    onChange={update("email")}
                    onBlur={leave("email")}
                    error={shown("email")}
                  />
                  <FormField
                    name="organisation"
                    label={labels.labels.organisation}
                    autoComplete="organization"
                    optional
                    value={form.organisation}
                    onChange={update("organisation")}
                    onBlur={leave("organisation")}
                  />
                  <FormField
                    name="phone"
                    label={labels.labels.phone}
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    optional
                    value={form.phone}
                    onChange={update("phone")}
                    onBlur={leave("phone")}
                    error={shown("phone")}
                  />
                </div>

                <FormField
                  name="message"
                  label={labels.labels.message}
                  multiline
                  value={form.message}
                  onChange={update("message")}
                  onBlur={leave("message")}
                  error={shown("message")}
                  hint={labels.messagePrompt}
                />

                <p className="flex gap-2.5 pt-1 text-[0.85rem] leading-relaxed text-muted">
                  <Info className="w-4 h-4 mt-0.5 shrink-0 text-gold-600" aria-hidden="true" />
                  <span>
                    {enquiry.notice} Read our{" "}
                    <Link
                      href={labels.privacy.href}
                      className="text-forest-700 underline underline-offset-4 decoration-forest-700/40 hover:decoration-current rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700"
                    >
                      {labels.privacy.label}
                    </Link>
                    .
                  </span>
                </p>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 inline-flex items-center justify-center gap-2 w-full min-h-12 py-3 bg-forest-700 text-white text-[1rem] font-semibold rounded-lg hover:bg-forest disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-forest-700/40"
                >
                  {loading ? (
                    <>
                      <IconSpinner />
                      Sending…
                    </>
                  ) : (
                    labels.button
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

// The faint leaf spray in the corner of the research form band.
function Leaf() {
  return (
    <svg
      viewBox="0 0 120 260"
      className="pointer-events-none absolute -left-6 bottom-0 w-28 sm:w-36 h-auto text-[#9fb79f] opacity-40"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M58 260 C60 190 62 120 70 20" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M62 200 C30 196 10 176 4 150 C34 152 54 170 62 200Z" />
      <path d="M63 170 C92 160 108 138 112 112 C84 118 66 140 63 170Z" />
      <path d="M65 135 C36 128 20 106 18 80 C46 86 62 108 65 135Z" />
      <path d="M67 100 C92 90 104 70 106 46 C82 54 68 74 67 100Z" />
      <path d="M69 62 C50 54 42 36 44 16 C62 26 70 42 69 62Z" />
    </svg>
  );
}
