"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Home as HomeIcon,
  Pause,
  Play,
  Users,
  type LucideIcon,
} from "lucide-react";
import ButtonLink from "@/components/ui/Button";
import { heroSlides } from "./content";

// Colour and icon of each banner's tab, as in the concept.
const tabStyle: Record<string, { icon: LucideIcon; tone: string }> = {
  home: { icon: HomeIcon, tone: "bg-forest-700 hover:bg-forest-600 text-white" },
  "e-learning": { icon: BookOpen, tone: "bg-slate hover:bg-[#4f7d79] text-white" },
  research: { icon: BarChart3, tone: "bg-gold hover:bg-gold-600 text-white" },
  policy: { icon: Users, tone: "bg-forest hover:bg-[#0a2e22] text-white" },
};

const SLIDE_MS = 9000;

/**
 * The opening banners: a full-width photograph with the headline on a
 * dark gradient, and the four coloured tabs (Home, E-Learning, Research,
 * Policy and Advocacy) along its foot. Tabs switch the banner; the banners
 * also turn slowly on their own unless paused or reduced motion is set.
 * Only the visible banner is rendered, so the page has one H1 at a time.
 */
export default function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const rotating = !paused && !hovering && !reduce;
  useEffect(() => {
    if (!rotating) return;
    const t = window.setTimeout(
      () => setIndex((i) => (i + 1) % heroSlides.length),
      SLIDE_MS,
    );
    return () => window.clearTimeout(t);
  }, [rotating, index]);

  const slide = heroSlides[index];

  return (
    <section
      aria-label="Introduction"
      className="relative"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocusCapture={() => setHovering(true)}
      onBlurCapture={() => setHovering(false)}
    >
      <div className="relative overflow-hidden bg-forest min-h-[520px] lg:min-h-[580px] flex items-center">
        {heroSlides.map((s, i) => (
          <img
            key={s.id}
            src={s.image}
            alt=""
            aria-hidden="true"
            fetchPriority={i === 0 ? "high" : "low"}
            loading={i === 0 ? "eager" : "lazy"}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              i === index ? "opacity-100 hero-zoom" : "opacity-0"
            }`}
            style={{ objectPosition: s.focus }}
          />
        ))}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#08261c]/95 via-[#08261c]/70 to-[#08261c]/10"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#08261c]/60 to-transparent"
          aria-hidden="true"
        />

        <div
          id="hero-panel"
          role="group"
          aria-roledescription="slide"
          aria-label={`${index + 1} of ${heroSlides.length}: ${slide.tab}`}
          aria-live={rotating ? "off" : "polite"}
          className="relative w-full mx-auto max-w-6xl px-4 sm:px-6 pt-10 pb-20 lg:pt-12 lg:pb-24"
        >
          <div className="max-w-2xl text-white">
            <h1 key={slide.id} className="t-display">
              {slide.headline.map((line) => (
                <span key={line} className="block">
                  {line}
                  <span className="text-gold">.</span>
                </span>
              ))}
            </h1>
            <div className="mt-4 space-y-2.5 max-w-xl">
              {slide.paragraphs.map((p) => (
                <p key={p} className="text-[1rem] sm:text-[1.08rem] leading-relaxed text-white/90">
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href={slide.primary.href} variant="gold">
                {slide.primary.label}
              </ButtonLink>
              {slide.secondary && (
                <ButtonLink href={slide.secondary.href} variant="light" arrow={false}>
                  {slide.secondary.label}
                </ButtonLink>
              )}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? "Play banner rotation" : "Pause banner rotation"}
          aria-pressed={paused}
          hidden={reduce}
          className="absolute right-4 sm:right-6 bottom-20 lg:bottom-24 inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/30 text-white ring-1 ring-white/40 hover:bg-black/50 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          {paused ? (
            <Play className="w-4 h-4" aria-hidden="true" />
          ) : (
            <Pause className="w-4 h-4" aria-hidden="true" />
          )}
        </button>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 -mt-12">
        <ul
          aria-label="Choose a banner"
          className="list-none m-0 p-0 grid grid-cols-2 lg:grid-cols-4 gap-3"
        >
          {heroSlides.map((s, i) => {
            const { icon: Icon, tone } = tabStyle[s.id] ?? tabStyle.home;
            const active = i === index;
            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-pressed={active}
                  aria-controls="hero-panel"
                  className={`w-full h-full min-h-16 flex items-center gap-3 px-4 sm:px-5 py-4 rounded-lg text-left shadow-[0_18px_40px_-20px_rgba(8,38,28,0.6)] transition-[background-color,transform] duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold/60 ${tone} ${
                    active ? "ring-2 ring-white ring-offset-2 ring-offset-transparent -translate-y-1" : ""
                  }`}
                >
                  <Icon className="w-5 h-5 shrink-0" aria-hidden="true" />
                  <span className="flex-1 text-[0.8rem] sm:text-[0.85rem] font-bold uppercase tracking-[0.06em] leading-tight">
                    {s.tab}
                  </span>
                  <ArrowRight className="w-4 h-4 shrink-0 hidden sm:block" aria-hidden="true" />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
