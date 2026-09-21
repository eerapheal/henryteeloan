// Re-export auth utilities from the root auth.ts for backward compatibility.
// In Auth.js v5, the central config lives at the project root.
export { auth, signIn, signOut } from "@/auth";

// Provide a compatible getServerSession shim for server components/API routes.
// Usage: const session = await getServerSession();
import { auth } from "@/auth";
export const getServerSession = auth;

// authOptions is no longer needed in v5 — kept as a no-op export to avoid
// import errors while you migrate call-sites.
export const authOptions = {};
