import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/db";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        token: { label: "Key", type: "text", placeholder: "key" },
      },
      async authorize(credentials, req) {
        const user = await prisma.user.findFirst({
          where: { accessKey: credentials?.key },
        });

        if (user) {
          return user;
        }
        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
