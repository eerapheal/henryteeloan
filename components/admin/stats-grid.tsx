'use client';

import { 
  Banknote, 
  Users, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  ShieldCheck
} from "lucide-react";

export default function StatsGrid({ stats }: { stats: any }) {
  if (!stats) return null;

  const cards = [
    {
      label: "Total Loan Volume",
      value: stats.loans?.totalLoans ?? 0,
      prefix: "₦",
      format: true,
      icon: Banknote,
      gradient: "from-[#0F2B46] to-[#1a4a73]",
      iconBg: "bg-white/20",
      textColor: "text-white",
      labelColor: "text-white/70",
      trend: "+12.5%",
      trendUp: true,
    },
    {
      label: "Total Repayable",
      value: stats.loans?.totalRepayable ?? 0,
      prefix: "₦",
      format: true,
      icon: TrendingUp,
      gradient: "from-[#C8992C] to-[#E8A838]",
      iconBg: "bg-white/20",
      textColor: "text-white",
      labelColor: "text-white/70",
      trend: "+8.2%",
      trendUp: true,
    },
    {
      label: "Total Recovered",
      value: stats.loans?.totalPaid ?? 0,
      prefix: "₦",
      format: true,
      icon: ShieldCheck,
      gradient: "from-emerald-600 to-emerald-500",
      iconBg: "bg-white/20",
      textColor: "text-white",
      labelColor: "text-white/70",
      trend: "+5.1%",
      trendUp: true,
    },
    {
      label: "Pending Applications",
      value: stats.loans?.pending ?? 0,
      prefix: "",
      format: false,
      icon: Clock,
      gradient: "from-white to-white",
      iconBg: "bg-amber-100",
      textColor: "text-slate-900",
      labelColor: "text-slate-500",
      trend: `${stats.loans?.count ?? 0} total`,
      trendUp: null,
      border: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((card, index) => (
        <div
          key={card.label}
          className={`relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br ${card.gradient} ${card.border ? 'border border-slate-200 shadow-sm' : 'shadow-lg'} hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group animate-scaleIn`}
          style={{ animationDelay: `${index * 80}ms` }}
        >
          {/* Background decoration */}
          <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-white/10 group-hover:scale-150 transition-transform duration-700" />
          <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white/5 group-hover:scale-125 transition-transform duration-700" />
          
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-2.5 rounded-xl ${card.iconBg} backdrop-blur-sm`}>
                <card.icon className={`w-5 h-5 ${card.textColor}`} />
              </div>
              {card.trendUp !== null ? (
                <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${
                  card.border 
                    ? card.trendUp ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'
                    : 'text-white/90 bg-white/15'
                }`}>
                  {card.trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {card.trend}
                </div>
              ) : (
                <span className={`text-xs font-bold px-2 py-1 rounded-lg ${card.border ? 'text-slate-500 bg-slate-100' : 'text-white/80 bg-white/15'}`}>
                  {card.trend}
                </span>
              )}
            </div>
            
            <p className={`text-xs font-semibold uppercase tracking-wider mb-1 ${card.labelColor}`}>
              {card.label}
            </p>
            <h3 className={`text-2xl font-extrabold ${card.textColor} tracking-tight`}>
              {card.prefix}{card.format ? (card.value as number).toLocaleString() : card.value}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
}
