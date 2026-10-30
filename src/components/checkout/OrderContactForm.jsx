'use client';

import { useState } from 'react';
import {
  FaWhatsapp,
  FaTelegramPlane,
  FaPaperPlane,
  FaUser,
  FaMapMarkerAlt,
  FaCommentDots,
} from 'react-icons/fa';

const WHATSAPP_NUMBER = '15125922145'; // +1 512-592-2145
const TELEGRAM_NUMBER = 'cannachem'; // @cannachem

function buildMessage({ name, contact, address, notes }, cart, orderDetails) {
  const itemLines = cart
    .map((item) => {
      const price = Number(item.price ?? item.variant?.price ?? 0);
      const lineTotal = (price * item.quantity).toFixed(2);
      const variantLabel = item.variant?.label ?? (item.variant?.grams ? `${item.variant.grams}g` : '');
      const variant = variantLabel ? ` (${variantLabel})` : '';
      return `- ${item.name}${variant} x${item.quantity} @ \u20ac${price.toFixed(2)} = \u20ac${lineTotal}`;
    })
    .join('\n');

  return [
    'New Order Request',
    '',
    `Name: ${name}`,
    `Contact: ${contact}`,
    `Shipping Address: ${address}`,
    notes ? `Message: ${notes}` : null,
    '',
    'Order Items:',
    itemLines,
    '',
    `Subtotal: \u20ac${orderDetails.subtotal.toFixed(2)}`,
    `Shipping: \u20ac${orderDetails.shipping.toFixed(2)}`,
    `Tax: \u20ac${orderDetails.tax.toFixed(2)}`,
    `Total: \u20ac${orderDetails.total.toFixed(2)}`,
  ]
    .filter((line) => line !== null)
    .join('\n');
}

export default function OrderContactForm({ cart, orderDetails }) {
  const [method, setMethod] = useState('whatsapp');
  const [confirmed, setConfirmed] = useState(false);
  const [form, setForm] = useState({
    name: '',
    contact: '',
    address: '',
    notes: '',
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isValid =
    form.name.trim() &&
    form.contact.trim() &&
    form.address.trim() &&
    confirmed;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    const message = buildMessage(form, cart, orderDetails);
    const text = encodeURIComponent(message);
    const url = method === 'whatsapp'
      ? `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`
      : `https://t.me/${TELEGRAM_NUMBER}?text=${text}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const inputClass = 'field pl-9';
  const labelClass = 'field-label';
  const iconClass = 'absolute left-3 top-1/2 -translate-y-1/2 text-bone-faint text-xs';

  return (
    <div className="cell p-6 sm:p-7">
      <div className="mb-5 flex items-center gap-2">
        <FaUser className="text-sm text-volt" />
        <h2 className="font-display text-lg font-bold uppercase tracking-wide text-bone">
          Your details
        </h2>
      </div>

      {/* Method choice cards */}
      <p className={labelClass}>Choose how to continue</p>
      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => setMethod('whatsapp')}
          className={`flex items-center gap-3 border p-3.5 text-left transition-colors ${
            method === 'whatsapp'
              ? 'border-volt bg-volt/10'
              : 'border-line bg-night-800 hover:border-line-strong'
          }`}
        >
          <FaWhatsapp className={method === 'whatsapp' ? 'text-volt' : 'text-bone-faint'} />
          <div>
            <p className="text-sm font-bold leading-none text-bone">WhatsApp</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-wide text-bone-faint">
              Continue privately on WhatsApp
            </p>
          </div>
        </button>
        <button
          type="button"
          onClick={() => setMethod('telegram')}
          className={`flex items-center gap-3 border p-3.5 text-left transition-colors ${
            method === 'telegram'
              ? 'border-volt bg-volt/10'
              : 'border-line bg-night-800 hover:border-line-strong'
          }`}
        >
          <FaTelegramPlane className={method === 'telegram' ? 'text-volt' : 'text-bone-faint'} />
          <div>
            <p className="text-sm font-bold leading-none text-bone">Telegram</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-wide text-bone-faint">
              Continue privately in Telegram
            </p>
          </div>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className={labelClass}>Full name</label>
          <div className="relative">
            <FaUser className={iconClass} />
            <input name="name" type="text" required value={form.name} onChange={handleChange}
              placeholder="John Doe" className={inputClass} />
          </div>
        </div>

        <div>
          <label className={labelClass}>{method === 'whatsapp' ? 'WhatsApp number' : 'Telegram username'}</label>
          <div className="relative">
            {method === 'whatsapp'
              ? <FaWhatsapp className={iconClass} />
              : <FaTelegramPlane className={iconClass} />}
            <input
              name="contact"
              type="text"
              required
              value={form.contact}
              onChange={handleChange}
              placeholder={method === 'whatsapp' ? '+1 512-592-2145' : '@yourusername'}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Shipping address</label>
          <div className="relative">
            <FaMapMarkerAlt className={iconClass} />
            <input name="address" type="text" required value={form.address} onChange={handleChange}
              placeholder="123 Main St, Berlin, Germany" className={inputClass} />
          </div>
        </div>

        <div>
          <label className={labelClass}>Message (optional)</label>
          <div className="relative">
            <FaCommentDots className="absolute left-3 top-3.5 text-xs text-bone-faint" />
            <textarea name="notes" rows={3} value={form.notes} onChange={handleChange}
              placeholder="Any special requests or questions..."
              className="field resize-none pl-9" />
          </div>
        </div>

        {/* Confirmation */}
        <label className="flex cursor-pointer items-start gap-2.5 border border-line bg-night-800 p-3.5">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            className="checkbox mt-0.5"
          />
          <span className="text-[11px] leading-relaxed text-bone-muted">
            I am a serious buyer. I understand this is a real order request and I am ready to receive
            payment instructions via {method === 'whatsapp' ? 'WhatsApp' : 'Telegram'}.
          </span>
        </label>

        <button
          type="submit"
          disabled={!isValid}
          className="btn-volt w-full disabled:cursor-not-allowed disabled:opacity-40"
        >
          <FaPaperPlane className="h-3.5 w-3.5" />
          Send order via {method === 'whatsapp' ? 'WhatsApp' : 'Telegram'} &mdash; &euro;{orderDetails.total.toFixed(2)}
        </button>

        <p className="text-center font-mono text-[10px] uppercase tracking-[0.14em] text-bone-faint">
          {`Your details will be sent directly to us on ${method === 'whatsapp' ? 'WhatsApp' : 'Telegram'}.`}
        </p>
      </form>
    </div>
  );
}
