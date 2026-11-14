"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronDown,
  CircleAlert,
  Info,
  Paperclip,
} from "lucide-react";
import { IconSpinner } from "@/components/auth/shared/icons";
import FormField, { fieldBox, fieldLabel } from "@/components/shared/FormField";
import Container from "@/components/ui/Container";
import { GoldRule } from "@/components/ui/SectionHeading";
import { interest, opportunityTypes, type OpportunityType } from "./content";
import { INTEREST_EVENT } from "./interestEvent";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  type: OpportunityType | "";
  reference: string;
  statement: string;
};

type Errors = Partial<Record<keyof FormValues, string>>;

const emptyForm: FormValues = {
  name: "",
  email: "",
  phone: "",
  type: "",
  reference: "",
  statement: "",
};

// Name, email, the opportunity type, the reference or area and the
// statement are required; phone is optional, as the handover asks.
function validate(values: FormValues): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
    errors.email = "Enter a valid email address.";
  if (values.phone.trim() && values.phone.replace(/\D/g, "").length < 7)
    errors.phone = "Enter a phone number we can reach you on, or leave it blank.";
  if (!values.type) errors.type = "Choose the kind of opportunity you are interested in.";
  if (!values.reference.trim())
    errors.reference = "Enter a role reference or describe your area of interest.";
  if (!values.statement.trim())
    errors.statement = "Tell us about your experience and the contribution you would like to make.";
  return errors;
}

