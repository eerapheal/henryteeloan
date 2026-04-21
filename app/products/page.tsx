'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, CheckCircle, ShieldCheck, Zap, Clock } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';

const products = [
  {
    id: 'personal-loan',
    name: 'Personal Loan',
    icon: '👤',
    shortDesc: 'Quick and flexible funding for your personal needs',
    fullDesc: 'Get the capital you need for personal expenses, medical bills, or home improvements with simple terms and fast approval within 24 hours.',
    benefits: [
      'No collateral required',
      'Fast approval (within 24 hours)',
      'Competitive monthly interest rates',
      'Flexible repayment terms',
      'NIN-based application'
    ],
    minAmount: '₦50,000',
    maxAmount: '₦5,000,000',
    rates: '20% Monthly'
  },
  {
    id: 'salary-advance',
    name: 'Salary Advance',
    icon: '💼',
    shortDesc: 'Get cash before your next payday',
    fullDesc: 'Tide over until your next salary with our quick advance option. Automated deduction from your next paycheck makes repayment effortless.',
    benefits: [
      'Immediate disbursement',
      'Automated repayment from salary',
      'Low documentation',
      'Higher limits for returning customers',
      'Perfect for urgent bills'
    ],
    minAmount: '₦20,000',
    maxAmount: '₦500,000',
    rates: '15% - 20% Monthly'
  },
  {
    id: 'emergency-loan',
    name: 'Emergency Loan',
    icon: '🚨',
    shortDesc: 'Urgent funding for life\'s unexpected moments',
    fullDesc: 'Life happens. Whether it\'s a medical emergency or an urgent repair, we provide lightning-fast funding to get you through the tough times.',
    benefits: [
      'Priority processing',
      '24/7 application review',
      'Direct-to-bank disbursement',
      'Simple eligibility criteria',
      'Supportive repayment plans'
    ],
    minAmount: '₦10,000',
    maxAmount: '₦2,000,000',
    rates: '20% Monthly'
  }
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-white to-primary/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto animate-fadeInUp">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">Our Loan Products</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Tailored personal financing solutions for Nigerians. Whether it's a planned project or an unexpected emergency, Henrytee Loans has your back.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values / Features */}
      <section className="py-12 border-y border-slate-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 animate-fadeInUp">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-foreground">Instant Funding</h4>
                <p className="text-xs text-muted-foreground">Disbursement within 24 hours</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-foreground">Secure & Private</h4>
                <p className="text-xs text-muted-foreground">Your NIN is protected with us</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-foreground">Flexible Duration</h4>
                <p className="text-xs text-muted-foreground">Repayment periods that suit you</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, i) => (
              <Card key={product.id} className="p-8 border border-slate-100 hover:shadow-2xl transition-all duration-500 h-full animate-fadeInUp flex flex-col group" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">{product.icon}</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{product.name}</h3>
                <p className="text-muted-foreground mb-6 text-sm leading-relaxed">{product.shortDesc}</p>
                
                <div className="space-y-3 mb-8 flex-grow">
                  {product.benefits.slice(0, 3).map((benefit, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                      {benefit}
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-slate-50 space-y-2 mb-8">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Interest Rate:</span>
                    <span className="font-bold text-primary">{product.rates}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Limit Up To:</span>
                    <span className="font-bold text-foreground">{product.maxAmount}</span>
                  </div>
                </div>

                <Link href="/apply" className="w-full">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 rounded-xl group-hover:shadow-lg transition-all">
                    Apply for this Loan
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden bg-primary text-white">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 pointer-events-none"></div>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto animate-fadeInUp">
            <h2 className="text-4xl font-bold mb-6">Your Financial Partner in Nigeria</h2>
            <p className="text-lg text-slate-300 mb-8 font-light leading-relaxed">
              We make borrowing simple, transparent, and fast. Join thousands of Nigerians who trust Henrytee Loans for their personal financing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/apply">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-bold px-10 h-14 rounded-2xl shadow-xl shadow-accent/20 transition-all hover:scale-105">Get Funded Now</Button>
              </Link>
              <div className="flex flex-col gap-2">
                <a href="tel:+2348034783848" className="inline-block">
                  <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10 text-white px-10 h-14 rounded-2xl w-full">08034783848</Button>
                </a>
                <a href="tel:+2347025251073" className="inline-block">
                  <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10 text-white px-10 h-14 rounded-2xl w-full">07025251073</Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
