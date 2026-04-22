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
      <header className="border-b border-[#E4E7EC] bg-white/80 backdrop-blur-xl sticky top-0 z-50 transition-all duration-300 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center group shrink-0">
              <Image 
                src="/henrytee.png" 
                alt="Henrytee Loans" 
                width={280} 
                height={60} 
                className="h-14 w-auto transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/products" className="text-[#1A2332]/70 font-medium hover:text-[#0F2B46] transition-colors text-[15px]">Products</Link>
              <Link href="/how-it-works" className="text-[#1A2332]/70 font-medium hover:text-[#0F2B46] transition-colors text-[15px]">How It Works</Link>
              <Link href="/testimonials" className="text-[#1A2332]/70 font-medium hover:text-[#0F2B46] transition-colors text-[15px]">Testimonials</Link>
            </nav>
            <div className="flex items-center gap-3 sm:gap-5">
              <div className="hidden lg:flex flex-col items-end gap-0.5">
                <a href={`tel:${settings.supportPhone1.replace(/\s+/g, '')}`} className="flex items-center gap-2 text-[13px] text-[#0F2B46] font-semibold hover:text-[#C8992C] transition-colors">
                  <Phone className="w-3.5 h-3.5 text-[#C8992C]" />
                  {settings.supportPhone1}
                </a>
                <a href={`tel:${settings.supportPhone2.replace(/\s+/g, '')}`} className="flex items-center gap-2 text-[13px] text-[#0F2B46] font-semibold hover:text-[#C8992C] transition-colors">
                  <Phone className="w-3.5 h-3.5 text-[#C8992C]" />
                  {settings.supportPhone2}
                </a>
              </div>
              <Link href="/apply">
                <Button className="bg-[#C8992C] hover:bg-[#B8891C] text-white font-semibold shadow-md shadow-[#C8992C]/20 px-5 sm:px-7 text-sm sm:text-base rounded-xl h-11 transition-all hover:shadow-lg hover:shadow-[#C8992C]/25">Apply Now</Button>
              </Link>
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-[#1A2332] hover:bg-[#F0F2F5] rounded-lg transition"
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
        <div className="md:hidden fixed inset-0 top-20 bg-black/40 backdrop-blur-sm z-40 animate-fadeInUp">
          <div className="bg-white border-b border-[#E4E7EC] animate-slideDown shadow-2xl">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 space-y-6">
              <nav className="grid gap-3">
                <Link href="/products" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between py-3.5 px-4 text-lg text-[#1A2332] hover:text-[#0F2B46] hover:bg-[#F0F2F5] transition font-semibold rounded-xl">
                  Products <ArrowRight className="w-4 h-4 text-[#C8992C]" />
                </Link>
                <Link href="/how-it-works" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between py-3.5 px-4 text-lg text-[#1A2332] hover:text-[#0F2B46] hover:bg-[#F0F2F5] transition font-semibold rounded-xl">
                  How It Works <ArrowRight className="w-4 h-4 text-[#C8992C]" />
                </Link>
                <Link href="/testimonials" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between py-3.5 px-4 text-lg text-[#1A2332] hover:text-[#0F2B46] hover:bg-[#F0F2F5] transition font-semibold rounded-xl">
                  Testimonials <ArrowRight className="w-4 h-4 text-[#C8992C]" />
                </Link>
              </nav>
              <div className="pt-4">
                <p className="text-xs font-bold text-[#5A6577] uppercase tracking-widest mb-4 px-4">Contact Support</p>
                <div className="space-y-2">
                  <a href={`tel:${settings.supportPhone1.replace(/\s+/g, '')}`} className="flex items-center gap-3 text-base text-[#0F2B46] font-bold hover:text-[#C8992C] transition-colors p-4 rounded-xl border border-[#E4E7EC] bg-[#FAFBFC]">
                    <Phone className="w-5 h-5 text-[#C8992C]" />
                    {settings.supportPhone1}
                  </a>
                  <a href={`tel:${settings.supportPhone2.replace(/\s+/g, '')}`} className="flex items-center gap-3 text-base text-[#0F2B46] font-bold hover:text-[#C8992C] transition-colors p-4 rounded-xl border border-[#E4E7EC] bg-[#FAFBFC]">
                    <Phone className="w-5 h-5 text-[#C8992C]" />
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
