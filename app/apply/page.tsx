'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, AlertCircle, Loader2, FileText, Info } from 'lucide-react';
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
    guarantorNin: '',
    
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
        interestRate: '20%',
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
        guarantorNin: '',
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
    <div className="min-h-screen bg-[#F8FAF8] flex flex-col overflow-x-hidden">
      <Header />

      {/* Hero Header */}
      <section className="py-12 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Loan Agreement</h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Please fill out the form below to complete your loan application. This is a binding agreement between you and Henrytee Loans.
          </p>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {success && (
            <Card className="mb-8 p-6 border-green-200 bg-green-50 shadow-lg animate-fadeInUp">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-green-900 text-lg mb-1">Agreement Submitted Successfully!</h3>
                  <p className="text-green-800">
                    Your application is being reviewed. We will contact you via phone shortly.
                  </p>
                </div>
              </div>
            </Card>
          )}

          {error && (
            <Card className="mb-8 p-6 border-red-200 bg-red-50 shadow-lg animate-fadeInUp">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-bold text-red-900 text-lg mb-1">Submission Error</h3>
                  <p className="text-red-800">{error}</p>
                </div>
              </div>
            </Card>
          )}

          <Card className="p-8 md:p-12 border border-slate-200 shadow-xl bg-white rounded-2xl animate-fadeInUp relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-white px-6 py-2 rounded-full font-bold shadow-lg flex items-center gap-2">
              <FileText className="w-4 h-4" />
              OFFICIAL FORM
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Agreement Header Section */}
              <div className="space-y-6 text-slate-800 italic border-b border-slate-100 pb-8">
                <div className="flex flex-wrap items-center gap-2 leading-loose">
                  This loan agreement is made on this 
                  <input 
                    type="text" 
                    name="agreementDay" 
                    value={formData.agreementDay} 
                    onChange={handleChange}
                    className="w-12 border-b border-slate-400 focus:border-primary outline-none text-center bg-transparent font-bold not-italic"
                    placeholder="---"
                  /> 
                  day of 
                  <input 
                    type="text" 
                    name="agreementMonth" 
                    value={formData.agreementMonth} 
                    onChange={handleChange}
                    className="w-32 border-b border-slate-400 focus:border-primary outline-none text-center bg-transparent font-bold not-italic"
                    placeholder="-----------"
                  /> 
                  20
                  <input 
                    type="text" 
                    name="agreementYear" 
                    value={formData.agreementYear} 
                    onChange={handleChange}
                    className="w-10 border-b border-slate-400 focus:border-primary outline-none text-center bg-transparent font-bold not-italic"
                    placeholder="---"
                  />
                  between <strong>Ekpenisi Henry Happiness</strong> and 
                  <input 
                    type="text" 
                    name="borrowerName" 
                    value={formData.borrowerName} 
                    onChange={handleChange}
                    className="flex-grow min-w-[200px] border-b border-slate-400 focus:border-primary outline-none px-2 bg-transparent font-bold not-italic"
                    placeholder="Enter Borrower Full Name"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="shrink-0 font-semibold not-italic">Loan amount:</span>
                      <div className="relative flex-grow">
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 font-bold not-italic">₦</span>
                        <input 
                          type="number" 
                          name="loanAmount" 
                          value={formData.loanAmount} 
                          onChange={handleChange}
                          className="w-full border-b border-slate-400 focus:border-primary outline-none pl-6 bg-transparent font-bold not-italic"
                          placeholder="0.00"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="shrink-0 font-semibold not-italic">Previous loan:</span>
                      <div className="relative flex-grow">
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 font-bold not-italic">₦</span>
                        <input 
                          type="number" 
                          name="previousLoan" 
                          value={formData.previousLoan} 
                          onChange={handleChange}
                          className="w-full border-b border-slate-400 focus:border-primary outline-none pl-6 bg-transparent font-bold not-italic"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="shrink-0 font-semibold not-italic">Total loan:</span>
                      <div className="relative flex-grow">
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 font-bold not-italic">₦</span>
                        <input 
                          type="number" 
                          name="totalLoan" 
                          value={formData.totalLoan} 
                          onChange={handleChange}
                          className="w-full border-b border-slate-400 focus:border-primary outline-none pl-6 bg-transparent font-bold not-italic"
                          placeholder="0.00"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="shrink-0 font-semibold not-italic">Interest rate @</span>
                      <input 
                        type="text" 
                        name="interestRate" 
                        value={formData.interestRate} 
                        readOnly
                        className="w-16 border-b border-slate-400 outline-none text-center bg-transparent font-bold not-italic text-primary"
                      />
                      <span className="font-semibold not-italic">monthly</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Loan Requirements Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-primary">
                  <Info className="w-5 h-5" />
                  <h3 className="text-xl font-bold uppercase tracking-wide">Loan Requirements</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 uppercase tracking-tight">Full Name</label>
                    <input 
                      type="text" 
                      name="fullName" 
                      value={formData.fullName} 
                      onChange={handleChange}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-medium"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 uppercase tracking-tight">Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleChange}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-medium"
                      placeholder="e.g. 0800 000 0000"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 uppercase tracking-tight">Email Address</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-medium"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 uppercase tracking-tight">NIN (National ID Number)</label>
                    <input 
                      type="text" 
                      name="nin" 
                      value={formData.nin} 
                      onChange={handleChange}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-medium"
                      placeholder="11-digit NIN number"
                      required
                      maxLength={11}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 uppercase tracking-tight">Upload Copy of NIN (Borrower Only)</label>
                    <input 
                      type="file" 
                      name="ninCopy" 
                      onChange={(e) => setFormData(prev => ({ ...prev, ninCopy: e.target.files?.[0] || null }))}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary outline-none font-medium text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                      accept="image/*,.pdf"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 uppercase tracking-tight">Loan Duration</label>
                    <input 
                      type="text" 
                      name="loanDuration" 
                      value={formData.loanDuration} 
                      onChange={handleChange}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-medium"
                      placeholder="e.g. 3 Months"
                      required
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-slate-500 uppercase tracking-tight">Place of Work</label>
                    <input 
                      type="text" 
                      name="placeOfWork" 
                      value={formData.placeOfWork} 
                      onChange={handleChange}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-medium"
                      placeholder="Company name and department"
                      required
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-slate-500 uppercase tracking-tight">Home Address</label>
                    <textarea 
                      name="homeAddress" 
                      value={formData.homeAddress} 
                      onChange={handleChange}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-medium min-h-[80px]"
                      placeholder="Complete residential address"
                      required
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-slate-500 uppercase tracking-tight">Office Address</label>
                    <textarea 
                      name="officeAddress" 
                      value={formData.officeAddress} 
                      onChange={handleChange}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-medium min-h-[80px]"
                      placeholder="Complete work/office address"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Guarantor Section */}
              <div className="space-y-6 pt-4">
                <div className="flex items-center gap-2 text-primary">
                  <h3 className="text-xl font-bold uppercase tracking-wide">Guarantor Information</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Guarantor Name</label>
                    <input 
                      type="text" 
                      name="guarantorName" 
                      value={formData.guarantorName} 
                      onChange={handleChange}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none font-medium text-sm"
                      placeholder="Full Name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Phone Number</label>
                    <input 
                      type="tel" 
                      name="guarantorPhone" 
                      value={formData.guarantorPhone} 
                      onChange={handleChange}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none font-medium text-sm"
                      placeholder="Phone Number"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Guarantor NIN</label>
                    <input 
                      type="text" 
                      name="guarantorNin" 
                      value={formData.guarantorNin} 
                      onChange={handleChange}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none font-medium text-sm"
                      placeholder="NIN Number"
                      required
                      maxLength={11}
                    />
                  </div>
                  <div className="md:col-span-3 space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Guarantor Email Address</label>
                    <input 
                      type="email" 
                      name="guarantorEmail" 
                      value={formData.guarantorEmail} 
                      onChange={handleChange}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none font-medium text-sm"
                      placeholder="guarantor@email.com"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Legal Note Section */}
              <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-2xl space-y-3">
                <div className="flex items-center gap-2 text-amber-700 font-bold">
                  <AlertCircle className="w-5 h-5" />
                  IMPORTANT NOTE
                </div>
                <p className="text-sm text-amber-800 leading-relaxed italic">
                  All interests are paid monthly and any default on the due date agreement, this form shall be submitted to the HR of your work place for deduction from your salary. You can also be reported to financial crime agencies such as EFCC and Police for forceful recovery of the loan.
                </p>
              </div>

                <div className="flex items-start gap-3 bg-primary/5 p-4 rounded-xl border border-primary/10">
                  <input 
                    type="checkbox" 
                    id="agreeToTerms"
                    name="agreeToTerms" 
                    checked={formData.agreeToTerms} 
                    onChange={handleChange}
                    className="mt-1 w-5 h-5 accent-primary cursor-pointer"
                    required
                  />
                  <label htmlFor="agreeToTerms" className="text-sm text-slate-700 cursor-pointer">
                    I, <strong>{formData.fullName || '[Name]'}</strong>, hereby confirm that all information provided is accurate and I agree to the terms of this loan agreement as stated above.
                  </label>
                </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <Button 
                  type="submit" 
                  disabled={loading}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white px-12 py-7 text-xl font-bold rounded-2xl shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin mr-2" />
                      Processing Agreement...
                    </>
                  ) : (
                    'Submit Binding Agreement'
                  )}
                </Button>
              </div>
            </form>
          </Card>
          
          <div className="mt-8 text-center text-slate-400 text-xs uppercase tracking-widest flex items-center justify-center gap-4">
            <span className="w-12 h-px bg-slate-200"></span>
            Henrytee Loans Official Document
            <span className="w-12 h-px bg-slate-200"></span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
