import { Suspense } from 'react';
import ProductList from '@/components/product/ProductList';
import dbConnect from '@/lib/utils/db';
import Product from '@/models/Product';

export const dynamic = 'force-dynamic';

const categoryKeywordMap = {
  'k2-paper-sheets': 'k2 paper sheets, k2 infused paper, k2 spice paper, k2 paper for sale, buy k2 paper online',
  'k2-liquid-spray': 'k2 liquid spray, k2 spray, liquid k2, k2 spray for sale, buy k2 spray online',
  'k2-powder': 'k2 powder, cannabinoid k2 powder, synthetic cannabinoid powder, buy k2 powder',
  'etomidate': 'etomidate, etomidate powder, etomidate crystal, etomidate for sale, buy etomidate',
  'vapes-kpods': 'etomidate vape, k-pods, etomidate k-pods, vape pods, disposable vape',
};

// Dynamic Metadata for SEO - handles query parameters
export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const category = params?.category || '';
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://k2liquidstore.com';
  const catKey = category.toLowerCase();
  const catLabel = categoryMeta[catKey]?.label || category;
  const canonicalPath = catKey
    ? `/products?category=${encodeURIComponent(catKey)}`
    : '/products';
  const categoryKeywords = categoryKeywordMap[catKey]
    || 'k2 paper sheets, k2 liquid spray, k2 powder, etomidate, etomidate powder, etomidate vape, k-pods, buy etomidate, buy k2 online, k2 spice paper, k2 spray for sale';

  return {
    metadataBase: new URL(baseUrl),
    title: catLabel
      ? `Buy ${catLabel} Online`
      : 'K2 Paper Sheets, K2 Liquid Spray, K2 Powder, Etomidate & K-Pods for Sale',
    description: catLabel
      ? `Buy premium ${catLabel.toLowerCase()} online at K2LiquidStore. Strong, consistent quality with discreet worldwide shipping.`
      : 'Buy K2 paper sheets, K2 liquid spray, K2 powder, etomidate, vapes and K-Pods online. Premium quality, discreet packaging and fast worldwide delivery from K2LiquidStore.',
    keywords: `${categoryKeywords}, k2 paper, k2 spray, k2 liquid, k2 powder, k2 spice, cannabinoids k2, etomidate, etomidate powder, k2liquidstore`,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: catLabel
        ? `Buy ${catLabel} Online | K2LiquidStore`
        : 'K2 Paper Sheets, K2 Liquid Spray, K2 Powder, Etomidate & K-Pods for Sale | K2LiquidStore',
      description: catLabel
        ? `Browse premium ${catLabel.toLowerCase()} at K2LiquidStore. Discreet worldwide shipping.`
        : 'Browse K2 paper sheets, K2 liquid spray, K2 powder, etomidate, vapes and K-Pods. Premium quality with discreet worldwide shipping.',
      url: canonicalPath,
      type: 'website',
    },
  };
}

// Helper function to convert MongoDB documents to plain objects
function convertToPlainObject(doc) {
  // Convert _id to string
  const plainObject = { ...doc };
  if (plainObject._id) {
    plainObject._id = plainObject._id.toString();
  }
  
  // Handle nested objects and arrays
  Object.keys(plainObject).forEach(key => {
    if (plainObject[key] && typeof plainObject[key] === 'object') {
      if (Array.isArray(plainObject[key])) {
        plainObject[key] = plainObject[key].map(item => {
          if (item && typeof item === 'object' && item._id) {
            return convertToPlainObject(item);
          }
          return item;
        });
      } else if (plainObject[key]._id) {
        plainObject[key] = convertToPlainObject(plainObject[key]);
      }
    }
  });
  
  return plainObject;
}

