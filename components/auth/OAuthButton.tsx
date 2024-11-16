import React from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import GoogleImage from "@/public/icons/google.icon.png";

interface OAuthButtonProps {
  callbackUrl?: string;
}

export default function OAuthButton(props: OAuthButtonProps) {
  return (
    <>
      {/* OAuth Login */}
      {/* Process the sign-in */}
      <button
        onClick={() => signIn("google", { redirect: true, callbackUrl: props.callbackUrl })}
        className="flex items-center mb-2 border border-transparent rounded-lg shadow-sm px-4 py-3 
                    bg-blue-600 text-white font-medium hover:bg-blue-700 transition duration-200 ease-in-out 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-fit pr-[50px] text-md h-auto 
                    justify-center space-x-8"
      >
        <Image
          alt={`Google logo`}
          src={GoogleImage}
          width={50}
          height={50}
        />
        <p className="text-center ">
          Sign in with Google
        </p>
      </button>
    </>
  );
}