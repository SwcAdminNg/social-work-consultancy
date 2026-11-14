"use client";

import ButtonLink from "@/components/ui/Button";
import type { OpportunityType } from "./content";
import { announceInterest } from "./interestEvent";

/** Scrolls to the form and preselects the matching opportunity type. */
export default function InterestButton({
  type,
  label,
}: {
  type: OpportunityType;
  label: string;
}) {
  return (
    <ButtonLink href="#interest" onClick={() => announceInterest(type)}>
      {label}
    </ButtonLink>
  );
}