// This function fetches products on the server
async function getProducts(searchParams) {
  await dbConnect();
  
  // First await the entire searchParams object
  const params = await searchParams;
  
  // Now safely extract values
  const category = params?.category || null;
  const search = params?.search || null;
  const sort = params?.sort || 'createdAt';
  const order = params?.order || 'desc';
  
  // Build query based on parameters
  let query = {};
  
  if (category) {
    console.log('Filtering by category:', category);
    
    // Handle 'research chemicals' category with multiple approaches to ensure it works
    if (category.toLowerCase() === 'research chemicals') {
      // Try multiple approaches to match research chemicals
      query.$or = [
        // Exact match (case-sensitive)
        { category: 'research chemicals' },
        // Exact match (case-insensitive regex)
        { category: { $regex: /^research chemicals$/i } },
        // Partial match (case-insensitive)
        { category: { $regex: /research chemicals/i } }
      ];
      console.log('Using enhanced research chemicals filter with multiple matching strategies');
    } else {
      // Make category filtering case-insensitive for other categories
      query.category = { $regex: new RegExp('^' + category + '$', 'i') };
    }
  }
  
  if (search) {
    query.name = { $regex: search, $options: 'i' };
  }
  
  // Execute query with sorting
  const sortField = sort;
  const sortOrder = order === 'asc' ? 1 : -1;
  
  const sortOptions = {};
  sortOptions[sortField] = sortOrder;
  
  // Fetch products
  try {
    const products = await Product.find(query)
      .sort(sortOptions)
      .select('-reviews') // Exclude reviews for performance
      .lean();
    
    // Convert MongoDB documents to plain objects
    return products.map(product => convertToPlainObject(product));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Loading component
function ProductsLoading() {
  return (
    <div className="wrap py-16">
      <div className="flex h-64 items-center justify-center">
        <span className="loader h-10 w-10" />
      </div>
    </div>
  );
}

const categoryMeta = {
  'k2-paper-sheets': {
    label: 'K2 Paper Sheets',
    desc: 'Premium K2 infused paper sheets. Evenly coated, strong and consistent — shipped discreetly worldwide.',
  },
  'k2-liquid-spray': {
    label: 'K2 Liquid Spray',
    desc: 'High-strength K2 liquid spray in sealed bottles. Easy to apply, long-lasting and reliably potent.',
  },
  'k2-powder': {
    label: 'K2 Powder',
    desc: 'Pure cannabinoid K2 powder for making your own paper, spray or blends. Lab-tested purity.',
  },
  'etomidate': {
    label: 'Etomidate',
    desc: 'High-purity etomidate powders and crystals for research use. Lab-tested, COA included, discreet worldwide shipping.',
  },
  'vapes-kpods': {
    label: 'Etomidate Vapes / K-Pods',
    desc: 'Pre-filled etomidate vape pods, disposables and starter kits. Medical-grade hardware, sealed for freshness, discreet worldwide shipping.',
  },
};

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams;
  const products = await getProducts(searchParams);
  const selectedCategory = params?.category || '';

  const catKey = selectedCategory.toLowerCase();
  const catInfo = categoryMeta[catKey] || null;
  const displayLabel = catInfo?.label || selectedCategory || 'All Products';
  const displayDesc = catInfo?.desc ||
    'Browse our K2 paper sheets, K2 liquid spray, K2 powder and etomidate products — premium quality, discreet packaging and fast delivery.';

  return (
    <div className="min-h-screen bg-night-900">

      {/* Page hero */}
      <div className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-volt/60 to-transparent"
        />
        <div className="wrap relative z-10 pb-10 pt-16 sm:pt-20">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-bone-faint" aria-label="Breadcrumb">
            <a href="/" className="transition-colors hover:text-volt">Home</a>
            <span>/</span>
            <span className="text-bone-muted">Products</span>
            {selectedCategory && (
              <>
                <span>/</span>
                <span className="capitalize text-volt">{displayLabel}</span>
              </>
            )}
          </nav>

          <p className="tag mb-4">catalog.index</p>
          <h1 className="h-display mb-3 text-4xl sm:text-5xl">
            {displayLabel}
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-bone-muted">
            {displayDesc}
          </p>

          {/* Category tabs */}
          <div className="mt-8 flex flex-wrap gap-2">
            {[
              { href: '/products', label: 'All' },
              { href: '/products?category=k2-paper-sheets', label: 'K2 Paper Sheets', key: 'k2-paper-sheets' },
              { href: '/products?category=k2-liquid-spray', label: 'K2 Liquid Spray', key: 'k2-liquid-spray' },
              { href: '/products?category=k2-powder', label: 'K2 Powder', key: 'k2-powder' },
              { href: '/products?category=etomidate', label: 'Etomidate', key: 'etomidate' },
              { href: '/products?category=vapes-kpods', label: 'Vapes / K-Pods', key: 'vapes-kpods' },
            ].map(({ href, label, key }) => {
              const active = label === 'All' ? !selectedCategory : catKey === key;
              return (
                <a
                  key={label}
                  href={href}
                  className={`border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors ${
                    active
                      ? 'border-volt bg-volt text-volt-ink'
                      : 'border-line-strong bg-transparent text-bone-muted hover:border-volt hover:text-volt'
                  }`}
                >
                  {label}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div className="wrap py-10">
        <Suspense fallback={<ProductsLoading />}>
          <ProductList initialProducts={products} selectedCategory={selectedCategory} />
        </Suspense>
      </div>
    </div>
  );
}
