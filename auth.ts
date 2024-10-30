import NextAuth from "next-auth";
import authConfig from "./auth.config";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});