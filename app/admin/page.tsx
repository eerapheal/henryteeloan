import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any).role !== "admin") {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <main className="flex-grow py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-6">Admin Dashboard</h1>
            <p className="text-slate-600 mb-8">
              Welcome back, <span className="font-bold text-primary">{session.user?.email}</span>. You have administrative access.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-primary/5 rounded-xl border border-primary/10">
                <h3 className="font-bold text-primary mb-2">Loan Applications</h3>
                <p className="text-sm text-slate-600">View and manage all incoming loan requests.</p>
              </div>
              <div className="p-6 bg-accent/5 rounded-xl border border-accent/10">
                <h3 className="font-bold text-accent mb-2">User Management</h3>
                <p className="text-sm text-slate-600">Manage borrower accounts and roles.</p>
              </div>
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">Settings</h3>
                <p className="text-sm text-slate-600">Configure interest rates and loan terms.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
