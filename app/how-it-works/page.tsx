'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, ArrowRight, Zap, Phone, FileCheck, Landmark, Shield, Banknote, ShieldCheck, Clock } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { useSettings } from '@/components/settings-provider';

export default function HowItWorksPage() {
  const settings = useSettings();
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="py-24 bg-navy-gradient relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-[#C8992C]/15 rounded-full blur-[120px] opacity-60 pointer-events-none"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeInLeft text-center lg:text-left">
              <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full text-sm font-semibold text-[#E8A838] mb-6">
                ✦ Simple & Transparent Process
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">Fast. Transparent. <br /><span className="text-gradient-gold">Nigeria-Based.</span></h1>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                We've simplified the lending process for Nigerians. From application to disbursement, we focus on speed, clarity, and trust.
              </p>
            </div>
            <div className="animate-fadeInRight flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-4 bg-[#C8992C]/10 blur-3xl rounded-full animate-pulse"></div>
                <img 
                  src="/how-it-works-process.jpg" 
                  alt="Loan process in action" 
                  className="w-full max-w-md h-auto rounded-3xl shadow-2xl relative z-10 animate-float border border-white/10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step-by-Step Process */}
      <section className="py-24 bg-white relative z-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-fadeInUp">
            <h2 className="text-3xl md:text-5xl font-bold text-[#1A2332] mb-4">The Henrytee Process</h2>
            <p className="text-[#5A6577] text-lg">Your journey to financial support in 5 simple steps</p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Step 1 */}
            <div className="mb-24 animate-fadeInUp">
              <div className="flex flex-col md:flex-row gap-10">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-[#0F2B46] text-white rounded-3xl flex items-center justify-center font-bold text-3xl shadow-xl shadow-[#0F2B46]/20 transform -rotate-6">
                    01
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#1A2332] mb-4">Complete Your Digital Agreement</h3>
                  <p className="text-lg text-[#5A6577] mb-6 leading-relaxed">
                    Fill out our comprehensive loan agreement form with your personal details, NIN, and guarantor information. The process is entirely digital and takes about 5 minutes.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-[#5A6577]">
                      <CheckCircle className="w-5 h-5 text-[#C8992C] shrink-0" />
                      <span>Valid NIN required for verification</span>
                    </li>
                    <li className="flex items-center gap-3 text-[#5A6577]">
                      <CheckCircle className="w-5 h-5 text-[#C8992C] shrink-0" />
                      <span>Guarantor details must be provided</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="mb-24 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
              <div className="flex flex-col md:flex-row gap-10">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-[#C8992C] text-white rounded-3xl flex items-center justify-center font-bold text-3xl shadow-xl shadow-[#C8992C]/20 transform rotate-6">
                    02
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#1A2332] mb-4">Underwriting Review</h3>
                  <p className="text-lg text-[#5A6577] mb-6 leading-relaxed">
                    Our team reviews your application instantly. We verify your workplace and NIN to ensure everything is in order for a smooth approval.
                  </p>
                  <div className="bg-[#FAFBFC] p-6 rounded-2xl border border-[#E4E7EC] flex items-center gap-4">
                    <Zap className="w-6 h-6 text-[#0F2B46]" />
                    <span className="font-semibold text-[#1A2332] text-sm">Most reviews are completed within 4 hours</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="mb-24 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <div className="flex flex-col md:flex-row gap-10">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-[#0F2B46] text-white rounded-3xl flex items-center justify-center font-bold text-3xl shadow-xl shadow-[#0F2B46]/20 transform -rotate-3">
                    03
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#1A2332] mb-4">Official Contact</h3>
                  <p className="text-lg text-[#5A6577] mb-6 leading-relaxed">
                    A Henrytee loan officer will call you to confirm your details and finalize the agreement terms. This is your chance to ask any specific questions.
                  </p>
                  <div className="flex flex-col gap-3">
                    <a href={`tel:${settings.supportPhone1.replace(/\s+/g, '')}`} className="flex items-center gap-3 text-[#0F2B46] font-bold hover:text-[#C8992C] transition-colors bg-[#FAFBFC] p-4 rounded-xl border border-[#E4E7EC] w-fit">
                      <Phone className="w-5 h-5 text-[#C8992C]" />
                      {settings.supportPhone1}
                    </a>
                    <a href={`tel:${settings.supportPhone2.replace(/\s+/g, '')}`} className="flex items-center gap-3 text-[#0F2B46] font-bold hover:text-[#C8992C] transition-colors bg-[#FAFBFC] p-4 rounded-xl border border-[#E4E7EC] w-fit">
                      <Phone className="w-5 h-5 text-[#C8992C]" />
                      {settings.supportPhone2}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="mb-24 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
              <div className="flex flex-col md:flex-row gap-10">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-[#C8992C] text-white rounded-3xl flex items-center justify-center font-bold text-3xl shadow-xl shadow-[#C8992C]/20 transform rotate-2">
                    04
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#1A2332] mb-4">Digital Signing</h3>
                  <p className="text-lg text-[#5A6577] mb-6 leading-relaxed">
                    Once everything is confirmed, your digital signature on the application becomes binding. You'll receive a copy of the agreement for your records.
                  </p>
                  <div className="flex items-center gap-2 text-sm bg-[#0F2B46]/5 p-4 rounded-xl text-[#0F2B46] font-bold border border-[#0F2B46]/10">
                    <FileCheck className="w-5 h-5 text-[#C8992C]" />
                    <span>Legally binding digital agreement</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              <div className="flex flex-col md:flex-row gap-10">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-[#0F2B46] text-white rounded-3xl flex items-center justify-center font-bold text-3xl shadow-xl shadow-[#0F2B46]/20 transform -rotate-6">
                    05
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#1A2332] mb-4">Direct Bank Disbursement</h3>
                  <p className="text-lg text-[#5A6577] mb-6 leading-relaxed">
                    Funds are sent directly to your provided Nigerian bank account. No intermediaries, no delays.
                  </p>
                  <div className="flex items-center gap-3 text-[#1A2332] font-bold bg-[#FAFBFC] p-4 rounded-xl border border-[#E4E7EC]">
                    <Landmark className="w-6 h-6 text-[#C8992C]" />
                    <span>Funds delivered within 24 hours of approval</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-navy-gradient text-white relative overflow-hidden">
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
          <div className="w-full max-w-4xl h-full bg-[#C8992C]/10 blur-[120px] rounded-full"></div>
        </div>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold mb-4 text-white">Why Henrytee Loans?</h2>
            <p className="text-lg text-slate-300 font-light">The most trusted personal lender for Nigerian professionals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: '24h Funding', desc: 'Money in your bank when you need it.', icon: <Zap className="w-8 h-8" /> },
              { title: 'Fixed 20% Interest', desc: 'No hidden charges or floating rates.', icon: <Banknote className="w-8 h-8" /> },
              { title: 'Secure NIN Entry', desc: 'State-of-the-art encryption.', icon: <ShieldCheck className="w-8 h-8" /> },
              { title: 'HR Support', desc: 'Easier repayments via salary deduction.', icon: <Landmark className="w-8 h-8" /> }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm animate-fadeInUp hover:bg-white/10 transition-all duration-300" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="text-[#C8992C] mb-6">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-[#1A2332] mb-4">Common Questions</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'What is the required documentation?',
                a: 'You need your 11-digit NIN, a valid phone number, details of your workplace, and a valid guarantor.'
              },
              {
                q: 'How long does the review take?',
                a: 'Our underwriting team typically reviews applications within 4 to 24 hours.'
              },
              {
                q: 'How does the salary deduction work?',
                a: 'In case of a default, we coordinate with your workplace HR department to deduct the due amount directly from your salary as per the signed agreement.'
              },
              {
                q: 'Is my information secure?',
                a: 'Yes, Henrytee Loans uses industrial-grade SSL encryption to protect your personal and financial data.'
              }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-[#FAFBFC] border border-[#E4E7EC] rounded-2xl animate-fadeInUp group hover:border-[#C8992C]/30 transition-all" style={{ animationDelay: `${i * 0.05}s` }}>
                <h3 className="text-lg font-bold text-[#1A2332] mb-3 group-hover:text-[#0F2B46] transition-colors">{item.q}</h3>
                <p className="text-[#5A6577] leading-relaxed text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Card className="p-12 md:p-20 bg-navy-gradient text-white rounded-[2.5rem] text-center relative overflow-hidden shadow-2xl border border-white/5">
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#C8992C]/10 rounded-full blur-[100px] -ml-32 -mt-32 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#0F2B46]/50 rounded-full blur-[100px] -mr-32 -mb-32 pointer-events-none"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">Ready to Get Funded?</h2>
              <p className="text-lg text-slate-300 mb-12 max-w-xl mx-auto font-light leading-relaxed">
                Submit your loan agreement today and get the support you need in less than 24 hours. No hidden fees, no stress.
              </p>
              <Link href="/apply">
                <Button size="lg" className="bg-[#C8992C] hover:bg-[#B8891C] text-white font-bold px-12 h-16 rounded-xl shadow-xl shadow-[#C8992C]/20 text-lg transition-all hover:scale-105 active:scale-95">
                  Apply for Loan
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
