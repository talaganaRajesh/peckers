import React from "react";
import FaqClient from "./FaqClient";
import { faqData } from "./faqData";
import { buildPageMetadata } from "../lib/seo";

export async function generateMetadata({ searchParams }) {
  return buildPageMetadata({
    searchParams,
    title: "Peckers FAQ | Questions About Our Chicken & Menu",
    description:
      "Got questions about Peckers? Find out about our chicken, opening hours, locations in Stevenage and Hitchin, delivery, menu, and loyalty rewards.",
    keywords: [
      "Peckers FAQ",
      "is Peckers good",
      "what does Peckers serve",
      "Peckers opening hours Stevenage",
      "Peckers opening hours Hitchin",
      "where is Peckers",
      "does Peckers do delivery",
      "best chicken shop Hertfordshire",
      "Peckers loyalty program",
      "Peckers chicken menu",
      "is Peckers chicken fresh",
      "Peckers peri peri",
    ],
    path: "/faq",
  });
}

const FAQPage = () => {
  // Generate FAQ Schema (JSON-LD)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.flatMap(category =>
      category.items.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer.replace(/\[(.*?)\]\((.*?)\)/g, '$1') // Strip markdown links for schema
        }
      }))
    )
  };

  return (
    <>
      {/* FAQ Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen bg-black text-white pt-[25vw] md:pt-[15vw] lg:pt-[10vw] pb-[2vw]">
        <FaqClient />
      </main>
    </>
  );
};

export default FAQPage;
