import { auth } from "@/auth";
import SignInPage from "../signin/page";
import { SessionProvider } from "next-auth/react";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      {session ? children : <SignInPage />}
    </SessionProvider>
  );
}
