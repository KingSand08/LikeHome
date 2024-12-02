import NextAuth from "next-auth";
import type { Provider } from "next-auth/providers";
import Google from "next-auth/providers/google";
import Discord from "next-auth/providers/discord";
import { createUser } from "./server-actions/user-actions";

const providers: Provider[] = [Google, Discord];

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== "credentials");

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    redirect: async ({ url, baseUrl }) => url || baseUrl,
  },
  events: {
    async signIn(user) {
      console.log("User signed in", user);
      await createUser(user.user.email!);
    },
  },
});
