'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaTrash, FaArrowLeft, FaLock, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '@/components/cart/CartProvider';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Fix hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleCheckout = () => {
    router.push('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-night-900">
        <div className="wrap py-24">
          <div className="mx-auto max-w-sm text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center border border-line bg-night-800">
              <FaShoppingCart className="text-3xl text-bone-faint" />
            </div>
            <p className="tag mb-4">cart.empty</p>
            <h1 className="h-display mb-3 text-3xl">Your cart is empty</h1>
            <p className="mb-8 text-sm text-bone-muted">
              Browse the catalog and add items to get started.
            </p>
            <Link href="/products" className="btn-volt">
              <FaArrowLeft className="h-3.5 w-3.5" /> Browse products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-night-900">
      <div className="wrap py-12 sm:py-16">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
          <div>
            <nav className="mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-bone-faint" aria-label="Breadcrumb">
              <Link href="/" className="transition-colors hover:text-volt">Home</Link>
              <span>/</span>
              <span className="text-bone-muted">Cart</span>
            </nav>
            <h1 className="h-display text-3xl sm:text-4xl">Shopping cart</h1>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-bone-muted">
            <span className="text-volt">{cart.length}</span> {cart.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="space-y-3 lg:col-span-2">
            {/* Table header */}
            <div className="hidden grid-cols-12 gap-4 px-4 pb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-bone-faint md:grid">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Qty</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            {cart.map((item, index) => (
              <div key={`${item._id || item.id || index}`} className="cell p-4">
                <div className="grid grid-cols-12 items-center gap-4">
                  <div className="col-span-12 md:col-span-6">
                    <div className="flex items-center gap-3">
                      <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden border border-line bg-night-700">
                        {item.image ? (
                          <Image src={item.image} alt={item.name} fill sizes="56px" className="object-cover" />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center font-mono text-[10px] text-bone-faint">N/A</div>
                        )}
                      </div>
                      <div>
                        <Link href={`/products/${item.slug || item.id}`} className="text-sm font-semibold leading-snug text-bone transition-colors hover:text-volt">
                          {item.name}
                        </Link>
                        {item.variant && (
                          <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-bone-faint">
                            {item.variant.label || (item.variant.grams ? `${item.variant.grams}g` : item.variant.quantity ? `${item.variant.quantity}g` : '')}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-span-4 text-center font-mono text-sm text-bone-muted md:col-span-2">
                    &euro;{Number(item.price ?? item.variant?.price ?? 0).toFixed(2)}
                  </div>

                  <div className="col-span-5 md:col-span-2">
                    <div className="flex items-center justify-center">
                      <div className="flex items-center border border-line-strong">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1, item.variant?._id)}
                          disabled={item.quantity <= 1}
                          className="flex h-7 w-7 items-center justify-center text-bone transition-colors hover:text-volt disabled:opacity-30"
                          aria-label="Decrease quantity"
                        >
                          &minus;
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1, item.variant?._id)}
                          className="w-10 border-0 border-x border-line-strong bg-transparent text-center text-sm text-bone focus:outline-none focus:ring-0"
                        />
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1, item.variant?._id)}
                          className="flex h-7 w-7 items-center justify-center text-bone transition-colors hover:text-volt"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-3 flex items-center justify-end gap-3 text-right md:col-span-2">
                    <span className="font-display text-sm font-bold text-bone">
                      &euro;{(Number(item.price ?? item.variant?.price ?? 0) * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id, item.variant?._id, item.variant?.grams)}
                      className="text-bone-faint transition-colors hover:text-signal"
                      aria-label={`Remove ${item.name}`}
                    >
                      <FaTrash className="text-xs" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={clearCart}
                className="font-mono text-[11px] uppercase tracking-[0.14em] text-bone-faint transition-colors hover:text-signal"
              >
                Clear all items
              </button>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-volt transition-colors hover:text-bone"
              >
                <FaArrowLeft className="h-3 w-3" /> Continue shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="cell sticky top-28 p-6">
              <h2 className="mb-5 font-display text-base font-bold uppercase tracking-wide text-bone">
                Order summary
              </h2>

              <div className="mb-5 space-y-3 text-sm">
                <div className="flex justify-between text-bone-muted">
                  <span>Subtotal ({cart.length} items)</span>
                  <span className="font-medium text-bone">&euro;{Number(cartTotal).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-bone-muted">
                  <span>Shipping</span>
                  <span className="text-bone-faint">calculated at checkout</span>
                </div>
                <div className="flex justify-between border-t border-line pt-3">
                  <span className="font-semibold text-bone">Estimated total</span>
                  <span className="font-display text-base font-extrabold text-volt">&euro;{Number(cartTotal).toFixed(2)}</span>
                </div>
              </div>

              <button onClick={handleCheckout} className="btn-volt w-full">
                <FaLock className="h-3.5 w-3.5" /> Proceed to checkout
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-bone-faint">
                <FaLock className="h-3 w-3 text-volt" />
                <span>BTC only — no card data stored</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
