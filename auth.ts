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
    async redirect({ url, baseUrl }) {
      try {
        // Check if the URL contains a callbackUrl parameter
        const callbackUrl = url;

        console.log(`Original URL: ${url} Callback URL: ${callbackUrl} Base URL: ${baseUrl}`)

        if (callbackUrl) {
          return callbackUrl;
        }

        // Default behavior: Return the URL if it starts with the baseUrl
        return baseUrl
      } catch (error) {
        // Handle any errors (e.g., invalid URL parsing)
        console.error("Redirect callback error:", error);
        return baseUrl;
      }
    },
  },
  events: {
    async signIn(user) {
      console.log("User signed in", user);
      await createUser(user.user.email!);
    },
  },
});
