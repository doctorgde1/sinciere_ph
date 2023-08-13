import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error("please provide NEXTAUTH_SECRET environment variable");
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
