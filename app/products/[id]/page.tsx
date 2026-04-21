'use client';

import { use } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';

const productData: { [key: string]: any } = {
  'personal-loan': {
    name: 'Personal Loan',
    icon: '👤',
    description: 'Quick and flexible personal funding without the need for business details.',
    longDescription: 'Our personal loans are designed for individuals who need quick access to capital for a variety of purposes, including debt consolidation, home improvements, or unexpected expenses. The application process is streamlined to focus on your personal information, rather than business metrics.',
    benefits: [
      'No business information or company details required',
      'Fast funding, often within 24 hours',
      'Competitive personalized interest rates',
      'Flexible repayment schedules',
      'No collateral required for most applicants',
      'Transparent terms with no hidden fees'
    ],
    requirements: [
      '600+ credit score',
      'Proof of regular income',
      'US residency/citizenship',
      'Valid identity verification',
      'Personal bank account'
    ],
    amounts: {
      min: '$1,000',
      max: '$50,000'
    },
    rates: '5.99% - 19.99% APR',
    timing: '24 hours',
    idealFor: 'Individuals looking for fast, simple funding for personal use without mixing in business complexity.'
  },
  'term-loans': {
    name: 'Business Term Loans',
    icon: '💰',
    description: 'Get the capital you need with flexible repayment terms and dedicated underwriter support.',
    longDescription: 'Business term loans are the most straightforward funding option. You receive a lump sum and repay it over a set period with fixed or floating interest rates. Choose payment schedules that work for your business—daily, weekly, monthly, or yearly.',
    benefits: [
      'Flexible payment schedules (daily, weekly, monthly, yearly)',
      'Choose fixed or floating interest rates',
      'Fast funding within 24-48 hours',
      'No negative impact on your credit score during application',
      'Dedicated underwriter support throughout the process',
      'Transparent, predictable payments',
      'No hidden fees'
    ],
    requirements: [
      '6+ months in business',
      '$20,000+ monthly deposits',
      '600+ credit score (flexible)',
      'Valid business license',
      'Tax returns and bank statements'
    ],
    amounts: {
      min: '$5,000',
      max: '$250,000'
    },
    rates: '7-15% APR',
    timing: '24-48 hours',
    idealFor: 'Businesses needing a lump sum for expansion, equipment, inventory, or operational costs.'
  },
  'sba-loans': {
    name: 'SBA Loans',
    icon: '🏦',
    description: 'Government-backed loans for established businesses with competitive rates and longer terms.',
    longDescription: 'SBA (Small Business Administration) loans are government-backed financing options designed for established businesses that meet specific criteria. These loans offer competitive rates and longer repayment terms than traditional term loans.',
    benefits: [
      'Government-backed security reduces lender risk',
      'Competitive rates (typically 6-10% APR)',
      'Longer repayment terms (up to 10 years)',
      'Higher loan amounts available',
      'Flexible use of funds',
      'Fixed payment schedules',
      'Opportunity to build business credit'
    ],
    requirements: [
      '2+ years in business',
      '$30,000+ annual revenue',
      '680+ credit score',
      'Significant owner equity/collateral',
      'Detailed business plan',
      'Personal tax returns and credit report'
    ],
    amounts: {
      min: '$50,000',
      max: '$5,000,000'
    },
    rates: '6-10% APR',
    timing: '5-7 business days',
    idealFor: 'Established businesses planning major expansion, real estate purchases, or equipment acquisition.'
  },
  'line-of-credit': {
    name: 'Line of Credit',
    icon: '📊',
    description: 'Access funds whenever you need them with a flexible, revolving credit line.',
    longDescription: 'A line of credit works like a credit card for your business. You have access to a set credit limit and draw funds as needed. You only pay interest on the funds you actually use, making it perfect for managing cash flow.',
    benefits: [
      'Draw funds as needed, anytime',
      'Pay interest only on used funds',
      'Revolving credit line that renews',
      'Quick approval process',
      'Perfect for managing seasonal cash flow',
      'Flexible repayment terms',
      'Lower interest rates than credit cards'
    ],
    requirements: [
      '6+ months in business',
      '$15,000+ monthly deposits',
      '600+ credit score',
      'Strong business cash flow',
      'Recent bank statements',
      'Business license'
    ],
    amounts: {
      min: '$10,000',
      max: '$500,000'
    },
    rates: '8-18% APR',
    timing: '2-3 business days',
    idealFor: 'Businesses with variable cash flow, seasonal operations, or unpredictable expense needs.'
  },
  'equipment-loans': {
    name: 'Equipment Loans',
    icon: '🔧',
    description: 'Finance the equipment your business needs with favorable rates and terms.',
    longDescription: 'Equipment loans are specially designed to help you purchase or upgrade business equipment. Since the equipment serves as collateral, these loans typically offer lower rates than unsecured loans.',
    benefits: [
      'Equipment serves as collateral for lower rates',
      'Lower interest rates (5-12% APR)',
      'Equipment-specific repayment terms',
      'Fast processing and funding',
      'No large down payment required',
      'Equipment financing can help build credit',
      'Tax deductions on interest payments'
    ],
    requirements: [
      '1+ year in business',
      'Equipment quote or invoice',
      '600+ credit score',
      'Sufficient business cash flow',
      'Equipment must be new or newer model',
      'Business license'
    ],
    amounts: {
      min: '$10,000',
      max: '$1,000,000'
    },
    rates: '5-12% APR',
    timing: '3-5 business days',
    idealFor: 'Businesses needing to purchase machinery, vehicles, technology, or other equipment.'
  },
  'invoice-factoring': {
    name: 'Invoice Factoring',
    icon: '📄',
    description: 'Convert your unpaid invoices into immediate working capital.',
    longDescription: 'Invoice factoring lets you sell your unpaid B2B invoices to get immediate cash. Instead of waiting 30-90 days for payment, you get funded within 24 hours. Perfect for service-based and wholesale businesses.',
    benefits: [
      'Get immediate cash for unpaid invoices',
      'No credit check required',
      'Scalable solution—factor more as you grow',
      'Flexible payment terms',
      'Perfect for B2B companies',
      'Improved cash flow for operations',
      'Outsourced collections'
    ],
    requirements: [
      'B2B invoices to creditworthy clients',
      '1+ year in business',
      'Regular invoicing',
      'Business license',
      'Recent bank statements',
      'Client credit information'
    ],
    amounts: {
      min: '$5,000',
      max: 'Unlimited'
    },
    rates: '1-4% per month',
    timing: '24 hours',
    idealFor: 'B2B service providers and wholesale businesses with steady invoicing.'
  },
  'credit-card-processing': {
    name: 'Credit Card Processing',
    icon: '💳',
    description: 'Accept payments with smart processing solutions and reduced fraud.',
    longDescription: 'Process credit and debit card payments with competitive rates and AI-powered fraud detection. Our solutions reduce chargebacks, streamline payments, and automate your back office.',
    benefits: [
      'Competitive processing fees (1.5-3.5%)',
      'AI-powered fraud detection',
      'Reduced chargebacks with smart tools',
      'Same-day settlement',
      'Back-office automation',
      'Multiple payment methods supported',
      'Real-time reporting and analytics'
    ],
    requirements: [
      'Active business account',
      'Business license',
      '600+ credit score',
      'Positive business history',
      'Compliant merchant practices'
    ],
    amounts: {
      min: 'N/A',
      max: 'Unlimited'
    },
    rates: '1.5-3.5% per transaction',
    timing: 'Immediate',
    idealFor: 'Retail, e-commerce, restaurants, and any business accepting card payments.'
  }
};

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = productData[id];

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Product Not Found</h1>
            <p className="text-lg text-muted-foreground mb-8">We couldn&apos;t find that product.</p>
            <Link href="/products">
              <Button className="bg-primary hover:bg-primary/90 text-white">Back to Products</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/products" className="text-primary hover:underline flex items-center gap-2">
            <span>Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 animate-fadeInUp">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm border border-blue-200">
              <span className="text-4xl">{product.icon}</span>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">{product.name}</h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl">{product.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              <div className="animate-fadeInLeft">
                <h2 className="text-3xl font-bold text-foreground mb-6">Overview</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">{product.longDescription}</p>
              </div>

              {/* Benefits */}
              <div className="animate-fadeInLeft" style={{ animationDelay: '0.1s' }}>
                <h2 className="text-3xl font-bold text-foreground mb-6">Key Benefits</h2>
                <div className="space-y-4">
                  {product.benefits.map((benefit: string, i: number) => (
                    <div key={i} className="flex gap-4 animate-fadeInUp" style={{ animationDelay: `${i * 0.05}s` }}>
                      <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <p className="text-muted-foreground">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div className="animate-fadeInLeft" style={{ animationDelay: '0.2s' }}>
                <h2 className="text-3xl font-bold text-foreground mb-6">Requirements</h2>
                <div className="space-y-3">
                  {product.requirements.map((req: string, i: number) => (
                    <div key={i} className="flex gap-3 animate-fadeInUp" style={{ animationDelay: `${i * 0.05}s` }}>
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-muted-foreground">{req}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6 animate-fadeInRight">
              {/* Key Stats */}
              <Card className="p-6 border border-border">
                <h3 className="text-xl font-bold text-foreground mb-6">Quick Facts</h3>
                <div className="space-y-4">
                  <div className="pb-4 border-b border-border">
                    <p className="text-sm text-muted-foreground mb-1">Min Amount</p>
                    <p className="text-2xl font-bold text-primary">{product.amounts.min}</p>
                  </div>
                  <div className="pb-4 border-b border-border">
                    <p className="text-sm text-muted-foreground mb-1">Max Amount</p>
                    <p className="text-2xl font-bold text-primary">{product.amounts.max}</p>
                  </div>
                  <div className="pb-4 border-b border-border">
                    <p className="text-sm text-muted-foreground mb-1">Interest Rates</p>
                    <p className="text-2xl font-bold text-primary">{product.rates}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Funding Time</p>
                    <p className="text-2xl font-bold text-primary">{product.timing}</p>
                  </div>
                </div>
              </Card>

              {/* CTA */}
              <Card className="p-6 border border-primary bg-gradient-to-br from-blue-50 to-white">
                <h3 className="text-lg font-bold text-foreground mb-4">Ideal For</h3>
                <p className="text-muted-foreground mb-6">{product.idealFor}</p>
                <Link href="/apply">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white animate-pulse-glow">
                    Apply Now
                  </Button>
                </Link>
              </Card>

              {/* Related Products */}
              <Card className="p-6 border border-border">
                <h3 className="text-lg font-bold text-foreground mb-4">Other Products</h3>
                <div className="space-y-2">
                  <Link href="/products/term-loans" className="block text-primary hover:underline text-sm">
                    Business Term Loans
                  </Link>
                  <Link href="/products/sba-loans" className="block text-primary hover:underline text-sm">
                    SBA Loans
                  </Link>
                  <Link href="/products/line-of-credit" className="block text-primary hover:underline text-sm">
                    Line of Credit
                  </Link>
                  <Link href="/products" className="block text-primary hover:underline text-sm font-semibold mt-4 pt-4 border-t border-border">
                    View All Products
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
