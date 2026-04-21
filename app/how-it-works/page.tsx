'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, ArrowRight, Zap, Phone, FileCheck, Landmark } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-white to-primary/10 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeInLeft text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">Fast. Transparent. <br /><span className="text-primary">Nigeria-Based.</span></h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                We've simplified the lending process for Nigerians. From application to disbursement, we focus on speed and transparency.
              </p>
            </div>
            <div className="animate-fadeInRight flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full animate-pulse"></div>
                <img 
                  src="/agreement-illustration.png" 
                  alt="Loan process illustration" 
                  className="w-full max-w-md h-auto rounded-3xl shadow-2xl relative z-10 animate-float"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step-by-Step Process */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-fadeInUp">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">The Henrytee Process</h2>
            <p className="text-muted-foreground text-lg">Your journey to financial support in 5 simple steps</p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Step 1 */}
            <div className="mb-24 animate-fadeInUp">
              <div className="flex flex-col md:flex-row gap-10">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-primary text-white rounded-3xl flex items-center justify-center font-bold text-3xl shadow-2xl shadow-primary/20 transform -rotate-6">
                    01
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Complete Your Digital Agreement</h3>
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    Fill out our comprehensive loan agreement form with your personal details, NIN, and guarantor information. The process is entirely digital and takes about 5 minutes.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-slate-600">
                      <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                      <span>Valid NIN required for verification</span>
                    </li>
                    <li className="flex items-center gap-3 text-slate-600">
                      <CheckCircle className="w-5 h-5 text-primary shrink-0" />
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
                  <div className="w-20 h-20 bg-accent text-white rounded-3xl flex items-center justify-center font-bold text-3xl shadow-2xl shadow-accent/20 transform rotate-6">
                    02
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Underwriting Review</h3>
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    Our team review your application instantly. We verify your workplace and NIN to ensure everything is in order for a smooth approval.
                  </p>
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex items-center gap-4">
                    <Zap className="w-6 h-6 text-primary" />
                    <span className="font-semibold text-foreground text-sm">Most reviews are completed within 4 hours</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="mb-24 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <div className="flex flex-col md:flex-row gap-10">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-primary text-white rounded-3xl flex items-center justify-center font-bold text-3xl shadow-2xl shadow-primary/20 transform -rotate-3">
                    03
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Official Contact</h3>
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    A Henrytee loan officer will call you to confirm your details and finalize the agreement terms. This is your chance to ask any specific questions.
                  </p>
                  <div className="flex flex-col gap-2 text-primary font-bold">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-accent" />
                      <a href="tel:+2348034783848">08034783848</a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-accent" />
                      <a href="tel:+2347025251073">07025251073</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="mb-24 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
              <div className="flex flex-col md:flex-row gap-10">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-accent text-white rounded-3xl flex items-center justify-center font-bold text-3xl shadow-2xl shadow-accent/20 transform rotate-2">
                    04
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Digital Signing</h3>
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    Once everything is confirmed, your digital signature on the application becomes binding. You'll receive a copy of the agreement for your records.
                  </p>
                  <div className="flex items-center gap-2 text-sm bg-primary/5 p-4 rounded-xl text-primary font-medium">
                    <FileCheck className="w-5 h-5" />
                    <span>Legally binding digital agreement</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              <div className="flex flex-col md:flex-row gap-10">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-primary text-white rounded-3xl flex items-center justify-center font-bold text-3xl shadow-2xl shadow-primary/20 transform -rotate-6">
                    05
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Direct Bank Disbursement</h3>
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    Funds are sent directly to your provided Nigerian bank account. No intermediaries, no delays.
                  </p>
                  <div className="flex items-center gap-3 text-emerald-600 font-bold bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                    <Landmark className="w-6 h-6" />
                    <span>Funds delivered within 24 hours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[url('/noise.png')] opacity-10"></div>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold mb-4">Why Henrytee Loans?</h2>
            <p className="text-lg text-slate-300">The most trusted personal lender for Nigerian professionals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: '24h Funding', desc: 'Money in your bank when you need it.', icon: '⚡' },
              { title: 'Fixed 20% Interest', desc: 'No hidden charges or floating rates.', icon: '💰' },
              { title: 'Secure NIN Entry', desc: 'State-of-the-art encryption.', icon: '🛡️' },
              { title: 'HR Support', desc: 'Easier repayments via salary deduction.', icon: '🤝' }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm animate-fadeInUp" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-foreground mb-4">Common Questions</h2>
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
              <div key={i} className="p-6 bg-slate-50 border border-slate-100 rounded-2xl animate-fadeInUp" style={{ animationDelay: `${i * 0.05}s` }}>
                <h3 className="text-lg font-bold text-foreground mb-3">{item.q}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#FDFDFD]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Card className="p-12 md:p-20 bg-primary text-white rounded-[2rem] text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-[100px] -ml-32 -mt-32"></div>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 relative z-10">Ready to Get Funded?</h2>
            <p className="text-lg text-slate-300 mb-12 max-w-xl mx-auto font-light">
              Submit your loan agreement today and get the support you need in less than 24 hours.
            </p>
            <Link href="/apply" className="relative z-10">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-bold px-12 h-16 rounded-2xl shadow-2xl shadow-accent/30 text-lg transition-all hover:scale-105 active:scale-95">
                Apply for Loan
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
