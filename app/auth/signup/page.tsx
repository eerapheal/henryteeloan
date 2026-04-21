'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Link from "next/link";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Account created! Please sign in.");
        router.push("/auth/signin");
      } else {
        toast.error(data.error || "Signup failed");
      }
    } catch (error) {
      toast.error("An error occurred during signup");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 shadow-xl border-slate-200">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-900">Create Account</h1>
            <p className="text-slate-500">Join Henrytee Loans today</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username" 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required 
                placeholder="johndoe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating account..." : "Sign Up"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link href="/auth/signin" className="text-primary font-bold hover:underline">
              Sign In
            </Link>
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
