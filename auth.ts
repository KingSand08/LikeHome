// import NextAuth from "next-auth";
// import GitHub from "next-auth/providers/github";

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [GitHub],
//   callbacks: {
//     async redirect({ url, baseUrl }) {
//       // Allow redirecting to the intended page after sign-in
//       return url.startsWith(baseUrl) ? url : baseUrl; // Redirect to base URL if not from base
//     },
//   },
// });


import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Instagram from "next-auth/providers/instagram"
import Facebook from "next-auth/providers/Facebook"
import Twitter from "next-auth/providers/twitter"
import Credentials from "next-auth/providers/credentials"
import type { Provider } from "next-auth/providers"

 
const providers: Provider[] = [
  Credentials({
    credentials: { password: { label: "Password", type: "password" } },
    authorize(c) {
      if (c.password !== "password") return null
      return {
        id: "test",
        name: "Test User",
        email: "test@example.com",
      }
    },
  }),
  GitHub,
  Google,
  Instagram,
  Facebook,
  Twitter,
]
 
export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider()
      return { id: providerData.id, name: providerData.name }
    } else {
      return { id: provider.id, name: provider.name }
    }
  })
  .filter((provider) => provider.id !== "credentials")
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  pages: {
    signIn: "/signin",
  },
})