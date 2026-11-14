"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";

/**
 * Keeps the rest of a long passage one click away without dropping it:
 * a labelled button reveals the remaining paragraphs in place.
 */
export default function ReadMore({
  children,
  more = "Read more",
  less = "Show less",
  className = "",
}: {
  children: React.ReactNode;
  more?: string;
  less?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className={className}>
      <div id={id} hidden={!open}>
        {children}
      </div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className="mt-3 inline-flex items-center gap-1.5 text-[0.92rem] font-semibold text-forest-700 hover:text-forest rounded cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700/40"
      >
        {open ? less : more}
        <ChevronDown
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
    </div>
  );
}
