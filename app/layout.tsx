import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AnnouncementBar } from "@/components/announcement-bar";
import { fetchAnnouncement } from "@/lib/plugins";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "flykit — Claude Code plugins for real-world workflows",
  description:
    "Open-source Claude Code plugins for real-world workflows. Install, run, contribute.",
  metadataBase: new URL("https://flykit.cc"),
  alternates: { canonical: "/" },
};

const siteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "flykit",
  url: "https://flykit.cc",
  description:
    "Open-source Claude Code plugins for real-world workflows. Install, run, contribute.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const announcement = await fetchAnnouncement();
  return (
    <html
      lang="en"
      className={`${inter.variable} ${GeistMono.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
        <AnnouncementBar announcement={announcement} />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
