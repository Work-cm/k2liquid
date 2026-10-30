'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { HiOutlineArrowRight } from 'react-icons/hi';

function FadeUp({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay, ease: 'easeOut' }}>
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-night-900">

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-volt/60 to-transparent"
        />
        <div className="wrap relative z-10 max-w-3xl pb-20 pt-16 sm:pt-20">
          <nav className="mb-10 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-bone-faint" aria-label="Breadcrumb">
            <Link href="/" className="transition-colors hover:text-volt">Home</Link>
            <span>/</span>
            <span className="text-bone-muted">About</span>
          </nav>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="tag mb-5">about.us</p>
            <h1 className="h-display mb-6 text-4xl md:text-5xl">
              Premium K2 paper, liquid spray and powder — shipped fast and discreet, worldwide.
            </h1>
            <p className="text-lg leading-relaxed text-bone-muted">
              K2LiquidStore is a specialist supplier of K2 paper sheets, K2 liquid spray, cannabinoid K2 powder, research-grade etomidate and K-Pods. We serve customers across more than 50 countries with consistent quality, fast dispatch and plain, discreet packaging on every order.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-b border-line">
        <div className="wrap max-w-3xl py-10">
          <div className="flex flex-wrap justify-between gap-x-10 gap-y-6">
            {[
              ['5', 'Product categories'],
              ['100%', 'Discreet packaging'],
              ['10K+', 'Customers served'],
              ['48h', 'Dispatch time'],
            ].map(([val, label]) => (
              <FadeUp key={label}>
                <div>
                  <p className="font-display text-3xl font-extrabold leading-none text-volt">{val}</p>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-bone-muted">{label}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="wrap max-w-3xl py-20">
        <FadeUp>
          <p className="tag mb-4">story</p>
          <h2 className="h-display mb-6 text-2xl md:text-3xl">Our story</h2>
          <div className="space-y-5 leading-relaxed text-bone-muted">
            <p>
              K2LiquidStore was founded on a simple premise: getting strong, high-quality K2 products shouldn&apos;t be complicated or risky. We set out to build a store that pairs consistent product with the speed and discretion customers expect.
            </p>
            <p>
              Today our catalog focuses on <strong className="text-bone">K2 paper sheets, K2 liquid spray, cannabinoid K2 powder, research-grade etomidate and K-Pods</strong>. Every batch we stock is quality-checked before it&apos;s listed, so you get the same strong product every time.
            </p>
            <p>
              Our team understands what reliable supply means. Orders are packed in plain unmarked packaging, dispatched within 48 hours, and shipped discreetly to over 50 countries.
            </p>
          </div>
        </FadeUp>
      </section>

      {/* Image break */}
      <section className="relative h-64 overflow-hidden border-y border-line md:h-80">
        <Image src="/images/GettyImages-563374209.png" alt="Laboratory technicians working" fill className="object-cover object-center" sizes="100vw" />
        <div className="absolute inset-0 bg-night-950/60" />
      </section>

      {/* What we stand for */}
      <section className="wrap max-w-3xl py-20">
        <FadeUp>
          <p className="tag mb-4">principles</p>
          <h2 className="h-display mb-10 text-2xl md:text-3xl">What we stand for</h2>
        </FadeUp>

        <div className="space-y-10">
          {[
            {
              title: 'Consistent quality',
              text: 'Every batch is checked before it goes on sale, so you get the same strength and quality on every single order — no exceptions.',
            },
            {
              title: 'Discreet and secure delivery',
              text: 'Orders are packaged in plain, unmarked parcels with no external branding. Transactions are processed through industry-standard encryption. We never share or sell customer data.',
            },
            {
              title: 'Worldwide reach, local speed',
              text: 'Express and standard courier options to most countries. Every shipment includes tracking from door to door. Our average dispatch time is under 48 hours from confirmation.',
            },
            {
              title: 'Dedicated customer support',
              text: 'Our support team responds quickly via WhatsApp and Telegram. Whether you need help choosing a product or resolving a shipping issue, we are here to help.',
            },
            {
              title: 'Focused catalog',
              text: 'We keep our range focused — K2 paper, spray, powder, etomidate and K-Pods — so every product stays in stock and up to standard.',
            },
            {
              title: 'Fair dispute resolution',
              text: 'If something goes wrong, we fix it. Claims and refunds are processed within 7 business days. No automated runaround, no lengthy disputes.',
            },
          ].map(({ title, text }, i) => (
            <FadeUp key={title} delay={i * 0.04}>
              <div className="flex gap-4">
                <span className="mt-1.5 w-1 shrink-0 self-stretch bg-volt" />
                <div>
                  <h3 className="mb-1 font-display text-lg font-bold text-bone">{title}</h3>
                  <p className="leading-relaxed text-bone-muted">{text}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Commitments — simple numbered list */}
      <section className="border-y border-line bg-night-950">
        <div className="wrap max-w-3xl py-20">
          <FadeUp>
            <p className="tag mb-4">promises</p>
            <h2 className="h-display mb-10 text-2xl md:text-3xl">Our four promises</h2>
          </FadeUp>
          <div className="grid grid-cols-1 gap-x-12 gap-y-8 sm:grid-cols-2">
            {[
              ['Quality-checked batches', 'Every batch is inspected before listing to keep quality consistent.'],
              ['No substitutions — ever', 'You receive exactly what you order, every time. No silent swaps.'],
              ['48-hour dispatch', 'Orders are processed and dispatched within two business days of confirmation.'],
              ['Plain packaging worldwide', 'Discreet, unmarked parcels on every shipment, to every destination.'],
            ].map(([title, desc], i) => (
              <FadeUp key={title} delay={i * 0.06}>
                <div className="flex gap-3">
                  <span className="mt-0.5 font-mono text-lg font-bold leading-none text-volt">0{i + 1}</span>
                  <div>
                    <h3 className="mb-1 text-sm font-bold text-bone">{title}</h3>
                    <p className="text-sm leading-relaxed text-bone-muted">{desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="wrap max-w-3xl py-20 text-center">
        <FadeUp>
          <h2 className="h-display mb-4 text-3xl md:text-4xl">Ready to get started?</h2>
          <p className="mx-auto mb-8 max-w-lg leading-relaxed text-bone-muted">
            Browse our K2 paper sheets, K2 liquid spray and cannabinoid K2 powder. Every order ships fast and discreet.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/products" className="btn-volt group">
              Browse products <HiOutlineArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a href="https://wa.me/15125922145" target="_blank" rel="noopener noreferrer" className="btn-ghost">
              Contact us
            </a>
          </div>
        </FadeUp>
      </section>
    </div>
  );
}
