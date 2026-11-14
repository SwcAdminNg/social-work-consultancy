"use client";

import { useState } from "react";
import { ArrowRight, Building2, Check, CircleAlert, Info, MapPin, Phone } from "lucide-react";
import { IconSpinner } from "@/components/auth/shared/icons";
import FormField from "@/components/shared/FormField";
import Container from "@/components/ui/Container";
import { contact } from "./content";
import { site } from "@/lib/site";

type FormValues = {
  full_name: string;
  email: string;
  phone_number: string;
  organisation: string;
  message: string;
};

type Errors = Partial<Record<keyof FormValues, string>>;

const emptyForm: FormValues = {
  full_name: "",
  email: "",
  phone_number: "",
  organisation: "",
  message: "",
};

// What each field needs before the enquiry can be sent. Phone and
// organisation are optional, as in the handover.
function validate(values: FormValues): Errors {
  const errors: Errors = {};
  if (!values.full_name.trim()) errors.full_name = "Enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
    errors.email = "Enter a valid email address.";
  if (values.phone_number.trim() && values.phone_number.replace(/\D/g, "").length < 7)
    errors.phone_number = "Enter a phone number we can reach you on, or leave it blank.";
  if (!values.message.trim()) errors.message = "Tell us a little about what you need.";
  return errors;
}

/**
 * "Let Us Turn Your Priorities into a Practical Plan": the invitation and
 * office details on the left, the enquiry form on a pale green card on the
 * right. Fields are checked as you leave them, and the confirmation shows
 * only once the enquiry has been sent.
 */
export default function HomeContact() {
  const [form, setForm] = useState<FormValues>(emptyForm);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [failure, setFailure] = useState("");

  const update = (name: keyof FormValues) => (value: string) => {
    const next = { ...form, [name]: value };
    setForm(next);
    if (touched[name]) setErrors(validate(next));
  };

  const leave = (name: keyof FormValues) => () => {
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors(validate(form));
  };

  const shown = (name: keyof FormValues) => (touched[name] ? errors[name] : undefined);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const all = validate(form);
    setTouched({ full_name: true, email: true, phone_number: true, organisation: true, message: true });
    setErrors(all);
    if (Object.keys(all).length > 0) {
      const first = Object.keys(all)[0];
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setFailure("");
    setLoading(true);
    const organisation = form.organisation.trim();
    const phone = form.phone_number.trim();
    try {
      const res = await fetch("/api/proxy/contact-us", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: form.full_name.trim(),
          email: form.email.trim(),
          phone_number: phone || undefined,
          subject: organisation ? `Website enquiry from ${organisation}` : "Website enquiry",
          message: organisation ? `Organisation: ${organisation}\n\n${form.message}` : form.message,
          platform: site.platform,
          category: "general",
          source_page: "/",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || "We couldn’t send your enquiry. Please try again.");
      }
      setSent(true);
      setForm(emptyForm);
      setTouched({});
      setErrors({});
    } catch (err) {
      setFailure(
        err instanceof Error ? err.message : "We couldn’t send your enquiry. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const details = [
    { icon: Building2, value: contact.organisation },
    { icon: MapPin, value: contact.address },
    {
      icon: Phone,
      value: contact.phone,
      href: `tel:${contact.phone.replace(/\s/g, "")}`,
    },
  ];

  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-14 sm:py-20 scroll-mt-24">
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14 items-start">
        <div>
          <p className="t-eyebrow text-forest-700">Get in touch</p>
          <h2 id="contact-heading" className="mt-3 t-h2 text-forest">
            {contact.title}
          </h2>
          <div className="mt-5 space-y-4 t-body text-muted">
            {contact.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <ul className="list-none m-0 p-0 mt-8 space-y-4">
            {details.map(({ icon: Icon, value, href }) => (
              <li key={value} className="flex items-start gap-3 text-[0.98rem] text-ink">
                <Icon className="w-5 h-5 mt-0.5 shrink-0 text-forest-700" aria-hidden="true" />
                {href ? (
                  <a
                    href={href}
                    className="hover:text-forest-700 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700/40"
                  >
                    {value}
                  </a>
                ) : (
                  <span>{value}</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-mint rounded-2xl p-5 sm:p-8">
          {sent ? (
            <div role="status" className="flex flex-col items-start gap-4 py-4">
              <span className="flex items-center justify-center w-14 h-14 rounded-full bg-forest-700 text-white">
                <Check className="w-7 h-7" aria-hidden="true" />
              </span>
              <p className="t-h3 text-forest">Thank you. Your enquiry has been sent.</p>
              <p className="t-body text-muted">
                We will use the information you shared to discuss your request and identify an
                appropriate next step.
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="group inline-flex items-center gap-2 font-semibold text-forest-700 rounded cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700"
              >
                Send another enquiry
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {failure && (
                <div
                  role="alert"
                  className="flex items-start gap-2.5 p-4 rounded-lg bg-red-50 text-red-700 text-[0.9rem] font-medium"
                >
                  <CircleAlert className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
                  {failure}
                </div>
              )}
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  name="full_name"
                  label="Full name"
                  autoComplete="name"
                  value={form.full_name}
                  onChange={update("full_name")}
                  onBlur={leave("full_name")}
                  error={shown("full_name")}
                />
                <FormField
                  name="email"
                  label="Email address"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  value={form.email}
                  onChange={update("email")}
                  onBlur={leave("email")}
                  error={shown("email")}
                />
                <FormField
                  name="phone_number"
                  label="Phone number"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  optional
                  value={form.phone_number}
                  onChange={update("phone_number")}
                  onBlur={leave("phone_number")}
                  error={shown("phone_number")}
                />
                <FormField
                  name="organisation"
                  label="Organisation, if applicable"
                  autoComplete="organization"
                  optional
                  value={form.organisation}
                  onChange={update("organisation")}
                  onBlur={leave("organisation")}
                  error={shown("organisation")}
                />
              </div>
              <FormField
                name="message"
                label="How can we help?"
                multiline
                value={form.message}
                onChange={update("message")}
                onBlur={leave("message")}
                error={shown("message")}
                hint={contact.messagePrompt}
              />
              <p className="flex gap-2.5 text-[0.85rem] leading-relaxed text-muted">
                <Info className="w-4 h-4 mt-0.5 shrink-0 text-gold-600" aria-hidden="true" />
                {contact.notice}
              </p>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto min-h-12 px-8 py-3 bg-forest-700 text-white font-semibold rounded-lg hover:bg-forest disabled:opacity-60 disabled:cursor-not-allowed transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-forest-700/40"
              >
                {loading ? (
                  <>
                    <IconSpinner />
                    Sending…
                  </>
                ) : (
                  <>
                    {contact.button}
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
