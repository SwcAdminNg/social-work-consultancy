import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Every page here is public; only the form endpoint is kept out of crawls.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
