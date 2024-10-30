import React from "react";
import { signIn, auth } from "@/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import GoogleImage from "../public/icons/google.icon.png";

export default function OAuthButton() {
  return (
    <>
      {/* OAuth Login */}
      {/* Process the sign-in */}
      <form
        action={async () => {
          "use server";
          await signIn("google");
        }}
      >
        {/* Button display */}
        <button
          type="submit"
          className="flex items-center mb-2 border border-transparent rounded-md shadow-sm px-4 py-2 
                    bg-blue-600 text-white font-medium hover:bg-blue-700 transition duration-200 ease-in-out 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full"
        >
          <Image alt={`Google logo`} src={GoogleImage} width={40} height={40} />
          <p className="flex-grow text-center">Sign in with {"Google"}</p>
        </button>
      </form>
    </>
  );
}
