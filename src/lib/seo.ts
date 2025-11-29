export const siteTitle = "Don't Mix Blind — Supplement–Drug Interaction Checker";
export const siteDescription =
  "Instantly check supplement–drug interactions. Explore a vetted library of 2,500+ interactions. Subscriptions for power users and clinics.";

export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Don't Mix Blind",
  url: "https://supplementsafetybible.com/",
  potentialAction: {
    "@type": "SearchAction",
    target:
      "https://supplementsafetybible.com/search?supplement={supplement}&medication={medication}",
    "query-input": ["required name=supplement", "required name=medication"],
  },
  about: {
    "@type": "MedicalWebPage",
    name: "Supplement–Drug Interactions",
    description: siteDescription,
  },
};
