import { GoldRule } from "./SectionHeading";

/**
 * The opening of an inner page, as in the About, E-Learning, Research and
 * Policy concepts: a cream band with the page's single H1 centred in serif,
 * an optional line beneath and a short gold rule, followed by the page's
 * large rounded photograph.
 */
export default function PageTitle({
  title,
  subtitle,
  image,
  imageAlt,
  imageWidth,
  imageHeight,
  focus = "50% 40%",
  rule = true,
  children,
}: {
  title: string;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  focus?: string;
  rule?: boolean;
  // Extra content under the subtitle, such as buttons.
  children?: React.ReactNode;
}) {
  return (
    <section aria-labelledby="page-title">
      <div className="bg-cream">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-10 pb-8 sm:pt-12 sm:pb-10 text-center">
          <h1 id="page-title" className="t-display text-forest">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-3 t-lead text-ink/80 max-w-2xl mx-auto">{subtitle}</p>
          )}
          {rule && <GoldRule className="mx-auto mt-5" />}
          {children}
        </div>
      </div>
      {image && (
        <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-4 sm:pt-6">
          <img
            src={image}
            alt={imageAlt ?? ""}
            width={imageWidth}
            height={imageHeight}
            fetchPriority="high"
            className="w-full aspect-[4/3] sm:aspect-[16/7] object-cover rounded-2xl shadow-[0_20px_50px_-30px_rgba(15,61,46,0.45)]"
            style={{ objectPosition: focus }}
          />
        </div>
      )}
    </section>
  );
}
