import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("henrytee_loans");
    
    // Aggregate Loan Stats
    const applications = await db.collection("applications").find({}).toArray();
    
    const stats = {
      totalLoans: applications.reduce((acc, curr) => acc + (curr.loanAmount || 0), 0),
      totalRepayable: applications.reduce((acc, curr) => acc + (curr.totalLoan || 0), 0),
      count: applications.length,
      pending: applications.filter(a => a.status === 'pending').length,
      approved: applications.filter(a => a.status === 'approved').length,
      rejected: applications.filter(a => a.status === 'rejected').length,
      paid: applications.filter(a => a.status === 'paid').length,
      totalPaid: applications.filter(a => a.status === 'paid').reduce((acc, curr) => acc + (curr.totalLoan || 0), 0),
    };

    // User Stats
    const totalUsers = await db.collection("users").countDocuments();
    const adminCount = await db.collection("users").countDocuments({ role: 'admin' });

    return NextResponse.json({
      loans: stats,
      users: {
        total: totalUsers,
        admins: adminCount,
      },
      // Sample data for charts
      chartData: [
        { name: 'Jan', amount: 4000 },
        { name: 'Feb', amount: 3000 },
        { name: 'Mar', amount: 5000 },
        { name: 'Apr', amount: stats.totalLoans },
      ]
    }, { status: 200 });
  } catch (error) {
    console.error("Stats API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
