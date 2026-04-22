import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Henrytee Loans | Trusted Personal & Business Funding',
  description: 'Fast, reliable, and professional personal and business loans from Henrytee Loans.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
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
