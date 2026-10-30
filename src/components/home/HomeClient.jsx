'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FiArrowRight,
  FiArrowUpRight,
  FiShield,
  FiPackage,
  FiLock,
  FiMessageCircle,
  FiCheck,
} from 'react-icons/fi';
import Hero from '@/components/home/Hero';
import ProductCard from '@/components/product/ProductCard';
import SEOKeywords from '@/components/seo/SEOKeywords';
import HomeSEOContent from '@/components/seo/HomeSEOContent';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

function SectionHead({ index, tag, title, action }) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-6 border-b border-line pb-6">
      <div>
        <p className="tag mb-3">
          {index} — {tag}
        </p>
        <h2 className="h-display text-3xl sm:text-4xl lg:text-5xl">{title}</h2>
      </div>
      {action}
    </div>
  );
}

/* ---------- 01 · Promise strip ---------- */

const PROMISES = [
  {
    icon: FiShield,
    title: 'Discreet by default',
    text: 'Vacuum-sealed, scent-proof packaging with zero external branding or product references.',
  },
  {
    icon: FiPackage,
    title: 'Tracked worldwide',
    text: 'Every order ships with tracking. Dispatch within 24 hours of confirmed payment.',
  },
  {
    icon: FiLock,
    title: 'Crypto-only checkout',
    text: 'Bitcoin payments confirmed on-chain. No cards, no statements, no paper trail.',
  },
  {
    icon: FiMessageCircle,
    title: 'Human support',
    text: 'WhatsApp and Telegram, seven days a week. Real answers, not ticket queues.',
  },
];

