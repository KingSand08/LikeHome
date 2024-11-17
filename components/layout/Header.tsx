import Image from "next/image";
import React from "react";
import { auth, signOut } from "../../auth";
import Link from "next/link";
import SignOutButton from "../auth/SignOutButton";
import SigninButton from "../auth/SigninButton";
import Avatar from "../auth/Avatar";

export default async function Header() {
  const session = await auth();
  console.log("Session:", session);

  const user = !session?.user;

  var loginStatus = false;

  if (!user) {
    loginStatus = true;
  }

  return (
    <header className="py-5 bg-base-100">
      <div className="container mx-auto bg-base-100">
        <div className="flex flex-col md:flex-row md:justify-between gap-6">
          {/* logo */}
          <Link href="/">
            <div className="flex items-center gap-5 justify-center xl:w-max">
              {/* Replace with product logo later */}
              <Image
                src="/stellarHorizons.png"
                alt="LikeHome Logo"
                width={55}
                height={20}
              />
              <span className="ml-2 text-lg font-bold text-base-content">
                LikeHome
              </span>{" "}
              {/* Text displayed next to image */}
            </div>
          </Link>
          <div className="flex items-center gap-8 ">
            {/* Navigation Links */}
            <input
              type="text"
              placeholder="Search"
              className="input input-primary text-neutral w-full max-w-xs"
            />
            <Link className="flex items-center gap-8" href="/about">
              {/* Flex container for navigation items */}
              <div className="text-base-content hover:text-accent cursor-pointer">
                About
              </div>
            </Link>
            {!loginStatus ? (
              <>
                <SigninButton />
              </>
            ) : (
              <>
                <Link
                  className="btn w-fit px-4 py-2 btn-primary text-secondary-content rounded"
                  href="/profile"
                >
                  Profile
                </Link>
                <SignOutButton />
                <Avatar image={session?.user.image ?? undefined} imgSize={"12"} />
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
