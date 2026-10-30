import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

const COLUMNS = [
  {
    title: 'K2 Paper Sheets & Liquid Spray',
    body: [
      'K2 paper sheets are our most ordered format — A4 sheets evenly infused with synthetic cannabinoid, undetectable in transit and consistent sheet to sheet. Every batch is coated under controlled conditions so strength never varies.',
      'Prefer to apply it yourself? Our K2 liquid spray ships in sealed, leak-proof bottles. A single bottle treats multiple sheets, and the formula is tuned for fast, even absorption into standard paper stock.',
    ],
    links: [
      { href: '/products?category=k2-paper-sheets', label: 'Shop K2 paper sheets' },
      { href: '/products?category=k2-liquid-spray', label: 'Shop K2 liquid spray' },
    ],
  },
  {
    title: 'K2 Powder, Etomidate & Vapes',
    body: [
      'K2 powder gives you full control — make your own infused paper, spray or custom blends at whatever strength you need. Every lot is lab-tested and shipped with a batch code you can verify against its certificate of analysis.',
      'We also stock research-grade etomidate in powder and crystal form, plus pre-filled vapes and K-pods. Same standard: verified purity, discreet packaging, tracked worldwide delivery.',
    ],
    links: [
      { href: '/products?category=k2-powder', label: 'Shop K2 powder' },
      { href: '/products?category=etomidate', label: 'Shop etomidate' },
      { href: '/products?category=vapes-kpods', label: 'Shop vapes and K-Pods' },
    ],
  },
];

export default function HomeSEOContent() {
  return (
    <section className="border-b border-line bg-night-950">
      <div className="wrap py-16 sm:py-24">
        <p className="tag mb-3">05 — product.notes</p>
        <h2 className="h-display mb-12 max-w-3xl text-3xl sm:text-4xl">
          EVERY FORMAT, <span className="text-volt">ONE STANDARD</span>
        </h2>

        <div className="grid grid-cols-1 gap-px border border-line bg-line lg:grid-cols-2">
          {COLUMNS.map((col) => (
            <article key={col.title} className="bg-night-900 p-7 sm:p-10">
              <h3 className="font-display text-lg font-bold uppercase tracking-wide text-bone">
                {col.title}
              </h3>
              {col.body.map((p, i) => (
                <p key={i} className="mt-4 text-[15px] leading-relaxed text-bone-muted">
                  {p}
                </p>
              ))}
              <ul className="mt-6 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.14em] text-volt hover:text-bone"
                    >
                      {link.label}
                      <FiArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-bone-faint">
          Trusted by repeat buyers across the US, EU and beyond — discreet packaging,
          Bitcoin-only checkout, and support on WhatsApp and Telegram seven days a week.
          Browse the <Link href="/products" className="text-volt underline underline-offset-4 decoration-volt/40 hover:decoration-volt">full catalog</Link> or read our <Link href="/faq" className="text-volt underline underline-offset-4 decoration-volt/40 hover:decoration-volt">FAQ</Link> for shipping and payment details.
        </p>
      </div>
    </section>
  );
}
