'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, AlertCircle, Loader2, FileText, Info, ShieldCheck } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { toast } from 'sonner';
import { useSettings } from '@/components/settings-provider';

export default function ApplyPage() {
  const settings = useSettings();

  const [formData, setFormData] = useState({
    agreementDay: new Date().getDate().toString(),
    agreementMonth: new Date().toLocaleString('default', { month: 'long' }),
    agreementYear: new Date().getFullYear().toString().slice(-2),
    borrowerName: '',
    loanAmount: '',
    previousLoan: '',
    totalLoan: '',
    interestRate: `${settings.interestRate}%`,
    
    // Loan Requirements
    fullName: '',
    phone: '',
    email: '',
    nin: '',
    loanDuration: '',
    placeOfWork: '',
    homeAddress: '',
    officeAddress: '',
    
    // Guarantor
    guarantorName: '',
    guarantorPhone: '',
    guarantorEmail: '',
    
    // Agreement
    agreeToTerms: false,
    ninCopy: null as File | null,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreeToTerms) {
      toast.error('Agreement Required', {
        description: 'You must agree to the terms to proceed.',
      });
      return;
    }

    if (!formData.ninCopy) {
      toast.error('NIN Copy Required', {
        description: 'Please upload a copy of your NIN.',
      });
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Convert file to base64 for the API
      let ninCopyBase64 = '';
      if (formData.ninCopy) {
        ninCopyBase64 = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(formData.ninCopy as File);
        });
      }

      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          ninCopy: ninCopyBase64,
          loanType: 'personal-loan',
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to submit application');
      }

      setSuccess(true);
      toast.success('Agreement Submitted!', {
        description: 'Your loan agreement has been successfully submitted for processing.',
      });

      // Clear form
      setFormData({
        agreementDay: new Date().getDate().toString(),
        agreementMonth: new Date().toLocaleString('default', { month: 'long' }),
        agreementYear: new Date().getFullYear().toString().slice(-2),
        borrowerName: '',
        loanAmount: '',
        previousLoan: '',
        totalLoan: '',
        interestRate: `${settings.interestRate}%`,
        fullName: '',
        phone: '',
        email: '',
        nin: '',
        loanDuration: '',
        placeOfWork: '',
        homeAddress: '',
        officeAddress: '',
        guarantorName: '',
        guarantorPhone: '',
        guarantorEmail: '',
        agreeToTerms: false,
        ninCopy: null,
      });

      setTimeout(() => setSuccess(false), 8000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      toast.error('Submission Failed', {
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
      <Header />

      {/* Hero Header */}
      <section className="py-24 bg-navy-gradient text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-[#C8992C]/15 rounded-full blur-[120px] opacity-60 pointer-events-none"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeInLeft text-center lg:text-left">
              <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full text-sm font-semibold text-[#E8A838] mb-6">
                ✦ Secure Application
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Loan <span className="text-gradient-gold">Agreement</span></h1>
              <p className="text-slate-300 max-w-2xl mx-auto lg:mx-0 text-lg font-light leading-relaxed">
                Please fill out the form below to complete your loan application. This is a binding agreement between you and Henrytee Loans.
              </p>
            </div>
            <div className="animate-fadeInRight">
              <img 
                src="/testimonial-video-1.png" 
                alt="Henrytee Loans Professional Underwriter" 
                className="w-full h-auto rounded-2xl shadow-2xl animate-float border border-white/10"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 relative bg-[#FAFBFC]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {success && (
            <Card className="mb-12 p-8 border-emerald-200 bg-emerald-50 shadow-soft animate-fadeInUp">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-7 h-7 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-emerald-900 text-xl mb-1">Agreement Submitted Successfully!</h3>
                  <p className="text-emerald-800 text-sm">
                    Your application is being reviewed by our underwriting team. We will contact you via phone shortly to finalize disbursement.
                  </p>
                </div>
              </div>
            </Card>
          )}

          {error && (
            <Card className="mb-12 p-8 border-red-200 bg-red-50 shadow-soft animate-fadeInUp">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-7 h-7 text-red-600" />
                </div>
                <div>
                  <h3 className="font-bold text-red-900 text-xl mb-1">Submission Error</h3>
                  <p className="text-red-800 text-sm">{error}</p>
                </div>
              </div>
            </Card>
          )}

          <Card className="px-5 py-10 md:p-10 border border-[#E4E7EC] shadow-soft bg-white rounded-3xl animate-fadeInUp relative z-20 -mt-16">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0F2B46] text-white px-4 py-3 rounded-full font-bold shadow-lg flex items-center gap-2 border border-[#C8992C]/30 text-sm tracking-wider">
              <ShieldCheck className="w-6 h-4 text-[#C8992C]" />
              OFFICIAL SECURE FORM
            </div>

            <form onSubmit={handleSubmit} className="space-y-12">
              {/* Agreement Header Section */}
              <div className="space-y-4 text-[#1A2332] italic border-b border-[#E4E7EC] pb-10">
                <div className="flex flex-wrap items-center gap-3 leading-relaxed text-lg">
                  This loan agreement is made on this 
                  <input 
                    type="text" 
                    name="agreementDay" 
                    value={formData.agreementDay} 
                    onChange={handleChange}
                    className="w-14 border-b-2 border-[#C8992C]/40 focus:border-[#0F2B46] outline-none text-center bg-transparent font-bold not-italic text-[#0F2B46] transition-colors"
                    placeholder="---"
                  /> 
                  day of 
                  <input 
                    type="text" 
                    name="agreementMonth" 
                    value={formData.agreementMonth} 
                    onChange={handleChange}
                    className="w-36 border-b-2 border-[#C8992C]/40 focus:border-[#0F2B46] outline-none text-center bg-transparent font-bold not-italic text-[#0F2B46] transition-colors"
                    placeholder="-----------"
                  /> 
                  20
                  <input 
                    type="text" 
                    name="agreementYear" 
                    value={formData.agreementYear} 
                    onChange={handleChange}
                    className="w-12 border-b-2 border-[#C8992C]/40 focus:border-[#0F2B46] outline-none text-center bg-transparent font-bold not-italic text-[#0F2B46] transition-colors"
                    placeholder="---"
                  />
                  between <strong className="not-italic text-[#0F2B46]">Ekpenisi Henry Happiness</strong> and 
                  <input 
                    type="text" 
                    name="borrowerName" 
                    value={formData.borrowerName} 
                    onChange={handleChange}
                    className="flex-grow min-w-[250px] border-b-2 border-[#C8992C]/40 focus:border-[#0F2B46] outline-none px-2 bg-transparent font-bold not-italic text-[#0F2B46] transition-colors"
                    placeholder="Enter Borrower Full Name"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-4">
                  <div className="space-y-5">
                    <div className="flex items-center gap-3">
                      <span className="shrink-0 font-bold not-italic text-sm text-[#5A6577] uppercase tracking-wide w-32">Loan amount:</span>
                      <div className="relative flex-grow">
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 font-bold not-italic text-[#0F2B46]">₦</span>
                        <input 
                          type="number" 
                          name="loanAmount" 
                          value={formData.loanAmount} 
                          onChange={handleChange}
                          className="w-full border-b-2 border-[#C8992C]/30 focus:border-[#0F2B46] outline-none pl-6 bg-transparent font-bold not-italic text-[#0F2B46] text-xl pb-1 transition-colors"
                          placeholder="0.00"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="shrink-0 font-bold not-italic text-sm text-[#5A6577] uppercase tracking-wide w-32">Previous loan:</span>
                      <div className="relative flex-grow">
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 font-bold not-italic text-[#0F2B46]">₦</span>
                        <input 
                          type="number" 
                          name="previousLoan" 
                          value={formData.previousLoan} 
                          onChange={handleChange}
                          className="w-full border-b-2 border-[#C8992C]/30 focus:border-[#0F2B46] outline-none pl-6 bg-transparent font-bold not-italic text-[#0F2B46] text-xl pb-1 transition-colors"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-5">
                    <div className="flex items-center gap-3">
                      <span className="shrink-0 font-bold not-italic text-sm text-[#5A6577] uppercase tracking-wide w-32">Total loan:</span>
                      <div className="relative flex-grow">
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 font-bold not-italic text-[#0F2B46]">₦</span>
                        <input 
                          type="number" 
                          name="totalLoan" 
                          value={formData.totalLoan} 
                          onChange={handleChange}
                          className="w-full border-b-2 border-[#C8992C]/30 focus:border-[#0F2B46] outline-none pl-6 bg-transparent font-bold not-italic text-[#0F2B46] text-xl pb-1 transition-colors"
                          placeholder="0.00"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="shrink-0 font-bold not-italic text-sm text-[#5A6577] uppercase tracking-wide w-32">Interest rate:</span>
                      <div className="flex items-center gap-2">
                        <input 
                          type="text" 
                          name="interestRate" 
                          value={formData.interestRate} 
                          readOnly
                          className="w-16 border-b-2 border-[#C8992C]/20 outline-none text-center bg-transparent font-bold not-italic text-[#C8992C] text-xl"
                        />
                        <span className="font-bold not-italic text-[#5A6577] text-sm uppercase tracking-wide">monthly</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Loan Requirements Section */}
              <div className="space-y-8">
                <div className="flex items-center gap-3 text-[#0F2B46]">
                  <div className="w-10 h-10 bg-[#0F2B46]/5 rounded-xl flex items-center justify-center">
                    <Info className="w-5 h-5 text-[#C8992C]" />
                  </div>
                  <h3 className="text-xl font-bold uppercase tracking-wider">Loan Requirements</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[#5A6577] uppercase tracking-widest ml-1">Full Name</label>
                    <input 
                      type="text" 
                      name="fullName" 
                      value={formData.fullName} 
                      onChange={handleChange}
                      className="w-full p-4 bg-[#FAFBFC] border border-[#E4E7EC] rounded-xl focus:ring-2 focus:ring-[#0F2B46] focus:bg-white outline-none transition-all font-medium text-[#1A2332]"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[#5A6577] uppercase tracking-widest ml-1">Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleChange}
                      className="w-full p-4 bg-[#FAFBFC] border border-[#E4E7EC] rounded-xl focus:ring-2 focus:ring-[#0F2B46] focus:bg-white outline-none transition-all font-medium text-[#1A2332]"
                      placeholder="e.g. 0800 000 0000"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[#5A6577] uppercase tracking-widest ml-1">Email Address</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange}
                      className="w-full p-4 bg-[#FAFBFC] border border-[#E4E7EC] rounded-xl focus:ring-2 focus:ring-[#0F2B46] focus:bg-white outline-none transition-all font-medium text-[#1A2332]"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[#5A6577] uppercase tracking-widest ml-1">NIN (National ID Number)</label>
                    <input 
                      type="text" 
                      name="nin" 
                      value={formData.nin} 
                      onChange={handleChange}
                      className="w-full p-4 bg-[#FAFBFC] border border-[#E4E7EC] rounded-xl focus:ring-2 focus:ring-[#0F2B46] focus:bg-white outline-none transition-all font-medium text-[#1A2332]"
                      placeholder="11-digit NIN number"
                      required
                      maxLength={11}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[#5A6577] uppercase tracking-widest ml-1">Upload Copy of NIN (Borrower Only)</label>
                    <div className="relative">
                      <input 
                        type="file" 
                        name="ninCopy" 
                        onChange={(e) => setFormData(prev => ({ ...prev, ninCopy: e.target.files?.[0] || null }))}
                        className="w-full p-3 bg-[#FAFBFC] border border-[#E4E7EC] rounded-xl focus:ring-2 focus:ring-[#0F2B46] outline-none font-medium text-xs file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:bg-[#0F2B46]/10 file:text-[#0F2B46] hover:file:bg-[#0F2B46]/20 transition-all"
                        accept="image/*,.pdf"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[#5A6577] uppercase tracking-widest ml-1">Loan Duration</label>
                    <input 
                      type="text" 
                      name="loanDuration" 
                      value={formData.loanDuration} 
                      onChange={handleChange}
                      className="w-full p-4 bg-[#FAFBFC] border border-[#E4E7EC] rounded-xl focus:ring-2 focus:ring-[#0F2B46] focus:bg-white outline-none transition-all font-medium text-[#1A2332]"
                      placeholder="e.g. 3 Months"
                      required
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-bold text-[#5A6577] uppercase tracking-widest ml-1">Place of Work</label>
                    <input 
                      type="text" 
                      name="placeOfWork" 
                      value={formData.placeOfWork} 
                      onChange={handleChange}
                      className="w-full p-4 bg-[#FAFBFC] border border-[#E4E7EC] rounded-xl focus:ring-2 focus:ring-[#0F2B46] focus:bg-white outline-none transition-all font-medium text-[#1A2332]"
                      placeholder="Company name and department"
                      required
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-bold text-[#5A6577] uppercase tracking-widest ml-1">Home Address</label>
                    <textarea 
                      name="homeAddress" 
                      value={formData.homeAddress} 
                      onChange={handleChange}
                      className="w-full p-4 bg-[#FAFBFC] border border-[#E4E7EC] rounded-xl focus:ring-2 focus:ring-[#0F2B46] focus:bg-white outline-none transition-all font-medium min-h-[100px] resize-none"
                      placeholder="Complete residential address"
                      required
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-bold text-[#5A6577] uppercase tracking-widest ml-1">Office Address</label>
                    <textarea 
                      name="officeAddress" 
                      value={formData.officeAddress} 
                      onChange={handleChange}
                      className="w-full p-4 bg-[#FAFBFC] border border-[#E4E7EC] rounded-xl focus:ring-2 focus:ring-[#0F2B46] focus:bg-white outline-none transition-all font-medium min-h-[100px] resize-none"
                      placeholder="Complete work/office address"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Guarantor Section */}
              <div className="space-y-8 pt-6">
                <div className="flex items-center gap-3 text-[#0F2B46]">
                  <div className="w-10 h-10 bg-[#0F2B46]/5 rounded-xl flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-[#C8992C]" />
                  </div>
                  <h3 className="text-xl font-bold uppercase tracking-wider">Guarantor Information</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-[#FAFBFC] p-5 rounded-3xl border border-[#E4E7EC]">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[#5A6577] uppercase tracking-widest ml-1">Guarantor Name</label>
                    <input 
                      type="text" 
                      name="guarantorName" 
                      value={formData.guarantorName} 
                      onChange={handleChange}
                      className="w-full p-3.5 bg-white border border-[#E4E7EC] rounded-xl focus:ring-2 focus:ring-[#0F2B46] outline-none font-semibold text-sm text-[#1A2332]"
                      placeholder="Full Name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[#5A6577] uppercase tracking-widest ml-1">Phone Number</label>
                    <input 
                      type="tel" 
                      name="guarantorPhone" 
                      value={formData.guarantorPhone} 
                      onChange={handleChange}
                      className="w-full p-3.5 bg-white border border-[#E4E7EC] rounded-xl focus:ring-2 focus:ring-[#0F2B46] outline-none font-semibold text-sm text-[#1A2332]"
                      placeholder="Phone Number"
                      required
                    />
                  </div>

                  <div className="md:col-span-3 space-y-2">
                    <label className="text-[10px] font-bold text-[#5A6577] uppercase tracking-widest ml-1">Guarantor Email Address</label>
                    <input 
                      type="email" 
                      name="guarantorEmail" 
                      value={formData.guarantorEmail} 
                      onChange={handleChange}
                      className="w-full p-3.5 bg-white border border-[#E4E7EC] rounded-xl focus:ring-2 focus:ring-[#0F2B46] outline-none font-semibold text-sm text-[#1A2332]"
                      placeholder="guarantor@email.com"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Legal Note Section */}
              <div className="bg-amber-50 border-l-4 border-[#C8992C] p-5 rounded-r-3xl space-y-4 shadow-sm">
                <div className="flex items-center gap-2 text-[#C8992C] font-bold uppercase tracking-widest text-xs">
                  <AlertCircle className="w-5 h-5" />
                  Important Legal Note
                </div>
                <p className="text-sm text-amber-900 leading-relaxed italic font-medium">
                  All interests are paid monthly and any default on the due date agreement, this form shall be submitted to the HR of your workplace for deduction from your salary. You can also be reported to financial crime agencies such as EFCC and Police for forceful recovery of the loan.
                </p>
              </div>

                <div className="flex items-start gap-4 bg-[#0F2B46]/5 p-5 rounded-2xl border border-[#0F2B46]/10 cursor-pointer group transition-all hover:bg-[#0F2B46]/10">
                  <input 
                    type="checkbox" 
                    id="agreeToTerms"
                    name="agreeToTerms" 
                    checked={formData.agreeToTerms} 
                    onChange={handleChange}
                    className="mt-1 w-6 h-6 rounded-md accent-[#0F2B46] cursor-pointer"
                    required
                  />
                  <label htmlFor="agreeToTerms" className="text-sm text-[#1A2332] cursor-pointer font-medium leading-relaxed">
                    I, <strong className="text-[#0F2B46]">{formData.fullName || '[Full Name]'}</strong>, hereby confirm that all information provided is accurate and I agree to the terms of this loan agreement as stated above. I understand this is a legally binding digital contract.
                  </label>
                </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-8">
                <Button 
                  type="submit" 
                  disabled={loading}
                  size="lg"
                  className="bg-[#0F2B46] hover:bg-[#0A1E33] text-white px-16 py-8 text-xl font-bold rounded-2xl shadow-xl shadow-[#0F2B46]/20 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70 group overflow-hidden relative"
                >
                  <span className="relative z-10 flex items-center">
                    {loading ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin mr-3" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <FileText className="w-6 h-6 mr-3 text-[#C8992C]" />
                        Submit Binding Agreement
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </Button>
              </div>
            </form>
          </Card>
          
          <div className="mt-12 text-center text-[#5A6577] text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-6">
            <span className="w-16 h-px bg-[#E4E7EC]"></span>
            Henrytee Loans Official Document
            <span className="w-16 h-px bg-[#E4E7EC]"></span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
