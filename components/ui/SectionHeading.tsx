/**
 * A section heading as drawn in the concepts: an optional small green
 * eyebrow, a serif title, an optional gold rule and an introduction.
 */
export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  rule = false,
  id,
  as: Tag = "h2",
  className = "",
}: {
  eyebrow?: string;
  title: string;
  intro?: string | string[];
  align?: "center" | "left";
  rule?: boolean;
  id?: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  const center = align === "center";
  const paragraphs = intro ? (Array.isArray(intro) ? intro : [intro]) : [];
  return (
    <div className={`${center ? "text-center mx-auto" : ""} max-w-3xl ${className}`}>
      {eyebrow && <p className="t-eyebrow text-forest-700 mb-3">{eyebrow}</p>}
      <Tag id={id} className="t-h2 text-forest">
        {title}
      </Tag>
      {rule && <GoldRule className={`mt-4 ${center ? "mx-auto" : ""}`} />}
      {paragraphs.map((p) => (
        <p key={p} className="mt-4 t-lead text-muted">
          {p}
        </p>
      ))}
    </div>
  );
}

/** The short gold rule under headings. */
export function GoldRule({ className = "" }: { className?: string }) {
  return (
    <span
      className={`block h-[3px] w-14 rounded-full bg-gold ${className}`}
      aria-hidden="true"
    />
  );
}
