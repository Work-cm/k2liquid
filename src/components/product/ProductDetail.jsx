'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaStar, FaShoppingCart, FaCheck, FaShieldAlt, FaTruck, FaBoxOpen } from 'react-icons/fa';
import { useCart } from '@/components/cart/CartProvider';
import ProductReviews from '@/components/product/ProductReviews';

// Exact variant label format used by the source store:
// k2-paper-sheets -> "1 A4 sheet" / "2 A4 sheets"
// k2-liquid-spray -> "100ml" (no space)
// powders/others  -> "50g", or "1kg" when quantity >= 1000
// vapes-kpods     -> "1 pod" / "50 pods"
function variantLabel(product, variant) {
  if (variant.label) return variant.label;
  const cat = (product.category || '').toLowerCase();
  const q = variant.quantity;
  if (cat === 'k2-paper-sheets') return `${q} ${q === 1 ? 'A4 sheet' : 'A4 sheets'}`;
  if (cat === 'k2-liquid-spray') return `${q}ml`;
  if (cat === 'vapes-kpods') return `${q} ${q === 1 ? 'pod' : 'pods'}`;
  return q >= 1000 ? `${q / 1000}kg` : `${q}g`;
}

export default function ProductDetail({ product }) {
  const router = useRouter();
  const { addToCart } = useCart();

  const variants = product.priceVariants && product.priceVariants.length > 0
    ? product.priceVariants
    : [{ quantity: 1, price: product.price }];

  const [selectedVariant, setSelectedVariant] = useState(variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);

  const inStock = product.countInStock > 0;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedVariant);
    router.push('/cart');
  };

  const images = product.images && product.images.length > 0
    ? product.images
    : ['/images/Laboratory-Science.jpg'];

  return (
    <div className="wrap pb-16 pt-12 sm:pt-16">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-bone-faint" aria-label="Breadcrumb">
        <Link href="/" className="transition-colors hover:text-volt">Home</Link>
        <span>/</span>
        <Link href="/products" className="transition-colors hover:text-volt">Products</Link>
        <span>/</span>
        <span className="max-w-[200px] truncate text-bone-muted">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Image gallery */}
        <div>
          <div className="cell relative aspect-square overflow-hidden bg-night-700">
            <Image
              src={images[activeImage]}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
              quality={90}
            />
            {!inStock && (
              <div className="absolute inset-0 flex items-center justify-center bg-night-950/70 backdrop-blur-[2px]">
                <span className="border border-signal bg-night-950 px-5 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-signal">
                  Sold out
                </span>
              </div>
            )}
          </div>

          {images.length > 1 && (
            <div className="mt-4 flex gap-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative h-20 w-20 overflow-hidden border transition-colors ${
                    i === activeImage ? 'border-volt' : 'border-line hover:border-line-strong'
                  }`}
                  aria-label={`View image ${i + 1}`}
                >
                  <Image src={img} alt={`${product.name} ${i + 1}`} fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <span className="tag-plain mb-3 text-volt">
            {product.category}
          </span>
          <h1 className="h-display mb-4 text-3xl sm:text-4xl">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="mb-6 flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? 'text-volt' : 'text-line-strong'}`} />
              ))}
            </div>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-bone-faint">
              ({product.numReviews} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="mb-7 border-y border-line py-5">
            <span className="font-display text-4xl font-extrabold text-bone">&euro;{selectedVariant.price.toFixed(2)}</span>
            {variants.length > 1 && (
              <span className="ml-3 font-mono text-[11px] uppercase tracking-[0.14em] text-bone-faint">
                / {variantLabel(product, selectedVariant)}
              </span>
            )}
          </div>

          {/* Variant picker */}
          {variants.length > 1 && (
            <div className="mb-7">
              <p className="field-label">Select format</p>
              <div className="flex flex-wrap gap-2">
                {variants.map((v) => (
                  <button
                    key={v._id || v.quantity}
                    onClick={() => setSelectedVariant(v)}
                    className={`border px-4 py-2.5 font-mono text-[12px] tracking-wide transition-colors ${
                      selectedVariant.quantity === v.quantity && selectedVariant.price === v.price
                        ? 'border-volt bg-volt text-volt-ink'
                        : 'border-line-strong bg-transparent text-bone-muted hover:border-volt hover:text-volt'
                    }`}
                  >
                    {variantLabel(product, v)} &mdash; &euro;{v.price.toFixed(2)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-7">
            <p className="field-label">Quantity</p>
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-line-strong">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-11 w-11 items-center justify-center font-bold text-bone transition-colors hover:bg-night-700 hover:text-volt"
                  aria-label="Decrease quantity"
                >
                  &minus;
                </button>
                <span className="w-12 border-x border-line-strong text-center font-display text-lg font-bold text-bone">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex h-11 w-11 items-center justify-center font-bold text-bone transition-colors hover:bg-night-700 hover:text-volt"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <span className={`font-mono text-[11px] uppercase tracking-[0.14em] ${inStock ? 'text-volt' : 'text-signal'}`}>
                {inStock ? `${product.countInStock} in stock` : 'Out of stock'}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="mb-8 flex flex-col gap-3 sm:flex-row">
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              disabled={!inStock}
              className={`btn flex-1 ${
                added ? 'border-volt bg-volt text-volt-ink' : 'btn-ghost'
              } disabled:cursor-not-allowed disabled:opacity-40`}
            >
              {added ? <><FaCheck className="h-4 w-4" /> Added to cart</> : <><FaShoppingCart className="h-4 w-4" /> Add to cart</>}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleBuyNow}
              disabled={!inStock}
              className="btn-volt flex-1 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Buy now
            </motion.button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-px border border-line bg-line">
            {[
              { icon: FaTruck, label: 'Discreet Shipping' },
              { icon: FaShieldAlt, label: 'Lab Tested' },
              { icon: FaBoxOpen, label: 'Secure Packaging' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2 bg-night-900 py-5 text-center">
                <Icon className="h-5 w-5 text-volt" />
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-bone-muted">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-14 max-w-3xl border-t border-line pt-10">
        <p className="tag mb-4">description</p>
        <h2 className="h-display mb-5 text-2xl">About this product</h2>
        <div className="whitespace-pre-line text-[15px] leading-relaxed text-bone-muted">
          {product.description}
        </div>
      </div>

      {/* Reviews */}
      <ProductReviews
        slug={product.slug}
        initialReviews={(product.reviews || []).slice().reverse()}
        initialRating={product.rating || 0}
      />
    </div>
  );
}
