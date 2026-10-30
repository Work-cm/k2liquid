import Link from 'next/link';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://k2liquidstore.com'),
  title: 'Return & Refund Policy',
  description: 'Read the K2LiquidStore return and refund policy for K2 paper, spray, powder and etomidate. Learn how to request returns for defective, damaged or incorrect products within 48 hours.',
  keywords: [
    'return policy', 'refund policy', 'k2 product returns',
    'defective products', 'K2LiquidStore refund',
  ],
  alternates: { canonical: '/refund' },
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-night-900">

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-volt/60 to-transparent" />
        <div className="wrap relative z-10 max-w-3xl pb-14 pt-16 sm:pt-20">
          <nav className="mb-8 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-bone-faint" aria-label="Breadcrumb">
            <Link href="/" className="transition-colors hover:text-volt">Home</Link>
            <span>/</span>
            <span className="text-bone-muted">Refund Policy</span>
          </nav>
          <p className="tag mb-4">returns &amp; refunds</p>
          <h1 className="h-display mb-4 text-4xl md:text-5xl">
            Fair, transparent refund policy.
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-bone-muted">
            Due to the nature of our products, all sales are final unless the product is defective, damaged, or incorrect. Claims are processed within 7 business days.
          </p>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-bone-faint">Last updated: December 3, 2025</p>
        </div>
      </section>

      {/* Quick reference strip */}
      <section className="border-b border-line">
        <div className="wrap grid max-w-3xl grid-cols-1 gap-5 py-8 sm:grid-cols-2">
          <div className="border border-volt/40 bg-volt/5 p-5">
            <div className="mb-3 flex items-center gap-2">
              <FaCheckCircle className="text-sm text-volt" />
              <h3 className="font-display text-sm font-bold uppercase tracking-wide text-volt">Eligible for return</h3>
            </div>
            <ul className="space-y-1.5 text-sm text-bone">
              {['Defective products', 'Damaged during shipping', 'Wrong items received', 'Missing items from order'].map(item => (
                <li key={item} className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 bg-volt" />{item}</li>
              ))}
            </ul>
          </div>
          <div className="border border-signal/40 bg-signal/10 p-5">
            <div className="mb-3 flex items-center gap-2">
              <FaTimesCircle className="text-sm text-signal" />
              <h3 className="font-display text-sm font-bold uppercase tracking-wide text-signal">Not eligible</h3>
            </div>
            <ul className="space-y-1.5 text-sm text-bone">
              {['Opened or used products', 'Change of mind', 'Customer ordering error', 'Past return window'].map(item => (
                <li key={item} className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 bg-signal" />{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Main content */}
      <article className="wrap max-w-3xl space-y-14 py-16 text-[15px] leading-relaxed text-bone-muted">

        {/* 1 — Eligibility */}
        <section>
          <h2 className="mb-4 font-display text-2xl font-extrabold tracking-tight text-bone">1. Return Eligibility</h2>

          <h3 className="mb-3 font-display text-base font-bold uppercase tracking-wide text-bone">Acceptable Return Reasons</h3>
          <p className="mb-4">We accept returns ONLY in the following circumstances:</p>
          <div className="space-y-3 mb-8">
            {[
              { title: 'Defective Products', desc: 'Damaged, contaminated, or below quality standards', window: '48 hours' },
              { title: 'Shipping Damage', desc: 'Visible packaging damage during transit', window: '24 hours (with photos)' },
              { title: 'Wrong Items Shipped', desc: 'You received a different product than ordered', window: '48 hours' },
              { title: 'Missing Items', desc: 'Items listed on your order are missing', window: '48 hours' },
            ].map(({ title, desc, window }) => (
              <div key={title} className="flex gap-4 border border-line rounded-xl p-4">
                <span className="w-1.5 rounded-full bg-volt shrink-0 self-stretch" />
                <div className="flex-1">
                  <p className="font-bold text-bone text-sm">{title}</p>
                  <p className="text-sm">{desc}</p>
                  <p className="text-xs text-bone-faint mt-1">Report within {window} of delivery</p>
                </div>
              </div>
            ))}
          </div>

          <h3 className="mb-3 font-display text-base font-bold uppercase tracking-wide text-bone">Non-Returnable Items</h3>
          <ul className="space-y-2 ml-1">
            {[
              ['Opened or Used Products', 'Cannot be returned for safety and legal reasons'],
              ['Change of Mind', 'We do not accept returns due to buyer\'s remorse'],
              ['Customer Error', 'Wrong product ordered by customer'],
              ['Expired Return Window', 'Must be requested within the specified timeframe'],
              ['Improperly Stored Products', 'Damage due to improper handling by customer'],
            ].map(([t, d]) => (
              <li key={t} className="flex gap-3">
                <FaTimesCircle className="text-signal text-xs shrink-0 mt-1.5" />
                <span><strong>{t}:</strong> {d}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 2 — Process */}
        <section>
          <h2 className="mb-4 font-display text-2xl font-extrabold tracking-tight text-bone">2. Return Process</h2>

          <h3 className="mb-3 font-display text-base font-bold uppercase tracking-wide text-bone">How to Request a Return</h3>
          <div className="space-y-4 mb-8">
            {[
              { title: 'Contact Us Immediately', desc: 'Message us on WhatsApp or Telegram with your order number, product name, and reason.' },
              { title: 'Provide Evidence', desc: 'Take clear photos of the product, packaging, and any damage.' },
              { title: 'Wait for Approval', desc: 'Our team reviews your request within 24-48 hours.' },
              { title: 'Receive Return Authorization', desc: 'If approved, you get an RA number. Do NOT return items without one.' },
              { title: 'Ship the Product Back', desc: 'Package securely with RA number. Use trackable shipping.' },
              { title: 'Receive Refund or Replacement', desc: 'Once inspected, we process your refund within 7-14 business days.' },
            ].map(({ title, desc }, i) => (
              <div key={i} className="flex gap-4">
                <span className="text-volt font-black text-sm mt-0.5 w-5 shrink-0">0{i + 1}</span>
                <div>
                  <p className="font-bold text-bone text-sm">{title}</p>
                  <p className="text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <h3 className="mb-3 font-display text-base font-bold uppercase tracking-wide text-bone">Return Shipping</h3>
          <div className="space-y-3">
            <div className="border border-volt/40 bg-volt/10 rounded-xl p-4 text-sm">
              <strong>Our Error:</strong> We provide a prepaid return label. No cost to you.
            </div>
            <div className="border border-signal/40 bg-signal/10 rounded-xl p-4 text-sm">
              <strong>Customer Error / Change of Mind:</strong> Returns not accepted. All sales are final.
            </div>
          </div>
        </section>

        {/* 3 — Refund Policy */}
        <section>
          <h2 className="mb-4 font-display text-2xl font-extrabold tracking-tight text-bone">3. Refund Policy</h2>

          <h3 className="mb-3 font-display text-base font-bold uppercase tracking-wide text-bone">Refund Methods</h3>
          <div className="space-y-3 mb-6">
            <div className="border border-line rounded-xl p-5">
              <p className="font-bold text-bone text-sm mb-1">Original Payment Method</p>
              <p className="text-sm mb-2">Refunds go to the original payment method used.</p>
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-bone-faint">
                <span>Credit/Debit: 5-10 days</span>
                <span>Bank Transfer: 7-14 days</span>
                <span>Other: Up to 14 days</span>
              </div>
            </div>
            <div className="border border-line rounded-xl p-5">
              <p className="font-bold text-bone text-sm mb-1">Store Credit (Optional)</p>
              <p className="text-sm">Choose store credit for an instant 10% bonus (e.g. &euro;100 refund = &euro;110 credit). No expiration.</p>
            </div>
          </div>

          <h3 className="mb-3 font-display text-base font-bold uppercase tracking-wide text-bone">What&apos;s Refunded</h3>
          <ul className="space-y-2 ml-1 mb-6">
            {[
              [true, 'Product Price', 'Full refund of the product price'],
              [true, 'Shipping Fees (Our Error)', 'Original shipping fees refunded if the error was ours'],
              [false, 'Shipping Fees (Customer Error)', 'Non-refundable for customer errors'],
              [false, 'Return Shipping Costs', 'Deducted from refund if customer is responsible'],
            ].map(([ok, t, d]) => (
              <li key={t} className="flex gap-3">
                {ok ? <FaCheckCircle className="text-volt text-xs shrink-0 mt-1.5" /> : <FaTimesCircle className="text-signal text-xs shrink-0 mt-1.5" />}
                <span><strong>{t}:</strong> {d}</span>
              </li>
            ))}
          </ul>

          <h3 className="mb-3 font-display text-base font-bold uppercase tracking-wide text-bone">Partial Refunds</h3>
          <p className="mb-3">In some cases, we may issue a partial refund:</p>
          <ul className="space-y-2 ml-1">
            {[
              'Products returned without original packaging',
              'Minor defects that don\'t affect research use',
              'Returns after the standard window (case-by-case)',
              'Missing accessories or documentation',
            ].map(item => (
              <li key={item} className="flex gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-volt shrink-0 mt-2" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 4 — Replacements */}
        <section>
          <h2 className="mb-4 font-display text-2xl font-extrabold tracking-tight text-bone">4. Replacement Policy</h2>
          <p className="mb-4">We offer replacements for defective, wrong, damaged, or missing items (subject to availability).</p>
          <div className="space-y-3 mb-4">
            {[
              'Request return authorization as described above',
              'Indicate you prefer a replacement instead of refund',
              'We check product availability',
              'If available, replacement ships within 2-3 business days',
              'If unavailable, we offer a full refund or alternative product',
            ].map((step, i) => (
              <div key={i} className="flex gap-4">
                <span className="text-volt font-black text-sm mt-0.5 w-5 shrink-0">0{i + 1}</span>
                <p className="text-sm">{step}</p>
              </div>
            ))}
          </div>
          <div className="border border-volt/30 bg-volt/5 rounded-xl p-4 text-sm text-bone">
            <strong>Note:</strong> Replacements are subject to stock. If the product is unavailable, we&apos;ll offer a full refund or equivalent alternative.
          </div>
        </section>

        {/* 5 — Damaged/Defective */}
        <section>
          <h2 className="mb-4 font-display text-2xl font-extrabold tracking-tight text-bone">5. Damaged or Defective Products</h2>
          <div className="border border-signal/40 bg-signal/10 rounded-xl p-4 mb-5 text-sm text-bone-muted">
            <strong>Important:</strong> Inspect your package immediately upon delivery. Report any damage within 24 hours with photos.
          </div>
          <h3 className="mb-3 font-display text-base font-bold uppercase tracking-wide text-bone">Required Documentation</h3>
          <ul className="space-y-2 ml-1">
            {[
              ['Clear Photos', 'Multiple angles of the product and packaging'],
              ['Product Label', 'Visible product information and batch number'],
              ['Packaging Damage', 'Photos of any external damage'],
              ['Defect Details', 'Clear description of the defect'],
              ['Order Information', 'Order number and date of delivery'],
            ].map(([t, d]) => (
              <li key={t} className="flex gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-volt shrink-0 mt-2" />
                <span><strong>{t}:</strong> {d}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 6 — Cancellations */}
        <section>
          <h2 className="mb-4 font-display text-2xl font-extrabold tracking-tight text-bone">6. Order Cancellations</h2>
          <div className="space-y-3">
            <div className="border border-volt/40 bg-volt/10 rounded-xl p-4 text-sm">
              <strong>Before Shipment:</strong> You may cancel for a full refund if the order hasn&apos;t shipped. Contact us immediately with your order number.
            </div>
            <div className="border border-signal/40 bg-signal/10 rounded-xl p-4 text-sm">
              <strong>After Shipment:</strong> Cannot be cancelled. You must follow the return process (subject to our return policy).
            </div>
          </div>
        </section>

        {/* 7 — Chargebacks */}
        <section>
          <h2 className="mb-4 font-display text-2xl font-extrabold tracking-tight text-bone">7. Chargebacks &amp; Disputes</h2>
          <div className="border border-signal/40 bg-signal/10 rounded-xl p-5 text-sm text-bone-muted">
            <p className="font-bold mb-2">Important Chargeback Policy</p>
            <p className="mb-3">Filing a chargeback without first contacting us is considered fraud and may result in:</p>
            <ul className="space-y-1.5 ml-1 mb-3">
              {['Immediate account termination', 'Blacklisting from future purchases', 'Legal action to recover costs', 'Reporting to fraud prevention agencies'].map(item => (
                <li key={item} className="flex gap-2"><span className="w-1 h-1 rounded-full bg-signal shrink-0 mt-2" />{item}</li>
              ))}
            </ul>
            <p className="font-bold">Please contact us first on <a href="https://wa.me/15125922145" target="_blank" rel="noopener noreferrer" className="text-volt hover:underline">WhatsApp</a> or <a href="https://t.me/cannachem" target="_blank" rel="noopener noreferrer" className="text-volt hover:underline">Telegram</a>.</p>
          </div>
        </section>

        {/* 8 — Contact */}
        <section>
          <h2 className="mb-4 font-display text-2xl font-extrabold tracking-tight text-bone">8. Contact Us for Returns</h2>
          <p className="mb-5">Have questions or need to start a return?</p>
          <div className="border border-line rounded-xl p-5 space-y-2 text-sm mb-6">
            <p><strong>WhatsApp:</strong> <a href="https://wa.me/15125922145" target="_blank" rel="noopener noreferrer" className="text-volt hover:underline">+1 512-592-2145</a></p>
            <p><strong>Telegram:</strong> <a href="https://t.me/cannachem" target="_blank" rel="noopener noreferrer" className="text-volt hover:underline">@cannachem</a></p>
            <p><strong>Subject Line:</strong> Return Request - Order #[Your Order Number]</p>
            <p><strong>Response Time:</strong> Within 24 hours</p>
          </div>
          <div className="bg-night-800 border border-line rounded-xl p-5 text-sm">
            <p className="font-bold mb-2">Include in Your Message:</p>
            <ul className="space-y-1.5 ml-1">
              {['Order number', 'Product name and quantity', 'Reason for return', 'Photos of product/damage (if applicable)', 'Preferred resolution (refund or replacement)'].map(item => (
                <li key={item} className="flex gap-2"><span className="w-1 h-1 rounded-full bg-volt shrink-0 mt-2" />{item}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Summary */}
        <section className="bg-night-800 border border-line rounded-xl p-6">
          <h2 className="font-display text-lg font-extrabold uppercase tracking-wide text-bone mb-4">Quick Summary</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            <div>
              <p className="font-bold text-bone mb-2">Return Window</p>
              <ul className="space-y-1">
                <li className="flex gap-2"><span className="w-1 h-1 rounded-full bg-volt shrink-0 mt-2" />Defective: 48 hours</li>
                <li className="flex gap-2"><span className="w-1 h-1 rounded-full bg-volt shrink-0 mt-2" />Damaged: 24 hours</li>
                <li className="flex gap-2"><span className="w-1 h-1 rounded-full bg-volt shrink-0 mt-2" />Wrong item: 48 hours</li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-bone mb-2">Refund Time</p>
              <ul className="space-y-1">
                <li className="flex gap-2"><span className="w-1 h-1 rounded-full bg-volt shrink-0 mt-2" />Processing: 7-14 days</li>
                <li className="flex gap-2"><span className="w-1 h-1 rounded-full bg-volt shrink-0 mt-2" />Credit card: 5-10 days</li>
                <li className="flex gap-2"><span className="w-1 h-1 rounded-full bg-volt shrink-0 mt-2" />Bank transfer: 7-14 days</li>
              </ul>
            </div>
          </div>
        </section>
      </article>

      {/* Navigation */}
      <div className="wrap flex max-w-3xl justify-between pb-16">
        <Link href="/shipping" className="font-mono text-[11px] uppercase tracking-[0.14em] text-bone-muted transition-colors hover:text-volt">&larr; Shipping Policy</Link>
        <Link href="/" className="btn-volt">Back to home</Link>
      </div>
    </div>
  );
}
