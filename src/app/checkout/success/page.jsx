'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/components/cart/CartProvider';
import { FaCheckCircle, FaBox, FaHome, FaClipboardList } from 'react-icons/fa';

function CheckoutSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const orderId = searchParams.get('order_id');
  
  // Use a ref to track if we've already cleared the cart
  const [cartCleared, setCartCleared] = useState(false);
  
  useEffect(() => {
    // Only clear the cart once
    if (!cartCleared) {
      clearCart();
      setCartCleared(true);
    }
    
    if (!orderId) {
      router.push('/');
      return;
    }
    
    const mockOrder = {
      _id: orderId,
      orderNumber: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      totalPrice: 79.99,
      status: 'processing',
      createdAt: new Date().toISOString()
    };
    
    setOrder(mockOrder);
    setLoading(false);
  }, [orderId, router, cartCleared]); // Remove clearCart from dependencies
  
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-night-900">
        <span className="loader h-10 w-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-night-900 pb-20">
      <div className="wrap max-w-2xl py-16">
        {/* Success card */}
        <div className="cell overflow-hidden">
          {/* Volt banner */}
          <div className="bg-volt px-8 py-10 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center border-2 border-volt-ink bg-night-950">
              <FaCheckCircle className="text-3xl text-volt" />
            </div>
            <h1 className="font-display text-3xl font-extrabold uppercase tracking-[-0.02em] text-volt-ink">
              Order confirmed
            </h1>
            <p className="mt-1 text-sm font-medium text-volt-ink/80">
              Thank you for your order. We&apos;ve received it and will be in touch shortly.
            </p>
          </div>

          <div className="space-y-7 p-6 sm:p-8">
            {/* Order details */}
            <div>
              <h2 className="field-label mb-3">Order details</h2>
              <div className="grid grid-cols-2 gap-px border border-line bg-line">
                <div className="bg-night-800 p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-bone-faint">Order number</p>
                  <p className="mt-1 text-sm font-semibold text-bone">{order.orderNumber}</p>
                </div>
                <div className="bg-night-800 p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-bone-faint">Date</p>
                  <p className="mt-1 text-sm font-semibold text-bone">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="bg-night-800 p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-bone-faint">Total</p>
                  <p className="mt-1 text-sm font-semibold text-bone">&euro;{order.totalPrice.toFixed(2)}</p>
                </div>
                <div className="bg-night-800 p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-bone-faint">Status</p>
                  <p className="mt-1 text-sm font-semibold capitalize text-volt">{order.status}</p>
                </div>
              </div>
            </div>

            {/* Next steps */}
            <div>
              <h2 className="field-label mb-3">What&apos;s next?</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center border border-line-strong bg-night-800">
                    <FaBox className="text-xs text-volt" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-bone">Order processing</p>
                    <p className="mt-0.5 text-xs text-bone-muted">Your order is being reviewed and will be dispatched shortly.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center border border-line-strong bg-night-800">
                    <FaClipboardList className="text-xs text-volt" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-bone">Status updates</p>
                    <p className="mt-0.5 text-xs text-bone-muted">You will receive updates on WhatsApp or Telegram as your order progresses.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Link href="/" className="btn-ghost flex-1">
                <FaHome className="h-3.5 w-3.5" /> Continue shopping
              </Link>
              <Link href="/account/orders" className="btn-volt flex-1">
                <FaClipboardList className="h-3.5 w-3.5" /> View my orders
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-night-900">
        <span className="loader h-10 w-10" />
      </div>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  );
}
