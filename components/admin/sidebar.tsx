'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Settings, 
  LogOut,
  TrendingUp,
  ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/admin", tab: "overview" },
  { icon: FileText, label: "Loans", href: "/admin?tab=loans", tab: "loans" },
  { icon: Users, label: "Users", href: "/admin?tab=users", tab: "users" },
  { icon: TrendingUp, label: "Analytics", href: "/admin?tab=analytics", tab: "analytics" },
  { icon: Settings, label: "Settings", href: "/admin?tab=settings", tab: "settings" },
];

export default function AdminSidebar({ activeTab }: { activeTab: string }) {
  return (
    <div className="w-72 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0">
      <div className="p-8 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-slate-900 leading-none">Henrytee</h1>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Admin Portal</span>
          </div>
        </div>
      </div>

      <nav className="flex-grow p-6 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group",
              activeTab === item.tab
                ? "bg-primary text-white shadow-lg shadow-primary/20"
                : "text-slate-500 hover:bg-slate-50 hover:text-primary"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5",
              activeTab === item.tab ? "text-white" : "text-slate-400 group-hover:text-primary"
            )} />
            <span className="font-semibold">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-6 border-top border-slate-100">
        <button 
          onClick={() => signOut({ callbackUrl: '/' })}
          className="flex items-center gap-3 px-4 py-3.5 w-full rounded-xl text-red-500 hover:bg-red-50 transition-all duration-300 font-semibold"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}
