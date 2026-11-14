"use client";

import { useId } from "react";
import { CircleAlert } from "lucide-react";

export const fieldBox = (error?: boolean) =>
  `w-full rounded-lg bg-white text-[1rem] text-ink placeholder:text-muted/60 border outline-none transition-[border-color,box-shadow] duration-150 ${
    error
      ? "border-red-500 focus:ring-4 focus:ring-red-500/15"
      : "border-[#cfd8d3] hover:border-[#aebcb5] focus:border-forest-700 focus:ring-4 focus:ring-forest-700/15"
  }`;

export const fieldLabel = "block mb-1.5 text-[0.9rem] font-medium text-ink";

/**
 * A labelled form field as drawn in the concepts: the label sits above a
 * white box, with "optional" in a lighter tone. Errors and hints appear
 * underneath and are tied to the field for screen readers.
 */
export default function FormField({
  name,
  label,
  value,
  onChange,
  onBlur,
  error,
  type = "text",
  autoComplete,
  inputMode,
  optional = false,
  multiline = false,
  hint,
  placeholder,
}: {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: string;
  type?: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  optional?: boolean;
  multiline?: boolean;
  hint?: string;
  placeholder?: string;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy =
    [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") ||
    undefined;

  const shared = {
    id,
    name,
    value,
    onBlur,
    placeholder,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
    "aria-required": !optional,
  } as const;

  return (
    <div>
      <label htmlFor={id} className={fieldLabel}>
        {label}
        {optional && <span className="font-normal text-muted/80"> (optional)</span>}
        {!optional && (
          <span className="text-red-600" aria-hidden="true">
            {" "}
            *
          </span>
        )}
      </label>
      {multiline ? (
        <textarea
          {...shared}
          rows={5}
          onChange={(e) => onChange(e.target.value)}
          className={`${fieldBox(!!error)} min-h-[8.5rem] px-3.5 py-3 resize-y leading-relaxed`}
        />
      ) : (
        <input
          {...shared}
          type={type}
          autoComplete={autoComplete}
          inputMode={inputMode}
          onChange={(e) => onChange(e.target.value)}
          className={`${fieldBox(!!error)} h-12 px-3.5`}
        />
      )}
      {error ? (
        <p
          id={errorId}
          role="alert"
          className="mt-1.5 flex items-start gap-1.5 text-[0.82rem] leading-snug text-red-700"
        >
          <CircleAlert className="w-3.5 h-3.5 mt-0.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="mt-1.5 text-[0.82rem] leading-snug text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
