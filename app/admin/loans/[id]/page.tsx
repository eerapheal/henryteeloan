'use client';

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { 
  ChevronLeft, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Calendar, 
  Shield, 
  Banknote,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import AdminSidebar from "@/components/admin/sidebar";
import { cn } from "@/lib/utils";

export default function LoanDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [loan, setLoan] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const fetchLoan = async () => {
    try {
      const res = await fetch(`/api/admin/loans/${id}`);
      if (res.ok) {
        const data = await res.json();
        setLoan(data);
      } else {
        toast.error("Failed to load loan details");
        router.push("/admin?tab=loans");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoan();
  }, [id]);

  const updateStatus = async (status: string) => {
    setUpdating(true);
    try {
      const res = await fetch(`/api/admin/loans/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        toast.success(`Status updated to ${status}`);
        fetchLoan();
      } else {
        toast.error("Update failed");
      }
    } catch (err) {
      toast.error("Error occurred");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-50">
        <Loader2 className="w-10 h-10 animate-spin text-[#0F2B46]" />
      </div>
    );
  }

  if (!loan) return null;

  return (
    <div className="flex min-h-screen bg-[#F8FAF8]">
      <AdminSidebar activeTab="loans" isOpen={false} onClose={() => {}} />
      
      <main className="flex-grow p-4 lg:p-12 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-500 hover:text-[#0F2B46] mb-8 transition-colors group font-semibold"
          >
            <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center group-hover:bg-[#0F2B46]/5 transition-all">
              <ChevronLeft className="w-4 h-4" />
            </div>
            Back to Dashboard
          </button>

          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge className={cn(
                  "px-3 py-1 rounded-lg border-none text-[10px] font-bold uppercase tracking-wider",
                  loan.status === 'approved' ? "bg-emerald-100 text-emerald-700" :
                  loan.status === 'rejected' ? "bg-rose-100 text-rose-700" :
                  loan.status === 'paid' ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"
                )}>
                  {loan.status}
                </Badge>
                <span className="text-slate-400 font-medium text-sm">Submitted on {new Date(loan.submittedAt).toLocaleDateString()}</span>
              </div>
              <h1 className="text-3xl font-extrabold text-[#0F2B46] tracking-tight mb-2">
                Loan Application Details
              </h1>
              <p className="text-slate-500 font-medium">Application ID: <span className="font-mono text-[#C8992C]">{loan._id}</span></p>
            </div>

            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                className="bg-white border-slate-200 rounded-xl text-rose-600 hover:bg-rose-50"
                onClick={() => updateStatus('rejected')}
                disabled={updating}
              >
                Reject Application
              </Button>
              <Button 
                className="bg-[#0F2B46] hover:bg-[#1a3a5a] text-white rounded-xl shadow-lg shadow-[#0F2B46]/20 px-8"
                onClick={() => updateStatus('approved')}
                disabled={updating}
              >
                {updating ? <Loader2 className="w-4 h-4 animate-spin" /> : "Approve Application"}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Financial Summary */}
              <Card className="p-8 border-none shadow-sm rounded-3xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#C8992C]/5 rounded-full -mr-16 -mt-16 pointer-events-none" />
                <h3 className="text-lg font-bold text-[#0F2B46] mb-8 flex items-center gap-2">
                  <Banknote className="w-5 h-5 text-[#C8992C]" />
                  Financial Summary
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-6 bg-[#FAFBFC] rounded-2xl border border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Requested Amount</p>
                    <p className="text-2xl font-black text-[#0F2B46]">₦{loan.loanAmount?.toLocaleString()}</p>
                  </div>
                  <div className="p-6 bg-[#0F2B46] rounded-2xl shadow-xl shadow-[#0F2B46]/20">
                    <p className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-1">Total Repayable</p>
                    <p className="text-2xl font-black text-white">₦{loan.totalLoan?.toLocaleString()}</p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500 font-medium">Interest Rate</span>
                      <span className="font-bold text-[#0F2B46]">{loan.interestRate}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500 font-medium">Duration</span>
                      <span className="font-bold text-[#0F2B46]">{loan.loanDuration} Months</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500 font-medium">Previous Debt</span>
                      <span className="font-bold text-rose-500">₦{loan.previousLoan?.toLocaleString() || '0'}</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Personal Information */}
              <Card className="p-8 border-none shadow-sm rounded-3xl">
                <h3 className="text-lg font-bold text-[#0F2B46] mb-8 flex items-center gap-2">
                  <User className="w-5 h-5 text-[#C8992C]" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center shrink-0">
                        <User className="w-5 h-5 text-slate-400" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Name</p>
                        <p className="font-bold text-[#0F2B46]">{loan.fullName}</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5 text-slate-400" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</p>
                        <p className="font-bold text-[#0F2B46]">{loan.email}</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5 text-slate-400" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Phone Number</p>
                        <p className="font-bold text-[#0F2B46]">{loan.phone}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center shrink-0">
                        <Shield className="w-5 h-5 text-slate-400" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">National Identity Number (NIN)</p>
                        <p className="font-bold text-[#0F2B46] tracking-wider">{loan.nin}</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center shrink-0">
                        <Briefcase className="w-5 h-5 text-slate-400" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Workplace</p>
                        <p className="font-bold text-[#0F2B46]">{loan.placeOfWork}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-10 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Residential Address</p>
                      <p className="text-sm font-semibold text-[#0F2B46] mt-1 leading-relaxed">{loan.homeAddress}</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Office Address</p>
                      <p className="text-sm font-semibold text-[#0F2B46] mt-1 leading-relaxed">{loan.officeAddress}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar Details */}
            <div className="space-y-8">
              {/* Guarantor Info */}
              <Card className="p-8 border-none shadow-sm rounded-3xl bg-white">
                <h3 className="text-lg font-bold text-[#0F2B46] mb-6 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#C8992C]" />
                  Guarantor
                </h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Name</p>
                    <p className="font-bold text-[#0F2B46]">{loan.guarantorName}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Phone</p>
                    <p className="font-bold text-[#0F2B46]">{loan.guarantorPhone}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email</p>
                    <p className="font-bold text-[#0F2B46] truncate">{loan.guarantorEmail}</p>
                  </div>
                </div>
              </Card>

              {/* NIN Copy */}
              <Card className="p-8 border-none shadow-sm rounded-3xl bg-white overflow-hidden group">
                <h3 className="text-lg font-bold text-[#0F2B46] mb-6 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#C8992C]" />
                  NIN Document
                </h3>
                {loan.ninCopy ? (
                  <div className="relative rounded-2xl overflow-hidden border border-slate-100 aspect-[4/3]">
                    <img 
                      src={loan.ninCopy} 
                      alt="NIN Document" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <a 
                        href={loan.ninCopy} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-white text-[#0F2B46] px-4 py-2 rounded-xl font-bold text-sm shadow-xl"
                      >
                        View Full Document
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="p-10 bg-slate-50 rounded-2xl flex flex-col items-center justify-center text-center">
                    <FileText className="w-8 h-8 text-slate-300 mb-2" />
                    <p className="text-sm font-medium text-slate-400">No document uploaded</p>
                  </div>
                )}
              </Card>

              {/* Status Timeline */}
              <Card className="p-8 border-none shadow-sm rounded-3xl bg-white">
                <h3 className="text-lg font-bold text-[#0F2B46] mb-6 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#C8992C]" />
                  Timeline
                </h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#0F2B46]">Application Submitted</p>
                      <p className="text-xs text-slate-400 font-medium">{new Date(loan.submittedAt).toLocaleString()}</p>
                    </div>
                  </div>
                  {loan.status !== 'pending' && (
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-[#0F2B46]/10 flex items-center justify-center shrink-0">
                        <Clock className="w-4 h-4 text-[#0F2B46]" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#0F2B46]">Status Updated to {loan.status}</p>
                        <p className="text-xs text-slate-400 font-medium">{new Date(loan.updatedAt || loan.submittedAt).toLocaleString()}</p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
