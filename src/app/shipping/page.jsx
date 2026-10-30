import Link from 'next/link';
import { FaShippingFast, FaGlobeAmericas, FaShieldAlt, FaCheckCircle } from 'react-icons/fa';

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://k2liquidstore.com'),
  title: 'Shipping & Delivery Policy',
  description: 'Learn about K2LiquidStore shipping methods, delivery times, discreet international shipping, order tracking and free shipping on orders over €100 for K2 paper, spray, powder and etomidate.',
  keywords: [
    'k2 paper shipping', 'discreet shipping', 'international shipping',
    'buy k2 online delivery', 'etomidate shipping', 'K2LiquidStore shipping',
    'track order', '48h dispatch',
  ],
  alternates: { canonical: '/shipping' },
};

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-night-900">

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-volt/60 to-transparent" />
        <div className="wrap relative z-10 max-w-3xl pb-14 pt-16 sm:pt-20">
          <nav className="mb-8 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-bone-faint" aria-label="Breadcrumb">
            <Link href="/" className="transition-colors hover:text-volt">Home</Link>
            <span>/</span>
            <span className="text-bone-muted">Shipping</span>
          </nav>
          <p className="tag mb-4">shipping &amp; delivery</p>
          <h1 className="h-display mb-4 text-4xl md:text-5xl">
            Fast, discreet delivery to your door.
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-bone-muted">
            Every order is dispatched within 48 hours in plain, unmarked packaging. We ship to 50+ countries with full tracking on every parcel.
          </p>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-bone-faint">Last updated: December 3, 2025</p>
        </div>
      </section>

      {/* Highlights strip */}
      <section className="border-b border-line">
        <div className="wrap max-w-3xl py-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { Icon: FaShippingFast, title: '48h Dispatch', desc: 'Orders processed within 24-48 hours' },
              { Icon: FaShieldAlt, title: 'Discreet Packaging', desc: 'Unmarked, tamper-evident parcels' },
              { Icon: FaGlobeAmericas, title: 'Worldwide Reach', desc: 'Standard & express to 50+ countries' },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center border border-volt/40 bg-volt/10">
                  <Icon className="text-sm text-volt" />
                </div>
                <div>
                  <p className="text-sm font-bold text-bone">{title}</p>
                  <p className="text-xs leading-relaxed text-bone-muted">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main content */}
      <article className="wrap max-w-3xl space-y-14 py-16 text-[15px] leading-relaxed text-bone-muted">

        {/* 1 — Processing */}
        <section>
          <h2 className="mb-4 font-display text-2xl font-extrabold tracking-tight text-bone">1. Order Processing Time</h2>
          <p className="mb-4">All orders are carefully processed and prepared for shipment by our team:</p>
          <ul className="space-y-2 ml-1">
            {[
              ['Standard Processing', '24-48 hours (Monday-Friday)'],
              ['Weekend Orders', 'Processed on the next business day'],
              ['Holiday Orders', 'May experience delays during major holidays'],
              ['Verification Required', 'Orders requiring additional verification may take 2-3 business days'],
            ].map(([t, d]) => (
              <li key={t} className="flex gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-volt shrink-0 mt-2" />
                <span><strong>{t}:</strong> {d}</span>
              </li>
            ))}
          </ul>
          <div className="border border-volt/30 bg-volt/5 rounded-xl p-4 mt-5 text-sm text-bone">
            <strong>Tip:</strong> Orders placed before 2:00 PM (CET) Monday-Friday are typically processed the same day.
          </div>
        </section>

        {/* 2 — Methods & Times */}
        <section>
          <h2 className="mb-4 font-display text-2xl font-extrabold tracking-tight text-bone">2. Shipping Methods &amp; Delivery Times</h2>

          <h3 className="mb-3 font-display text-base font-bold uppercase tracking-wide text-bone">Domestic Shipping</h3>
          <div className="space-y-3 mb-6">
            {[
              { method: 'Standard Shipping', price: '15.00', time: '3-5 business days', note: 'Reliable and cost-effective' },
              { method: 'Express Shipping', price: '35.00', time: '1-2 business days', note: 'Priority handling' },
            ].map(({ method, price, time, note }) => (
              <div key={method} className="flex items-center justify-between border border-line rounded-xl px-5 py-4">
                <div>
                  <p className="text-bone font-bold text-sm">{method}</p>
                  <p className="text-bone text-xs">{time} &mdash; {note}</p>
                </div>
                <span className="text-volt font-black text-sm">&euro;{price}</span>
              </div>
            ))}
            <div className="flex items-center gap-2 border border-volt/40 bg-volt/10 rounded-xl px-5 py-3.5 text-volt text-sm font-bold">
              <FaCheckCircle className="text-xs" /> FREE standard shipping on orders over &euro;100
            </div>
          </div>

          <h3 className="mb-3 font-display text-base font-bold uppercase tracking-wide text-bone">International Shipping</h3>
          <div className="space-y-3">
            {[
              { region: 'Europe (EU)', price: '25.00', time: '5-10 business days' },
              { region: 'North America', price: '45.00', time: '7-14 business days' },
              { region: 'Rest of World', price: '60.00', time: '10-21 business days' },
            ].map(({ region, price, time }) => (
              <div key={region} className="flex items-center justify-between border border-line rounded-xl px-5 py-4">
                <div>
                  <p className="text-bone font-bold text-sm">{region}</p>
                  <p className="text-bone text-xs">{time}</p>
                </div>
                <span className="text-volt font-black text-sm">&euro;{price}</span>
              </div>
            ))}
          </div>
          <div className="border border-signal/40 bg-signal/10 rounded-xl p-4 mt-5 text-sm text-bone-muted">
            <strong>Note:</strong> Delivery times are estimates and may vary due to customs processing, weather, or carrier delays.
          </div>
        </section>

        {/* 3 — Packaging */}
        <section>
          <h2 className="mb-4 font-display text-2xl font-extrabold tracking-tight text-bone">3. Discreet &amp; Secure Packaging</h2>
          <p className="mb-4">We understand the importance of privacy. All orders are shipped with the utmost discretion:</p>
          <ul className="space-y-2 ml-1">
            {[
              ['Unmarked Packaging', 'Plain, neutral boxes or envelopes with no branding'],
              ['Generic Sender Name', 'No mention of "K2LiquidStore" on the package'],
              ['Secure Sealing', 'Tamper-evident packaging to ensure product integrity'],
              ['Proper Cushioning', 'Products are carefully packed to prevent damage'],
              ['Confidential Labels', 'No product descriptions on shipping labels'],
            ].map(([t, d]) => (
              <li key={t} className="flex gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-volt shrink-0 mt-2" />
                <span><strong>{t}:</strong> {d}</span>
              </li>
            ))}
          </ul>
          <div className="border border-volt/30 bg-volt/5 rounded-xl p-4 mt-5 text-sm text-bone">
            <strong>Privacy Guarantee:</strong> Your order details remain completely confidential. We never share shipping information with third parties except as required for delivery.
          </div>
        </section>

        {/* 4 — Tracking */}
        <section>
          <h2 className="mb-4 font-display text-2xl font-extrabold tracking-tight text-bone">4. Order Tracking</h2>
          <p className="mb-4">Once your order ships, you will receive:</p>
          <ul className="space-y-2 ml-1 mb-6">
            {[
              'Shipping confirmation email within 24 hours of shipment',
              'Unique tracking number for your order',
              'Name of the shipping carrier',
              'Estimated delivery timeframe',
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-volt shrink-0 mt-2" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h3 className="mb-3 font-display text-base font-bold uppercase tracking-wide text-bone">How to Track Your Order</h3>
          <div className="space-y-4">
            {[
              ['Check your email', 'Look for the shipping confirmation from order@researchchems.online'],
              ['Visit carrier website', 'Click the tracking link or visit the carrier site directly'],
              ['Enter tracking number', 'Input your unique code to see real-time updates'],
              ['Monitor progress', 'Check regularly for status updates until delivery'],
            ].map(([title, desc], i) => (
              <div key={i} className="flex gap-4">
                <span className="text-volt font-black text-sm mt-0.5">0{i + 1}</span>
                <div>
                  <p className="font-bold text-bone text-sm">{title}</p>
                  <p className="text-bone text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="border border-volt/30 bg-volt/5 rounded-xl p-4 mt-5 text-sm text-bone">
            <strong>Tip:</strong> Tracking information may take 24-48 hours to become active after shipment.
          </div>
        </section>

        {/* 5 — International */}
        <section>
          <h2 className="mb-4 font-display text-2xl font-extrabold tracking-tight text-bone">5. International Shipping Information</h2>

          <h3 className="mb-3 font-display text-base font-bold uppercase tracking-wide text-bone">Customs &amp; Duties</h3>
          <ul className="space-y-2 ml-1 mb-6">
            {[
              ['Customs Fees', 'You are responsible for all customs duties, taxes, and fees'],
              ['Import Regulations', 'Ensure products are legal to import in your country'],
              ['Customs Delays', 'Packages may be held for inspection, causing delays'],
              ['Refused Shipments', 'We cannot refund orders refused due to customs issues'],
              ['Declaration Value', 'We declare the actual product value on customs forms'],
            ].map(([t, d]) => (
              <li key={t} className="flex gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-volt shrink-0 mt-2" />
                <span><strong>{t}:</strong> {d}</span>
              </li>
            ))}
          </ul>

          <div className="border border-volt/30 bg-volt/5 rounded-xl p-4 text-sm text-bone mb-6">
            <strong>Shipping Restrictions:</strong> Please message us on{' '}
            <a href="https://wa.me/15125922145" target="_blank" rel="noopener noreferrer" className="underline">WhatsApp</a> or{' '}
            <a href="https://t.me/cannachem" target="_blank" rel="noopener noreferrer" className="underline">Telegram</a>{' '}
            to verify if we can ship to your country before placing an order.
          </div>

          <h3 className="mb-3 font-display text-base font-bold uppercase tracking-wide text-bone">Address Requirements</h3>
          <ul className="space-y-2 ml-1">
            {[
              'Provide complete and accurate address including postal code',
              'Include phone number for customs clearance',
              'Use English characters for address (if applicable)',
              'Specify any special delivery instructions',
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-volt shrink-0 mt-2" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 6 — Delivery Issues */}
        <section>
          <h2 className="mb-4 font-display text-2xl font-extrabold tracking-tight text-bone">6. Delivery Issues</h2>

          <h3 className="mb-3 font-display text-base font-bold uppercase tracking-wide text-bone">Lost or Stolen Packages</h3>
          <p className="mb-3">If your package is marked as delivered but you haven&apos;t received it:</p>
          <ol className="space-y-2 ml-1 mb-4 list-decimal list-inside">
            <li>Check with neighbors, building management, or household members</li>
            <li>Look for delivery notices or alternative drop-off locations</li>
            <li>Wait 24 hours as carriers sometimes mark packages delivered early</li>
            <li>Contact the shipping carrier directly with your tracking number</li>
            <li>If still missing after 48 hours, contact us on <a href="https://wa.me/15125922145" target="_blank" rel="noopener noreferrer" className="text-volt hover:underline">WhatsApp</a> or <a href="https://t.me/cannachem" target="_blank" rel="noopener noreferrer" className="text-volt hover:underline">Telegram</a></li>
          </ol>
          <div className="border border-signal/40 bg-signal/10 rounded-xl p-4 text-sm text-bone-muted mb-6">
            <strong>Note:</strong> We are not responsible for packages stolen after delivery confirmation. Consider using a secure delivery location.
          </div>

          <h3 className="mb-3 font-display text-base font-bold uppercase tracking-wide text-bone">Damaged Packages</h3>
          <ul className="space-y-2 ml-1 mb-6">
            {[
              ['Do Not Open', 'Keep the package sealed if possible'],
              ['Take Photos', 'Document all damage to packaging and contents'],
              ['Contact Us Immediately', 'Message us photos within 24 hours'],
              ['File Carrier Claim', 'We will assist with filing a claim'],
            ].map(([t, d]) => (
              <li key={t} className="flex gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-volt shrink-0 mt-2" />
                <span><strong>{t}:</strong> {d}</span>
              </li>
            ))}
          </ul>

          <h3 className="mb-3 font-display text-base font-bold uppercase tracking-wide text-bone">Wrong or Missing Items</h3>
          <ul className="space-y-2 ml-1">
            {[
              'Contact us within 48 hours of delivery',
              'Provide your order number and photos of received items',
              'We will arrange for replacement or refund',
              'Return shipping will be covered by us for our errors',
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-volt shrink-0 mt-2" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 7 — Restrictions */}
        <section>
          <h2 className="mb-4 font-display text-2xl font-extrabold tracking-tight text-bone">7. Shipping Restrictions</h2>
          <p className="mb-4">Due to the nature of our products, certain restrictions apply:</p>
          <ul className="space-y-2 ml-1">
            {[
              ['Research Use Only', 'Products must be used for legitimate research purposes'],
              ['Legal Compliance', 'You are responsible for ensuring products are legal in your location'],
              ['Age Verification', 'Must be 18+ to receive shipments'],
              ['Signature Required', 'Some orders may require signature upon delivery'],
              ['PO Boxes', 'We do not ship to PO boxes for security reasons'],
              ['Freight Forwarders', 'Use of freight forwarding services is prohibited'],
            ].map(([t, d]) => (
              <li key={t} className="flex gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-volt shrink-0 mt-2" />
                <span><strong>{t}:</strong> {d}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 8 — Support */}
        <section>
          <h2 className="mb-4 font-display text-2xl font-extrabold tracking-tight text-bone">8. Shipping Support</h2>
          <p className="mb-5">Need help with your shipment? We&apos;re here to assist:</p>
          <div className="border border-line rounded-xl p-5 space-y-2 text-sm mb-6">
            <p><strong>WhatsApp:</strong> <a href="https://wa.me/15125922145" target="_blank" rel="noopener noreferrer" className="text-volt hover:underline">+1 512-592-2145</a></p>
            <p><strong>Telegram:</strong> <a href="https://t.me/cannachem" target="_blank" rel="noopener noreferrer" className="text-volt hover:underline">@cannachem</a></p>
            <p><strong>Response Time:</strong> Within 24 hours</p>
            <p className="text-bone-faint text-xs pt-2">Please include your order number and tracking information when contacting us about shipping issues.</p>
          </div>
        </section>

        {/* Tips */}
        <section className="bg-night-800 border border-line rounded-xl p-6">
          <h2 className="font-display text-lg font-extrabold uppercase tracking-wide text-bone mb-4">Shipping Tips</h2>
          <ul className="space-y-2.5">
            {[
              'Double-check your shipping address before completing checkout',
              'Provide a phone number for delivery notifications',
              'Choose a secure delivery location to prevent theft',
              'Track your package regularly for updates',
              'Contact us immediately if you notice any issues',
            ].map((tip) => (
              <li key={tip} className="flex items-start gap-2.5 text-sm">
                <FaCheckCircle className="text-volt text-xs mt-1 shrink-0" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>
      </article>

      {/* Navigation */}
      <div className="wrap flex max-w-3xl justify-between pb-16">
        <Link href="/terms" className="font-mono text-[11px] uppercase tracking-[0.14em] text-bone-muted transition-colors hover:text-volt">&larr; Terms &amp; Conditions</Link>
        <Link href="/" className="btn-volt">Back to home</Link>
      </div>
    </div>
  );
}
