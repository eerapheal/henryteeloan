'use client';

import Link from "next/link";

import { 
  MoreVertical, 
  ExternalLink, 
  CheckCircle, 
  XCircle, 
  Clock,
  Banknote
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

export default function LoanTable({ loans, onUpdate }: { loans: any[], onUpdate: () => void }) {
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const updateStatus = async (id: string, status: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/loans/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        toast.success(`Loan status updated to ${status}`);
        onUpdate();
      } else {
        toast.error("Failed to update status");
      }
    } catch (err) {
      toast.error("An error occurred");
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none px-3 py-1">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-200 border-none px-3 py-1">Rejected</Badge>;
      case 'paid':
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-none px-3 py-1">Paid Full</Badge>;
      default:
        return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-none px-3 py-1">Pending</Badge>;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Borrower</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Amount</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Duration</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Date</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {loans.map((loan) => (
              <tr key={loan._id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm">
                      {loan.fullName?.[0] || 'U'}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 leading-none">{loan.fullName}</p>
                      <span className="text-xs text-slate-400">{loan.phone}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="font-bold text-slate-900 leading-none">₦{loan.loanAmount?.toLocaleString()}</p>
                    <span className="text-xs text-primary font-medium">Total: ₦{loan.totalLoan?.toLocaleString()}</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-slate-600">{loan.loanDuration}</td>
                <td className="px-6 py-4 text-slate-500 text-sm">{new Date(loan.submittedAt).toLocaleDateString()}</td>
                <td className="px-6 py-4">{getStatusBadge(loan.status)}</td>
                <td className="px-6 py-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all outline-none">
                      <MoreVertical className="w-5 h-5 text-slate-400" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 p-2 rounded-xl border-slate-100 shadow-xl">
                      <DropdownMenuItem onClick={() => updateStatus(loan._id, 'approved')} className="gap-2 p-2.5 cursor-pointer text-emerald-600 font-medium">
                        <CheckCircle className="w-4 h-4" /> Approve Loan
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => updateStatus(loan._id, 'rejected')} className="gap-2 p-2.5 cursor-pointer text-rose-600 font-medium">
                        <XCircle className="w-4 h-4" /> Reject Loan
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => updateStatus(loan._id, 'paid')} className="gap-2 p-2.5 cursor-pointer text-blue-600 font-medium">
                        <Banknote className="w-4 h-4" /> Mark as Paid
                      </DropdownMenuItem>
                      <div className="h-px bg-slate-50 my-1" />
                      <Link href={`/admin/loans/${loan._id}`}>
                        <DropdownMenuItem className="gap-2 p-2.5 cursor-pointer text-slate-600 font-medium">
                          <ExternalLink className="w-4 h-4" /> View Details
                        </DropdownMenuItem>
                      </Link>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {loans.length === 0 && (
        <div className="py-20 text-center">
          <Clock className="w-12 h-12 text-slate-200 mx-auto mb-4" />
          <p className="text-slate-400 font-medium">No loan applications found</p>
        </div>
      )}
    </div>
  );
}
