// schema.org JSON-LD for search engines and AI assistants. The site-wide graph (person,
// website, ventures, channel, services) is rendered once in the root layout; pages add their
// own node (a post, a case study) that points back to it by @id.

import { caseStudies } from "@/lib/case-studies";
import { DESCRIPTION, NAME, HANDLE, SITE_URL, YOUTUBE, abs, contact, expertise, sameAs, services, ventures } from "@/lib/site";

export const ids = {
  person: `${SITE_URL}/#person`,
  website: `${SITE_URL}/#website`,
  service: `${SITE_URL}/#services`,
  channel: `${YOUTUBE}#channel`,
  venture: (name: string) => `${SITE_URL}/#${name.toLowerCase()}`,
};

const address = {
  "@type": "PostalAddress",
  addressLocality: "Pune",
  addressRegion: "Maharashtra",
  addressCountry: "IN",
};

export const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": ids.person,
      name: NAME,
      alternateName: [HANDLE, "Sahil"],
      url: SITE_URL,
      image: abs("/opengraph-image"),
      jobTitle: "AI and Backend Engineer",
      description: DESCRIPTION,
      email: `mailto:${contact.email}`,
      address,
      nationality: { "@type": "Country", name: "India" },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "ABV-Indian Institute of Information Technology and Management Gwalior (IIIT Gwalior)",
        url: "https://www.iiitm.ac.in/",
      },
      hasOccupation: {
        "@type": "Occupation",
        name: "AI and Backend Engineer",
        occupationLocation: { "@type": "City", name: "Pune" },
        skills: expertise.join(", "),
      },
      knowsAbout: expertise,
      founder: ventures.map((v) => ({ "@id": ids.venture(v.name) })),
      worksFor: [
        { "@type": "Organization", name: "KerrShift", "@id": ids.venture("KerrShift") },
        { "@type": "Organization", name: "First500days", url: "https://first500days.com/" },
        { "@type": "Organization", name: "JRat's Studio", url: "https://www.jrats.studio/" },
      ],
      makesOffer: { "@id": ids.service },
      sameAs,
    },
    {
      "@type": "WebSite",
      "@id": ids.website,
      url: SITE_URL,
      name: `${NAME} (${HANDLE})`,
      description: DESCRIPTION,
      inLanguage: "en",
      author: { "@id": ids.person },
      publisher: { "@id": ids.person },
    },
    ...ventures.map((v) => ({
      "@type": "Organization",
      "@id": ids.venture(v.name),
      name: v.name,
      url: v.url,
      description: v.description,
      founder: { "@id": ids.person },
      ...(v.code ? { sameAs: [v.code] } : {}),
    })),
    {
      "@type": "ProfessionalService",
      "@id": ids.service,
      name: `${NAME}, AI and Backend Engineering`,
      url: SITE_URL,
      description:
        "End-to-end AI and backend engineering for founders and teams: from architecture to launch, in fintech, AI and healthcare.",
      provider: { "@id": ids.person },
      founder: { "@id": ids.person },
      email: contact.email,
      address,
      areaServed: [{ "@type": "Country", name: "India" }, "Worldwide (remote)"],
      knowsAbout: expertise,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services",
        itemListElement: services.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.name, description: s.description, provider: { "@id": ids.person } },
        })),
      },
    },
    {
      "@type": "VideoChannel",
      "@id": ids.channel,
      name: "Sahil Gangurde Tech",
      url: YOUTUBE,
      description: "Technical breakdowns of how AI systems work, from the GPU up: attention, KV caching, RoPE, retrieval and more.",
      author: { "@id": ids.person },
    },
  ],
};

export const homeGraph = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/#profile`,
  url: SITE_URL,
  name: `${NAME}, AI and Backend Engineer`,
  isPartOf: { "@id": ids.website },
  mainEntity: { "@id": ids.person },
  hasPart: {
    "@type": "ItemList",
    name: "Selected work",
    itemListElement: caseStudies.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: abs(c.href),
      name: c.title,
    })),
  },
};

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

/** A case study as an Article about the project, written by Sahil. */
export function caseStudyGraph({
  path,
  headline,
  description,
  project,
  client,
  keywords,
}: {
  path: string;
  headline: string;
  description: string;
  project: string;
  client?: string;
  keywords: string[];
}) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${abs(path)}#article`,
      url: abs(path),
      headline,
      description,
      image: abs(`${path}/opengraph-image`),
      author: { "@id": ids.person },
      publisher: { "@id": ids.person },
      isPartOf: { "@id": ids.website },
      inLanguage: "en",
      keywords,
      about: {
        "@type": "CreativeWork",
        name: project,
        creator: { "@id": ids.person },
        ...(client ? { sourceOrganization: { "@type": "Organization", name: client } } : {}),
      },
    },
    breadcrumbs([
      { name: "Work", path: "/#work" },
      { name: project, path },
    ]),
  ];
}
