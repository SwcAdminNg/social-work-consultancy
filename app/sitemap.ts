import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Public pages, with how often each tends to change and how important it
// is relative to the home page. Courses and resources live on the learning
// platform, which publishes its own sitemap.
const staticRoutes: {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about-us", changeFrequency: "monthly", priority: 0.8 },
  { path: "/e-learning", changeFrequency: "monthly", priority: 0.8 },
  { path: "/research-and-evaluation", changeFrequency: "monthly", priority: 0.8 },
  { path: "/policy-and-advocacy", changeFrequency: "monthly", priority: 0.8 },
  { path: "/partner-with-us", changeFrequency: "monthly", priority: 0.7 },
  { path: "/careers-and-volunteering", changeFrequency: "monthly", priority: 0.7 },
  { path: "/mentorship", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms-of-service", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return staticRoutes.map((route) => ({
    url: `${site.url}${route.path === "/" ? "" : route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
