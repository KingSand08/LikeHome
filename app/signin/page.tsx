import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Image from "next/image";
import OAuthButton from "@/components/OAuthButton";

export default async function SignInPage() {
  const profilePageURL = "/profile";

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
              Welcome to LikeHome! Sign in Google or provide your email to get
              started! New users will have a short profile section to fill out
              once signing in for the first time.
            </p>
            <div className="mt-14">
              <OAuthButton />
              {/* Section divider input field */}
            </div>
          </div>
          <div className="relative flex-1 flex justify-center items-center">
            <Image
              alt="likehome image"
              src="/likehome_form_icon.png"
              layout="fill" // Make it fill the container
              objectFit="contain" // Ensures the image maintains aspect ratio and fits within the container
              quality={100}
              className="rounded-lg" // Ensure the image is 100% height and auto-adjusts width
            />
          </div>
        </div>
      </div>
    </>
  );
}
