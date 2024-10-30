import { NextAuth } from "next-auth";
import { AuthError } from "next-auth";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { provider } = req.body; // Get the provider from the request body

    try {
      const result = await signIn(provider, { redirect: false });

      if (result.error) {
        console.error("Sign-in error:", result.error); // Log error to terminal
        return res.redirect(
          `/signin?error=${encodeURIComponent(result.error)}`
        );
      }

      // On successful sign-in, redirect to the profile page
      res.redirect("/profile");
    } catch (error) {
      console.error("Unexpected error during sign-in:", error); // Log unexpected errors
      res.redirect(
        `/signin?error=${encodeURIComponent("An unexpected error occurred.")}`
      );
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
