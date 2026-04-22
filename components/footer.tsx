import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';
import { useSettings } from '@/components/settings-provider';

export default function Footer() {
  const settings = useSettings();
  return (
    <footer className="bg-[#0A1E33] text-slate-300 py-16 border-t border-[#C8992C]/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1 animate-fadeInLeft">
            <Link href="/" className="flex items-center mb-6 group">
              <Image 
                src="/henrytee.png" 
                alt="Henrytee Loans" 
                width={160} 
                height={50} 
                className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105 brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              Empowering businesses with fast, flexible, and fair financing solutions. Your growth is our priority.
            </p>
          </div>
          
          <div className="animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            <h4 className="font-semibold text-white mb-6 uppercase tracking-wider text-sm">Products</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="/products" className="hover:text-[#C8992C] transition-colors duration-200">All Products</Link></li>
              <li><Link href="/products" className="hover:text-[#C8992C] transition-colors duration-200">Personal Loans</Link></li>
              <li><Link href="/products" className="hover:text-[#C8992C] transition-colors duration-200">Salary Advance</Link></li>
              <li><Link href="/products" className="hover:text-[#C8992C] transition-colors duration-200">Emergency Loans</Link></li>
            </ul>
          </div>
          
          <div className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <h4 className="font-semibold text-white mb-6 uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="/how-it-works" className="hover:text-[#C8992C] transition-colors duration-200">About Us</Link></li>
              <li><Link href="/apply" className="hover:text-[#C8992C] transition-colors duration-200">Apply Now</Link></li>
              <li><Link href="/how-it-works" className="hover:text-[#C8992C] transition-colors duration-200">How It Works</Link></li>
              <li><Link href="/testimonials" className="hover:text-[#C8992C] transition-colors duration-200">Testimonials</Link></li>
            </ul>
          </div>
          
          <div className="animate-fadeInRight">
            <h4 className="font-semibold text-white mb-6 uppercase tracking-wider text-sm">Contact Us</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#C8992C] mt-0.5" />
                <div className="space-y-1">
                  <a href={`tel:${settings.supportPhone1.replace(/\s+/g, '')}`} className="hover:text-[#C8992C] transition-colors duration-200 block">{settings.supportPhone1}</a>
                  <a href={`tel:${settings.supportPhone2.replace(/\s+/g, '')}`} className="hover:text-[#C8992C] transition-colors duration-200 block">{settings.supportPhone2}</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#C8992C] mt-0.5" />
                <a href={`mailto:${settings.adminEmail}`} className="hover:text-[#C8992C] transition-colors duration-200">{settings.adminEmail}</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C8992C] mt-0.5" />
                <span>Victoria Island<br />Lagos, Nigeria</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-500">
            <p>&copy; {new Date().getFullYear()} Henrytee Loans. All rights reserved.</p>
            <div className="flex gap-6 md:justify-end">
              <a href="#" className="hover:text-[#C8992C] transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="hover:text-[#C8992C] transition-colors duration-200">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
