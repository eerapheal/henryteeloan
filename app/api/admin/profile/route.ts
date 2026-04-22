import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { 
      displayName, 
      email, 
      currentPassword, 
      newPassword, 
      profilePic 
    } = await request.json();

    const client = await clientPromise;
    const db = client.db("henrytee_loans");
    const usersCollection = db.collection("users");

    // Find the current admin user in DB
    // Note: If they are logged in via hardcoded admin, they might not have a DB record yet
    // or we might need to handle it. For now, we assume admin is in DB.
    
    const userEmail = session.user?.email;
    if (!userEmail) {
      return NextResponse.json({ error: "Session email not found" }, { status: 400 });
    }

    const user = await usersCollection.findOne({ email: userEmail });

    if (!user) {
      return NextResponse.json({ 
        error: "User not found in database. Password change is only available for database-managed accounts." 
      }, { status: 404 });
    }

    const updateData: any = {};

    // 1. Handle Profile Info
    if (displayName) updateData.username = displayName;
    if (email) updateData.email = email;
    if (profilePic) updateData.profilePic = profilePic;

    // 2. Handle Password Change
    if (currentPassword && newPassword) {
      const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isPasswordMatch) {
        return NextResponse.json({ error: "Incorrect current password" }, { status: 400 });
      }
      updateData.password = await bcrypt.hash(newPassword, 10);
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ message: "No changes provided" }, { status: 200 });
    }

    await usersCollection.updateOne(
      { _id: user._id },
      { $set: updateData }
    );

    return NextResponse.json({ message: "Profile updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("henrytee_loans");
    
    const user = await db.collection("users").findOne(
      { email: session.user?.email },
      { projection: { password: 0 } }
    );

    if (!user) {
      return NextResponse.json({ 
        username: session.user?.name || "Admin",
        email: session.user?.email,
        role: "admin",
        isHardcoded: true
      }, { status: 200 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
