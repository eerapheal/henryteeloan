'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  MoreVertical, 
  ExternalLink, 
  CheckCircle, 
  XCircle, 
  Clock,
  Banknote,
  Eye,
  FileText,
  Calendar,
  Building2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";

export default function LoanTable({ loans, onUpdate }: { loans: any[], onUpdate: () => void }) {
  const router = useRouter();
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const updateStatus = async (id: string, status: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
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
        return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none px-3 py-1 font-semibold text-xs">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-200 border-none px-3 py-1 font-semibold text-xs">Rejected</Badge>;
      case 'paid':
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-none px-3 py-1 font-semibold text-xs">Paid Full</Badge>;
      default:
        return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-none px-3 py-1 font-semibold text-xs">Pending</Badge>;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-100">
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Borrower</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Amount & Repayable</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Duration</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Bank Details</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Date</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loans.map((loan) => (
              <tr 
                key={loan._id} 
                onClick={() => router.push(`/admin/loans/${loan._id}`)}
                className="hover:bg-slate-50/70 transition-colors group cursor-pointer"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#0F2B46]/10 text-[#0F2B46] font-bold rounded-xl flex items-center justify-center text-sm group-hover:bg-[#0F2B46] group-hover:text-white transition-colors">
                      {loan.fullName?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 group-hover:text-[#0F2B46] transition-colors">{loan.fullName}</p>
                      <span className="text-xs text-slate-400">{loan.phone || loan.email}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="font-bold text-slate-900">₦{(loan.loanAmount || 0).toLocaleString()}</p>
                    <span className="text-xs text-[#C8992C] font-semibold">Repay: ₦{(loan.totalLoan || 0).toLocaleString()}</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-slate-700">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 text-xs font-semibold text-slate-700">
                    {loan.loanDuration} {typeof loan.loanDuration === 'number' || !isNaN(Number(loan.loanDuration)) ? 'Months' : ''}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-xs">
                    <p className="font-semibold text-slate-800">{loan.bankName || "—"}</p>
                    <p className="font-mono text-slate-500">{loan.accountNumber || "—"}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-500 text-xs font-medium">
                  {loan.submittedAt ? new Date(loan.submittedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A'}
                </td>
                <td className="px-6 py-4">{getStatusBadge(loan.status)}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => router.push(`/admin/loans/${loan._id}`)}
                      className="text-xs font-semibold text-primary hover:bg-primary/10 rounded-lg px-2.5 py-1 h-8 flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      View
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="p-1.5 hover:bg-slate-100 rounded-lg transition-all outline-none">
                        <MoreVertical className="w-4 h-4 text-slate-400" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 p-2 rounded-xl border-slate-100 shadow-xl bg-white">
                        <DropdownMenuItem onClick={(e) => updateStatus(loan._id, 'approved', e)} className="gap-2 p-2.5 cursor-pointer text-emerald-600 font-medium rounded-lg">
                          <CheckCircle className="w-4 h-4" /> Approve Loan
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => updateStatus(loan._id, 'rejected', e)} className="gap-2 p-2.5 cursor-pointer text-rose-600 font-medium rounded-lg">
                          <XCircle className="w-4 h-4" /> Reject Loan
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => updateStatus(loan._id, 'paid', e)} className="gap-2 p-2.5 cursor-pointer text-blue-600 font-medium rounded-lg">
                          <Banknote className="w-4 h-4" /> Mark as Paid
                        </DropdownMenuItem>
                        <div className="h-px bg-slate-100 my-1" />
                        <DropdownMenuItem onClick={() => router.push(`/admin/loans/${loan._id}`)} className="gap-2 p-2.5 cursor-pointer text-slate-700 font-medium rounded-lg">
                          <ExternalLink className="w-4 h-4 text-slate-400" /> Full Details
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {loans.length === 0 && (
        <div className="py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-slate-400" />
          </div>
          <h4 className="text-base font-bold text-slate-800 mb-1">No Loan Applications</h4>
          <p className="text-slate-400 text-sm max-w-sm mx-auto">Applications submitted by users will automatically appear in this list.</p>
        </div>
      )}
    </div>
  );
}
