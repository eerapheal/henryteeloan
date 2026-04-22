'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Star, Quote, ShieldCheck, Zap, Landmark, UserCircle } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';

const testimonials = [
  {
    name: 'Chinedu Okeke',
    location: 'Lagos Island',
    quote: 'Henrytee Loans was a lifesaver when I needed urgent funds for my sister\'s medical bills. The 20% interest rate was clear, and I got the money the same day I applied!',
    rating: 5,
    initials: 'CO'
  },
  {
    name: 'Amina Yusuf',
    location: 'Abuja FCT',
    quote: 'I needed a salary advance to fix my car. The process was so simple, and the deduction from my next paycheck was handled automatically. No stress at all.',
    rating: 5,
    initials: 'AY'
  },
  {
    name: 'Olawale Adenuga',
    location: 'Ibadan',
    quote: 'Finding a reliable lender in Nigeria can be tough. Henrytee is different. They are professional, and they actually call you to explain everything. Very trustworthy.',
    rating: 5,
    initials: 'OA'
  },
  {
    name: 'Blessing Etim',
    location: 'Port Harcourt',
    quote: 'The digital agreement was easy to understand. I appreciated the transparency about the HR deduction policy—it keeps everyone honest. Highly recommended.',
    rating: 5,
    initials: 'BE'
  },
  {
    name: 'Emeka Nwosu',
    location: 'Enugu',
    quote: 'Fast funding is an understatement! I applied in the morning and had ₦500k in my account by afternoon. Henrytee is the best for personal loans.',
    rating: 5,
    initials: 'EN'
  },
  {
    name: 'Zainab Bello',
    location: 'Kano',
    quote: 'As a civil servant, I needed a lender who understood my pay cycle. Henrytee worked with me to set up a duration that made sense for my budget.',
    rating: 5,
    initials: 'ZB'
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
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="py-24 bg-navy-gradient text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-[#C8992C]/15 rounded-full blur-[120px] opacity-60 pointer-events-none"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeInLeft text-center lg:text-left">
              <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full text-sm font-semibold text-[#E8A838] mb-6">
                ✦ Success Stories
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">Voices of <span className="text-gradient-gold">Success</span></h1>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Thousands of Nigerians rely on Henrytee Loans for fast, reliable, and transparent personal financing. Here are some of their stories.
              </p>
            </div>
            <div className="animate-fadeInRight">
              <img 
                src="/testimonial-video-2.png" 
                alt="Happy Nigerian entrepreneur" 
                className="w-full h-auto rounded-2xl shadow-2xl animate-float border border-white/10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-[#E4E7EC] shadow-soft relative z-20 -mt-10 mx-auto max-w-5xl rounded-3xl animate-fadeInUp">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-bold text-[#0F2B46] mb-1 animate-countUp">{stat.value}</p>
                <p className="text-[10px] font-bold text-[#5A6577] uppercase tracking-widest">{stat.label}</p>
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
                className="p-8 border border-[#E4E7EC] hover:shadow-soft hover:border-[#C8992C]/30 transition-all duration-500 animate-fadeInUp group relative overflow-hidden bg-white rounded-2xl"
                style={{ animationDelay: `${(i % 3) * 0.1}s` }}
              >
                <div className="absolute top-0 right-0 p-4 text-[#F0F2F5] group-hover:text-[#0F2B46]/5 transition-colors pointer-events-none">
                  <Quote className="w-16 h-16" />
                </div>
                
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="bg-[#0F2B46]/5 w-14 h-14 flex items-center justify-center rounded-xl text-[#0F2B46] font-bold text-xl border border-[#0F2B46]/5">
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="font-bold text-[#1A2332] text-lg">{testimonial.name}</p>
                    <p className="text-[10px] font-bold text-[#C8992C] uppercase tracking-widest">{testimonial.location}</p>
                  </div>
                </div>
                
                <div className="flex gap-1 mb-6 relative z-10">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-[#C8992C] text-[#C8992C]" />
                  ))}
                </div>

                <p className="text-[#5A6577] leading-relaxed italic relative z-10 text-sm font-light">&quot;{testimonial.quote}&quot;</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why We Are Trusted */}
      <section className="py-24 bg-[#FAFBFC]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#1A2332] mb-4">Why Nigerians Trust Henrytee</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-10 bg-white rounded-3xl shadow-soft border border-[#E4E7EC] animate-fadeInUp hover:-translate-y-1 transition-transform">
              <div className="w-14 h-14 bg-[#0F2B46]/5 rounded-2xl flex items-center justify-center text-[#0F2B46] mb-6">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#1A2332]">Secured with NIN</h3>
              <p className="text-[#5A6577] text-sm leading-relaxed">We use the National Identification Number system to ensure all our borrowers and guarantors are verified and secure.</p>
            </div>
            <div className="p-10 bg-white rounded-3xl shadow-soft border border-[#E4E7EC] animate-fadeInUp hover:-translate-y-1 transition-transform" style={{ animationDelay: '0.1s' }}>
              <div className="w-14 h-14 bg-[#0F2B46]/5 rounded-2xl flex items-center justify-center text-[#0F2B46] mb-6">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#1A2332]">Speed is Our Priority</h3>
              <p className="text-[#5A6577] text-sm leading-relaxed">We understand that personal emergencies don't wait. That's why our disbursement is among the fastest in the country.</p>
            </div>
            <div className="p-10 bg-white rounded-3xl shadow-soft border border-[#E4E7EC] animate-fadeInUp hover:-translate-y-1 transition-transform" style={{ animationDelay: '0.2s' }}>
              <div className="w-14 h-14 bg-[#0F2B46]/5 rounded-2xl flex items-center justify-center text-[#0F2B46] mb-6">
                <Landmark className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#1A2332]">Local Expertise</h3>
              <p className="text-[#5A6577] text-sm leading-relaxed">Based in Lagos, we understand the local economy and the specific financial challenges faced by Nigerians.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Card className="p-12 md:p-20 bg-navy-gradient rounded-[2.5rem] text-center text-white shadow-2xl relative overflow-hidden border border-white/5">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C8992C]/10 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none"></div>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">Join the Henrytee Family</h2>
            <p className="text-slate-300 mb-12 max-w-xl mx-auto font-light leading-relaxed">
              Ready to experience fast and reliable personal financing? Apply for your loan agreement today and get funded in 24 hours.
            </p>
            <Link href="/apply">
              <Button size="lg" className="bg-[#C8992C] hover:bg-[#B8891C] text-white font-bold px-12 h-16 rounded-xl shadow-xl shadow-[#C8992C]/20 text-lg transition-all hover:scale-105 active:scale-95">
                Get Started Now
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
