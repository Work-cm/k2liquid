import Link from 'next/link';

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://k2liquidstore.com'),
  title: 'Privacy Policy',
  description: 'Read the K2LiquidStore Privacy Policy. Learn how we collect, use and protect your personal information when ordering K2 paper, spray, powder and etomidate online.',
  keywords: [
    'privacy policy', 'K2LiquidStore privacy', 'k2 paper privacy',
    'personal information', 'data protection',
  ],
  alternates: { canonical: '/privacy' },
};

const Dot = () => <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-volt" />;

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-night-900">

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-volt/60 to-transparent" />
        <div className="wrap relative z-10 max-w-3xl pb-14 pt-16 sm:pt-20">
          <nav className="mb-8 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-bone-faint" aria-label="Breadcrumb">
            <Link href="/" className="transition-colors hover:text-volt">Home</Link>
            <span>/</span>
            <span className="text-bone-muted">Privacy Policy</span>
          </nav>
          <p className="tag mb-4">legal</p>
          <h1 className="h-display mb-4 text-4xl md:text-5xl">Privacy Policy</h1>
          <p className="max-w-xl text-base leading-relaxed text-bone-muted">
            We are committed to protecting your privacy and keeping your personal information secure. This policy explains how we collect, use, and safeguard your data.
          </p>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-bone-faint">Last updated: December 3, 2025</p>
        </div>
      </section>

      {/* Content */}
      <article className="wrap max-w-3xl space-y-14 py-16 text-[15px] leading-relaxed text-bone-muted">

        <section>
          <h2 className="mb-4 font-display text-2xl font-extrabold tracking-tight text-bone">1. Introduction</h2>
          <p className="mb-4">Welcome to K2LiquidStore. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.</p>
          <p>By accessing or using K2LiquidStore, you agree to the terms of this Privacy Policy. If you do not agree, please do not use our services.</p>
        </section>

        <section>
          <h2 className="mb-4 font-display text-2xl font-extrabold tracking-tight text-bone">2. Information We Collect</h2>
          <h3 className="mb-3 font-display text-base font-bold uppercase tracking-wide text-bone">Personal Information</h3>
          <ul className="space-y-2 ml-1 mb-6">
            {[['Account Information','Name, email address, username, and password'],['Contact Information','Phone number, billing address, and shipping address'],['Payment Information','Billing details via bank transfer or cryptocurrency'],['Order Information','Purchase history, order details, and preferences'],['Communication Data','Messages sent through our contact form or support']].map(([t,d])=><li key={t} className="flex gap-3"><Dot /><span><strong>{t}:</strong> {d}</span></li>)}
          </ul>
          <h3 className="mb-3 font-display text-base font-bold uppercase tracking-wide text-bone">Automatically Collected Information</h3>
          <ul className="space-y-2 ml-1">
            {[['Device Information','IP address, browser type, operating system, device type'],['Usage Data','Pages visited, time spent, click patterns, referring URLs'],['Location Data','General geographic location based on IP address'],['Cookies','Session cookies, preference cookies, analytics cookies']].map(([t,d])=><li key={t} className="flex gap-3"><Dot /><span><strong>{t}:</strong> {d}</span></li>)}
          </ul>
        </section>

        <section>
          <h2 className="mb-4 font-display text-2xl font-extrabold tracking-tight text-bone">3. How We Use Your Information</h2>
          <ul className="space-y-2 ml-1">
            {[['Order Processing','To process and fulfill your orders, including payment and shipping'],['Account Management','To create and manage your account and provide support'],['Communication','To send order confirmations, shipping updates, and respond to inquiries'],['Marketing','To send promotional emails and offers (with your consent)'],['Website Improvement','To analyze usage patterns and enhance user experience'],['Security','To detect and prevent fraud and unauthorized access'],['Legal Compliance','To comply with legal obligations and enforce our terms']].map(([t,d])=><li key={t} className="flex gap-3"><Dot /><span><strong>{t}:</strong> {d}</span></li>)}
          </ul>
        </section>

        <section>
          <h2 className="mb-4 font-display text-2xl font-extrabold tracking-tight text-bone">4. How We Share Your Information</h2>
          <h3 className="mb-3 font-display text-base font-bold uppercase tracking-wide text-bone">Service Providers</h3>
          <ul className="space-y-2 ml-1 mb-6">
            {[['Payment Processing','Bank transfer or cryptocurrency — no card data stored'],['Shipping Partners','Courier services for order delivery'],['Email Services','Postmark for transactional emails'],['Analytics','Google Analytics (anonymized data)'],['Customer Support','Email & WhatsApp for customer service']].map(([t,d])=><li key={t} className="flex gap-3"><Dot /><span><strong>{t}:</strong> {d}</span></li>)}
          </ul>
          <h3 className="mb-3 font-display text-base font-bold uppercase tracking-wide text-bone">Legal Requirements</h3>
          <p className="mb-3">We may disclose your information if required by law, court order, or government request, or to:</p>
          <ul className="space-y-2 ml-1 mb-6">
            {['Comply with legal obligations','Protect our rights, property, or safety','Prevent fraud or illegal activities','Enforce our Terms of Service'].map(i=><li key={i} className="flex gap-3"><Dot /><span>{i}</span></li>)}
          </ul>
          <h3 className="mb-3 font-display text-base font-bold uppercase tracking-wide text-bone">Business Transfers</h3>
          <p>In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity.</p>
        </section>

        <section>
          <h2 className="mb-4 font-display text-2xl font-extrabold tracking-tight text-bone">5. Data Security</h2>
          <p className="mb-4">We implement industry-standard security measures:</p>
          <ul className="space-y-2 ml-1 mb-4">
            {[['Encryption','SSL/TLS encryption for data transmission'],['Secure Storage','Encrypted databases and secure servers'],['Access Controls','Limited access to personal information'],['Payment Security','We do not store card details'],['Regular Audits','Security assessments and vulnerability testing']].map(([t,d])=><li key={t} className="flex gap-3"><Dot /><span><strong>{t}:</strong> {d}</span></li>)}
          </ul>
          <div className="border border-signal/40 bg-signal/10 rounded-xl p-4 text-sm text-bone-muted">
            <strong>Note:</strong> No method of transmission over the internet is 100% secure. We cannot guarantee absolute security.
          </div>
        </section>

        <section>
          <h2 className="mb-4 font-display text-2xl font-extrabold tracking-tight text-bone">6. Cookies and Tracking</h2>
          <p className="mb-4">We use cookies and similar technologies for:</p>
          <ul className="space-y-2 ml-1 mb-4">
            {[['Essential Cookies','Required for login, cart, and checkout'],['Analytics Cookies','To understand how visitors use our site'],['Preference Cookies','To remember your settings'],['Marketing Cookies','To deliver relevant ads (with consent)']].map(([t,d])=><li key={t} className="flex gap-3"><Dot /><span><strong>{t}:</strong> {d}</span></li>)}
          </ul>
          <p>You can control cookies through your browser settings. Disabling cookies may affect website functionality.</p>
        </section>

        <section>
          <h2 className="mb-4 font-display text-2xl font-extrabold tracking-tight text-bone">7. Your Privacy Rights</h2>
          <h3 className="mb-3 font-display text-base font-bold uppercase tracking-wide text-bone">General Rights</h3>
          <ul className="space-y-2 ml-1 mb-6">
            {[['Access','Request a copy of your personal information'],['Correction','Update or correct inaccurate information'],['Deletion','Request deletion of your personal information'],['Portability','Receive your data in a portable format'],['Opt-Out','Unsubscribe from marketing communications'],['Object','Object to certain data processing activities']].map(([t,d])=><li key={t} className="flex gap-3"><Dot /><span><strong>{t}:</strong> {d}</span></li>)}
          </ul>

          <h3 className="mb-3 font-display text-base font-bold uppercase tracking-wide text-bone">GDPR Rights (EU Users)</h3>
          <ul className="space-y-2 ml-1 mb-6">
            {['Right to restrict processing','Right to data portability','Right to withdraw consent','Right to lodge a complaint with supervisory authority'].map(i=><li key={i} className="flex gap-3"><Dot /><span>{i}</span></li>)}
          </ul>

          <h3 className="mb-3 font-display text-base font-bold uppercase tracking-wide text-bone">CCPA Rights (California Users)</h3>
          <ul className="space-y-2 ml-1 mb-4">
            {['Right to know what personal information is collected','Right to know if personal information is sold or disclosed','Right to opt-out of sale of personal information','Right to non-discrimination for exercising your rights'].map(i=><li key={i} className="flex gap-3"><Dot /><span>{i}</span></li>)}
          </ul>
          <p>To exercise your rights, contact us on <a href="https://wa.me/13468721280" target="_blank" rel="noopener noreferrer" className="text-volt hover:underline">WhatsApp</a> or <a href="https://t.me/Zhong5cla" target="_blank" rel="noopener noreferrer" className="text-volt hover:underline">Telegram</a>.</p>
        </section>

        <section>
          <h2 className="mb-4 font-display text-2xl font-extrabold tracking-tight text-bone">8. Data Retention</h2>
          <p className="mb-4">We retain your information for as long as necessary to:</p>
          <ul className="space-y-2 ml-1 mb-4">
            {['Provide our services and fulfill orders','Comply with legal obligations (tax records, transaction history)','Resolve disputes and enforce agreements','Prevent fraud and maintain security'].map(i=><li key={i} className="flex gap-3"><Dot /><span>{i}</span></li>)}
          </ul>
          <p>Typically, account information is retained for 7 years after closure and transaction records for 10 years.</p>
        </section>

        <section>
          <h2 className="mb-4 font-display text-2xl font-extrabold tracking-tight text-bone">9. Third-Party Links</h2>
          <p>Our website may contain links to third-party websites. We are not responsible for their privacy practices. Review their policies before providing personal information.</p>
        </section>

        <section>
          <h2 className="mb-4 font-display text-2xl font-extrabold tracking-tight text-bone">10. Children&apos;s Privacy</h2>
          <p>Our services are for users aged 18 and older. We do not knowingly collect information from minors. If discovered, we will delete it immediately.</p>
        </section>

        <section>
          <h2 className="mb-4 font-display text-2xl font-extrabold tracking-tight text-bone">11. International Data Transfers</h2>
          <p>Your information may be transferred to and processed in countries other than your residence. We ensure appropriate safeguards are in place in accordance with applicable laws.</p>
        </section>

        <section>
          <h2 className="mb-4 font-display text-2xl font-extrabold tracking-tight text-bone">12. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date. Continued use constitutes acceptance.</p>
        </section>

        <section>
          <h2 className="mb-4 font-display text-2xl font-extrabold tracking-tight text-bone">13. Contact Us</h2>
          <p className="mb-5">Questions about this Privacy Policy? Contact us:</p>
          <div className="border border-line rounded-xl p-5 space-y-2 text-sm">
            <p><strong>WhatsApp:</strong> <a href="https://wa.me/13468721280" target="_blank" rel="noopener noreferrer" className="text-volt hover:underline">+1 346-872-1280</a></p>
            <p><strong>Telegram:</strong> <a href="https://t.me/Zhong5cla" target="_blank" rel="noopener noreferrer" className="text-volt hover:underline">@Zhong5cla</a></p>
            <p><strong>Response Time:</strong> We aim to respond within 48 hours</p>
          </div>
        </section>

        <section className="border border-line bg-night-800 rounded-xl p-6 text-sm">
          <h2 className="mb-3 font-display text-lg font-extrabold uppercase tracking-wide text-bone">Your Consent</h2>
          <p>By using K2LiquidStore, you consent to our Privacy Policy and agree to its terms. If you do not agree, please discontinue use of our services immediately.</p>
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
