"use server";

import { signIn } from "@/auth";

export default async function OAuthButtonForm({ provider, callbackUrl }: { provider: string; callbackUrl?: string }) {
  await signIn(provider, { redirectTo: callbackUrl })
}
