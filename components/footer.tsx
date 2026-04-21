import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-primary text-slate-300 py-16 border-t border-accent/20">
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
              <li><Link href="/products" className="hover:text-accent transition-colors duration-200">All Products</Link></li>
              <li><Link href="/products/term-loans" className="hover:text-accent transition-colors duration-200">Term Loans</Link></li>
              <li><Link href="/products/sba-loans" className="hover:text-accent transition-colors duration-200">SBA Loans</Link></li>
              <li><Link href="/products/line-of-credit" className="hover:text-accent transition-colors duration-200">Line of Credit</Link></li>
            </ul>
          </div>
          
          <div className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <h4 className="font-semibold text-white mb-6 uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><a href="#" className="hover:text-accent transition-colors duration-200">About Us</a></li>
              <li><a href="#" className="hover:text-accent transition-colors duration-200">Blog</a></li>
              <li><Link href="/how-it-works" className="hover:text-accent transition-colors duration-200">How It Works</Link></li>
              <li><a href="#" className="hover:text-accent transition-colors duration-200">Careers</a></li>
            </ul>
          </div>
          
          <div className="animate-fadeInRight">
            <h4 className="font-semibold text-white mb-6 uppercase tracking-wider text-sm">Contact Us</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-accent mt-0.5" />
                <div className="space-y-1">
                  <a href="tel:+2348034783848" className="hover:text-accent transition-colors duration-200 block">08034783848</a>
                  <a href="tel:+2347025251073" className="hover:text-accent transition-colors duration-200 block">07025251073</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-accent mt-0.5" />
                <a href="mailto:support@henryteeloans.com" className="hover:text-accent transition-colors duration-200">support@henryteeloans.com</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent mt-0.5" />
                <span>Victoria Island<br />Lagos, Nigeria</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700/50 pt-8 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-500">
            <p>&copy; {new Date().getFullYear()} Henrytee Loans. All rights reserved.</p>
            <div className="flex gap-6 md:justify-end">
              <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
