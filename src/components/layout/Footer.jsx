'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaWhatsapp, FaBitcoin } from 'react-icons/fa';
import { HiOutlineArrowRight, HiOutlineArrowUpRight } from 'react-icons/hi2';
import { LogoMark } from '@/components/common/Logo';

const columns = [
  {
    title: 'Catalog',
    links: [
      { href: '/products', label: 'All products' },
      { href: '/products?category=k2-paper-sheets', label: 'K2 Paper Sheets' },
      { href: '/products?category=k2-liquid-spray', label: 'K2 Liquid Spray' },
      { href: '/products?category=k2-powder', label: 'K2 Powder' },
      { href: '/products?category=etomidate', label: 'Etomidate' },
      { href: '/products?category=vapes-kpods', label: 'Vapes / K-Pods' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About' },
      { href: '/faq', label: 'FAQ' },
      { href: '/shipping', label: 'Shipping' },
      { href: '/refund', label: 'Refunds' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/terms', label: 'Terms' },
      { href: '/privacy', label: 'Privacy' },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const subscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    setTimeout(() => { setStatus('done'); setEmail(''); setTimeout(() => setStatus('idle'), 3000); }, 800);
  };

  return (
    <footer className="border-t border-line bg-night-950 mt-24">
      {/* Top: newsletter + contact */}
      <div className="wrap">
        <div className="grid lg:grid-cols-2 border-x border-line divide-y lg:divide-y-0 lg:divide-x divide-line">
          <div className="p-8 lg:p-12">
            <p className="tag mb-5">Restock alerts</p>
            <h3 className="h-display text-3xl lg:text-4xl mb-4">New batches,<br />one email.</h3>
            <p className="text-bone-muted text-sm max-w-sm mb-8">No marketing noise. One short message when fresh stock lands.</p>
            <form onSubmit={subscribe} className="flex max-w-md border border-line focus-within:border-volt transition-colors">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="flex-1 min-w-0 bg-transparent px-4 py-3.5 text-sm text-bone outline-none"
              />
              <button type="submit" disabled={status !== 'idle'} className="px-5 bg-volt text-volt-ink font-mono text-[12px] uppercase tracking-[0.14em] font-semibold hover:bg-bone transition-colors disabled:opacity-70">
                {status === 'done' ? 'Added' : status === 'loading' ? '...' : 'Join'}
              </button>
            </form>
          </div>

          <div className="p-8 lg:p-12 grid gap-6">
            <a href="https://wa.me/13468721280" target="_blank" rel="noopener noreferrer" className="group cell cell-hover p-5 flex flex-col justify-between min-h-[140px]">
              <FaWhatsapp className="text-volt text-xl" />
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-bone-faint">WhatsApp</p>
                <p className="text-bone font-semibold mt-1 flex items-center gap-2">+1 346-872-1280 <HiOutlineArrowUpRight className="text-bone-faint group-hover:text-volt" size={14} /></p>
              </div>
            </a>
            <div className="border border-line p-5 flex items-center gap-4">
              <FaBitcoin className="text-signal text-2xl shrink-0" />
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-bone-faint">Payment</p>
                <p className="text-bone text-sm font-semibold">Bitcoin (BTC) only &middot; address sent after order request</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sitemap */}
      <div className="border-y border-line">
        <div className="wrap">
          <div className="grid grid-cols-2 md:grid-cols-4 border-x border-line divide-x divide-line">
            <div className="p-6 lg:p-8 col-span-2 md:col-span-1">
              <LogoMark size={44} />
              <p className="text-bone-faint text-xs leading-relaxed mt-5 max-w-[200px]">
                K2 paper, liquid spray, powder, etomidate and K-Pods. Batch-checked. Plain packaging. 50+ countries.
              </p>
            </div>
            {columns.map(({ title, links }) => (
              <div key={title} className="p-6 lg:p-8">
                <p className="tag-plain text-volt mb-5">{title}</p>
                <ul className="space-y-2.5">
                  {links.map(({ href, label }) => (
                    <li key={href}>
                      <Link href={href} className="group inline-flex items-center gap-2 text-sm text-bone-muted hover:text-bone transition-colors">
                        <HiOutlineArrowRight size={12} className="text-bone-faint -ml-5 opacity-0 group-hover:opacity-100 group-hover:ml-0 group-hover:text-volt transition-all" />
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Giant wordmark */}
      <div className="wrap overflow-hidden">
        <p
          className="font-display font-extrabold uppercase leading-none tracking-[-0.05em] text-center select-none outline-text pt-10 -mb-3 whitespace-nowrap"
          style={{ fontSize: 'clamp(2.4rem, 10.5vw, 11rem)' }}
          aria-hidden
        >
          K2LiquidStore
        </p>
      </div>

      {/* Bottom */}
      <div className="border-t border-line">
        <div className="wrap h-14 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-bone-faint">
          <p>&copy; {new Date().getFullYear()} K2LiquidStore</p>
          <p className="hidden sm:flex items-center gap-2"><span className="status-dot" /> Systems nominal</p>
          <p>Research use only</p>
        </div>
      </div>
    </footer>
  );
}
