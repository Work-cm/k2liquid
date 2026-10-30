'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);

  if (!product) {
    console.error('ProductCard received undefined product');
    return null;
  }

  const displayPrice = product.price && product.price > 0
    ? product.price
    : product.priceVariants && product.priceVariants.length > 0
      ? product.priceVariants.reduce((min, v) => v.price < min ? v.price : min, product.priceVariants[0]?.price || 0)
      : 0;

  const href = `/products/${product.slug || product._id}`;
  const inStock = product.countInStock > 0;

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative flex h-full flex-col border border-line bg-night-800 transition-colors duration-200 hover:border-volt"
    >
      {/* Image */}
      <Link
        href={href}
        className="relative block h-52 w-full overflow-hidden border-b border-line bg-night-700"
        aria-label={`View ${product.name}`}
      >
        {product.images && product.images.length > 0 ? (
          <motion.div
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.4 }}
            className="h-full w-full"
          >
            <Image
              src={product.images[0]}
              alt={product.name || 'Product image'}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              loading="lazy"
              quality={85}
              onError={(e) => { e.target.onerror = null; e.target.src = '/images/Laboratory-Science.jpg'; }}
            />
          </motion.div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone-faint">No image</span>
          </div>
        )}

        {/* Category badge */}
        {product.category && (
          <span className="absolute left-3 top-3 border border-line bg-night-950/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-volt backdrop-blur-sm">
            {product.category}
          </span>
        )}

        {/* Out of stock */}
        {!inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-night-950/70 backdrop-blur-[2px]">
            <span className="border border-signal bg-night-950 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-signal">
              Sold out
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <Link href={href}>
          <h3 className="mb-1 line-clamp-1 font-display text-sm font-bold leading-snug text-bone transition-colors group-hover:text-volt">
            {product.name || 'Unnamed Product'}
          </h3>
        </Link>

        {/* Rating */}
        <div className="mb-3 flex items-center gap-1.5">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`h-3 w-3 ${i < Math.round(product.rating) ? 'text-volt' : 'text-line-strong'}`}
              />
            ))}
          </div>
          <span className="font-mono text-[10px] text-bone-faint">({product.numReviews ?? 0})</span>
        </div>

        {/* Price + button */}
        <div className="mt-auto flex items-center justify-between border-t border-line pt-3">
          <div>
            <span className="font-display text-lg font-extrabold text-bone">&euro;{displayPrice.toFixed(2)}</span>
            {product.priceVariants && product.priceVariants.length > 1 && (
              <span className="ml-1 font-mono text-[10px] text-bone-faint">from</span>
            )}
          </div>
          <Link
            href={href}
            className="inline-flex items-center gap-1.5 border border-line-strong px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-bone transition-colors hover:border-volt hover:text-volt"
          >
            View <FiArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
