import React from "react";
import { redirect } from "next/navigation";
import { signIn, auth, providerMap } from "@/auth.ts";
import { AuthError } from "next-auth";
import Image, { StaticImageData } from "next/image";
import formImage from "../../public/likehome_form_icon.png";
import GoogleImage from "../../public/icons/google.icon.png";


const loginPageURL = "/testauth";

export default async function SignInPage(props: {
  searchParams: { callbackUrl: string | undefined };
}) {
  const SIGNIN_ERROR_URL = "/api/auth/signin";

  const providerIcons: { [key: string]: StaticImageData } = {
    google: GoogleImage,
  };

  const profilePageURL = "testauth/testuserID";

  // redirect user
  const session = await auth();
  if (session) {
    redirect(profilePageURL);
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-white flex rounded-lg w-3/4">
        <div className="flex-1 text-gray-800 p-20">
          <h1 className="text-3xl pb-2">Let&apos;s get started!</h1>
          <p className="text-lg text-gray-700">
            This page will be for testing purposes only until a login page has
            been made and approved. Users can login and choose one of the
            providers to log into below.
          </p>
          <div className="mt-6">
            {/* OAuth Login */}
            {/* Process the sign-in */}
            <form
              action={async () => {
                "use server"
                await signIn("google",
                  // { redirectTo: props.searchParams?.callbackUrl ?? "" }
                  { redirect: false })
              }}
            >
              {/* Button display */}
              <button
                type="submit"
                className="flex items-center mb-2 border border-transparent rounded-md shadow-sm px-4 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full"
              >
                <Image
                  alt={`Google logo`}
                  src={providerIcons['google']}
                  width={40} // Set the desired width
                  height={40} // Set the desired height
                />
                <p className="flex-grow text-center">
                  Sign in with {'Google'}
                </p>
              </button>
            </form>
            {/* Section divider input field */}
            <div>
              <p className="mb-2 text-center">or</p>
            </div>
            {/* Email input field */}
            <div className="pb-4 flex flex-col items-center">
              <input
                className="p-2 border-2 border-gray-600 rounded-md w-full focus:border-purple-600 focus:ring-purple-500 focus:outline-none"
                type="email"
                name="email"
                placeholder="Enter your email"
              />
            </div>
          </div>
        </div>
        <div className="relative flex-1">
          <Image
            alt="likehome image"
            src={formImage}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
