'use client';

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { 
  Loader2, 
  RefreshCcw, 
  Search, 
  Filter, 
  Menu, 
  TrendingUp, 
  ShieldCheck, 
  AlertCircle, 
  Clock, 
  ArrowRight,
  Sparkles,
  Percent,
  CheckCircle2,
  FileText
} from "lucide-react";
import AdminSidebar from "@/components/admin/sidebar";
import StatsGrid from "@/components/admin/stats-grid";
import LoanTable from "@/components/admin/loan-table";
import UserTable from "@/components/admin/user-table";
import AnalyticsView from "@/components/admin/analytics-view";
import SettingsView from "@/components/admin/settings-view";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-[#F8FAF8]">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-[#0F2B46] mx-auto mb-3" />
          <p className="text-slate-500 font-medium text-sm">Loading Admin Center...</p>
        </div>
      </div>
    }>
      <AdminDashboardContent />
    </Suspense>
  );
}

function AdminDashboardContent() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = searchParams.get('tab') || 'overview';

  const [stats, setStats] = useState<any>(null);
  const [loans, setLoans] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const fetchData = async () => {
    setRefreshing(true);
    try {
      const [statsRes, loansRes, usersRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/loans'),
        fetch('/api/admin/users'),
      ]);

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }
      if (loansRes.ok) {
        const loansData = await loansRes.json();
        setLoans(Array.isArray(loansData) ? loansData : []);
      }
      if (usersRes.ok) {
        const usersData = await usersRes.json();
        setUsers(Array.isArray(usersData) ? usersData : []);
      }
    } catch (err) {
      console.error("Admin dashboard fetch error:", err);
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

  // Filtered loans based on search and status
  const filteredLoans = useMemo(() => {
    return loans.filter((loan) => {
      const matchesSearch = 
        !searchQuery ||
        loan.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loan.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loan.phone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loan.bankName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loan.accountNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (loan._id && loan._id.toString().includes(searchQuery));

      const matchesStatus = 
        statusFilter === "all" || 
        loan.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [loans, searchQuery, statusFilter]);

  if (loading || status === 'loading') {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#F8FAF8]">
        <div className="text-center p-8 bg-white rounded-3xl shadow-sm border border-slate-100">
          <Loader2 className="w-10 h-10 animate-spin text-[#0F2B46] mx-auto mb-4" />
          <p className="text-slate-800 font-bold text-lg">Loading Secure Dashboard</p>
          <p className="text-slate-400 text-sm mt-1">Retrieving latest loan records & analytics...</p>
        </div>
      </div>
    );
  }

  // Derived KPIs
  const totalRepayable = stats?.loans?.totalRepayable || 0;
  const totalPaid = stats?.loans?.totalPaid || 0;
  const recoveryRate = totalRepayable > 0 ? Math.round((totalPaid / totalRepayable) * 100) : 0;
  const totalCount = stats?.loans?.count || 0;
  const approvedCount = stats?.loans?.approved || 0;
  const approvalRate = totalCount > 0 ? Math.round((approvedCount / totalCount) * 100) : 0;
  const pendingCount = stats?.loans?.pending || 0;

  return (
    <div className="flex min-h-screen bg-[#F8FAF8]">
      <AdminSidebar 
        activeTab={activeTab} 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      
      <main className="flex-grow p-4 lg:p-10 overflow-y-auto max-w-7xl mx-auto w-full">
        {/* Top Navigation Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden bg-white border border-slate-200 rounded-xl" 
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-6 h-6 text-[#0F2B46]" />
            </Button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl lg:text-3xl font-black text-[#0F2B46] tracking-tight capitalize">
                  {activeTab} Dashboard
                </h1>
                {pendingCount > 0 && activeTab === 'overview' && (
                  <Badge className="bg-amber-100 text-amber-800 border-none text-xs font-bold px-2.5 py-0.5 rounded-full">
                    {pendingCount} Pending
                  </Badge>
                )}
              </div>
              <p className="text-xs lg:text-sm text-slate-500 mt-1">
                Real-time loan management, portfolio underwriting, and disbursement metrics.
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative group flex-1 md:flex-none">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#0F2B46] transition-colors" />
              <Input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full md:w-[260px] lg:w-[320px] bg-white border-slate-200 rounded-2xl text-sm focus:ring-[#0F2B46]/20 shadow-sm" 
                placeholder="Search borrower, bank, NIN..." 
              />
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={fetchData} 
              disabled={refreshing}
              className="bg-white border-slate-200 rounded-2xl hover:bg-slate-50 transition-all shadow-sm active:scale-95 shrink-0"
              title="Refresh Data"
            >
              <RefreshCcw className={cn("w-4 h-4 text-slate-600", refreshing && "animate-spin")} />
            </Button>
          </div>
        </div>

        {/* Tab 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fadeIn">
            {/* KPI Stat Cards Grid */}
            <StatsGrid stats={stats} />

            {/* Quick KPI Performance Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Recovery Ratio</p>
                    <p className="text-xl font-extrabold text-[#0F2B46]">{recoveryRate}%</p>
                  </div>
                </div>
                <Badge className="bg-emerald-50 text-emerald-700 border-none text-xs font-semibold">
                  ₦{(totalPaid).toLocaleString()} Collected
                </Badge>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#0F2B46]/10 text-[#0F2B46] flex items-center justify-center font-bold">
                    <Percent className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Approval Rate</p>
                    <p className="text-xl font-extrabold text-[#0F2B46]">{approvalRate}%</p>
                  </div>
                </div>
                <span className="text-xs text-slate-500 font-semibold">
                  {approvedCount} of {totalCount} Loans
                </span>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Awaiting Decision</p>
                    <p className="text-xl font-extrabold text-[#0F2B46]">{pendingCount}</p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="text-xs font-bold text-[#0F2B46] hover:bg-[#0F2B46]/5 rounded-xl gap-1 p-2"
                  onClick={() => router.push('/admin?tab=loans')}
                >
                  Review <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>

            {/* Charts & Distribution Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Disbursement Analytics Chart */}
              <Card className="lg:col-span-2 p-6 lg:p-8 border-none shadow-sm rounded-3xl bg-white">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-[#0F2B46]">Disbursement Trend</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Monthly loan volume across historical periods</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-[#0F2B46]/10 text-[#0F2B46] border-none font-semibold px-3 py-1 text-xs">
                      Past 6 Months
                    </Badge>
                  </div>
                </div>

                <div className="h-[290px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={stats?.chartData || []} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorAmountOverview" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0F2B46" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#0F2B46" stopOpacity={0.0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }}
                        dy={8}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }}
                        tickFormatter={(val) => val >= 1000000 ? `₦${(val/1000000).toFixed(1)}M` : val >= 1000 ? `₦${Math.round(val/1000)}k` : `₦${val}`}
                      />
                      <Tooltip 
                        formatter={(val: any) => [`₦${Number(val).toLocaleString()}`, 'Loan Volume']}
                        contentStyle={{ 
                          borderRadius: '16px', 
                          border: '1px solid #f1f5f9', 
                          boxShadow: '0 10px 25px -5px rgba(15, 43, 70, 0.1)',
                          fontSize: '13px',
                          fontWeight: '600'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="amount" 
                        stroke="#0F2B46" 
                        strokeWidth={3} 
                        fillOpacity={1} 
                        fill="url(#colorAmountOverview)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Status Distribution Breakdown */}
              <Card className="p-6 lg:p-8 border-none shadow-sm rounded-3xl bg-white flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#0F2B46] mb-1">Portfolio Status</h3>
                  <p className="text-xs text-slate-400 mb-6">Breakdown of all {totalCount} submitted applications</p>
                </div>

                <div className="space-y-5 my-auto">
                  {[
                    { label: 'Approved', count: stats?.loans?.approved || 0, color: 'bg-[#C8992C]', badgeBg: 'bg-amber-50 text-[#C8992C]' },
                    { label: 'Pending', count: stats?.loans?.pending || 0, color: 'bg-[#0F2B46]', badgeBg: 'bg-slate-100 text-[#0F2B46]' },
                    { label: 'Paid Full', count: stats?.loans?.paid || 0, color: 'bg-emerald-500', badgeBg: 'bg-emerald-50 text-emerald-700' },
                    { label: 'Rejected', count: stats?.loans?.rejected || 0, color: 'bg-rose-500', badgeBg: 'bg-rose-50 text-rose-700' },
                  ].map((item) => {
                    const percentage = totalCount > 0 ? Math.round((item.count / totalCount) * 100) : 0;
                    return (
                      <div key={item.label} className="space-y-1.5">
                        <div className="flex justify-between items-center text-xs font-bold">
                          <span className="text-slate-600 flex items-center gap-1.5">
                            <span className={cn("w-2.5 h-2.5 rounded-full", item.color)} />
                            {item.label}
                          </span>
                          <span className="text-slate-900 font-bold">
                            {item.count} <span className="text-slate-400 font-normal">({percentage}%)</span>
                          </span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={cn("h-full rounded-full transition-all duration-1000", item.color)} 
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between text-xs text-slate-500">
                  <span>Registered Users: <strong className="text-slate-800">{stats?.users?.total || 0}</strong></span>
                  <span>Admins: <strong className="text-slate-800">{stats?.users?.admins || 1}</strong></span>
                </div>
              </Card>
            </div>

            {/* Recent Applications Section */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl font-extrabold text-[#0F2B46]">Recent Loan Applications</h3>
                  <p className="text-xs text-slate-400">Click any row to view complete application information and bank details</p>
                </div>
                <Button 
                  variant="outline" 
                  className="rounded-xl font-bold text-xs bg-white border-slate-200 text-[#0F2B46] hover:bg-slate-50 gap-1.5 self-start sm:self-auto"
                  onClick={() => router.push('/admin?tab=loans')}
                >
                  <span>View All ({loans.length})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>

              <LoanTable 
                loans={searchQuery ? filteredLoans.slice(0, 5) : loans.slice(0, 5)} 
                onUpdate={fetchData} 
              />
            </div>
          </div>
        )}

        {/* Tab 2: LOANS FULL LIST */}
        {activeTab === 'loans' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { id: 'all', label: 'All Loans', count: loans.length },
                  { id: 'pending', label: 'Pending', count: loans.filter(l => l.status === 'pending').length },
                  { id: 'approved', label: 'Approved', count: loans.filter(l => l.status === 'approved').length },
                  { id: 'paid', label: 'Paid Full', count: loans.filter(l => l.status === 'paid').length },
                  { id: 'rejected', label: 'Rejected', count: loans.filter(l => l.status === 'rejected').length },
                ].map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => setStatusFilter(filter.id)}
                    className={cn(
                      "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5",
                      statusFilter === filter.id
                        ? "bg-[#0F2B46] text-white shadow-sm"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200/80"
                    )}
                  >
                    <span>{filter.label}</span>
                    <span className={cn(
                      "px-1.5 py-0.2 rounded-full text-[10px]",
                      statusFilter === filter.id ? "bg-white/20 text-white" : "bg-slate-200 text-slate-600"
                    )}>
                      {filter.count}
                    </span>
                  </button>
                ))}
              </div>

              <div className="text-xs text-slate-400 font-medium">
                Showing {filteredLoans.length} of {loans.length} records
              </div>
            </div>

            <LoanTable loans={filteredLoans} onUpdate={fetchData} />
          </div>
        )}

        {/* Tab 3: USERS */}
        {activeTab === 'users' && (
          <div className="space-y-6 animate-fadeIn">
            <UserTable users={users} onUpdate={fetchData} />
          </div>
        )}

        {/* Tab 4: ANALYTICS */}
        {activeTab === 'analytics' && (
          <AnalyticsView stats={stats} />
        )}

        {/* Tab 5: SETTINGS */}
        {activeTab === 'settings' && (
          <SettingsView />
        )}
      </main>
    </div>
  );
}
