'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, ArrowRight, Star, Phone, User, Building2, Zap, Shield, Clock, Banknote } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { useSettings } from '@/components/settings-provider';

export default function Home() {
  const settings = useSettings();
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="py-24 bg-navy-gradient relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-[#C8992C]/15 rounded-full blur-[120px] opacity-60 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-[#1A3A5C]/40 rounded-full blur-[100px] opacity-40 pointer-events-none"></div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeInLeft">
              <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full text-sm font-semibold text-[#E8A838] mb-6">
                ✦ Trusted by Thousands of Clients
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
                Personal Loans <span className="text-gradient-gold">Made Simple</span>
              </h1>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-lg">
                Get funded fast with flexible terms, 24-hour approval, and dedicated support from underwriters who understand your needs in Nigeria.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/apply">
                  <Button size="lg" className="bg-[#C8992C] hover:bg-[#B8891C] text-white animate-pulse-glow shadow-glow rounded-xl px-8 h-14 text-base font-bold">Get Started Today</Button>
                </Link>
                <Link href="/how-it-works">
                  <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:text-white font-medium rounded-xl h-14 px-8 bg-transparent backdrop-blur-sm">
                    Learn More <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="animate-fadeInRight">
              <img 
                src="/hero-nigeria.png" 
                alt="Professional Nigerian borrower" 
                className="w-full h-auto rounded-2xl shadow-2xl animate-float border border-white/10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Metrics */}
      <section className="py-12 bg-white border-b border-[#E4E7EC] relative z-20 -mt-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="animate-fadeInUp bg-white p-8 rounded-2xl shadow-soft border border-[#E4E7EC] transform transition-transform hover:-translate-y-1">
              <div className="text-4xl font-bold text-[#0F2B46] mb-2 animate-countUp">₦1B+</div>
              <p className="text-[#5A6577] font-medium">Disbursed across Nigeria</p>
            </div>
            <div className="animate-fadeInUp bg-white p-8 rounded-2xl shadow-soft border border-[#E4E7EC] transform transition-transform hover:-translate-y-1" style={{ animationDelay: '0.1s' }}>
              <div className="text-4xl font-bold text-[#0F2B46] mb-2 animate-countUp">A+</div>
              <p className="text-[#5A6577] font-medium">Certified Lender</p>
            </div>
            <div className="animate-fadeInUp bg-white p-8 rounded-2xl shadow-soft border border-[#E4E7EC] transform transition-transform hover:-translate-y-1" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl font-bold text-[#0F2B46] mb-2 animate-countUp">24h</div>
              <p className="text-[#5A6577] font-medium">Average Funding Time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-[#FAFBFC]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6 animate-fadeInLeft">
              <h2 className="text-3xl font-bold text-[#1A2332]">Why Choose Us</h2>
              <div className="space-y-5">
                <div className="flex gap-4 animate-fadeInUp" style={{ animationDelay: '0s' }}>
                  <div className="w-10 h-10 bg-[#0F2B46]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-[#0F2B46]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1A2332] mb-1">Low NIN Impact</h3>
                    <p className="text-[#5A6577] text-sm">Applying is fast and secure with your NIN</p>
                  </div>
                </div>
                <div className="flex gap-4 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                  <div className="w-10 h-10 bg-[#0F2B46]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5 text-[#0F2B46]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1A2332] mb-1">Direct HR Support</h3>
                    <p className="text-[#5A6577] text-sm">Automated salary deduction for easier repayments</p>
                  </div>
                </div>
                <div className="flex gap-4 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                  <div className="w-10 h-10 bg-[#0F2B46]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Banknote className="w-5 h-5 text-[#0F2B46]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1A2332] mb-1">Monthly Interest Payments</h3>
                    <p className="text-[#5A6577] text-sm">Simple 20% monthly interest rate</p>
                  </div>
                </div>
                <div className="flex gap-4 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                  <div className="w-10 h-10 bg-[#0F2B46]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-[#0F2B46]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1A2332] mb-1">Fast & Secure</h3>
                    <p className="text-[#5A6577] text-sm">Get funded in as little as 24 hours</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-10 border border-[#E4E7EC] shadow-soft animate-fadeInRight transform transition-all duration-500 hover:shadow-glow">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-[#1A2332]">Apply in 3 Easy Steps</h3>
                <div className="space-y-8">
                  <div className="flex gap-5 animate-fadeInUp" style={{ animationDelay: '0s' }}>
                    <div className="w-12 h-12 bg-[#0F2B46] rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">1</div>
                    <div>
                      <h4 className="font-semibold text-[#1A2332] text-lg">Provide Your Information</h4>
                      <p className="text-sm text-[#5A6577] mt-1">Share basic personal and employment details</p>
                    </div>
                  </div>
                  <div className="flex gap-5 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                    <div className="w-12 h-12 bg-[#C8992C] rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">2</div>
                    <div>
                      <h4 className="font-semibold text-[#1A2332] text-lg">Submit Quick Application</h4>
                      <p className="text-sm text-[#5A6577] mt-1">Takes just 5 minutes with low NIN impact</p>
                    </div>
                  </div>
                  <div className="flex gap-5 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                    <div className="w-12 h-12 bg-[#0F2B46] rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">3</div>
                    <div>
                      <h4 className="font-semibold text-[#1A2332] text-lg">Get Funded</h4>
                      <p className="text-sm text-[#5A6577] mt-1">Receive funds within 24 hours of approval</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Loan Products */}
      <section id="products" className="py-20 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-[#1A2332] mb-4">Flexible Funding Solutions</h2>
            <p className="text-lg text-[#5A6577] max-w-2xl mx-auto">Choose the loan type that best fits your needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Personal Loan */}
            <Card className="p-8 border border-[#E4E7EC] hover:shadow-soft hover:border-[#C8992C]/30 transition-all duration-300 transform hover:-translate-y-2 animate-fadeInUp group bg-white rounded-2xl" style={{ animationDelay: '0s' }}>
              <div className="w-14 h-14 bg-[#0F2B46]/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#0F2B46]/10 transition-all duration-300">
                <User className="w-7 h-7 text-[#0F2B46]" />
              </div>
              <h3 className="text-2xl font-bold text-[#1A2332] mb-4">Personal Loans</h3>
              <p className="text-[#5A6577] mb-6 leading-relaxed text-sm">Quick and simple personal funding for any need. No business details required, just fast approval and simple terms for all Nigerians.</p>
              <Link href="/apply">
                <Button className="w-full bg-[#0F2B46] hover:bg-[#0A1E33] text-white font-bold h-12 rounded-xl transition-all shadow-lg shadow-[#0F2B46]/10">Apply Now</Button>
              </Link>
            </Card>

            {/* Business Loan */}
            <Card className="p-8 border border-[#E4E7EC] hover:shadow-soft hover:border-[#C8992C]/30 transition-all duration-300 transform hover:-translate-y-2 animate-fadeInUp group bg-white rounded-2xl" style={{ animationDelay: '0.1s' }}>
              <div className="w-14 h-14 bg-[#0F2B46]/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#0F2B46]/10 transition-all duration-300">
                <Building2 className="w-7 h-7 text-[#0F2B46]" />
              </div>
              <h3 className="text-2xl font-bold text-[#1A2332] mb-4">Business Loans</h3>
              <p className="text-[#5A6577] mb-6 leading-relaxed text-sm">Scale your business with working capital. Fast approval for equipment and expansion.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-sm text-[#1A2332]"><CheckCircle className="w-4 h-4 text-[#C8992C] mr-3" /> Up to ₦50M</li>
                <li className="flex items-center text-sm text-[#1A2332]"><CheckCircle className="w-4 h-4 text-[#C8992C] mr-3" /> 24-36 months</li>
                <li className="flex items-center text-sm text-[#1A2332]"><CheckCircle className="w-4 h-4 text-[#C8992C] mr-3" /> Minimum 1 year in business</li>
              </ul>
              <Link href="/apply?type=business">
                <Button className="w-full bg-[#FAFBFC] hover:bg-[#0F2B46] hover:text-white text-[#0F2B46] border border-[#0F2B46]/20 transition-all duration-300 rounded-xl h-12 font-bold">Apply Now</Button>
              </Link>
            </Card>
            
            {/* Salary Advance */}
            <Card className="p-8 border border-[#E4E7EC] hover:shadow-soft hover:border-[#C8992C]/30 transition-all duration-300 transform hover:-translate-y-2 animate-fadeInUp group bg-white rounded-2xl" style={{ animationDelay: '0.2s' }}>
              <div className="w-14 h-14 bg-[#0F2B46]/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#0F2B46]/10 transition-all duration-300">
                <Zap className="w-7 h-7 text-[#0F2B46]" />
              </div>
              <h3 className="text-2xl font-bold text-[#1A2332] mb-4">Salary Advance</h3>
              <p className="text-[#5A6577] mb-6 leading-relaxed text-sm">Get cash before your next payday. Automated deduction from your next paycheck makes repayment effortless and stress-free.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-sm text-[#1A2332]"><CheckCircle className="w-4 h-4 text-[#C8992C] mr-3" /> Up to ₦1M</li>
                <li className="flex items-center text-sm text-[#1A2332]"><CheckCircle className="w-4 h-4 text-[#C8992C] mr-3" /> 1-3 months</li>
                <li className="flex items-center text-sm text-[#1A2332]"><CheckCircle className="w-4 h-4 text-[#C8992C] mr-3" /> Must be employed</li>
              </ul>
              <Link href="/apply?type=advance">
                <Button className="w-full bg-[#FAFBFC] hover:bg-[#0F2B46] hover:text-white text-[#0F2B46] border border-[#0F2B46]/20 transition-all duration-300 rounded-xl h-12 font-bold">Get Advance</Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-[#FAFBFC]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-[#1A2332] mb-4">What Our Customers Say</h2>
            <p className="text-lg text-[#5A6577]">Join thousands of satisfied business owners we&apos;ve helped succeed</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Chinedu Okeke",
                text: "I was blown away by the speed of their service. As a small business owner in Lagos, getting funds quickly is critical, and Henrytee Loans delivered.",
                rating: 5
              },
              {
                name: "Fatima Abubakar",
                text: "Have done multiple loans with them. The team goes all out to make it work. Very professional, competent and concerned with maximizing your experience.",
                rating: 5
              },
              {
                name: "Oluwaseun Adebayo",
                text: "Their customer service took great care of our funding needs. The whole team was professional, responsive and understanding. Highly recommend their services.",
                rating: 5
              },
              {
                name: "Emeka Nwachukwu",
                text: "They helped secure the exact funding my company needed to scale our operations. Couldn't be more impressed with their efficiency and professionalism throughout.",
                rating: 5
              }
            ].map((testimonial, i) => (
              <Card key={i} className="p-6 border border-[#E4E7EC] bg-white rounded-2xl animate-fadeInUp hover:shadow-soft transition-all duration-300" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-[#C8992C] text-[#C8992C]" />
                  ))}
                </div>
                <p className="text-[#5A6577] mb-4 text-sm leading-relaxed">{testimonial.text}</p>
                <p className="font-semibold text-[#1A2332]">{testimonial.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl font-bold text-[#1A2332] mb-4">Video Success Stories</h2>
            <Link href="/testimonials" className="text-[#0F2B46] hover:text-[#C8992C] font-semibold flex items-center justify-center gap-2 group">
              View all success stories <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: 'Growing with Henrytee Loans', owner: 'Chinedu Okeke', image: '/testimonial-video-1.png' },
              { title: 'The Fast Funding Path', owner: 'Aisha Bello', image: '/testimonial-video-2.png' }
            ].map((video, i) => (
              <Link key={i} href="/testimonials">
                <div className="group relative aspect-video rounded-2xl overflow-hidden shadow-lg border border-[#E4E7EC] hover:shadow-2xl transition-all duration-500">
                  <img src={video.image} alt={video.owner} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-[#0A1E33]/30 group-hover:bg-[#0A1E33]/10 transition-colors"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 bg-[#C8992C] text-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <div className="ml-1 text-lg">▶</div>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <p className="text-white font-bold">{video.title}</p>
                    <p className="text-white/80 text-xs">{video.owner}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Minimum Requirements */}
      <section className="py-20 bg-[#FAFBFC]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-[#1A2332] mb-8 animate-fadeInUp">Minimum Requirements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4 animate-fadeInLeft">
                <div className="flex gap-3 animate-fadeInUp bg-white p-4 rounded-xl border border-[#E4E7EC]" style={{ animationDelay: '0s' }}>
                  <CheckCircle className="w-5 h-5 text-[#C8992C] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#1A2332]">Valid NIN</p>
                    <p className="text-sm text-[#5A6577]">National Identification Number required</p>
                  </div>
                </div>
                <div className="flex gap-3 animate-fadeInUp bg-white p-4 rounded-xl border border-[#E4E7EC]" style={{ animationDelay: '0.1s' }}>
                  <CheckCircle className="w-5 h-5 text-[#C8992C] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#1A2332]">Proof of Employment</p>
                    <p className="text-sm text-[#5A6577]">Consistent monthly salary</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4 animate-fadeInRight">
                <div className="flex gap-3 animate-fadeInUp bg-white p-4 rounded-xl border border-[#E4E7EC]" style={{ animationDelay: '0s' }}>
                  <CheckCircle className="w-5 h-5 text-[#C8992C] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#1A2332]">Nigeria-Based</p>
                    <p className="text-sm text-[#5A6577]">Must be a resident of Nigeria</p>
                  </div>
                </div>
                <div className="flex gap-3 animate-fadeInUp bg-white p-4 rounded-xl border border-[#E4E7EC]" style={{ animationDelay: '0.1s' }}>
                  <CheckCircle className="w-5 h-5 text-[#C8992C] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#1A2332]">Guarantor</p>
                    <p className="text-sm text-[#5A6577]">One valid guarantor required</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden border-t border-[#E4E7EC] bg-navy-gradient text-white">
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
          <div className="w-full max-w-4xl h-full bg-[#C8992C]/8 blur-[120px] rounded-full"></div>
        </div>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto animate-fadeInUp">
            <h2 className="text-4xl font-bold mb-6 text-white">Ready to Get Funded?</h2>
            <p className="text-lg text-slate-300 mb-8 font-light">
              Get funded in as little as 24 hours. No credit impact and dedicated support from our team.
            </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/apply">
                  <Button size="lg" className="bg-[#C8992C] hover:bg-[#B8891C] text-white font-bold shadow-lg shadow-[#C8992C]/20 transition-all hover:scale-105 duration-200 rounded-xl px-8 h-14">Apply Now</Button>
                </Link>
                <div className="flex flex-col gap-2">
                  <a href={`tel:${settings.supportPhone1.replace(/\s+/g, '')}`}>
                    <Button size="lg" variant="outline" className="w-full border-white/20 text-white bg-white/5 hover:bg-white/10 font-medium backdrop-blur-sm transition-all hover:border-[#C8992C]/40 rounded-xl">
                      <Phone className="mr-2 w-4 h-4 text-[#C8992C]" />
                      {settings.supportPhone1}
                    </Button>
                  </a>
                  <a href={`tel:${settings.supportPhone2.replace(/\s+/g, '')}`}>
                    <Button size="lg" variant="outline" className="w-full border-white/20 text-white bg-white/5 hover:bg-white/10 font-medium backdrop-blur-sm transition-all hover:border-[#C8992C]/40 rounded-xl">
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
