'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthProvider';
import { useCart } from '@/components/cart/CartProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineShoppingBag, HiOutlineMagnifyingGlass, HiOutlineXMark, HiOutlineBars2, HiOutlineArrowUpRight, HiOutlineArrowRight } from 'react-icons/hi2';
import { FaTelegramPlane, FaWhatsapp } from 'react-icons/fa';
import Logo from '@/components/common/Logo';

const navLinks = [
  { href: '/', label: 'Index' },
  { href: '/products', label: 'Catalog' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
];

const shopCategories = [
  { href: '/products?category=k2-paper-sheets', label: 'K2 Paper Sheets', code: '01', desc: 'Infused A4 & letter sheets' },
  { href: '/products?category=k2-liquid-spray', label: 'K2 Liquid Spray', code: '02', desc: 'High-strength sealed bottles' },
  { href: '/products?category=k2-powder', label: 'K2 Powder', code: '03', desc: 'Pure cannabinoid powder' },
  { href: '/products?category=etomidate', label: 'Etomidate', code: '04', desc: 'Research powders & crystals' },
  { href: '/products?category=vapes-kpods', label: 'Vapes / K-Pods', code: '05', desc: 'Pre-filled pods & kits' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const searchRef = useRef(null);
  const userRef = useRef(null);
  const headerRef = useRef(null);
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { cart } = useCart();

  const cartCount = cart ? cart.reduce((s, i) => s + i.quantity, 0) : 0;

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    setMenuOpen(false); setSearchOpen(false); setCatOpen(false); setUserOpen(false);
  }, [pathname]);
  useEffect(() => { if (searchOpen) searchRef.current?.focus(); }, [searchOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e) => {
      if (userRef.current && !userRef.current.contains(e.target)) setUserOpen(false);
      if (headerRef.current && !headerRef.current.contains(e.target)) setCatOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setSearchOpen(o => !o); }
      if (e.key === 'Escape') { setSearchOpen(false); setCatOpen(false); setUserOpen(false); setMenuOpen(false); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const go = useCallback((q) => {
    window.location.href = q.trim() ? `/products?search=${encodeURIComponent(q.trim())}` : '/products';
  }, []);

  const isActive = (href) => href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      <header
        ref={headerRef}
        className={`sticky top-0 z-40 border-b transition-colors duration-300 ${scrolled || catOpen || searchOpen ? 'bg-night-900/95 backdrop-blur-md border-line' : 'bg-night-900 border-line/60'}`}
      >
        <div className="wrap">
          <div className="h-16 lg:h-[72px] flex items-stretch justify-between">
            {/* Brand */}
            <div className="flex items-center pr-6 lg:border-r border-line">
              <Logo size={36} showDomain={false} />
            </div>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-stretch flex-1">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`relative flex items-center px-6 font-mono text-[12px] uppercase tracking-[0.16em] border-r border-line transition-colors ${isActive(href) ? 'text-volt' : 'text-bone-muted hover:text-bone'}`}
                >
                  {label}
                  {isActive(href) && <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-volt" />}
                </Link>
              ))}
              <button
                onClick={() => { setCatOpen(o => !o); setSearchOpen(false); }}
                aria-expanded={catOpen}
                className={`relative flex items-center gap-2 px-6 font-mono text-[12px] uppercase tracking-[0.16em] border-r border-line transition-colors ${catOpen ? 'text-volt bg-night-800' : 'text-bone-muted hover:text-bone'}`}
              >
                Categories
                <span className={`inline-block transition-transform ${catOpen ? 'rotate-45' : ''}`}>+</span>
              </button>
            </nav>

            {/* Actions */}
            <div className="flex items-stretch">
              <button
                onClick={() => { setSearchOpen(o => !o); setCatOpen(false); }}
                aria-label="Search"
                className={`flex items-center gap-3 px-4 lg:px-5 border-l border-line transition-colors ${searchOpen ? 'text-volt bg-night-800' : 'text-bone-muted hover:text-bone'}`}
              >
                <HiOutlineMagnifyingGlass size={18} />
                <kbd className="hidden xl:inline font-mono text-[10px] text-bone-faint border border-line px-1.5 py-0.5">CTRL K</kbd>
              </button>

              {mounted && user && (
                <div className="relative hidden md:flex" ref={userRef}>
                  <button
                    onClick={() => setUserOpen(o => !o)}
                    className={`flex items-center gap-2 px-5 border-l border-line font-mono text-[12px] uppercase tracking-[0.12em] transition-colors ${userOpen ? 'text-volt bg-night-800' : 'text-bone-muted hover:text-bone'}`}
                  >
                    <span className="w-6 h-6 bg-volt text-volt-ink flex items-center justify-center font-bold text-[11px]">{user.name.charAt(0).toUpperCase()}</span>
                    <span className="hidden xl:inline">{user.name.split(' ')[0]}</span>
                  </button>
                  <AnimatePresence>
                    {userOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full w-60 bg-night-800 border border-line border-t-volt shadow-navy z-50"
                      >
                        <div className="px-4 py-3 border-b border-line">
                          <p className="text-sm font-semibold text-bone truncate">{user.name}</p>
                          <p className="font-mono text-[11px] text-bone-faint truncate">{user.email}</p>
                        </div>
                        <Link href="/profile" className="flex items-center justify-between px-4 py-3 text-sm text-bone-muted hover:text-volt hover:bg-night-700 transition-colors">Profile <HiOutlineArrowUpRight size={14} /></Link>
                        {user.isAdmin && <Link href="/admin" className="flex items-center justify-between px-4 py-3 text-sm text-bone-muted hover:text-volt hover:bg-night-700 transition-colors">Admin <HiOutlineArrowUpRight size={14} /></Link>}
                        <button onClick={() => { setUserOpen(false); logout(); }} className="w-full text-left px-4 py-3 text-sm text-bone-muted hover:text-signal hover:bg-night-700 border-t border-line transition-colors">Sign out</button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              <Link href="/cart" className="cart-icon relative flex items-center gap-2 px-5 bg-volt text-volt-ink hover:bg-bone transition-colors font-mono text-[12px] uppercase tracking-[0.12em] font-semibold">
                <HiOutlineShoppingBag size={18} />
                <span className="hidden sm:inline">Cart</span>
                <span className="min-w-[20px] h-5 px-1 bg-night-900 text-volt text-[11px] flex items-center justify-center font-bold">{mounted ? cartCount : 0}</span>
              </Link>

              <button
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                className="lg:hidden flex items-center px-4 border-l border-line text-bone hover:text-volt transition-colors"
              >
                <HiOutlineBars2 size={22} />
              </button>
            </div>
          </div>
        </div>

        {/* Category strip */}
        <AnimatePresence>
          {catOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22, ease: 'easeOut' }}
              className="hidden lg:block overflow-hidden border-t border-line bg-night-900"
            >
              <div className="wrap">
                <div className="grid grid-cols-5 divide-x divide-line border-x border-line">
                  {shopCategories.map(({ href, label, code, desc }) => (
                    <Link key={href} href={href} onClick={() => setCatOpen(false)} className="group p-6 hover:bg-night-800 transition-colors">
                      <p className="font-mono text-[11px] text-volt mb-5">{code}</p>
                      <p className="font-display font-bold text-bone text-lg leading-tight group-hover:text-volt transition-colors">{label}</p>
                      <p className="text-bone-faint text-xs mt-1.5">{desc}</p>
                      <HiOutlineArrowRight className="mt-6 text-bone-faint group-hover:text-volt group-hover:translate-x-1 transition-all" size={16} />
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search strip */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-line bg-night-900"
            >
              <form onSubmit={(e) => { e.preventDefault(); go(query); }} className="wrap">
                <div className="flex items-center gap-4 h-20">
                  <span className="font-mono text-volt text-sm">&gt;_</span>
                  <input
                    ref={searchRef}
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search paper, spray, powder, etomidate..."
                    className="flex-1 bg-transparent text-bone font-display text-xl lg:text-3xl font-bold outline-none placeholder:text-bone-faint placeholder:font-normal"
                  />
                  <button type="submit" className="btn-volt hidden sm:inline-flex">Search</button>
                  <button type="button" onClick={() => setSearchOpen(false)} aria-label="Close search" className="text-bone-muted hover:text-signal"><HiOutlineXMark size={22} /></button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-night-950 flex flex-col lg:hidden"
          >
            <div className="flex items-center justify-between px-5 h-16 border-b border-line">
              <Logo size={32} showDomain={false} />
              <button onClick={() => setMenuOpen(false)} aria-label="Close menu" className="w-10 h-10 flex items-center justify-center border border-line text-bone hover:border-volt hover:text-volt"><HiOutlineXMark size={20} /></button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <form onSubmit={(e) => { e.preventDefault(); setMenuOpen(false); go(query); }} className="flex items-center gap-3 px-5 h-14 border-b border-line">
                <span className="font-mono text-volt text-sm">&gt;_</span>
                <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products" className="flex-1 bg-transparent text-bone outline-none text-sm" />
              </form>

              <nav className="border-b border-line">
                {navLinks.map(({ href, label }, i) => (
                  <motion.div key={href} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }}>
                    <Link href={href} className={`flex items-center justify-between px-5 py-5 border-b border-line last:border-b-0 font-display font-extrabold text-3xl uppercase tracking-tight ${isActive(href) ? 'text-volt' : 'text-bone'}`}>
                      {label}
                      <span className="font-mono text-xs text-bone-faint">0{i + 1}</span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="px-5 py-5">
                <p className="tag mb-4">Categories</p>
                <div className="grid grid-cols-1 divide-y divide-line border border-line">
                  {shopCategories.map(({ href, label, code }) => (
                    <Link key={href} href={href} className="flex items-center gap-4 px-4 py-3.5 text-bone-muted hover:text-volt hover:bg-night-800 transition-colors">
                      <span className="font-mono text-[11px] text-volt">{code}</span>
                      <span className="text-sm font-medium">{label}</span>
                      <HiOutlineArrowUpRight className="ml-auto" size={14} />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="px-5 pb-6 grid grid-cols-2 gap-3">
                <a href="https://wa.me/13468721280" target="_blank" rel="noopener noreferrer" className="btn-ghost"><FaWhatsapp /> WhatsApp</a>
                <a href="https://t.me/Zhong5cla" target="_blank" rel="noopener noreferrer" className="btn-ghost"><FaTelegramPlane /> Telegram</a>
              </div>
            </div>

            <div className="border-t border-line px-5 py-4 flex items-center justify-between gap-3">
              {mounted && user ? (
                <>
                  <Link href="/profile" className="btn-ghost flex-1">Profile</Link>
                  <button onClick={logout} className="btn-ghost flex-1 text-signal border-signal/40">Sign out</button>
                </>
              ) : (
                <Link href="/auth/register" className="btn-volt flex-1">Register</Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
