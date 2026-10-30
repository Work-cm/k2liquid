'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaLock, FaSpinner } from 'react-icons/fa';
import { useCart } from '@/components/cart/CartProvider';

export default function CheckoutForm({ orderDetails }) {
  const router = useRouter();
  const { cart } = useCart();

  const [errorMessage, setErrorMessage] = useState('');
  const [processing, setProcessing] = useState(false);
  const [billingDetails, setBillingDetails] = useState({
    name: '',
    whatsapp: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const handleChange = (e) => {
    setBillingDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setErrorMessage('');

    try {
      const orderRes = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          billingDetails: {
            name: billingDetails.name,
            whatsapp: billingDetails.whatsapp,
            address: {
              line1: billingDetails.address,
              city: billingDetails.city,
              postal_code: billingDetails.postalCode,
              country: billingDetails.country,
            },
          },
          orderTotal: orderDetails.total,
          cartItems: cart,
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.message || 'Failed to create order');

      await fetch('/api/cart/clear', { method: 'POST' });
      router.push(`/checkout/success?order_id=${orderData._id}`);
    } catch (error) {
      console.error('Order error:', error);
      setErrorMessage(error.message || 'An error occurred. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {errorMessage && (
        <div className="note-signal">{errorMessage}</div>
      )}

      <h3 className="font-display text-sm font-bold uppercase tracking-wide text-bone">
        Billing information
      </h3>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="field-label">Full name</label>
          <input name="name" type="text" required value={billingDetails.name} onChange={handleChange}
            placeholder="John Doe" className="field" />
        </div>
        <div className="sm:col-span-2">
          <label className="field-label">WhatsApp number</label>
          <input name="whatsapp" type="tel" required value={billingDetails.whatsapp} onChange={handleChange}
            placeholder="+1 234 567 8900" className="field" />
        </div>
        <div>
          <label className="field-label">Country</label>
          <input name="country" type="text" required value={billingDetails.country} onChange={handleChange}
            placeholder="United States" className="field" />
        </div>
        <div className="sm:col-span-2">
          <label className="field-label">Street address</label>
          <input name="address" type="text" required value={billingDetails.address} onChange={handleChange}
            placeholder="123 Main Street" className="field" />
        </div>
        <div>
          <label className="field-label">City</label>
          <input name="city" type="text" required value={billingDetails.city} onChange={handleChange}
            placeholder="New York" className="field" />
        </div>
        <div>
          <label className="field-label">Postal code</label>
          <input name="postalCode" type="text" required value={billingDetails.postalCode} onChange={handleChange}
            placeholder="10001" className="field" />
        </div>
      </div>

      <button
        type="submit"
        disabled={processing}
        className="btn-volt mt-2 w-full disabled:cursor-not-allowed disabled:opacity-60"
      >
        {processing ? (
          <>
            <FaSpinner className="h-3.5 w-3.5 animate-spin" />
            Placing order...
          </>
        ) : (
          <>
            <FaLock className="h-3.5 w-3.5" />
            Place order &mdash; &euro;{orderDetails.total.toFixed(2)}
          </>
        )}
      </button>

      <p className="text-center font-mono text-[10px] uppercase tracking-[0.14em] text-bone-faint">
        By placing your order you agree to be contacted with payment instructions via WhatsApp.
      </p>
    </form>
  );
}
