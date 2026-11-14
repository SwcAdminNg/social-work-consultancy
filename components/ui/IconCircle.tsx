import type { LucideIcon } from "lucide-react";

export type IconTone =
  | "forest"
  | "slate"
  | "gold"
  | "goldSoft"
  | "cream"
  | "copper"
  | "mint"
  | "olive";

const tones: Record<IconTone, string> = {
  forest: "bg-forest-700 text-white",
  slate: "bg-slate text-white",
  gold: "bg-gold text-white",
  goldSoft: "bg-gold-100 text-gold-600",
  cream: "bg-cream-200 text-forest-700",
  copper: "bg-copper text-white",
  mint: "bg-mint-200 text-forest-700",
  olive: "bg-[#59622f] text-white",
};

const sizes = {
  sm: "w-10 h-10 [&>svg]:w-5 [&>svg]:h-5",
  md: "w-14 h-14 [&>svg]:w-6 [&>svg]:h-6",
  lg: "w-16 h-16 [&>svg]:w-7 [&>svg]:h-7",
  xl: "w-20 h-20 [&>svg]:w-9 [&>svg]:h-9",
};

/** An icon set in a solid circle, the device every concept uses. */
export default function IconCircle({
  icon: Icon,
  tone = "forest",
  size = "md",
  className = "",
}: {
  icon: LucideIcon;
  tone?: IconTone;
  size?: keyof typeof sizes;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 rounded-full ${tones[tone]} ${sizes[size]} ${className}`}
      aria-hidden="true"
    >
      <Icon strokeWidth={1.75} />
    </span>
  );
}
