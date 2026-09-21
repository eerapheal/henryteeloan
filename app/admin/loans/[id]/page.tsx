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
  Loader2,
  Building2,
  CreditCard,
  Copy,
  Check,
  Menu,
  ExternalLink,
  Receipt,
  FileCheck2,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import AdminSidebar from "@/components/admin/sidebar";
import { cn } from "@/lib/utils";

export default function LoanDetailsPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  
  const [loan, setLoan] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const fetchLoan = async () => {
    if (!id) return;
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
      toast.error("An error occurred while fetching loan details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoan();
  }, [id]);

  const copyToClipboard = (text: string, fieldName: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    toast.success(`${fieldName} copied to clipboard`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const updateStatus = async (status: string) => {
    setUpdating(true);
    try {
      const res = await fetch(`/api/admin/loans/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        toast.success(`Application status updated to ${status.toUpperCase()}`);
        await fetchLoan();
      } else {
        toast.error("Failed to update status");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error occurred while updating status");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#FAFBFC]">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-[#0F2B46] mx-auto mb-4" />
          <p className="text-slate-500 font-medium">Loading Loan Application...</p>
        </div>
      </div>
    );
  }

  if (!loan) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#FAFBFC]">
        <div className="text-center max-w-md p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-slate-900 mb-2">Application Not Found</h2>
          <p className="text-slate-500 text-sm mb-6">The requested loan application could not be located or may have been removed.</p>
          <Button onClick={() => router.push("/admin?tab=loans")} className="bg-[#0F2B46] text-white">
            Return to Loan List
          </Button>
        </div>
      </div>
    );
  }

  const formatCurrency = (val: number | string | undefined) => {
    if (val === undefined || val === null) return "0";
    const num = typeof val === "string" ? parseFloat(val) : val;
    return isNaN(num) ? "0" : num.toLocaleString();
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAF8]">
      <AdminSidebar 
        activeTab="loans" 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      
      <main className="flex-grow p-4 lg:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {/* Top Bar with Mobile Menu & Back Link */}
          <div className="flex items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden" 
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </Button>
              <button 
                onClick={() => router.push("/admin?tab=loans")}
                className="flex items-center gap-2 text-slate-500 hover:text-[#0F2B46] transition-colors group font-semibold text-sm"
              >
                <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center group-hover:border-[#0F2B46] transition-all">
                  <ChevronLeft className="w-4 h-4 text-slate-600 group-hover:text-[#0F2B46]" />
                </div>
                <span>Back to Loans</span>
              </button>
            </div>

            {/* Quick Application ID Pill */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => copyToClipboard(loan._id || id, "Application ID")}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:border-slate-300 rounded-xl text-xs font-mono text-slate-600 transition-all shadow-sm"
                title="Click to copy Application ID"
              >
                <span>ID: {loan.applicationId || (loan._id ? loan._id.toString().slice(-8) : id.slice(-8))}</span>
                {copiedField === "Application ID" ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                )}
              </button>
            </div>
          </div>

          {/* Header Banner Section */}
          <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-100 shadow-sm mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <Badge className={cn(
                    "px-3.5 py-1 rounded-lg border-none text-xs font-bold uppercase tracking-wider",
                    loan.status === 'approved' ? "bg-emerald-100 text-emerald-700" :
                    loan.status === 'rejected' ? "bg-rose-100 text-rose-700" :
                    loan.status === 'paid' ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"
                  )}>
                    {loan.status}
                  </Badge>
                  <span className="text-slate-400 text-xs font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    Applied on {loan.submittedAt ? new Date(loan.submittedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'N/A'}
                  </span>
                </div>
                <h1 className="text-2xl lg:text-3xl font-extrabold text-[#0F2B46] tracking-tight">
                  {loan.fullName || "Applicant"}
                </h1>
                <p className="text-slate-500 text-sm mt-1 flex items-center gap-2">
                  <span>Borrower on Agreement: <strong className="text-slate-800">{loan.borrowerName || loan.fullName}</strong></span>
                  {loan.agreementDate && (
                    <>
                      <span>•</span>
                      <span>Agreement Date: <strong className="text-slate-800">{loan.agreementDate}</strong></span>
                    </>
                  )}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <Button 
                  variant="outline" 
                  className={cn(
                    "rounded-xl border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300 font-semibold transition-all",
                    loan.status === 'rejected' && "opacity-50 pointer-events-none"
                  )}
                  onClick={() => updateStatus('rejected')}
                  disabled={updating}
                >
                  <XCircle className="w-4 h-4 mr-1.5" />
                  Reject
                </Button>

                <Button 
                  variant="outline"
                  className={cn(
                    "rounded-xl border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 font-semibold transition-all",
                    loan.status === 'paid' && "opacity-50 pointer-events-none"
                  )}
                  onClick={() => updateStatus('paid')}
                  disabled={updating}
                >
                  <CheckCircle className="w-4 h-4 mr-1.5" />
                  Mark as Paid
                </Button>

                <Button 
                  className={cn(
                    "bg-[#0F2B46] hover:bg-[#1a3a5a] text-white rounded-xl shadow-lg shadow-[#0F2B46]/20 px-6 font-semibold transition-all",
                    loan.status === 'approved' && "bg-emerald-600 hover:bg-emerald-700"
                  )}
                  onClick={() => updateStatus('approved')}
                  disabled={updating}
                >
                  {updating ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <CheckCircle className="w-4 h-4 mr-1.5" />
                  )}
                  {loan.status === 'approved' ? 'Approved (Update)' : 'Approve Loan'}
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Financial Summary Card */}
              <Card className="p-6 lg:p-8 border-none shadow-sm rounded-3xl overflow-hidden relative bg-white">
                <div className="absolute top-0 right-0 w-36 h-36 bg-[#C8992C]/5 rounded-full -mr-16 -mt-16 pointer-events-none" />
                <h3 className="text-lg font-bold text-[#0F2B46] mb-6 flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-amber-50 text-[#C8992C]">
                    <Banknote className="w-5 h-5" />
                  </div>
                  Financial Overview
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="p-5 bg-[#FAFBFC] rounded-2xl border border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Requested Loan</p>
                    <p className="text-2xl font-black text-[#0F2B46]">₦{formatCurrency(loan.loanAmount)}</p>
                  </div>
                  <div className="p-5 bg-[#0F2B46] rounded-2xl shadow-lg shadow-[#0F2B46]/20">
                    <p className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-1">Total Repayable</p>
                    <p className="text-2xl font-black text-white">₦{formatCurrency(loan.totalLoan)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                  <div className="p-3.5 bg-slate-50/70 rounded-xl">
                    <p className="text-xs text-slate-500 font-medium">Interest Rate</p>
                    <p className="text-base font-bold text-[#0F2B46] mt-0.5">{loan.interestRate || '10%'}</p>
                  </div>
                  <div className="p-3.5 bg-slate-50/70 rounded-xl">
                    <p className="text-xs text-slate-500 font-medium">Duration</p>
                    <p className="text-base font-bold text-[#0F2B46] mt-0.5">{loan.loanDuration} Months</p>
                  </div>
                  <div className="p-3.5 bg-slate-50/70 rounded-xl col-span-2 sm:col-span-1">
                    <p className="text-xs text-slate-500 font-medium">Previous Debt</p>
                    <p className={cn("text-base font-bold mt-0.5", loan.previousLoan > 0 ? "text-rose-500" : "text-slate-600")}>
                      ₦{formatCurrency(loan.previousLoan)}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Bank Account Details Card (CRITICAL - WAS MISSING) */}
              <Card className="p-6 lg:p-8 border-none shadow-sm rounded-3xl bg-white">
                <h3 className="text-lg font-bold text-[#0F2B46] mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <span>Bank Disbursement Details</span>
                  </div>
                  <Badge className="bg-emerald-50 text-emerald-700 border-none text-xs font-semibold">
                    Verified Account
                  </Badge>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-5 bg-slate-50/70 rounded-2xl border border-slate-100/80">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Bank Name</p>
                    <p className="font-extrabold text-[#0F2B46] text-lg flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-slate-400" />
                      {loan.bankName || "Not provided"}
                    </p>
                  </div>

                  <div className="p-5 bg-slate-50/70 rounded-2xl border border-slate-100/80 md:col-span-2">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Account Number</p>
                      {loan.accountNumber && (
                        <button
                          onClick={() => copyToClipboard(loan.accountNumber, "Account Number")}
                          className="text-xs text-primary font-semibold flex items-center gap-1 hover:underline"
                        >
                          {copiedField === "Account Number" ? (
                            <Check className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                          Copy
                        </button>
                      )}
                    </div>
                    <p className="font-mono font-black text-2xl text-slate-900 tracking-wider">
                      {loan.accountNumber || "Not provided"}
                    </p>
                    <p className="text-xs text-slate-500 font-medium mt-1">
                      Account Name: <strong className="text-slate-800">{loan.accountName || loan.fullName || "Not provided"}</strong>
                    </p>
                  </div>
                </div>
              </Card>

              {/* Personal Information */}
              <Card className="p-6 lg:p-8 border-none shadow-sm rounded-3xl bg-white">
                <h3 className="text-lg font-bold text-[#0F2B46] mb-6 flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
                    <User className="w-5 h-5" />
                  </div>
                  Personal & Employment Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3.5 p-3 rounded-2xl hover:bg-slate-50/60 transition-colors">
                      <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                        <User className="w-5 h-5 text-slate-500" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Name</p>
                        <p className="font-bold text-[#0F2B46] text-base">{loan.fullName}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5 p-3 rounded-2xl hover:bg-slate-50/60 transition-colors">
                      <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5 text-slate-500" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</p>
                        <a href={`mailto:${loan.email}`} className="font-bold text-[#0F2B46] text-sm hover:underline block break-all">
                          {loan.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5 p-3 rounded-2xl hover:bg-slate-50/60 transition-colors">
                      <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5 text-slate-500" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Phone Number</p>
                        <a href={`tel:${loan.phone}`} className="font-bold text-[#0F2B46] text-sm hover:underline">
                          {loan.phone}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3.5 p-3 rounded-2xl hover:bg-slate-50/60 transition-colors">
                      <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                        <Shield className="w-5 h-5 text-slate-500" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">NIN</p>
                          {loan.nin && (
                            <button
                              onClick={() => copyToClipboard(loan.nin, "NIN")}
                              className="text-xs text-primary font-semibold flex items-center gap-1 hover:underline ml-2"
                            >
                              <Copy className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                        <p className="font-mono font-bold text-[#0F2B46] tracking-wider text-base">{loan.nin || "Not provided"}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5 p-3 rounded-2xl hover:bg-slate-50/60 transition-colors">
                      <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                        <Briefcase className="w-5 h-5 text-slate-500" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Place of Work</p>
                        <p className="font-bold text-[#0F2B46] text-sm">{loan.placeOfWork || "Not provided"}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Addresses */}
                <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50/70 rounded-2xl border border-slate-100/80">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" /> Residential Address
                    </p>
                    <p className="text-sm font-semibold text-slate-800 leading-relaxed mt-1">
                      {loan.homeAddress || "Not provided"}
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50/70 rounded-2xl border border-slate-100/80">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" /> Office Address
                    </p>
                    <p className="text-sm font-semibold text-slate-800 leading-relaxed mt-1">
                      {loan.officeAddress || "Not provided"}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Agreement Metadata Card (CRITICAL - WAS MISSING) */}
              <Card className="p-6 lg:p-8 border-none shadow-sm rounded-3xl bg-white">
                <h3 className="text-lg font-bold text-[#0F2B46] mb-6 flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                    <FileCheck2 className="w-5 h-5" />
                  </div>
                  Loan Agreement Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50/70 rounded-2xl border border-slate-100/80">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Borrower Full Name on Agreement</p>
                    <p className="font-bold text-[#0F2B46] text-base">{loan.borrowerName || loan.fullName || "N/A"}</p>
                  </div>
                  <div className="p-4 bg-slate-50/70 rounded-2xl border border-slate-100/80">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Agreement Execution Date</p>
                    <p className="font-bold text-[#0F2B46] text-base">{loan.agreementDate || "N/A"}</p>
                  </div>
                </div>
              </Card>

            </div>

            {/* Sidebar Column */}
            <div className="space-y-8">
              
              {/* Guarantor Info */}
              <Card className="p-6 lg:p-8 border-none shadow-sm rounded-3xl bg-white">
                <h3 className="text-lg font-bold text-[#0F2B46] mb-6 flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                    <Shield className="w-5 h-5" />
                  </div>
                  Guarantor Details
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50/70 rounded-2xl border border-slate-100/80">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Guarantor Name</p>
                    <p className="font-extrabold text-[#0F2B46] text-base">{loan.guarantorName || "None provided"}</p>
                  </div>

                  <div className="p-4 bg-slate-50/70 rounded-2xl border border-slate-100/80">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Phone Number</p>
                    {loan.guarantorPhone ? (
                      <a href={`tel:${loan.guarantorPhone}`} className="font-bold text-[#0F2B46] text-sm hover:underline flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        {loan.guarantorPhone}
                      </a>
                    ) : (
                      <p className="text-slate-400 text-sm">Not provided</p>
                    )}
                  </div>

                  <div className="p-4 bg-slate-50/70 rounded-2xl border border-slate-100/80">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Email Address</p>
                    {loan.guarantorEmail ? (
                      <a href={`mailto:${loan.guarantorEmail}`} className="font-bold text-[#0F2B46] text-sm hover:underline flex items-center gap-1.5 truncate">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        {loan.guarantorEmail}
                      </a>
                    ) : (
                      <p className="text-slate-400 text-sm">Not provided</p>
                    )}
                  </div>
                </div>
              </Card>

              {/* NIN Document Card */}
              <Card className="p-6 lg:p-8 border-none shadow-sm rounded-3xl bg-white overflow-hidden group">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-[#0F2B46] flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                      <FileText className="w-5 h-5" />
                    </div>
                    NIN Identity Proof
                  </h3>
                  {loan.ninCopy && (
                    <a 
                      href={loan.ninCopy} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-primary font-semibold flex items-center gap-1 hover:underline"
                    >
                      <span>Open</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                {loan.ninCopy ? (
                  <div className="relative rounded-2xl overflow-hidden border border-slate-200 aspect-[4/3] bg-slate-100">
                    <img 
                      src={loan.ninCopy} 
                      alt="NIN Document Proof" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                      <a 
                        href={loan.ninCopy} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-white text-[#0F2B46] px-4 py-2 rounded-xl font-bold text-xs shadow-xl hover:bg-slate-50 transition-colors flex items-center gap-1.5"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        View Full Image
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 bg-slate-50 rounded-2xl flex flex-col items-center justify-center text-center border border-dashed border-slate-200">
                    <FileText className="w-8 h-8 text-slate-300 mb-2" />
                    <p className="text-sm font-medium text-slate-500">No NIN document uploaded</p>
                    <p className="text-xs text-slate-400 mt-1">Applicant skipped upload</p>
                  </div>
                )}
              </Card>

              {/* Status Timeline Card */}
              <Card className="p-6 lg:p-8 border-none shadow-sm rounded-3xl bg-white">
                <h3 className="text-lg font-bold text-[#0F2B46] mb-6 flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                    <Clock className="w-5 h-5" />
                  </div>
                  Application Timeline
                </h3>
                <div className="space-y-6 relative before:absolute before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-100">
                  <div className="flex gap-4 relative z-10">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center shrink-0 shadow-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#0F2B46]">Application Received</p>
                      <p className="text-xs text-slate-400 font-medium mt-0.5">
                        {loan.submittedAt ? new Date(loan.submittedAt).toLocaleString() : 'N/A'}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 relative z-10">
                    <div className={cn(
                      "w-8 h-8 rounded-full border-2 border-white flex items-center justify-center shrink-0 shadow-sm",
                      loan.status === 'approved' ? "bg-emerald-100 text-emerald-600" :
                      loan.status === 'rejected' ? "bg-rose-100 text-rose-600" :
                      loan.status === 'paid' ? "bg-blue-100 text-blue-600" : "bg-amber-100 text-amber-600"
                    )}>
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#0F2B46] capitalize">Status: {loan.status}</p>
                      <p className="text-xs text-slate-400 font-medium mt-0.5">
                        {loan.updatedAt ? new Date(loan.updatedAt).toLocaleString() : 'Pending review'}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
