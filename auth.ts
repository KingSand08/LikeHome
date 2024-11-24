import NextAuth, { Account, User } from "next-auth";
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
  events: {
    signIn: async (m: { user: User }) => {
      console.log(m.user);
      createUser(m.user.email!, m.user.name!);
      console.log();
    },
  },
});
