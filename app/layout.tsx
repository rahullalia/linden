import type { Metadata } from "next";
import { Instrument_Sans, Newsreader } from "next/font/google";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { studio } from "@/lib/studio";

import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const site = "https://lindenbodywork.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: {
    default: "Linden | Massage and bodywork in Williamsburg, Brooklyn",
    template: "%s | Linden",
  },
  description:
    "A four room massage studio on Withers Street. Deep tissue, sports recovery, lymphatic drainage and prenatal work. Open until nine most nights. Prices include gratuity.",
  keywords: [
    "massage Williamsburg",
    "deep tissue massage Brooklyn",
    "prenatal massage Brooklyn",
    "lymphatic drainage Brooklyn",
    "sports massage Williamsburg",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site,
    siteName: "Linden",
    title: "Linden | Massage and bodywork in Williamsburg, Brooklyn",
    description:
      "Four rooms on Withers Street. Hour long appointments, five licensed therapists, gratuity included.",
    images: [{ url: "/photographs/og.jpg", width: 1200, height: 630, alt: "A treatment room at Linden" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Linden | Massage and bodywork in Williamsburg, Brooklyn",
    description: "Four rooms on Withers Street. Hour long appointments, gratuity included.",
    images: ["/photographs/og.jpg"],
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "DaySpa",
  name: studio.legalName,
  url: site,
  telephone: studio.phone,
  email: studio.email,
  priceRange: "$$",
  image: `${site}/photographs/og.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: studio.street,
    addressLocality: studio.city,
    addressRegion: studio.state,
    postalCode: studio.zip,
    addressCountry: "US",
  },
  openingHoursSpecification: studio.hours
    .filter((h) => h.open)
    .map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${h.day}`,
      opens: h.open,
      closes: h.close,
    })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${newsreader.variable} ${instrumentSans.variable}`}>
      <head>
        {/* Scroll reveals only arm themselves once we know scripting is on,
            so the copy stays readable if it never is. */}
        <script
          dangerouslySetInnerHTML={{ __html: `document.documentElement.dataset.motion="on"` }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
        />
      </body>
    </html>
  );
}
