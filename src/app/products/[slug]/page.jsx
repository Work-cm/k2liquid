import { notFound } from 'next/navigation';
import Link from 'next/link';
import Script from 'next/script';
import dbConnect from '@/lib/utils/db';
import Product from '@/models/Product';
import ProductDetail from '@/components/product/ProductDetail';
import ProductCard from '@/components/product/ProductCard';
import { getProductSchema } from '@/components/seo/SEOKeywords';

export const dynamic = 'force-dynamic';

// Convert MongoDB document to plain object
function convertToPlainObject(doc) {
  const plainObject = { ...doc };
  if (plainObject._id) {
    plainObject._id = plainObject._id.toString();
  }
  Object.keys(plainObject).forEach((key) => {
    const val = plainObject[key];
    if (val && typeof val === 'object') {
      if (val instanceof Date) {
        plainObject[key] = val.toISOString();
      } else if (Array.isArray(val)) {
        plainObject[key] = val.map((item) => {
          if (item && typeof item === 'object' && item._id) return convertToPlainObject(item);
          return item;
        });
      } else if (val._id) {
        plainObject[key] = convertToPlainObject(val);
      }
    }
  });
  return plainObject;
}

async function getProduct(slug) {
  try {
    await dbConnect();
    const product = await Product.findOne({ slug }).lean();
    if (!product) return null;
    return convertToPlainObject(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

async function getRelatedProducts(category, excludeId) {
  try {
    await dbConnect();
    const related = await Product.find({
      category,
      _id: { $ne: excludeId },
    })
      .sort({ rating: -1 })
      .limit(4)
      .select('-reviews')
      .lean();
    return related.map((p) => convertToPlainObject(p));
  } catch (error) {
    console.error('Error fetching related products:', error);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return { title: 'Product Not Found' };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://k2liquidstore.com';
  const absoluteImage = product.images?.[0]?.startsWith('http')
    ? product.images[0]
    : `${baseUrl}${product.images?.[0] || '/images/logo.png'}`;
  return {
    metadataBase: new URL(baseUrl),
    title: product.name,
    description:
      product.description?.slice(0, 155) ||
      `Buy ${product.name} online at K2LiquidStore. Discreet worldwide shipping.`,
    keywords: [
      product.name,
      `${product.name} for sale`,
      `buy ${product.name} online`,
      product.category,
      'K2LiquidStore',
    ],
    alternates: { canonical: `/products/${slug}` },
    openGraph: {
      title: `${product.name} | K2LiquidStore`,
      description: product.description?.slice(0, 155) || `Buy ${product.name} online.`,
      url: `/products/${slug}`,
      type: 'website',
      images: [{ url: absoluteImage }],
    },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.category, product._id);
  const productSchema = getProductSchema(product);

  return (
    <div className="min-h-screen bg-night-900">
      <Script
        id={`schema-product-${product.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <ProductDetail product={product} />

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="wrap pb-20">
          <div className="mb-8 flex items-center justify-between border-t border-line pt-10">
            <h2 className="h-display text-2xl sm:text-3xl">Related products</h2>
            <Link
              href={`/products?category=${encodeURIComponent(product.category)}`}
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-volt transition-colors hover:text-bone"
            >
              View all &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
