import "./globals.css";
import { Toaster } from "react-hot-toast";

// Components
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ConditionalNavbar from "@/components/layout/ConditionalNavbar";
import VisitorTracker from "@/components/tracking/VisitorTracker";
import WhatsAppButton from "@/components/common/WhatsAppButton";

// Providers
import AuthProvider from "@/components/auth/AuthProvider";
import CartProvider from "@/components/cart/CartProvider";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://k2liquidstore.com';

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'K2LiquidStore | K2 Paper, Liquid Spray, Powder, Etomidate & K-Pods',
    template: '%s | K2LiquidStore',
  },
  description: 'Buy K2 paper sheets, K2 liquid spray, cannabinoid K2 powder, research-grade etomidate, vapes and K-Pods online at K2LiquidStore.com. Premium quality and discreet worldwide shipping.',
  keywords: [
    'k2 paper sheets', 'k2 paper', 'k2 liquid spray', 'k2 spray', 'k2 powder',
    'cannabinoids k2 powder', 'k2 spice', 'k2 spice paper',
    'etomidate', 'etomidate powder', 'etomidate for sale', 'buy etomidate',
    'etomidate vape', 'k-pods', 'etomidate k-pods', 'vape pods',
    'buy k2 online', 'k2 for sale', 'k2liquidstore',
  ],
  other: { 'theme-color': '#0c0a2a' },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'K2LiquidStore',
    title: 'K2LiquidStore | K2 Paper, Liquid Spray, Powder, Etomidate & K-Pods',
    description: 'Premium K2 paper sheets, K2 liquid spray, K2 powder, research-grade etomidate and K-Pods. Worldwide discreet shipping.',
    images: [
      {
        url: `${BASE_URL}/images/logo.png`,
        width: 1200,
        height: 630,
        alt: 'K2LiquidStore — K2 Paper, Spray, Powder, Etomidate & K-Pods',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'K2LiquidStore | K2 Paper, Liquid Spray, Powder, Etomidate & K-Pods',
    description: 'Premium K2 paper sheets, K2 liquid spray, K2 powder, research-grade etomidate and K-Pods. Worldwide discreet shipping.',
    images: [`${BASE_URL}/images/logo.png`],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-icon', type: 'image/png', sizes: '180x180' },
    ],
    shortcut: '/favicon.svg',
  },
  verification: {
    // google: 'your-google-site-verification-code',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans min-h-screen flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-volt focus:text-volt-ink focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase"
        >
          Skip to main content
        </a>

        <AuthProvider>
          <CartProvider>
            <VisitorTracker />
            <Toaster
              position="bottom-center"
              toastOptions={{
                style: { background: '#161244', color: '#f2f2ee', border: '1px solid #332c78', borderRadius: 0, fontSize: 13 },
                success: { iconTheme: { primary: '#d8ff3c', secondary: '#1a2200' } },
                error: { iconTheme: { primary: '#ff6a2b', secondary: '#07061c' } },
              }}
            />
            <WhatsAppButton />
            <ConditionalNavbar>
              <Navbar />
            </ConditionalNavbar>
            <main id="main-content" className="flex-grow">{children}</main>
            <ConditionalNavbar>
              <Footer />
            </ConditionalNavbar>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
