'use client';

import { Card } from "@/components/ui/card";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend
} from "recharts";

const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#3b82f6'];

export default function AnalyticsView({ stats }: { stats: any }) {
  if (!stats) return null;

  const pieData = [
    { name: 'Approved', value: stats.loans?.approved || 0 },
    { name: 'Pending', value: stats.loans?.pending || 0 },
    { name: 'Rejected', value: stats.loans?.rejected || 0 },
    { name: 'Paid', value: stats.loans?.paid || 0 },
  ].filter(d => d.value > 0);

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue/Loan Volume Chart */}
        <Card className="p-8 border-none shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-8">Revenue & Disbursement History</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.chartData || []}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Line type="monotone" dataKey="amount" stroke="#006633" strokeWidth={3} dot={{ r: 4, fill: '#006633' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Status Distribution Pie Chart */}
        <Card className="p-8 border-none shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-8">Loan Portfolio Health</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend iconType="circle" layout="vertical" align="right" verticalAlign="middle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="p-8 border-none shadow-sm text-center">
          <p className="text-sm font-medium text-slate-500 mb-2">Average Loan Size</p>
          <h4 className="text-3xl font-extrabold text-slate-900">
            ₦{stats.loans?.count > 0 ? Math.round(stats.loans.totalLoans / stats.loans.count).toLocaleString() : 0}
          </h4>
        </Card>
        <Card className="p-8 border-none shadow-sm text-center">
          <p className="text-sm font-medium text-slate-500 mb-2">Recovery Rate</p>
          <h4 className="text-3xl font-extrabold text-emerald-600">
            {stats.loans?.totalRepayable > 0 ? Math.round((stats.loans.totalPaid / stats.loans.totalRepayable) * 100) : 0}%
          </h4>
        </Card>
        <Card className="p-8 border-none shadow-sm text-center">
          <p className="text-sm font-medium text-slate-500 mb-2">Approval Velocity</p>
          <h4 className="text-3xl font-extrabold text-blue-600">
            {stats.loans?.count > 0 ? Math.round((stats.loans.approved / stats.loans.count) * 100) : 0}%
          </h4>
        </Card>
      </div>
    </div>
  );
}
