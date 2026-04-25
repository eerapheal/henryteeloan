import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How It Works',
  description: 'Learn about our simple 5-step loan process. From digital agreement to direct bank disbursement.',
}

export default function HowItWorksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
