import { auth } from "@/auth";
import SignInPage from "../signin/page";
import { usePathname, useRouter } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const url = usePathname()
        
  return (<>{session ? children : <SignInPage callBackURL={url}/>}</>);
}
