import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Success Stories',
  description: 'Read and watch success stories from our satisfied customers across Nigeria.',
}

export default function TestimonialsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
