'use client';

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Link from "next/link";
import { ShieldCheck, Mail, Lock, ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Invalid credentials");
      } else {
        toast.success("Signed in successfully");
        router.push("/admin");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4 md:p-12">
        <div className="w-full max-w-5xl bg-white rounded-[2rem] shadow-soft overflow-hidden flex flex-col md:flex-row border border-[#E4E7EC] min-h-[600px] animate-fadeInUp">
          {/* Left Panel: Branding */}
          <div className="w-full md:w-1/2 bg-navy-gradient p-10 md:p-16 text-white relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C8992C]/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#0F2B46]/50 rounded-full blur-[60px] -ml-24 -mb-24"></div>
            
            <div className="relative z-10">
              <Link href="/" className="inline-block mb-12">
                <Image 
                  src="/henrytee.png" 
                  alt="Henrytee Loans" 
                  width={180} 
                  height={40} 
                  className="h-10 w-auto brightness-0 invert"
                />
              </Link>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">Admin <span className="text-gradient-gold">Portal</span></h2>
              <p className="text-slate-300 font-light mb-8 max-w-xs leading-relaxed">
                Secure access to the Henrytee Loans management system. Monitor applications, manage users, and process disbursements.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-[#C8992C]" />
                  <span>Real-time Application Tracking</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-[#C8992C]" />
                  <span>Secure Underwriting Tools</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-[#C8992C]" />
                  <span>Administrative Controls</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-12">
              <p className="text-slate-400 text-xs uppercase tracking-widest font-bold">Henrytee Loans Enterprise</p>
            </div>
          </div>

          {/* Right Panel: Form */}
          <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center bg-white">
            <div className="mb-10">
              <h1 className="text-2xl font-bold text-[#1A2332] mb-2">Welcome Back</h1>
              <p className="text-slate-500 text-sm font-medium">Please enter your credentials to login</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email Address</Label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#0F2B46] transition-colors" />
                  <Input 
                    id="email" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    placeholder="admin@henryteeloans.com"
                    className="pl-11 h-12 bg-[#FAFBFC] border-[#E4E7EC] rounded-xl focus:ring-2 focus:ring-[#0F2B46] focus:bg-white transition-all font-medium"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Password</Label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#0F2B46] transition-colors" />
                  <Input 
                    id="password" 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    className="pl-11 h-12 bg-[#FAFBFC] border-[#E4E7EC] rounded-xl focus:ring-2 focus:ring-[#0F2B46] focus:bg-white transition-all font-medium"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-end">
                <Link href="#" className="text-xs font-bold text-[#0F2B46] hover:text-[#C8992C] transition-colors">Forgot Password?</Link>
              </div>

              <Button type="submit" className="w-full h-12 bg-[#0F2B46] hover:bg-[#0A1E33] text-white font-bold rounded-xl shadow-lg shadow-[#0F2B46]/20 transition-all hover:scale-[1.01] active:scale-[0.99]" disabled={loading}>
                {loading ? (
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 animate-pulse text-[#C8992C]" />
                    Authenticating...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Sign In to Portal
                    <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </form>

            <div className="mt-10 pt-10 border-t border-[#E4E7EC] text-center">
              <p className="text-sm text-slate-500 font-medium">
                Don't have an admin account?{" "}
                <Link href="/auth/signup" className="text-[#0F2B46] font-bold hover:text-[#C8992C] transition-colors ml-1 underline underline-offset-4">
                  Request Access
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
