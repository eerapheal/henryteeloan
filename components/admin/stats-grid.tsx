'use client';

import { 
  Banknote, 
  Users, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { Card } from "@/components/ui/card";

export default function StatsGrid({ stats }: { stats: any }) {
  if (!stats) return null;

  const cards = [
    {
      label: "Total Loan Volume",
      value: `₦${stats.loans?.totalLoans?.toLocaleString()}`,
      icon: Banknote,
      color: "text-blue-600",
      bg: "bg-blue-50",
      trend: "+12.5%",
      trendUp: true,
    },
    {
      label: "Total Repayable",
      value: `₦${stats.loans?.totalRepayable?.toLocaleString()}`,
      icon: TrendingUp,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      trend: "+8.2%",
      trendUp: true,
    },
    {
      label: "Total Recovered",
      value: `₦${stats.loans?.totalPaid?.toLocaleString()}`,
      icon: CheckCircle2,
      color: "text-amber-600",
      bg: "bg-amber-50",
      trend: "+5.1%",
      trendUp: true,
    },
    {
      label: "Active Applications",
      value: stats.loans?.pending?.toString(),
      icon: Clock,
      color: "text-purple-600",
      bg: "bg-purple-50",
      trend: "-2.4%",
      trendUp: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <Card key={card.label} className="p-6 border-none shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-start justify-between">
            <div className={`p-3 rounded-xl ${card.bg} ${card.color}`}>
              <card.icon className="w-6 h-6" />
            </div>
            <div className={`flex items-center gap-1 text-sm font-bold ${card.trendUp ? 'text-emerald-500' : 'text-rose-500'}`}>
              {card.trendUp ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              {card.trend}
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium text-slate-500">{card.label}</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{card.value}</h3>
          </div>
        </Card>
      ))}
    </div>
  );
}
