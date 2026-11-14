import type { Metadata, Viewport } from "next";
import { shareImage, site } from "@/lib/site";
import { Roboto, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/generic/ThemeProvider";

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

// Serif used for headings, as in the client's page concepts.
const serif = Source_Serif_4({
  variable: "--font-serif-display",
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});


// Site-wide defaults. Pages set their own title (completed by the template
// below) and description; Open Graph and Twitter fields are inherited unless
// a page defines its own. The sharing image comes from app/opengraph-image.jpg.
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.organisation, url: site.url }],
  creator: site.organisation,
  publisher: site.organisation,
  category: "education",
  keywords: [
    "social work Nigeria",
    "social work training",
    "CPD for social workers",
    "social work e-learning",
    "research and evaluation",
    "policy and advocacy",
    "safeguarding training Nigeria",
    "Social Work Consultancy Ltd",
  ],
  formatDetection: { email: false, address: false, telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: "/",
    title: site.name,
    description: site.description,
    images: [shareImage],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
    images: [shareImage],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${roboto.variable} ${serif.variable} scroll-smooth`} suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`${roboto.className} antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
