'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';

export default function OrderSummary({ cartItems, orderDetails }) {
  return (
    <div className="cell overflow-hidden">
      <div className="border-b border-line px-5 py-4">
        <h2 className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-bone-faint">
          Order summary
        </h2>

        <div className="mb-4 max-h-60 space-y-3 overflow-y-auto pr-1">
          {cartItems.map((item) => (
            <div key={item.id || `${item.name}-${item.variant ? item.variant._id : 'default'}`} className="flex items-center gap-3">
              <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden border border-line bg-night-700">
                <Image src={item.image || '/images/placeholder.png'} alt={item.name} fill className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-bone">{item.name}</p>
                <div className="mt-0.5 flex justify-between">
                  <p className="font-mono text-[10px] uppercase tracking-wide text-bone-faint">Qty: {item.quantity}</p>
                  <p className="text-xs font-semibold text-bone">&euro;{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/cart"
          className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-volt transition-colors hover:text-bone"
        >
          <FaShoppingCart className="h-3 w-3" /> Edit cart
        </Link>
      </div>

      <div className="space-y-2.5 px-5 py-4">
        <div className="flex justify-between text-sm">
          <span className="text-bone-muted">Subtotal</span>
          <span className="font-medium text-bone">&euro;{orderDetails.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-bone-muted">Shipping</span>
          <span className="font-medium text-bone">{orderDetails.shipping > 0 ? `\u20AC${orderDetails.shipping.toFixed(2)}` : 'Free'}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-bone-muted">Tax</span>
          <span className="font-medium text-bone">&euro;{orderDetails.tax.toFixed(2)}</span>
        </div>
        <div className="mt-1 border-t border-line pt-3">
          <div className="flex justify-between font-bold">
            <span className="text-bone">Total</span>
            <span className="font-display text-lg font-extrabold text-volt">&euro;{orderDetails.total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
