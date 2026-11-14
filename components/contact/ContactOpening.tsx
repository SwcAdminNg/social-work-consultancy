import PageTitle from "@/components/ui/PageTitle";
import { opening } from "./content";

// The page title band with the line explaining what to write to us about.
export default function ContactOpening() {
  return <PageTitle title={opening.title} subtitle={opening.tagline} />;
}
