'use client';

import Link from "next/link";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Settings, 
  LogOut,
  TrendingUp,
  X,
  User as UserIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

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
  const { data: session } = useSession();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    fetch('/api/admin/profile')
      .then(res => res.json())
      .then(data => {
        if (!data.error) setProfile(data);
      })
      .catch(err => console.error("Failed to load profile", err));
  }, []);

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
        "fixed inset-y-0 left-0 w-72 bg-white border-r border-slate-200 flex flex-col h-screen z-50 transition-transform duration-300 transform lg:translate-x-0 lg:static lg:inset-auto shadow-xl",
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
                  ? "bg-[#0F2B46] text-white shadow-lg shadow-[#0F2B46]/20"
                  : "text-slate-500 hover:bg-[#FAFBFC] hover:text-[#0F2B46]"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 transition-transform group-hover:scale-110",
                activeTab === item.tab ? "text-[#C8992C]" : "text-slate-400 group-hover:text-[#0F2B46]"
              )} />
              <span className="font-semibold">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Profile Footer */}
        <div className="p-6 border-t border-slate-100 bg-[#FAFBFC]/50">
          <div className="flex items-center gap-3 mb-6 p-2 rounded-xl bg-white border border-slate-100 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-[#0F2B46]/5 flex items-center justify-center overflow-hidden flex-shrink-0">
              {profile?.profilePic ? (
                <img src={profile.profilePic} alt="Admin" className="w-full h-full object-cover" />
              ) : (
                <UserIcon className="w-5 h-5 text-[#0F2B46]/30" />
              )}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-[#0F2B46] truncate">{profile?.username || session?.user?.name || "Admin"}</p>
              <p className="text-[10px] text-[#5A6577] font-medium truncate uppercase tracking-wider">Administrator</p>
            </div>
          </div>
          <button 
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center gap-3 px-4 py-3.5 w-full rounded-xl text-red-500 hover:bg-red-50 transition-all duration-300 font-bold text-sm"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </>
  );
}
