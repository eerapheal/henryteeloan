import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Loan Products',
  description: 'Explore our range of personal loans, salary advances, and emergency funding solutions.',
}

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
