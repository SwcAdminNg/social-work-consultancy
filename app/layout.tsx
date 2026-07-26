import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { SiteHeader } from "./_components/site-header";
import { ThemeSync } from "./_components/theme-sync";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Social Work Consultancy Ltd",
  description:
    "Social Work Consultancy Ltd provides expert social work consultancy, training, and support services.",
};

const THEME_INIT_SCRIPT = `(function(){try{var s=localStorage.getItem("theme");var t=s==="light"||s==="dark"?s:(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${roboto.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeSync />
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
