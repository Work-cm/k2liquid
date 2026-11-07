'use client';

import { FaWhatsapp, FaTelegramPlane } from 'react-icons/fa';
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2';
import { useState } from 'react';

export default function WhatsAppButton() {
  const whatsappUrl = 'https://wa.me/13468721280';
  const telegramUrl = 'https://t.me/Zhong5cla';
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-50 flex flex-col items-end gap-2">
      {/* Expanded options */}
      <div className={`flex flex-col gap-2 transition-all duration-200 ${open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 bg-night-800 border border-line hover:border-volt px-4 py-3 transition-colors"
          aria-label="Chat on WhatsApp"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-bone-muted group-hover:text-bone">WhatsApp</span>
          <span className="w-9 h-9 bg-volt text-volt-ink flex items-center justify-center"><FaWhatsapp size={18} /></span>
        </a>
        <a
          href={telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 bg-night-800 border border-line hover:border-signal px-4 py-3 transition-colors"
          aria-label="Chat on Telegram"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-bone-muted group-hover:text-bone">Telegram</span>
          <span className="w-9 h-9 bg-signal text-night-950 flex items-center justify-center"><FaTelegramPlane size={18} /></span>
        </a>
      </div>

      {/* Trigger */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-label="Contact us"
        className={`flex items-center gap-2.5 h-12 px-4 border font-mono text-[12px] uppercase tracking-[0.14em] font-semibold transition-colors ${open ? 'bg-bone text-night-900 border-bone' : 'bg-volt text-volt-ink border-volt hover:bg-bone hover:border-bone'}`}
      >
        <HiOutlineChatBubbleLeftRight size={18} />
        <span className="hidden sm:inline">{open ? 'Close' : 'Contact'}</span>
      </button>
    </div>
  );
}
