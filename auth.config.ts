import Google from "next-auth/providers/google"
import Resend from "next-auth/providers/resend"
import type { NextAuthConfig } from "next-auth"

export default {
    providers: [
        Google,
    ], pages: {
        signIn: "/signin",
        error: "/signin",
    },

} satisfies NextAuthConfig