'use client';

import { cn } from "@/lib/utils";
import { 
  MoreVertical, 
  ShieldAlert, 
  Trash2, 
  UserPlus, 
  UserMinus,
  Mail
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useState } from "react";

export default function UserTable({ users, onUpdate }: { users: any[], onUpdate: () => void }) {
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const updateUser = async (id: string, data: any) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success("User updated successfully");
        onUpdate();
      } else {
        toast.error("Failed to update user");
      }
    } catch (err) {
      toast.error("An error occurred");
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast.success("User deleted successfully");
        onUpdate();
      } else {
        toast.error("Failed to delete user");
      }
    } catch (err) {
      toast.error("An error occurred");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">User Info</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Role</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Joined Date</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center font-bold",
                      user.role === 'admin' ? "bg-amber-100 text-amber-700" : "bg-primary/10 text-primary"
                    )}>
                      {user.username?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 leading-none">{user.username}</p>
                      <div className="flex items-center gap-1 text-xs text-slate-400 mt-1">
                        <Mail className="w-3 h-3" />
                        {user.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge variant={user.role === 'admin' ? "default" : "secondary"} className={cn(
                    "px-3 py-1 border-none",
                    user.role === 'admin' ? "bg-amber-100 text-amber-700 hover:bg-amber-200" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  )}>
                    {user.role === 'admin' ? 'Administrator' : 'Borrower'}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      user.status === 'suspended' ? "bg-red-500" : "bg-emerald-500"
                    )} />
                    <span className="text-sm font-medium text-slate-600 capitalize">
                      {user.status || 'active'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-500 text-sm">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all outline-none">
                      <MoreVertical className="w-5 h-5 text-slate-400" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 p-2 rounded-xl border-slate-100 shadow-xl">
                      {user.role !== 'admin' ? (
                        <DropdownMenuItem onClick={() => updateUser(user._id, { role: 'admin' })} className="gap-2 p-2.5 cursor-pointer text-amber-600 font-medium">
                          <UserPlus className="w-4 h-4" /> Promote to Admin
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem onClick={() => updateUser(user._id, { role: 'user' })} className="gap-2 p-2.5 cursor-pointer text-slate-600 font-medium">
                          <UserMinus className="w-4 h-4" /> Demote to User
                        </DropdownMenuItem>
                      )}
                      
                      {user.status !== 'suspended' ? (
                        <DropdownMenuItem onClick={() => updateUser(user._id, { status: 'suspended' })} className="gap-2 p-2.5 cursor-pointer text-orange-600 font-medium">
                          <ShieldAlert className="w-4 h-4" /> Suspend User
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem onClick={() => updateUser(user._id, { status: 'active' })} className="gap-2 p-2.5 cursor-pointer text-emerald-600 font-medium">
                          <CheckCircle className="w-4 h-4" /> Activate User
                        </DropdownMenuItem>
                      )}
                      
                      <div className="h-px bg-slate-50 my-1" />
                      
                      <DropdownMenuItem onClick={() => deleteUser(user._id)} className="gap-2 p-2.5 cursor-pointer text-red-600 font-medium">
                        <Trash2 className="w-4 h-4" /> Delete Permanently
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
