'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, CheckCircle, ShieldCheck, Zap, Clock, User, Briefcase, AlertTriangle, Building2, Phone } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { useSettings } from '@/components/settings-provider';

const products = [
  {
    id: 'personal-loan',
    name: 'Personal Loan',
    icon: <User className="w-7 h-7" />,
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
    icon: <Briefcase className="w-7 h-7" />,
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
    icon: <AlertTriangle className="w-7 h-7" />,
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
  const settings = useSettings();
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="py-24 bg-navy-gradient relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-[#C8992C]/15 rounded-full blur-[120px] opacity-60 pointer-events-none"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto animate-fadeInUp">
            <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full text-sm font-semibold text-[#E8A838] mb-6">
              ✦ Fast & Reliable Funding
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Our Loan <span className="text-gradient-gold">Products</span></h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              Tailored personal financing solutions for Nigerians. Whether it's a planned project or an unexpected emergency, Henrytee Loans has your back.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values / Features bar */}
      <section className="py-8 border-b border-[#E4E7EC] bg-white relative z-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4 p-4 rounded-2xl animate-fadeInUp">
              <div className="w-12 h-12 bg-[#0F2B46]/5 rounded-xl flex items-center justify-center text-[#0F2B46]">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-[#1A2332]">Instant Funding</h4>
                <p className="text-xs text-[#5A6577]">Disbursement within 24 hours</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-2xl animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
              <div className="w-12 h-12 bg-[#0F2B46]/5 rounded-xl flex items-center justify-center text-[#0F2B46]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-[#1A2332]">Secure & Private</h4>
                <p className="text-xs text-[#5A6577]">Your NIN is protected with us</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-2xl animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <div className="w-12 h-12 bg-[#0F2B46]/5 rounded-xl flex items-center justify-center text-[#0F2B46]">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-[#1A2332]">Flexible Duration</h4>
                <p className="text-xs text-[#5A6577]">Repayment periods that suit you</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-[#FAFBFC]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, i) => (
              <Card key={product.id} className="p-8 border border-[#E4E7EC] hover:shadow-soft hover:border-[#C8992C]/30 transition-all duration-500 h-full animate-fadeInUp flex flex-col group bg-white rounded-2xl" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-14 h-14 bg-[#0F2B46]/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#0F2B46]/10 transition-all duration-300 text-[#0F2B46]">
                  {product.icon}
                </div>
                <h3 className="text-2xl font-bold text-[#1A2332] mb-4">{product.name}</h3>
                <p className="text-[#5A6577] mb-6 text-sm leading-relaxed">{product.shortDesc}</p>
                
                <div className="space-y-3 mb-8 flex-grow">
                  {product.benefits.slice(0, 3).map((benefit, j) => (
                    <div key={j} className="flex items-center gap-3 text-sm text-[#5A6577]">
                      <CheckCircle className="w-4 h-4 text-[#C8992C] shrink-0" />
                      {benefit}
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-[#E4E7EC] space-y-3 mb-8">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#5A6577]">Monthly Interest:</span>
                    <span className="font-bold text-[#0F2B46]">{product.rates}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#5A6577]">Limit Up To:</span>
                    <span className="font-bold text-[#1A2332]">{product.maxAmount}</span>
                  </div>
                </div>

                <Link href="/apply" className="w-full">
                  <Button className="w-full bg-[#0F2B46] hover:bg-[#0A1E33] text-white font-bold h-12 rounded-xl group-hover:shadow-lg transition-all shadow-lg shadow-[#0F2B46]/10">
                    Apply for this Loan
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden bg-navy-gradient text-white border-t border-[#E4E7EC]">
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
          <div className="w-full max-w-4xl h-full bg-[#C8992C]/8 blur-[120px] rounded-full"></div>
        </div>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto animate-fadeInUp">
            <h2 className="text-4xl font-bold mb-6">Your Financial Partner in Nigeria</h2>
            <p className="text-lg text-slate-300 mb-8 font-light leading-relaxed">
              We make borrowing simple, transparent, and fast. Join thousands of Nigerians who trust Henrytee Loans for their personal financing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/apply">
                <Button size="lg" className="bg-[#C8992C] hover:bg-[#B8891C] text-white font-bold px-10 h-14 rounded-xl shadow-lg shadow-[#C8992C]/20 transition-all hover:scale-105 duration-200">Get Funded Now</Button>
              </Link>
              <div className="flex flex-col gap-2">
                <a href={`tel:${settings.supportPhone1.replace(/\s+/g, '')}`}>
                  <Button size="lg" variant="outline" className="w-full border-white/20 text-white bg-white/5 hover:bg-white/10 font-medium backdrop-blur-sm transition-all hover:border-[#C8992C]/40 rounded-xl px-8 h-14">
                    <Phone className="mr-2 w-4 h-4 text-[#C8992C]" />
                    {settings.supportPhone1}
                  </Button>
                </a>
                <a href={`tel:${settings.supportPhone2.replace(/\s+/g, '')}`}>
                  <Button size="lg" variant="outline" className="w-full border-white/20 text-white bg-white/5 hover:bg-white/10 font-medium backdrop-blur-sm transition-all hover:border-[#C8992C]/40 rounded-xl px-8 h-14">
                    <Phone className="mr-2 w-4 h-4 text-[#C8992C]" />
                    {settings.supportPhone2}
                  </Button>
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
