'use client';

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Loader2, RefreshCcw, Search, Filter, Settings } from "lucide-react";
import AdminSidebar from "@/components/admin/sidebar";
import StatsGrid from "@/components/admin/stats-grid";
import LoanTable from "@/components/admin/loan-table";
import UserTable from "@/components/admin/user-table";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = searchParams.get('tab') || 'overview';

  const [stats, setStats] = useState<any>(null);
  const [loans, setLoans] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    setRefreshing(true);
    try {
      const [statsRes, loansRes, usersRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/loans'),
        fetch('/api/admin/users'),
      ]);

      if (statsRes.ok) setStats(await statsRes.json());
      if (loansRes.ok) setLoans(await loansRes.json());
      if (usersRes.ok) setUsers(await usersRes.json());
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      if ((session?.user as any).role !== 'admin') {
        router.push('/');
      } else {
        fetchData();
      }
    } else if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, session, router]);

  if (loading || status === 'loading') {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto mb-4" />
          <p className="text-slate-500 font-medium">Loading Secure Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAF8]">
      <AdminSidebar activeTab={activeTab} />
      
      <main className="flex-grow p-8 lg:p-12 overflow-y-auto">
        {/* Top Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight capitalize">
              {activeTab} Dashboard
            </h2>
            <p className="text-slate-500 mt-1">Manage your loan business with precision.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
              <Input 
                className="pl-10 w-[240px] lg:w-[320px] bg-white border-slate-200 rounded-xl focus:ring-primary/20" 
                placeholder="Search everything..." 
              />
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={fetchData} 
              disabled={refreshing}
              className="bg-white border-slate-200 rounded-xl hover:bg-slate-50 transition-all active:scale-95"
            >
              <RefreshCcw className={cn("w-4 h-4 text-slate-600", refreshing && "animate-spin")} />
            </Button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-10 animate-fadeIn">
            <StatsGrid stats={stats} />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="lg:col-span-2 p-8 border-none shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-lg font-bold text-slate-900">Loan Disbursement Analytics</h3>
                  <div className="flex gap-2">
                    <Badge className="bg-primary/10 text-primary border-none">Monthly</Badge>
                  </div>
                </div>
                <div className="h-[350px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={stats?.chartData || []}>
                      <defs>
                        <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#006633" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#006633" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fill: '#94a3b8', fontSize: 12}}
                        dy={10}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fill: '#94a3b8', fontSize: 12}}
                        tickFormatter={(val) => `₦${val/1000}k`}
                      />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="amount" 
                        stroke="#006633" 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorAmount)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card className="p-8 border-none shadow-sm flex flex-col">
                <h3 className="text-lg font-bold text-slate-900 mb-8">Loan Status Distribution</h3>
                <div className="flex-grow flex items-center justify-center">
                  <div className="space-y-6 w-full">
                    {[
                      { label: 'Approved', count: stats?.loans?.approved, color: 'bg-emerald-500', total: stats?.loans?.count },
                      { label: 'Pending', count: stats?.loans?.pending, color: 'bg-amber-500', total: stats?.loans?.count },
                      { label: 'Rejected', count: stats?.loans?.rejected, color: 'bg-rose-500', total: stats?.loans?.count },
                      { label: 'Paid', count: stats?.loans?.paid, color: 'bg-blue-500', total: stats?.loans?.count },
                    ].map((item) => (
                      <div key={item.label} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-semibold text-slate-600">{item.label}</span>
                          <span className="font-bold text-slate-900">{item.count}</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={cn("h-full rounded-full transition-all duration-1000", item.color)} 
                            style={{ width: `${item.total ? (item.count / item.total) * 100 : 0}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">Recent Applications</h3>
                <Button variant="ghost" className="text-primary font-bold hover:bg-primary/5" onClick={() => router.push('/admin?tab=loans')}>
                  View All Applications
                </Button>
              </div>
              <LoanTable loans={loans.slice(0, 5)} onUpdate={fetchData} />
            </div>
          </div>
        )}

        {activeTab === 'loans' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-end">
              <div className="flex items-center gap-2">
                <Button variant="outline" className="rounded-xl gap-2 bg-white border-slate-200">
                  <Filter className="w-4 h-4" /> Filter Status
                </Button>
              </div>
            </div>
            <LoanTable loans={loans} onUpdate={fetchData} />
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-6 animate-fadeIn">
            <UserTable users={users} onUpdate={fetchData} />
          </div>
        )}

        {(activeTab === 'analytics' || activeTab === 'settings') && (
          <div className="py-20 text-center animate-fadeIn">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
              <Settings className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Advanced {activeTab}</h3>
            <p className="text-slate-500 max-w-sm mx-auto mt-2">
              This module is currently being optimized for high-performance data processing. Check back soon.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
