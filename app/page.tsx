'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, ArrowRight, Star, Phone } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { useSettings } from '@/components/settings-provider';

export default function Home() {
  const settings = useSettings();
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 relative overflow-hidden">
        {/* Subtle abstract background element */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl opacity-40 pointer-events-none"></div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeInLeft">
              <div className="inline-block px-4 py-2 bg-slate-100 border border-slate-200 rounded-full text-sm font-semibold text-primary mb-6 shadow-sm">
                Trusted by Thousands of Clients
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Personal Loans <span className="text-accent">Made Simple</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Get funded fast with flexible terms, 24-hour approval, and dedicated support from underwriters who understand your needs in Nigeria.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/apply">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white animate-pulse-glow shadow-md shadow-primary/20">Get Started Today</Button>
                </Link>
                <Link href="/how-it-works">
                  <Button size="lg" variant="outline" className="border-border text-primary hover:bg-slate-50 font-medium">
                    Learn More <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="animate-fadeInRight">
              <img 
                src="/hero-nigeria.png" 
                alt="Professional Nigerian borrower" 
                className="w-full h-auto rounded-lg shadow-xl animate-float"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Metrics */}
      <section className="py-16 bg-white border-b border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="animate-fadeInUp">
              <div className="text-4xl font-bold text-primary mb-2 animate-countUp">₦1B+</div>
              <p className="text-muted-foreground">Disbursed across Nigeria</p>
            </div>
            <div className="animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
              <div className="text-4xl font-bold text-primary mb-2 animate-countUp">A+</div>
              <p className="text-muted-foreground">Certified Lender</p>
            </div>
            <div className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl font-bold text-primary mb-2 animate-countUp">24h</div>
              <p className="text-muted-foreground">Average Funding Time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6 animate-fadeInLeft">
              <h2 className="text-3xl font-bold text-foreground">Why Choose Us</h2>
              <div className="space-y-4">
                <div className="flex gap-4 animate-fadeInUp" style={{ animationDelay: '0s' }}>
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Low NIN Impact</h3>
                    <p className="text-muted-foreground">Applying is fast and secure with your NIN</p>
                  </div>
                </div>
                <div className="flex gap-4 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Direct HR Support</h3>
                    <p className="text-muted-foreground">Automated salary deduction for easier repayments</p>
                  </div>
                </div>
                <div className="flex gap-4 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Monthly Interest Payments</h3>
                    <p className="text-muted-foreground">Simple 20% monthly interest rate</p>
                  </div>
                </div>
                <div className="flex gap-4 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Fast & Secure</h3>
                    <p className="text-muted-foreground">Get funded in as little as 24 hours</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-8 border border-border animate-fadeInRight">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-foreground">Apply in 3 Easy Steps</h3>
                <div className="space-y-6">
                  <div className="flex gap-4 animate-fadeInUp" style={{ animationDelay: '0s' }}>
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">1</div>
                    <div>
                      <h4 className="font-semibold text-foreground">Provide Your Information</h4>
                      <p className="text-sm text-muted-foreground">Share basic business details</p>
                    </div>
                  </div>
                  <div className="flex gap-4 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">2</div>
                    <div>
                      <h4 className="font-semibold text-foreground">Submit Quick Application</h4>
                      <p className="text-sm text-muted-foreground">Takes just 5 minutes</p>
                    </div>
                  </div>
                  <div className="flex gap-4 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">3</div>
                    <div>
                      <h4 className="font-semibold text-foreground">Choose Your Best Option</h4>
                      <p className="text-sm text-muted-foreground">Pick the loan duration that fits your needs</p>
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
            <h2 className="text-4xl font-bold text-foreground mb-4">Flexible Funding Solutions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Choose the loan type that best fits your needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Personal Loan */}
            <Card className="p-8 border border-border hover:shadow-xl hover:border-accent/30 transition-all duration-300 animate-fadeInUp group bg-slate-50/50" style={{ animationDelay: '0s' }}>
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 text-primary">
                <span className="text-3xl">👤</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Personal Loans</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">Quick and simple personal funding for any need. No business details required, just fast approval and simple terms for all Nigerians.</p>
              <Link href="/apply">
                <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 rounded-xl transition-all shadow-lg shadow-primary/10">Apply Now</Button>
              </Link>
            </Card>

            {/* Salary Advance */}
            <Card className="p-8 border border-border hover:shadow-xl hover:border-accent/30 transition-all duration-300 animate-fadeInUp group bg-slate-50/50" style={{ animationDelay: '0.1s' }}>
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 text-primary">
                <span className="text-3xl">💼</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Salary Advance</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">Get cash before your next payday. Automated deduction from your next paycheck makes repayment effortless and stress-free.</p>
              <Link href="/apply">
                <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 rounded-xl transition-all shadow-lg shadow-primary/10">Get Advance</Button>
              </Link>
            </Card>

            {/* Emergency Loan */}
            <Card className="p-8 border border-border hover:shadow-xl hover:border-accent/30 transition-all duration-300 animate-fadeInUp group bg-slate-50/50" style={{ animationDelay: '0.2s' }}>
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 text-primary">
                <span className="text-3xl">🚨</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Emergency Loans</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">Life happens fast. Get lightning-fast funding for medical emergencies, urgent repairs, or any unexpected financial need.</p>
              <Link href="/apply">
                <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 rounded-xl transition-all shadow-lg shadow-primary/10">Request Funds</Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-background">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-foreground mb-4">What Our Customers Say</h2>
            <p className="text-lg text-muted-foreground">Join thousands of satisfied business owners we&apos;ve helped succeed</p>
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
              <Card key={i} className="p-6 border border-border animate-fadeInUp" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{testimonial.text}</p>
                <p className="font-semibold text-foreground">{testimonial.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl font-bold text-foreground mb-4">Video Success Stories</h2>
            <Link href="/testimonials" className="text-primary hover:text-accent font-semibold flex items-center justify-center gap-2 group">
              View all success stories <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: 'Growing with Henrytee Loans', owner: 'Chinedu Okeke', image: '/testimonial-video-1.png' },
              { title: 'The Fast Funding Path', owner: 'Aisha Bello', image: '/testimonial-video-2.png' }
            ].map((video, i) => (
              <Link key={i} href="/testimonials">
                <div className="group relative aspect-video rounded-xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-500">
                  <img src={video.image} alt={video.owner} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-accent text-primary rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <div className="ml-1">▶</div>
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
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8 animate-fadeInUp">Minimum Requirements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4 animate-fadeInLeft">
                <div className="flex gap-3 animate-fadeInUp" style={{ animationDelay: '0s' }}>
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Valid NIN</p>
                    <p className="text-sm text-muted-foreground">National Identification Number required</p>
                  </div>
                </div>
                <div className="flex gap-3 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Proof of Employment</p>
                    <p className="text-sm text-muted-foreground">Consistent monthly salary</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4 animate-fadeInRight">
                <div className="flex gap-3 animate-fadeInUp" style={{ animationDelay: '0s' }}>
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Nigeria-Based</p>
                    <p className="text-sm text-muted-foreground">Must be a resident of Nigeria</p>
                  </div>
                </div>
                <div className="flex gap-3 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Guarantor</p>
                    <p className="text-sm text-muted-foreground">One valid guarantor required</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden border-t border-border bg-primary text-white">
        {/* Subtle background glow */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
          <div className="w-full max-w-4xl h-full bg-accent/10 blur-[100px] rounded-full"></div>
        </div>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto animate-fadeInUp">
            <h2 className="text-4xl font-bold mb-6 text-white">Ready to Get Funded?</h2>
            <p className="text-lg text-slate-300 mb-8 font-light">
              Get funded in as little as 24 hours. No credit impact and dedicated support from our team.
            </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/apply">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-primary font-bold shadow-lg shadow-accent/20 transition-all hover:scale-105 duration-200">Apply Now</Button>
                </Link>
                <div className="flex flex-col gap-2">
                  <a href={`tel:${settings.supportPhone1.replace(/\s+/g, '')}`}>
                    <Button size="lg" variant="outline" className="w-full border-accent/20 text-white bg-white/5 hover:bg-white/10 font-medium backdrop-blur-sm transition-all hover:border-accent/40">
                      <Phone className="mr-2 w-4 h-4 text-accent" />
                      {settings.supportPhone1}
                    </Button>
                  </a>
                  <a href={`tel:${settings.supportPhone2.replace(/\s+/g, '')}`}>
                    <Button size="lg" variant="outline" className="w-full border-accent/20 text-white bg-white/5 hover:bg-white/10 font-medium backdrop-blur-sm transition-all hover:border-accent/40">
                      <Phone className="mr-2 w-4 h-4 text-accent" />
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
