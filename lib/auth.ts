import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const adminEmail = process.env.ADMIN_EMAIL || "santech901@gmail.com";
        const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

        // 1. Check for Hardcoded Admin
        if (
          credentials.email === adminEmail &&
          credentials.password === adminPassword
        ) {
          return {
            id: "admin-1",
            name: "Admin User",
            email: adminEmail,
            role: "admin",
          };
        }

        // 2. Check Database Users
        try {
          const client = await clientPromise;
          const db = client.db("henrytee_loans");
          const user = await db.collection("users").findOne({ email: credentials.email });

          if (user && await bcrypt.compare(credentials.password, user.password)) {
            return {
              id: user._id.toString(),
              name: user.username,
              email: user.email,
              role: user.role || "user",
            };
          }
        } catch (error) {
          console.error("Auth error:", error);
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
