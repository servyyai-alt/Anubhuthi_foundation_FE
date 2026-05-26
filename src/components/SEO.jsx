import React from 'react';
import { Helmet } from 'react-helmet-async';

const DEFAULT = {
  title: 'Anubhuthi Foundation',
  description: 'Awakening consciousness through ancient wisdom, transformative programs, and sacred Himalayan retreats.',
  image: 'https://anubhuthifoundation.org/og-image.jpg',
  url: 'https://anubhuthifoundation.org',
  twitter: '@anubhuthi',
};

/**
 * SEO component – drop anywhere in a page to set meta tags.
 *
 * Usage:
 *   <SEO title="Programs" description="Explore our transformative programs..." />
 */
export default function SEO({
  title,
  description = DEFAULT.description,
  image = DEFAULT.image,
  url,
  type = 'website',
  noindex = false,
  schema,
}) {
  const fullTitle = title ? `${title} — Anubhuthi Foundation` : DEFAULT.title;
  const canonical = url || (typeof window !== 'undefined' ? window.location.href : DEFAULT.url);

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="Anubhuthi Foundation" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content={DEFAULT.twitter} />

      {/* Structured data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}

/* Pre-built schemas for common page types */
export const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'NonprofitOrganization',
  name: 'Anubhuthi Foundation',
  url: 'https://anubhuthifoundation.org',
  logo: 'https://anubhuthifoundation.org/logo.png',
  description: 'A spiritual organization offering transformative programs, Himalayan retreats, and Vedic wisdom.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Anubhuthi Ashram',
    addressLocality: 'Rishikesh',
    addressRegion: 'Uttarakhand',
    postalCode: '249201',
    addressCountry: 'IN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-98765-43210',
    contactType: 'customer service',
    email: 'namaste@anubhuthifoundation.org',
  },
  sameAs: [
    'https://facebook.com/anubhuthifoundation',
    'https://instagram.com/anubhuthifoundation',
    'https://youtube.com/@anubhuthifoundation',
  ],
};

export function courseSchema(program) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: program.title,
    description: program.description,
    provider: {
      '@type': 'Organization',
      name: 'Anubhuthi Foundation',
      url: 'https://anubhuthifoundation.org',
    },
    offers: {
      '@type': 'Offer',
      price: program.price || 0,
      priceCurrency: 'INR',
    },
  };
}
