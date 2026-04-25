import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://henryteeloan.vercel.app'),
  title: {
    default: 'Henrytee Loans | Trusted Personal & Business Funding in Nigeria',
    template: '%s | Henrytee Loans'
  },
  description: 'Fast, reliable, and professional personal and business loans from Henrytee Loans. Get funded in 24 hours with flexible repayment terms.',
  generator: 'Henrytee Loans',
  keywords: ['loans nigeria', 'personal loans', 'business loans', 'salary advance', 'fast funding', 'Henrytee Loans'],
  authors: [{ name: 'Henrytee Loans' }],
  creator: 'Henrytee Loans',
  publisher: 'Henrytee Loans',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: 'https://henryteeloan.vercel.app',
    siteName: 'Henrytee Loans',
    title: 'Henrytee Loans | Trusted Personal & Business Funding in Nigeria',
    description: 'Fast, reliable, and professional personal and business loans from Henrytee Loans.',
    images: [
      {
        url: '/henrytee.png',
        width: 1200,
        height: 630,
        alt: 'Henrytee Loans Branding',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Henrytee Loans | Trusted Personal & Business Funding in Nigeria',
    description: 'Fast, reliable, and professional personal and business loans from Henrytee Loans.',
    images: ['/henrytee.png'],
  },
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
}

import { Toaster } from '@/components/ui/sonner'
import { AuthProvider } from '@/components/auth-provider'
import { SettingsProvider } from '@/components/settings-provider'
import { getSettings } from '@/lib/settings'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const settings = await getSettings();

  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col antialiased bg-background`}>
        <SettingsProvider settings={settings}>
          <AuthProvider>
            {children}
            <Toaster position="top-center" richColors />
            {process.env.NODE_ENV === 'production' && <Analytics />}
          </AuthProvider>
        </SettingsProvider>
      </body>
    </html>
  )
}
