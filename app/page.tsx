import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { ProblemSection } from "@/components/problem-section";
import { ProductBento } from "@/components/product-bento";
import { HowItWorks } from "@/components/how-it-works";
import { Surfaces } from "@/components/surfaces";
import { InteractiveDemo } from "@/components/interactive-demo";
import { Customers } from "@/components/customers";
import { Faq } from "@/components/faq";
import { FinalCta } from "@/components/final-cta";
import { Footer } from "@/components/footer";
import { SiteMotion } from "@/components/site-motion";
import { flags } from "@/lib/flags";
import { getFaqItems } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const faqItems = await getFaqItems();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "Lore",
        url: process.env.NEXT_PUBLIC_SITE_URL || "https://lore.dev",
        description: "Institutional memory for engineering teams.",
      },
      {
        "@type": "SoftwareApplication",
        name: "Lore",
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Web, VS Code, CLI",
        description:
          "Lore captures the why behind every technical decision and gives it back the instant anyone asks, with sources.",
        offers: {
          "@type": "Offer",
          category: "Design-partner beta",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.html
              ? item.html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
              : item.question,
          },
        })),
      },
    ],
  };

  return (
    <>
      {/* eslint-disable-next-line react/no-danger -- static JSON-LD, not user input */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />
      <main id="top">
        <Hero />
        <Marquee />
        <ProblemSection />
        <ProductBento />
        <HowItWorks />
        <Surfaces />
        {flags.interactiveDemo && <InteractiveDemo />}
        <Customers />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <SiteMotion />
    </>
  );
}
