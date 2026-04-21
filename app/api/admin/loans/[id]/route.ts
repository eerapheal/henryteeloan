import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { ObjectId } from "mongodb";
import { sendLoanStatusUpdateNotification } from "@/lib/email";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const { status } = await request.json();
    
    if (!status) {
      return NextResponse.json({ error: "Status is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("henrytee_loans");

    // Get application details first for email notification
    const application = await db.collection("applications").findOne({ _id: new ObjectId(id) });
    
    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    const result = await db.collection("applications").updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: { 
          status, 
          updatedAt: new Date() 
        } 
      }
    );

    // Send notification if status changed to approved, rejected, or paid
    if (['approved', 'rejected', 'paid'].includes(status)) {
      try {
        await sendLoanStatusUpdateNotification(
          application.email,
          application.fullName,
          status,
          application.loanAmount,
          application.applicationId || application?._id?.toString()
        );
      } catch (emailError) {
        console.error("Failed to send status update email:", emailError);
      }
    }

    return NextResponse.json({ message: "Status updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("PATCH Loan Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
