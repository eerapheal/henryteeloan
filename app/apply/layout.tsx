import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Apply for a Loan',
  description: 'Submit your loan application online. Fast approval and disbursement within 24 hours.',
}

export default function ApplyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
