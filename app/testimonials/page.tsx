'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Star, Quote, ShieldCheck, Zap, Landmark } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';

const testimonials = [
  {
    name: 'Chinedu Okeke',
    location: 'Lagos Island',
    quote: 'Henrytee Loans was a lifesaver when I needed urgent funds for my sister\'s medical bills. The 20% interest rate was clear, and I got the money the same day I applied!',
    rating: 5,
    image: '👨🏾‍💼'
  },
  {
    name: 'Amina Yusuf',
    location: 'Abuja FCT',
    quote: 'I needed a salary advance to fix my car. The process was so simple, and the deduction from my next paycheck was handled automatically. No stress at all.',
    rating: 5,
    image: '👩🏾‍💻'
  },
  {
    name: 'Olawale Adenuga',
    location: 'Ibadan',
    quote: 'Finding a reliable lender in Nigeria can be tough. Henrytee is different. They are professional, and they actually call you to explain everything. Very trustworthy.',
    rating: 5,
    image: '👨🏾‍🏫'
  },
  {
    name: 'Blessing Etim',
    location: 'Port Harcourt',
    quote: 'The digital agreement was easy to understand. I appreciated the transparency about the HR deduction policy—it keeps everyone honest. Highly recommended.',
    rating: 5,
    image: '👩🏾‍⚕️'
  },
  {
    name: 'Emeka Nwosu',
    location: 'Enugu',
    quote: 'Fast funding is an understatement! I applied in the morning and had ₦500k in my account by afternoon. Henrytee is the best for personal loans.',
    rating: 5,
    image: '👨🏾‍🔧'
  },
  {
    name: 'Zainab Bello',
    location: 'Kano',
    quote: 'As a civil servant, I needed a lender who understood my pay cycle. Henrytee worked with me to set up a duration that made sense for my budget.',
    rating: 5,
    image: '👩🏾‍⚖️'
  }
];

const stats = [
  { label: 'Loans Disbursed', value: '50,000+' },
  { label: 'Total Funding', value: '₦2B+' },
  { label: 'Approval Rate', value: '94%' },
  { label: 'Avg. Funding Time', value: '6h' }
];

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-primary text-white relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-[120px] -mr-48 -mt-48"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Voices of Success</h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Thousands of Nigerians rely on Henrytee Loans for fast, reliable, and transparent personal financing. Here are some of their stories.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-slate-100 shadow-sm relative z-20 -mt-8 mx-auto max-w-5xl rounded-3xl">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center animate-fadeInUp" style={{ animationDelay: `${i * 0.1}s` }}>
                <p className="text-3xl font-bold text-primary mb-1">{stat.value}</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <Card 
                key={i} 
                className="p-8 border border-slate-100 hover:shadow-2xl transition-all duration-500 animate-fadeInUp group relative overflow-hidden"
                style={{ animationDelay: `${(i % 3) * 0.1}s` }}
              >
                <div className="absolute top-0 right-0 p-4 text-slate-50 group-hover:text-primary/5 transition-colors">
                  <Quote className="w-16 h-16" />
                </div>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-5xl bg-slate-50 w-16 h-16 flex items-center justify-center rounded-2xl">{testimonial.image}</div>
                  <div>
                    <p className="font-bold text-foreground text-lg">{testimonial.name}</p>
                    <p className="text-xs font-bold text-primary uppercase tracking-tighter">{testimonial.location}</p>
                  </div>
                </div>
                
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>

                <p className="text-slate-600 leading-relaxed italic relative z-10">&quot;{testimonial.quote}&quot;</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why We Are Trusted */}
      <section className="py-24 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Nigerians Trust Henrytee</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100 animate-fadeInUp">
              <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-6">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Secured with NIN</h3>
              <p className="text-slate-500 text-sm leading-relaxed">We use the National Identification Number system to ensure all our borrowers and guarantors are verified and secure.</p>
            </div>
            <div className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
              <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-6">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Speed is Our Priority</h3>
              <p className="text-slate-500 text-sm leading-relaxed">We understand that personal emergencies don't wait. That's why our disbursement is the fastest in the country.</p>
            </div>
            <div className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-6">
                <Landmark className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Local Expertise</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Based in Lagos, we understand the local economy and the specific financial challenges faced by Nigerians.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Card className="p-12 bg-primary rounded-[3rem] text-center text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Join the Henrytee Family</h2>
            <p className="text-slate-300 mb-12 max-w-xl mx-auto">
              Ready to experience fast and reliable personal financing? Apply for your loan agreement today.
            </p>
            <Link href="/apply">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-bold px-12 h-16 rounded-2xl shadow-xl shadow-accent/20 text-lg transition-all hover:scale-105 active:scale-95">
                Get Started
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
