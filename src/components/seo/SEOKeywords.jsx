// Primary keywords — matches actual products listed on the site
export const primaryKeywords = [
  'k2 paper sheets', 'k2 paper', 'k2 infused paper', 'k2 spice paper', 'k2 paper for sale',
  'k2 liquid spray', 'k2 spray', 'k2 liquid', 'liquid k2 on paper', 'k2 spray for sale',
  'k2 powder', 'cannabinoids k2 powder', 'k2 cannabinoid powder', 'buy k2 powder',
  'etomidate', 'etomidate powder', 'etomidate crystal', 'buy etomidate', 'etomidate for sale',
  'etomidate vape', 'k-pods', 'etomidate k-pods', 'vape pods', 'disposable vape',
];

export const secondaryKeywords = [
  'buy k2 online',
  'k2 for sale',
  'k2 spice',
  'synthetic cannabinoids',
  'research chemicals',
  'k2liquidstore',
  'k2liquidstore.com',
];

export const allKeywords = [...primaryKeywords, ...secondaryKeywords];

// Schema.org structured data for better SEO
export const getProductSchema = (product) => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://k2liquidstore.com';
  const absoluteUrl = (path) => {
    if (!path) return `${BASE_URL}/images/logo.png`;
    return path.startsWith('http') ? path : `${BASE_URL}${path}`;
  };
  const availability = product.countInStock > 0
    ? 'https://schema.org/InStock'
    : 'https://schema.org/OutOfStock';
  const variants = product.priceVariants?.length
    ? product.priceVariants
    : [{ label: undefined, price: product.price }];

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: (product.images?.length ? product.images : ['/images/logo.png']).map(absoluteUrl),
    sku: product.slug,
    category: product.category,
    brand: { '@type': 'Brand', name: 'K2LiquidStore' },
    offers: variants.map((variant) => ({
      '@type': 'Offer',
      name: variant.label,
      price: variant.price ?? product.price ?? 0,
      priceCurrency: 'EUR',
      availability,
      itemCondition: 'https://schema.org/NewCondition',
      url: `${BASE_URL}/products/${product.slug}`,
    })),
    aggregateRating: product.rating && product.numReviews ? {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.numReviews,
    } : undefined,
  };
};

// Get base URL for schemas
const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_BASE_URL || 'https://k2liquidstore.com';
};

// Organization schema
export const getOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'K2LiquidStore',
  description: 'Premium K2 paper sheets, K2 liquid spray, cannabinoid K2 powder, research-grade etomidate, vapes and K-Pods with discreet worldwide shipping.',
  url: getBaseUrl(),
  logo: {
    '@type': 'ImageObject',
    url: `${getBaseUrl()}/images/logo.png`,
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'order@k2liquidstore.com',
    availableLanguage: 'English',
  },
  sameAs: [],
});

// Website schema with SearchAction for sitelinks search box
export const getWebsiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'K2LiquidStore',
  description: 'K2 paper sheets, K2 liquid spray, K2 powder, etomidate, vapes and K-Pods for sale online.',
  url: getBaseUrl(),
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${getBaseUrl()}/products?search={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
});

export default function SEOKeywords() {
  const organizationSchema = getOrganizationSchema();
  const websiteSchema = getWebsiteSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
