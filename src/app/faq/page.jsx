'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaQuestionCircle, FaChevronDown, FaChevronUp, FaSearch, FaWhatsapp, FaTelegramPlane } from 'react-icons/fa';

function renderAnswerWithLinks(text) {
  return text;
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Questions', icon: '📋' },
    { id: 'ordering', name: 'Ordering & Payment', icon: '🛒' },
    { id: 'shipping', name: 'Shipping & Delivery', icon: '📦' },
    { id: 'products', name: 'Products & Quality', icon: '🧪' },
    { id: 'account', name: 'Account & Security', icon: '🔒' },
    { id: 'returns', name: 'Returns & Refunds', icon: '🔄' },
  ];

  const faqs = [
    // Ordering & Payment
    {
      category: 'ordering',
      question: 'What payment methods do you accept?',
      answer: 'We accept Bitcoin (BTC) only. Contact us on WhatsApp after placing your order and we\'ll send you our BTC wallet address with exact payment instructions.'
    },
    {
      category: 'ordering',
      question: 'How do I pay for my order?',
      answer: 'After adding items to your cart and proceeding to checkout, you\'ll need to contact us on WhatsApp for payment instructions. We\'ll respond within 24 hours with detailed instructions for your chosen payment method. Once payment is confirmed, we\'ll process and ship your order.'
    },
    {
      category: 'ordering',
      question: 'Is my payment information secure?',
      answer: 'Yes, absolutely. We use secure payment methods and never store sensitive payment information. All transactions are handled through encrypted channels. Specific security details will be provided when you receive payment instructions.'
    },
    {
      category: 'ordering',
      question: 'Can I cancel my order after placing it?',
      answer: 'You can cancel your order for a full refund only if it hasn\'t been processed or shipped yet. Orders are typically processed within 24-48 hours. Contact us immediately on WhatsApp with your order number if you need to cancel.'
    },
    {
      category: 'ordering',
      question: 'Do you offer bulk discounts?',
      answer: 'Yes! We offer volume discounts for bulk orders. Contact us on WhatsApp with details about the products and quantities you need, and we\'ll provide a custom quote.'
    },
    {
      category: 'ordering',
      question: 'Why was my order declined?',
      answer: 'Orders may be declined due to: incorrect payment information, insufficient funds, security flags from your bank, or failed verification checks. Contact your bank first, then reach out to us if the issue persists.'
    },

    // Shipping & Delivery
    {
      category: 'shipping',
      question: 'How long does shipping take?',
      answer: 'Domestic orders: 3-5 business days (Standard) or 1-2 days (Express). International orders: 5-21 business days depending on destination. All orders are processed within 24-48 hours on business days.'
    },
    {
      category: 'shipping',
      question: 'Do you offer free shipping?',
      answer: 'Yes! We offer FREE standard shipping on all orders over \u20AC100. For orders under \u20AC100, standard shipping is \u20AC15 within the country.'
    },
    {
      category: 'shipping',
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship to most countries worldwide. Shipping costs vary by destination: Europe (\u20AC25), North America (\u20AC45), Rest of World (\u20AC60). Please note that you are responsible for any customs duties or import taxes.'
    },
    {
      category: 'shipping',
      question: 'How can I track my order?',
      answer: 'Once your order ships, you\'ll receive a shipping confirmation email with a tracking number. Click the tracking link or visit the carrier\'s website and enter your tracking number to see real-time updates.'
    },
    {
      category: 'shipping',
      question: 'Is packaging discreet?',
      answer: 'Yes, absolutely. All orders are shipped in plain, unmarked packaging with no mention of K2LiquidStore or product details. The sender name is generic for your privacy.'
    },
    {
      category: 'shipping',
      question: 'What if my package is lost or stolen?',
      answer: 'If your package is marked as delivered but you haven\'t received it, wait 24-48 hours and check with neighbors or building management. If still missing, contact us immediately on WhatsApp with your tracking number.'
    },

    // Products & Quality
    {
      category: 'products',
      question: 'Are your products legal?',
      answer: 'Legality of K2 products varies by country and region. You are responsible for ensuring products are legal to purchase and possess in your jurisdiction before ordering.'
    },
    {
      category: 'products',
      question: 'What purity level are your products?',
      answer: 'All our products meet high purity standards, typically 98%+ purity. Each product listing includes detailed specifications. We provide Certificates of Analysis (COA) upon request for verification.'
    },
    {
      category: 'products',
      question: 'Are products tested?',
      answer: 'Yes, all products undergo rigorous quality control testing before being listed for sale. We work with certified laboratories to ensure purity, potency, and safety standards are met.'
    },
    {
      category: 'products',
      question: 'Can I request a Certificate of Analysis (COA)?',
      answer: 'Yes! Contact us on WhatsApp with your order number and product name, and we\'ll provide the COA for your batch within 24-48 hours.'
    },
    {
      category: 'products',
      question: 'Are your products for human consumption?',
      answer: 'No. Our K2 paper sheets, K2 liquid spray and cannabinoid K2 powder are sold strictly as research/incense products. They are not intended for human consumption.'
    },
    {
      category: 'products',
      question: 'How should I store the products?',
      answer: 'Store products in a cool, dry place away from direct sunlight and moisture. Keep in original sealed containers until use. Specific storage requirements are listed on product labels. Always follow proper laboratory safety protocols.'
    },
    {
      category: 'products',
      question: 'Do products have expiration dates?',
      answer: 'Yes, all products have expiration dates printed on the packaging. When stored properly, most products remain stable for 2-3 years. We only ship products with at least 12 months until expiration.'
    },

    // Account & Security
    {
      category: 'account',
      question: 'Do I need an account to order?',
      answer: 'Yes, you must create an account to place orders. This helps us verify customer information, maintain order history, and ensure compliance with regulations.'
    },
    {
      category: 'account',
      question: 'How do I reset my password?',
      answer: 'Click "Forgot Password" on the login page, enter your email address, and you\'ll receive a password reset link. If you don\'t receive the email within 10 minutes, check your spam folder or contact support.'
    },
    {
      category: 'account',
      question: 'Is my personal information safe?',
      answer: 'Yes, we take privacy seriously. All personal information is encrypted and stored securely. We never share your information with third parties except as required for order fulfillment. Read our Privacy Policy for details.'
    },
    {
      category: 'account',
      question: 'Can I update my account information?',
      answer: 'Yes, log in to your account and go to "Profile" or "Account Settings" to update your name, email, shipping address, and other information.'
    },
    {
      category: 'account',
      question: 'How do I delete my account?',
      answer: 'Contact us on WhatsApp with your account email and request account deletion. We\'ll process your request within 7 business days. Note that order history may be retained for legal compliance.'
    },

    // Returns & Refunds
    {
      category: 'returns',
      question: 'What is your return policy?',
      answer: 'We accept returns only for defective, damaged, or incorrect products within 24-48 hours of delivery. Products must be unopened and in original packaging. Contact us immediately with photos for return authorization.'
    },
    {
      category: 'returns',
      question: 'Can I return a product if I change my mind?',
      answer: 'No, we do not accept returns for change of mind or customer error due to the nature of our products. All sales are final unless the product is defective, damaged, or incorrect.'
    },
    {
      category: 'returns',
      question: 'How long do refunds take?',
      answer: 'Once we receive and approve your return, refunds are processed within 7-14 business days. The refund will be issued to your original payment method and may take an additional 5-10 business days to appear in your account.'
    },
    {
      category: 'returns',
      question: 'Who pays for return shipping?',
      answer: 'If the return is due to our error (defective, wrong, or damaged product), we provide a prepaid return label. For other returns (if accepted), you are responsible for return shipping costs.'
    },
    {
      category: 'returns',
      question: 'Can I exchange a product instead of getting a refund?',
      answer: 'Yes, we offer replacements for defective or incorrect products subject to availability. If you prefer an exchange, indicate this when requesting your return authorization.'
    },

    // General
    {
      category: 'ordering',
      question: 'Do you have a minimum order amount?',
      answer: 'No, there is no minimum order amount. However, orders over \u20AC100 qualify for free standard shipping.'
    },
    {
      category: 'products',
      question: 'Are your products in stock?',
      answer: 'Product availability is shown on each product page. If an item is out of stock, you can sign up for restock notifications. We regularly update our inventory.'
    },
    {
      category: 'shipping',
      question: 'Can I change my shipping address after ordering?',
      answer: 'Contact us immediately on WhatsApp if you need to change your shipping address. We can only modify the address if the order hasn\'t been shipped yet.'
    },
    {
      category: 'account',
      question: 'Do you offer customer support?',
      answer: 'Yes! Message us on WhatsApp or Telegram — we typically respond within 24 hours.'
    },
    {
      category: 'ordering',
      question: 'Can I order by phone?',
      answer: 'Currently, we only accept orders through our website for security and accuracy. If you need assistance placing an order, contact us on WhatsApp and we\'ll guide you through the process.'
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-night-900 pb-20">
      <div className="wrap max-w-4xl py-12 sm:py-16">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-bone-faint" aria-label="Breadcrumb">
          <Link href="/" className="transition-colors hover:text-volt">Home</Link>
          <span>/</span>
          <span className="text-bone-muted">FAQ</span>
        </nav>

        {/* Header */}
        <div className="mb-12 border-b border-line pb-10">
          <p className="tag mb-4">support.center</p>
          <h1 className="h-display mb-3 text-4xl sm:text-5xl">Frequently asked questions</h1>
          <p className="max-w-xl text-base text-bone-muted">
            Find answers to common questions about products, ordering, shipping, and more.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-bone-faint" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="field pl-10"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors ${
                  activeCategory === category.id
                    ? 'border-volt bg-volt text-volt-ink'
                    : 'border-line-strong bg-transparent text-bone-muted hover:border-volt hover:text-volt'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-2">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => (
              <div
                key={index}
                className={`border bg-night-800 transition-colors ${
                  openIndex === index ? 'border-volt' : 'border-line hover:border-line-strong'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left"
                >
                  <span className="pr-4 text-sm font-semibold leading-snug text-bone">{faq.question}</span>
                  {openIndex === index ? (
                    <FaChevronUp className="flex-shrink-0 text-xs text-volt" />
                  ) : (
                    <FaChevronDown className="flex-shrink-0 text-xs text-bone-faint" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="border-t border-line px-6 pb-5">
                    <p className="pt-4 text-sm leading-relaxed text-bone-muted">{renderAnswerWithLinks(faq.answer)}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="cell py-16 text-center">
              <p className="text-bone-muted">No questions matched your search.</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-volt hover:text-bone"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Still Have Questions CTA */}
        <div className="mt-12 border border-volt/40 bg-volt/5 p-8 text-center">
          <h2 className="h-display mb-2 text-xl">Still have questions?</h2>
          <p className="mb-6 text-sm text-bone-muted">Our support team typically responds within 24 hours.</p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <a href="https://wa.me/13468721280" target="_blank" rel="noopener noreferrer" className="btn-volt">
              <FaWhatsapp className="h-4 w-4" /> WhatsApp us
            </a>
            <a href="https://t.me/Zhong5cla" target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <FaTelegramPlane className="h-4 w-4" /> Telegram us
            </a>
          </div>
        </div>

        {/* Policy Quick Links */}
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            { href: '/privacy', label: 'Privacy Policy' },
            { href: '/terms', label: 'Terms & Conditions' },
            { href: '/shipping', label: 'Shipping Policy' },
            { href: '/refund', label: 'Return & Refund' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="cell cell-hover p-4 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-bone-muted transition-colors hover:text-volt"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