function PromiseStrip() {
  return (
    <section className="border-b border-line bg-night-900">
      <div className="wrap grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {PROMISES.map(({ icon: Icon, title, text }, i) => (
          <motion.div
            key={title}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className={`border-line px-6 py-10 sm:px-8 ${
              i > 0 ? 'border-t sm:border-t-0 sm:border-l' : ''
            } ${i === 2 ? 'lg:border-l' : ''}`}
          >
            <Icon className="mb-5 h-6 w-6 text-volt" />
            <h3 className="font-display text-sm font-bold uppercase tracking-wide text-bone">
              {title}
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-bone-muted">{text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- 02 · Category index ---------- */

const CATEGORIES = [
  {
    key: '01',
    slug: 'k2-paper-sheets',
    name: 'K2 Paper Sheets',
    desc: 'Evenly infused A4 sheets. Strong, consistent, undetectable.',
  },
  {
    key: '02',
    slug: 'k2-liquid-spray',
    name: 'K2 Liquid Spray',
    desc: 'High-strength spray in sealed bottles. Apply to any paper.',
  },
  {
    key: '03',
    slug: 'k2-powder',
    name: 'K2 Powder',
    desc: 'Pure cannabinoid powder for custom blends and applications.',
  },
  {
    key: '04',
    slug: 'etomidate',
    name: 'Etomidate',
    desc: 'Research-grade powder and crystal. COA included per batch.',
  },
  {
    key: '05',
    slug: 'vapes-kpods',
    name: 'Vapes / K-Pods',
    desc: 'Pre-filled pods and disposables, sealed for freshness.',
  },
];

function CategoryIndex() {
  return (
    <section className="border-b border-line bg-night-950">
      <div className="wrap py-16 sm:py-24">
        <SectionHead
          index="01"
          tag="catalog.index"
          title={
            <>
              PICK YOUR <span className="text-volt">FORMAT</span>
            </>
          }
          action={
            <Link href="/products" className="btn-ghost">
              Full catalog <FiArrowRight className="h-4 w-4" />
            </Link>
          }
        />
        <ul className="border-t border-line">
          {CATEGORIES.map((cat) => (
            <motion.li
              key={cat.slug}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-40px' }}
            >
              <Link
                href={`/products?category=${cat.slug}`}
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 border-b border-line py-6 transition-colors hover:bg-night-800 sm:gap-10 sm:py-7"
              >
                <span className="font-mono text-xs text-bone-faint transition-colors group-hover:text-volt">
                  /{cat.key}
                </span>
                <span>
                  <span className="font-display text-xl font-bold uppercase tracking-tight text-bone transition-colors group-hover:text-volt sm:text-2xl">
                    {cat.name}
                  </span>
                  <span className="mt-1 block text-sm text-bone-muted">{cat.desc}</span>
                </span>
                <FiArrowUpRight className="h-6 w-6 text-bone-faint transition-all group-hover:translate-x-1 group-hover:text-volt" />
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- 03 · Featured shelf ---------- */

function FeaturedShelf({ products }) {
  if (!products || products.length === 0) return null;

  return (
    <section className="border-b border-line bg-night-900">
      <div className="wrap py-16 sm:py-24">
        <SectionHead
          index="02"
          tag="featured.stock"
          title={
            <>
              CURRENT <span className="outline-text">INVENTORY</span>
            </>
          }
          action={
            <Link href="/products" className="btn-ghost">
              View all <FiArrowRight className="h-4 w-4" />
            </Link>
          }
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product._id || product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 04 · Process ledger ---------- */

const STEPS = [
  {
    n: '01',
    title: 'Select',
    text: 'Browse the catalog, pick your format and quantity. No account required to order.',
  },
  {
    n: '02',
    title: 'Confirm',
    text: 'Send your order through WhatsApp or Telegram. We confirm stock and total in minutes.',
  },
  {
    n: '03',
    title: 'Pay',
    text: 'Settle with Bitcoin. Your payment is verified on-chain before dispatch.',
  },
  {
    n: '04',
    title: 'Receive',
    text: 'Sealed, tracked package dispatched within 24 hours. Delivered to your door.',
  },
];

function ProcessLedger() {
  return (
    <section className="border-b border-line bg-night-950">
      <div className="wrap py-16 sm:py-24">
        <SectionHead
          index="03"
          tag="order.protocol"
          title={
            <>
              HOW IT <span className="text-volt">RUNS</span>
            </>
          }
        />
        <ol className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <motion.li
              key={step.n}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              className="relative bg-night-900 p-7 sm:p-8"
            >
              <span className="font-mono text-4xl font-bold text-line-strong">{step.n}</span>
              <h3 className="mt-5 font-display text-base font-bold uppercase tracking-wide text-bone">
                {step.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-bone-muted">{step.text}</p>
              <span
                aria-hidden
                className="absolute right-6 top-7 h-2 w-2 bg-volt opacity-60"
              />
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- 05 · Testimonials ---------- */

const TESTIMONIALS = [
  {
    quote:
      'Third order in. Sheets landed in 6 days, packaging completely bland — exactly as described. Strength is consistent every time.',
    name: 'Verified buyer',
    meta: 'K2 paper sheets · EU',
  },
  {
    quote:
      'The spray is legitimately strong. Replied on Telegram within minutes and sent tracking the next morning. No complaints.',
    name: 'Verified buyer',
    meta: 'K2 liquid spray · US',
  },
  {
    quote:
      'Ordered powder to make my own blends. Purity checked out, batch code matched the COA they sent. Professional operation.',
    name: 'Verified buyer',
    meta: 'K2 powder · CA',
  },
];

function Testimonials() {
  return (
    <section className="border-b border-line bg-night-900">
      <div className="wrap py-16 sm:py-24">
        <SectionHead
          index="04"
          tag="field.reports"
          title={
            <>
              WHAT BUYERS <span className="outline-text">SAY</span>
            </>
          }
        />
        <div className="grid grid-cols-1 gap-px border border-line bg-line lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <motion.blockquote
              key={t.meta}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              className="flex flex-col bg-night-950 p-7 sm:p-9"
            >
              <span aria-hidden className="font-display text-4xl leading-none text-volt">
                &ldquo;
              </span>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-bone-muted">
                {t.quote}
              </p>
              <footer className="mt-7 border-t border-line pt-5">
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-bone">
                  <FiCheck className="h-3.5 w-3.5 text-volt" /> {t.name}
                </p>
                <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-bone-faint">
                  {t.meta}
                </p>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 06 · CTA slab ---------- */

function CTASlab() {
  return (
    <section className="bg-volt">
      <div className="wrap flex flex-col items-start justify-between gap-8 py-14 sm:py-20 lg:flex-row lg:items-center">
        <div>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-volt-ink/70">
            // ready.when.you.are
          </p>
          <h2 className="font-display text-3xl font-extrabold uppercase tracking-[-0.03em] text-volt-ink sm:text-5xl">
            Stock moves fast.
            <br />
            Lock yours in.
          </h2>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/products"
            className="btn border-night-950 bg-night-950 text-bone hover:bg-night-800"
          >
            Shop now <FiArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="https://wa.me/15125922145"
            target="_blank"
            rel="noopener noreferrer"
            className="btn border-volt-ink/40 bg-transparent text-volt-ink hover:border-volt-ink hover:bg-volt-ink hover:text-volt"
          >
            WhatsApp us
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- Page assembly ---------- */

export default function HomeClient({ featuredProducts }) {
  return (
    <div className="min-h-screen bg-night-900">
      <SEOKeywords />
      <Hero />
      <PromiseStrip />
      <CategoryIndex />
      <FeaturedShelf products={featuredProducts} />
      <ProcessLedger />
      <Testimonials />
      <HomeSEOContent />
      <CTASlab />
    </div>
  );
}
