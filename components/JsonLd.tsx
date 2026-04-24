const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://christcornerstone.org';

/**
 * Structured data (JSON-LD) for the root layout.
 * Publishes Organization + WebSite entities so Google can render enhanced
 * search results (site links, sitelinks searchbox, knowledge panel).
 */
export default function JsonLd() {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ChristCornerstone',
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    description:
      "A modern, aesthetic home for exploring the Christian faith — built for the curious and the convinced alike.",
    sameAs: [] as string[],
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ChristCornerstone',
    url: SITE_URL,
    description:
      "Explore the evidence, doctrine, and life Christianity offers. Answers to hard questions, deep Bible study, and resources for every stage of faith.",
    publisher: {
      '@type': 'Organization',
      name: 'ChristCornerstone',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/scripture?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}

