import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { auth } from "@/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("henrytee_loans");
    
    // Aggregate Loan Stats (exclude heavy fields like ninCopy)
    const applications = await db.collection("applications")
      .find({})
      .project({ loanAmount: 1, totalLoan: 1, status: 1, submittedAt: 1 })
      .toArray();
    
    const totalLoans = applications.reduce((acc, curr) => acc + (Number(curr.loanAmount) || 0), 0);
    const totalRepayable = applications.reduce((acc, curr) => acc + (Number(curr.totalLoan) || 0), 0);
    const pendingCount = applications.filter(a => a.status === 'pending').length;
    const approvedCount = applications.filter(a => a.status === 'approved').length;
    const rejectedCount = applications.filter(a => a.status === 'rejected').length;
    const paidCount = applications.filter(a => a.status === 'paid').length;
    const totalPaid = applications.filter(a => a.status === 'paid').reduce((acc, curr) => acc + (Number(curr.totalLoan) || 0), 0);

    const stats = {
      totalLoans,
      totalRepayable,
      count: applications.length,
      pending: pendingCount,
      approved: approvedCount,
      rejected: rejectedCount,
      paid: paidCount,
      totalPaid,
    };

    // User Stats
    const totalUsers = await db.collection("users").countDocuments();
    const adminCount = await db.collection("users").countDocuments({ role: 'admin' });

    // Dynamic 6-month historical aggregation
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const now = new Date();
    const chartData = [];

    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthLabel = monthNames[d.getMonth()];
      const year = d.getFullYear();
      const month = d.getMonth();

      const monthApps = applications.filter(a => {
        if (!a.submittedAt) return false;
        const appDate = new Date(a.submittedAt);
        return appDate.getFullYear() === year && appDate.getMonth() === month;
      });

      const monthAmount = monthApps.reduce((sum, a) => sum + (Number(a.loanAmount) || 0), 0);
      const monthCount = monthApps.length;

      chartData.push({
        name: monthLabel,
        amount: monthAmount,
        count: monthCount,
      });
    }

    return NextResponse.json({
      loans: stats,
      users: {
        total: totalUsers,
        admins: adminCount,
      },
      chartData,
    }, { status: 200 });
  } catch (error) {
    console.error("Stats API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
