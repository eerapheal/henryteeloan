import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
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

        try {
          const client = await clientPromise;
          const db = client.db("henrytee_loans");
          const usersCollection = db.collection("users");

          // 1. Check Database Users first
          const user = await usersCollection.findOne({ email: credentials.email });

          if (user && user.password) {
            const isValidPassword = await bcrypt.compare(credentials.password as string, user.password);
            if (isValidPassword) {
              return {
                id: user._id.toString(),
                name: user.username || "Admin",
                email: user.email,
                role: user.role || "user",
              };
            }
          }

          // 2. Check for Default / Initial Admin credentials
          if (
            credentials.email === adminEmail &&
            credentials.password === adminPassword
          ) {
            // Auto-provision or update database-managed admin account
            const hashedPassword = await bcrypt.hash(adminPassword, 10);
            
            if (user) {
              await usersCollection.updateOne(
                { _id: user._id },
                { $set: { role: "admin", password: hashedPassword, updatedAt: new Date() } }
              );
              return {
                id: user._id.toString(),
                name: user.username || "Ekpenisi Henry Happiness",
                email: user.email,
                role: "admin",
              };
            } else {
              const result = await usersCollection.insertOne({
                username: "Ekpenisi Henry Happiness",
                email: adminEmail,
                password: hashedPassword,
                role: "admin",
                createdAt: new Date(),
                updatedAt: new Date(),
              });
              return {
                id: result.insertedId.toString(),
                name: "Ekpenisi Henry Happiness",
                email: adminEmail,
                role: "admin",
              };
            }
          }
        } catch (error) {
          console.error("Auth authorization error:", error);
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
});
