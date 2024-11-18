import Image from "next/image";
import React from "react";
import Link from "next/link";
import SignOutButton from "../auth/SignOutButton";
import SigninButton from "../auth/SigninButton";
import Avatar from "../auth/Avatar";
import { auth } from "../../auth";

export default async function Header() {
  const session = await auth();
  console.log("Session:", session);

  const user = session?.user;

  // Reformat display name
  let displayName = user?.name || "";
  const nameParts = displayName.split(" ");
  if (nameParts.length === 2) {
    const [lastName, firstName] = nameParts;
    displayName = `${firstName} ${lastName}`;
  }

  return (
    <header className="py-5 bg-base-100">
      <div className="container mx-auto bg-base-100">
        <div className="flex flex-col md:flex-row md:justify-between gap-6">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-5 justify-center xl:w-max">
              <Image
                src="/icons/app/stellarHorizons.png"
                alt="LikeHome Logo"
                width={55}
                height={20}
              />
              <span className="ml-2 text-lg font-bold text-base-content">
                LikeHome
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-8">
            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search"
              className="input input-primary text-neutral w-full max-w-xs"
            />

            {/* About Link */}
            <Link href="/about" className="text-base-content hover:text-accent cursor-pointer">
              About
            </Link>

            {/* Authenticated vs Unauthenticated UI */}
            {!user ? (
              <SigninButton />
            ) : (
              <>
                <Link
                  href="/profile"
                  className="btn w-fit px-4 py-2 btn-primary text-secondary-content rounded"
                >
                  Profile
                </Link>
                <SignOutButton />
                <div className="flex flex-col items-center">
                  {/* Avatar and Name */}
                  <Avatar image={user.image ?? undefined} imgSize="12" />
                  <span className="mt-2 text-sm font-semibold text-base-content text-center whitespace-nowrap">
                    {displayName}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
