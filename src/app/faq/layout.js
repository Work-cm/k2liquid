export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://k2liquidstore.com'),
  title: 'FAQ | Buy K2, Etomidate & K-Pods Online',
  description: 'Get answers about buying K2 paper sheets, K2 liquid spray, K2 powder, etomidate, vapes and K-Pods online, shipping, payments and product quality at K2LiquidStore.',
  keywords: [
    'k2 FAQ', 'buy k2 online FAQ',
    'k2 paper sheets', 'k2 liquid spray', 'k2 powder',
    'etomidate', 'etomidate powder', 'buy etomidate',
    'etomidate vape', 'k-pods', 'vape pods',
    'k2 shipping', 'payment methods',
    'K2LiquidStore support',
  ],
  alternates: {
    canonical: '/faq',
  },
  openGraph: {
    title: 'FAQ | Buy K2, Etomidate & K-Pods Online | K2LiquidStore',
    description: 'Get answers about ordering, shipping, payments and product quality at K2LiquidStore.',
    url: '/faq',
    type: 'website',
  },
};

export default function FAQLayout({ children }) {
  return children;
}
