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
    
    // Project out ninCopy (large base64 image) to keep payload lightweight and fast
    const loans = await db.collection("applications")
      .find({})
      .project({ ninCopy: 0 })
      .sort({ submittedAt: -1, _id: -1 })
      .toArray();

    const sanitizedLoans = loans.map((loan) => ({
      ...loan,
      _id: loan._id?.toString(),
    }));

    return NextResponse.json(sanitizedLoans, { status: 200 });
  } catch (error: any) {
    console.error("GET /api/admin/loans Error:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch loans", 
        details: error?.message || String(error) 
      }, 
      { status: 500 }
    );
  }
}
