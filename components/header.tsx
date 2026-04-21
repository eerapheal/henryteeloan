'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Phone, Menu, X, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useSettings } from '@/components/settings-provider';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const settings = useSettings();

  return (
    <>
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50 transition-all duration-300 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center group shrink-0">
              <Image 
                src="/henrytee.png" 
                alt="Henrytee Loans" 
                width={280} 
                height={60} 
                className="h-19 w-[130px] transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </Link>
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              <Link href="/products" className="text-slate-600 font-medium hover:text-accent transition-colors">Products</Link>
              <Link href="/how-it-works" className="text-slate-600 font-medium hover:text-accent transition-colors">How It Works</Link>
              <Link href="/testimonials" className="text-slate-600 font-medium hover:text-accent transition-colors">Testimonials</Link>
            </nav>
            <div className="flex items-center gap-3 sm:gap-5">
              <div className="hidden lg:flex flex-col items-end gap-0">
                <a href={`tel:${settings.supportPhone1.replace(/\s+/g, '')}`} className="flex items-center gap-2 text-[13px] text-primary font-bold hover:text-accent transition-colors">
                  <Phone className="w-3 h-3 text-accent" />
                  {settings.supportPhone1}
                </a>
                <a href={`tel:${settings.supportPhone2.replace(/\s+/g, '')}`} className="flex items-center gap-2 text-[13px] text-primary font-bold hover:text-accent transition-colors">
                  <Phone className="w-3 h-3 text-accent" />
                  {settings.supportPhone2}
                </a>
              </div>
              <Link href="/apply">
                <Button className="bg-primary hover:bg-primary/90 text-white font-semibold shadow-md shadow-primary/20 px-4 sm:px-6 text-sm sm:text-base">Apply Now</Button>
              </Link>
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-slate-800 hover:bg-slate-100 hover:text-primary rounded-lg transition"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-20 bg-black/50 z-40 animate-fadeInUp">
          <div className="bg-white border-b border-border animate-slideDown shadow-2xl">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 space-y-6">
              <nav className="grid gap-4">
                <Link href="/products" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between py-3 text-lg text-foreground hover:text-primary transition font-semibold border-b border-slate-50">
                  Products <ArrowRight className="w-4 h-4 text-accent" />
                </Link>
                <Link href="/how-it-works" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between py-3 text-lg text-foreground hover:text-primary transition font-semibold border-b border-slate-50">
                  How It Works <ArrowRight className="w-4 h-4 text-accent" />
                </Link>
                <Link href="/testimonials" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between py-3 text-lg text-foreground hover:text-primary transition font-semibold border-b border-slate-50">
                  Testimonials <ArrowRight className="w-4 h-4 text-accent" />
                </Link>
              </nav>
              <div className="pt-4">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Contact Support</p>
                <div className="space-y-3">
                  <a href={`tel:${settings.supportPhone1.replace(/\s+/g, '')}`} className="flex items-center gap-3 text-lg text-primary font-bold hover:text-accent transition-colors bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <Phone className="w-5 h-5 text-accent" />
                    {settings.supportPhone1}
                  </a>
                  <a href={`tel:${settings.supportPhone2.replace(/\s+/g, '')}`} className="flex items-center gap-3 text-lg text-primary font-bold hover:text-accent transition-colors bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <Phone className="w-5 h-5 text-accent" />
                    {settings.supportPhone2}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
