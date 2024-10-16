import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Image from "next/image";
import formImage from "../../public/likehome_form_icon.png";
import OAuthButton from "@/components/OAuthButton";

export default async function SignInPage() {
  const profilePageURL = "/";

  // redirect user
  const session = await auth();
  if (session) {
    redirect(profilePageURL);
  }

  return (
    <>
      <div className="h-[75vh] flex items-center justify-center">
        <div className="bg-white flex rounded-lg w-3/4">
          <div className="flex-1 text-gray-800 p-20">
            <h1 className="text-3xl pb-4">Let&apos;s get started!</h1>
            <p className="text-lg text-gray-700">
              Welcome to LikeHome! Sign in Google or provide your email to get started!
              New users will have a short profile section to fill out once signing in for
              the first time.
            </p>
            <div className="mt-14">
              <OAuthButton provider="google" />
              {/* Section divider input field */}
              <div>
                <p className="mt-4 mb-4 text-center text-lg">or</p>
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
    </>
  );
};


