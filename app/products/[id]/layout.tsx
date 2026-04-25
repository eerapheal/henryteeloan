import { Metadata } from 'next'

const productData: { [key: string]: any } = {
  'personal-loan': { name: 'Personal Loan' },
  'salary-advance': { name: 'Salary Advance' },
  'emergency-loan': { name: 'Emergency Loan' },
  'term-loans': { name: 'Business Term Loans' },
  'sba-loans': { name: 'SBA Loans' },
  'line-of-credit': { name: 'Line of Credit' },
  'equipment-loans': { name: 'Equipment Loans' },
  'invoice-factoring': { name: 'Invoice Factoring' },
  'credit-card-processing': { name: 'Credit Card Processing' }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const product = productData[id]
  
  if (!product) return { title: 'Product Not Found' }
  
  return {
    title: product.name,
    description: `Get competitive rates and fast approval for ${product.name} from Henrytee Loans.`,
  }
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
