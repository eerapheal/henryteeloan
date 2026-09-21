import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { auth } from "@/auth";
import bcrypt from "bcryptjs";

export async function PATCH(request: NextRequest) {
  try {
    const session = await auth();

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
    
    const userEmail = session.user?.email;
    if (!userEmail) {
      return NextResponse.json({ error: "Session email not found" }, { status: 400 });
    }

    let user = await usersCollection.findOne({ email: userEmail });

    // Auto-provision admin in DB if not found
    if (!user) {
      const defaultPassword = process.env.ADMIN_PASSWORD || "admin123";
      const hashedPassword = await bcrypt.hash(defaultPassword, 10);
      const newAdmin = {
        username: session.user?.name || "Ekpenisi Henry Happiness",
        email: userEmail,
        password: hashedPassword,
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const insertResult = await usersCollection.insertOne(newAdmin);
      user = { ...newAdmin, _id: insertResult.insertedId };
    }

    const updateData: any = {
      updatedAt: new Date()
    };

    // 1. Handle Profile Info
    if (displayName) updateData.username = displayName;
    if (email) updateData.email = email;
    if (profilePic !== undefined) updateData.profilePic = profilePic;

    // 2. Handle Password Change
    if (currentPassword && newPassword) {
      const defaultPassword = process.env.ADMIN_PASSWORD || "admin123";
      const isPasswordMatch = 
        (user.password && await bcrypt.compare(currentPassword, user.password)) ||
        currentPassword === defaultPassword;

      if (!isPasswordMatch) {
        return NextResponse.json({ error: "Incorrect current password" }, { status: 400 });
      }

      updateData.password = await bcrypt.hash(newPassword, 10);
    }

    if (Object.keys(updateData).length <= 1) { // only updatedAt
      return NextResponse.json({ message: "No changes provided" }, { status: 200 });
    }

    await usersCollection.updateOne(
      { _id: user._id },
      { $set: updateData }
    );

    return NextResponse.json({ message: "Profile updated successfully in database" }, { status: 200 });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("henrytee_loans");
    
    let user = await db.collection("users").findOne(
      { email: session.user?.email },
      { projection: { password: 0 } }
    );

    // Auto-create database-managed admin account if it doesn't exist yet
    if (!user && session.user?.email) {
      const defaultPassword = process.env.ADMIN_PASSWORD || "admin123";
      const hashedPassword = await bcrypt.hash(defaultPassword, 10);
      const newAdmin = {
        username: session.user?.name || "Ekpenisi Henry Happiness",
        email: session.user.email,
        password: hashedPassword,
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const result = await db.collection("users").insertOne(newAdmin);
      user = {
        _id: result.insertedId,
        username: newAdmin.username,
        email: newAdmin.email,
        role: "admin",
        createdAt: newAdmin.createdAt,
      } as any;
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Profile GET error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
