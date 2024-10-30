import { auth } from "@/auth";
import SignInPage from "../signin/page";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return <>{session ? children : <SignInPage />}</>;
}
