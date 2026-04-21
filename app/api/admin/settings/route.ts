import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getSettings } from "@/lib/settings";
import { defaultSettings } from "@/lib/settings-constants";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const settings = await getSettings();
    return NextResponse.json(settings, { status: 200 });
  } catch (error) {
    console.error("GET Settings Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const client = await clientPromise;
    const db = client.db("henrytee_loans");

    // Check if settings doc exists, if not, we create one with defaults merged with body
    const existingSettings = await db.collection("settings").findOne({});
    
    let updateData = {};
    if (body.interestRate !== undefined) updateData = { ...updateData, interestRate: Number(body.interestRate) };
    if (body.maxLoanAmount !== undefined) updateData = { ...updateData, maxLoanAmount: Number(body.maxLoanAmount) };
    if (body.adminEmail !== undefined) updateData = { ...updateData, adminEmail: body.adminEmail };
    if (body.supportPhone1 !== undefined) updateData = { ...updateData, supportPhone1: body.supportPhone1 };
    if (body.supportPhone2 !== undefined) updateData = { ...updateData, supportPhone2: body.supportPhone2 };

    if (!existingSettings) {
      await db.collection("settings").insertOne({
        ...defaultSettings,
        ...updateData,
        updatedAt: new Date()
      });
    } else {
      await db.collection("settings").updateOne(
        {},
        { $set: { ...updateData, updatedAt: new Date() } }
      );
    }

    return NextResponse.json({ message: "Settings updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("PATCH Settings Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
