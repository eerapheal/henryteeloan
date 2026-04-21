'use client';

import Link from "next/link";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Settings, 
  LogOut,
  TrendingUp,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import Image from "next/image";

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/admin", tab: "overview" },
  { icon: FileText, label: "Loans", href: "/admin?tab=loans", tab: "loans" },
  { icon: Users, label: "Users", href: "/admin?tab=users", tab: "users" },
  { icon: TrendingUp, label: "Analytics", href: "/admin?tab=analytics", tab: "analytics" },
  { icon: Settings, label: "Settings", href: "/admin?tab=settings", tab: "settings" },
];

export default function AdminSidebar({ 
  activeTab, 
  isOpen, 
  onClose 
}: { 
  activeTab: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/50 z-40 transition-opacity lg:hidden",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sidebar Container */}
      <div className={cn(
        "fixed inset-y-0 left-0 w-72 bg-white border-r border-slate-200 flex flex-col h-screen z-50 transition-transform duration-300 transform lg:translate-x-0 lg:static lg:inset-auto",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-8 border-b border-slate-100 flex items-center justify-between">
          <Link href="/admin" className="flex items-center" onClick={onClose}>
            <Image 
              src="/henrytee.png" 
              alt="Henrytee Admin" 
              width={160} 
              height={50} 
              className="h-10 w-auto object-contain"
            />
          </Link>
          <button 
            onClick={onClose}
            className="lg:hidden p-2 text-slate-400 hover:text-slate-600 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-grow p-6 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={onClose}
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
    </>
  );
}
