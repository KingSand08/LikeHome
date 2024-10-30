import Google from "next-auth/providers/google"
import Resend from "next-auth/providers/resend"
import type { NextAuthConfig } from "next-auth"

export default {
    providers: [
        Google,
        // Resend({
        //     from: "auth@app.company.com",
        // }),
    ],
} satisfies NextAuthConfig