import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Thesis: VC Pitch Deck Analysis & Investment Memo Software",
    template: "%s | Thesis",
  },
  description:
    "Thesis analyzes pitch decks in under 30 seconds, generates investment memos, and scores deals against your fund's thesis. Used by VC analysts at early-stage funds.",
  keywords: [
    "pitch deck analysis",
    "investment memo generator",
    "VC deal flow software",
    "venture capital tools",
    "pitch deck AI",
    "thesis fit scoring",
    "deal flow management",
    "VC analyst tools",
    "startup pitch deck review",
    "investment memo software",
  ],
  openGraph: {
    title: "Thesis: VC Pitch Deck Analysis & Investment Memo Software",
    description:
      "Analyze pitch decks in 30 seconds. Generate investment memos. Score deals against your fund's thesis. Built for VC analysts.",
    url: "https://trythesis.vercel.app",
    siteName: "Thesis",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thesis: VC Pitch Deck Analysis & Investment Memo Software",
    description:
      "Analyze pitch decks in 30 seconds. Generate investment memos. Score deals against your thesis.",
  },
  alternates: {
    canonical: "https://trythesis.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800&family=Geist+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Thesis",
              applicationCategory: "BusinessApplication",
              description:
                "AI-powered pitch deck analysis and investment memo generation for venture capital analysts. Analyzes decks in under 30 seconds with thesis fit scoring.",
              url: "https://trythesis.vercel.app",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                description: "Free tier available with 10 decks per month",
              },
              featureList: [
                "Pitch deck analysis in under 30 seconds",
                "Investment memo generation",
                "Thesis fit scoring",
                "AI authorship detection",
                "Deal pipeline management",
                "Red flag detection",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
