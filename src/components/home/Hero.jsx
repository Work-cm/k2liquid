'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiArrowRight, FiSearch, FiShield, FiPackage, FiGlobe } from 'react-icons/fi';
import { LogoMark } from '@/components/common/Logo';

const TICKER_ITEMS = [
  'K2 PAPER SHEETS',
  'K2 LIQUID SPRAY',
  'K2 POWDER',
  'ETOMIDATE',
  'DISCREET SHIPPING',
  'WORLDWIDE DELIVERY',
  'BTC ACCEPTED',
  'LAB TESTED',
];

const TRUST_CHIPS = [
  { icon: FiShield, label: 'Discreet packaging' },
  { icon: FiPackage, label: 'Tracked shipping' },
  { icon: FiGlobe, label: 'Worldwide delivery' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/products?search=${encodeURIComponent(q)}` : '/products');
  };

  return (
    <section className="relative overflow-hidden border-b border-line bg-night-900">
      {/* Backdrop mark */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/2 hidden -translate-y-1/2 opacity-[0.06] lg:block"
      >
        <LogoMark size={560} />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-volt/60 to-transparent"
      />

      <div className="wrap relative">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-10 py-16 sm:py-24 lg:grid-cols-[1.5fr_1fr] lg:gap-16 lg:py-32"
        >
          {/* Left — headline */}
          <div>
            <motion.p variants={item} className="tag mb-6">
              k2liquidstore — catalog 01
            </motion.p>

            <motion.h1
              variants={item}
              className="h-display text-[clamp(2.6rem,7vw,5.5rem)]"
            >
              K2 PAPER.
              <br />
              <span className="text-volt">K2 LIQUID.</span>
              <br />
              <span className="outline-text">ZERO NOISE.</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-7 max-w-xl text-base leading-relaxed text-bone-muted sm:text-lg"
            >
              Research-grade K2 paper sheets, liquid spray, cannabinoid powder,
              etomidate and K-Pods. Sealed, tracked and shipped discreetly — anywhere on the map.
            </motion.p>

            {/* Search */}
            <motion.form
              variants={item}
              onSubmit={handleSearch}
              className="mt-9 flex max-w-xl border border-line-strong bg-night-800 transition-colors focus-within:border-volt"
            >
              <div className="flex items-center pl-4 text-bone-faint">
                <FiSearch className="h-4 w-4" />
              </div>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the catalog — paper, spray, powder…"
                className="w-full border-0 bg-transparent px-4 py-4 font-sans text-sm text-bone placeholder:text-bone-faint focus:outline-none focus:ring-0"
                aria-label="Search products"
              />
              <button type="submit" className="btn-volt shrink-0 border-0 border-l border-line">
                Search
              </button>
            </motion.form>

            {/* CTAs + chips */}
            <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/products" className="btn-bone">
                Browse catalog <FiArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/about" className="btn-ghost">
                About us
              </Link>
            </motion.div>

            <motion.ul variants={item} className="mt-9 flex flex-wrap gap-x-7 gap-y-3">
              {TRUST_CHIPS.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2.5 text-sm text-bone-muted">
                  <Icon className="h-4 w-4 text-volt" />
                  {label}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Right — spec card */}
          <motion.aside variants={item} className="hidden lg:block">
            <div className="cell relative h-full p-8">
              <div
                aria-hidden
                className="absolute left-0 top-0 h-full w-1 bg-volt"
              />
              <p className="tag-plain mb-8">// spec.sheet</p>
              <dl className="space-y-6">
                {[
                  ['FORMAT', 'Sheets · Spray · Powder · Crystal'],
                  ['PURITY', 'Lab verified — batch coded'],
                  ['PACKAGING', 'Vacuum sealed, scent-proof'],
                  ['DISPATCH', '24h processing, tracked'],
                  ['PAYMENT', 'Bitcoin — confirmed on-chain'],
                  ['SUPPORT', 'WhatsApp + Telegram, 7 days'],
                ].map(([k, v]) => (
                  <div key={k} className="border-b border-line pb-5 last:border-0 last:pb-0">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone-faint">
                      {k}
                    </dt>
                    <dd className="mt-1.5 font-sans text-sm font-medium text-bone">{v}</dd>
                  </div>
                ))}
              </dl>
              <div
                aria-hidden
                className="pointer-events-none absolute bottom-6 right-6 opacity-30"
              >
                <LogoMark size={72} />
              </div>
            </div>
          </motion.aside>
        </motion.div>
      </div>

      {/* Ticker */}
      <div className="relative border-t border-line bg-night-950">
        <div className="ticker-mask overflow-hidden py-3">
          <div className="flex w-max animate-ticker gap-0">
            {[0, 1].map((dup) => (
              <ul key={dup} aria-hidden={dup === 1} className="flex shrink-0">
                {TICKER_ITEMS.map((label, i) => (
                  <li
                    key={`${dup}-${i}`}
                    className="flex items-center gap-6 whitespace-nowrap pr-6 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-muted"
                  >
                    {label}
                    <span className="h-1.5 w-1.5 bg-volt" aria-hidden />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
