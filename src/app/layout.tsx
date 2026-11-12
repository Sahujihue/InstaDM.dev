import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { CurrencyProvider } from '@/context/CurrencyContext';
import { DynamicHeadManager } from '@/components/common/DynamicHeadManager';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'InstaDM – Turn Every Instagram Interaction Into a Customer | instadm.dev',
  description: 'Automate Instagram DMs, reply to comments instantly, capture leads, and convert followers into customers — all on autopilot with InstaDM.',
  keywords: [
    'Instagram DM automation',
    'Instagram comment to DM',
    'Instagram lead generation',
    'Story reply automation',
    'Meta Graph API messaging',
    'Reel comment automation',
    'AI DM bot',
    'Instagram CRM leads',
    'InstaDM',
    'instadm.dev'
  ],
  metadataBase: new URL('https://instadm.dev'),
  openGraph: {
    title: 'InstaDM – Turn Every Instagram Interaction Into a Customer',
    description: 'Automate Instagram DMs, reply to comments instantly, capture leads, and convert followers into customers — all on autopilot.',
    url: 'https://instadm.dev',
    siteName: 'InstaDM',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InstaDM – Instagram DM Automation SaaS',
    description: 'Automate Instagram DMs, reply to comments instantly, capture leads, and convert followers into customers.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} font-sans scroll-smooth`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'InstaDM',
              url: 'https://instadm.dev',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'All',
              offers: {
                '@type': 'Offer',
                price: '9.99',
                priceCurrency: 'USD',
              },
              description: 'Turn every Instagram interaction into a customer with automated DM funnels, comment triggers, and lead capture.',
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-white text-slate-900 antialiased selection:bg-purple-500 selection:text-white">
        <DynamicHeadManager />
        <AuthProvider>
          <CurrencyProvider>
            {children}
          </CurrencyProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