// The opportunity type, chosen from the four kinds, labelled like the
// other fields.
function TypeSelect({
  value,
  onChange,
  onBlur,
  error,
}: {
  value: FormValues["type"];
  onChange: (value: FormValues["type"]) => void;
  onBlur: () => void;
  error?: string;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  const { labels } = interest.form;
  return (
    <div>
      <label htmlFor={id} className={fieldLabel}>
        {labels.type}
        <span className="text-red-600" aria-hidden="true">
          {" "}
          *
        </span>
      </label>
      <div className="relative">
        <select
          id={id}
          name="type"
          value={value}
          onChange={(e) => onChange(e.target.value as FormValues["type"])}
          onBlur={onBlur}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          aria-required
          className={`${fieldBox(!!error)} appearance-none h-12 px-3.5 pr-10 cursor-pointer ${
            value ? "" : "text-muted"
          }`}
        >
          <option value="">{labels.typePlaceholder}</option>
          {opportunityTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted"
          aria-hidden="true"
        />
      </div>
      {error && (
        <p
          id={errorId}
          role="alert"
          className="mt-1.5 flex items-start gap-1.5 text-[0.82rem] leading-snug text-red-700"
        >
          <CircleAlert className="w-3.5 h-3.5 mt-0.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * "Tell Us How You Would Like to Contribute": the heading and guidance,
 * then the expression-of-interest form laid out in three columns on wide
 * screens. The opportunity buttons above preselect the type; fields are
 * checked as you leave them, what you typed survives any error, and the
 * confirmation shows only once the enquiry has actually been sent.
 */
export default function InterestForm() {
  const [form, setForm] = useState<FormValues>(emptyForm);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [failure, setFailure] = useState("");
  const { form: f, confirmation } = interest;

  // Preselect the opportunity type announced by the buttons above.
  useEffect(() => {
    const onInterest = (e: Event) => {
      const type = (e as CustomEvent<OpportunityType>).detail;
      setForm((prev) => ({ ...prev, type }));
      setSent(false);
    };
    window.addEventListener(INTEREST_EVENT, onInterest);
    return () => window.removeEventListener(INTEREST_EVENT, onInterest);
  }, []);

  const update = (name: keyof FormValues) => (value: string) => {
    const next = { ...form, [name]: value } as FormValues;
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
    setTouched({ name: true, email: true, phone: true, type: true, reference: true, statement: true });
    setErrors(all);
    if (Object.keys(all).length > 0) {
      const first = Object.keys(all)[0];
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setFailure("");
    setLoading(true);
    const phone = form.phone.trim();
    try {
      const res = await fetch("/api/proxy/contact-us", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: form.name.trim(),
          email: form.email.trim(),
          phone_number: phone || undefined,
          subject: `${f.subject}: ${form.type}`,
          message: [
            `Opportunity type: ${form.type}`,
            `Role reference or area of interest: ${form.reference.trim()}`,
            "",
            form.statement,
          ].join("\n"),
          platform: "NG",
          category: "general",
          source_page: "/careers-and-volunteering",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(
          data.message || "We couldn’t send your expression of interest. Please try again.",
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
          : "We couldn’t send your expression of interest. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="interest"
      aria-labelledby="interest-heading"
      className="py-14 sm:py-16 scroll-mt-24"
    >
      <Container>
        <div className="text-center">
          <h2 id="interest-heading" className="t-h2 text-forest">
            {interest.title}
          </h2>
          <GoldRule className="mx-auto mt-4" />
          <p className="mt-5 inline-flex items-center rounded-full bg-mint-200/70 px-4 py-1.5 text-[0.9rem] text-forest">
            {interest.note}
          </p>
          <div className="mt-5 max-w-3xl mx-auto space-y-2 t-body text-muted">
            {interest.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>

        <div className="mt-10">
          {sent ? (
            <div
              role="status"
              className="max-w-2xl mx-auto flex flex-col items-center text-center gap-5 rounded-2xl bg-mint p-8"
            >
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
                Send another expression of interest
                <ArrowRight
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate aria-label={f.heading}>
              {failure && (
                <div
                  role="alert"
                  className="mb-5 flex items-start gap-2.5 p-4 rounded-lg bg-red-50 text-red-700 text-[0.9rem] font-medium"
                >
                  <CircleAlert className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
                  {failure}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <FormField
                  name="name"
                  label={f.labels.name}
                  autoComplete="name"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={update("name")}
                  onBlur={leave("name")}
                  error={shown("name")}
                />
                <FormField
                  name="email"
                  label={f.labels.email}
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="Your email address"
                  value={form.email}
                  onChange={update("email")}
                  onBlur={leave("email")}
                  error={shown("email")}
                />
                <FormField
                  name="phone"
                  label={f.labels.phone}
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  optional
                  placeholder="Your phone number"
                  value={form.phone}
                  onChange={update("phone")}
                  onBlur={leave("phone")}
                  error={shown("phone")}
                />
                <TypeSelect
                  value={form.type}
                  onChange={update("type")}
                  onBlur={leave("type")}
                  error={shown("type")}
                />
                <FormField
                  name="reference"
                  label={f.labels.reference}
                  value={form.reference}
                  onChange={update("reference")}
                  onBlur={leave("reference")}
                  error={shown("reference")}
                  hint={f.referenceGuidance}
                />
                <div>
                  <p className={fieldLabel}>
                    {f.documents.label}
                    <span className="font-normal text-muted/80"> (optional)</span>
                  </p>
                  <div className="rounded-lg bg-cream border border-[#ece6d6] p-3.5 flex gap-2.5">
                    <Paperclip
                      className="w-4 h-4 mt-0.5 shrink-0 text-gold-600"
                      aria-hidden="true"
                    />
                    <p className="text-[0.82rem] leading-relaxed text-muted">
                      {f.documents.note}
                    </p>
                  </div>
                </div>
                <div className="sm:col-span-2 lg:col-span-3">
                  <FormField
                    name="statement"
                    label={f.labels.statement}
                    multiline
                    placeholder="Tell us about your interest, relevant experience and how you would like to contribute…"
                    value={form.statement}
                    onChange={update("statement")}
                    onBlur={leave("statement")}
                    error={shown("statement")}
                    hint={f.statementGuidance}
                  />
                </div>
              </div>

              <p className="mt-5 flex gap-2.5 text-[0.85rem] leading-relaxed text-muted">
                <Info className="w-4 h-4 mt-0.5 shrink-0 text-gold-600" aria-hidden="true" />
                <span>
                  Please read our{" "}
                  <Link
                    href={f.privacy.href}
                    className="text-forest-700 underline underline-offset-4 hover:text-forest rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700"
                  >
                    {f.privacy.linkLabel}
                  </Link>{" "}
                  before submitting your details. {f.privacy.caution}
                </span>
              </p>

              <div className="mt-6 flex flex-col items-center gap-3 text-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 min-h-12 px-8 py-3 bg-forest-700 text-white text-[1rem] font-semibold rounded-lg hover:bg-forest disabled:opacity-60 disabled:cursor-not-allowed transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-forest-700/40"
                >
                  {loading ? (
                    <>
                      <IconSpinner />
                      Sending…
                    </>
                  ) : (
                    f.button
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
