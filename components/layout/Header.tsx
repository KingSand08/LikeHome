'use clinet'
import Image from "next/image";
import React from "react";
import { auth } from "@/auth";
import Link from "next/link";
import SignOutButton from "@/components/auth/SignOutButton";
import SigninButton from "@/components/auth/SigninButton";
import Avatar from "@/components/auth/Avatar";
import LocationCombobox from "../ui/location-combobox";

export default async function Header() {
  const session = await auth();
  const user = !session?.user;

  var loginStatus = false;

  if (!user) {
    loginStatus = true;
  }

  return (
    <header className="py-5 bg-base-100 text-base-300-content border-b-2 dark:border-black dark:border-opacity-15 border-b-slate-300">
      <div className="container mx-auto bg-base-100">
        <div className="flex flex-col md:flex-row md:justify-between gap-6 space-x-5">
          {/* logo */}
          <Link href="/">
            <div className="flex items-center gap-5 justify-center xl:w-max">
              {/* Replace with product logo later */}
              <Image
                src="/icons/app/stellarHorizons.png"
                alt="LikeHome Logo"
                width={55}
                height={20}
                priority
                style={{ height: "auto", width: "auto" }}
              />
              <span className="ml-2 text-lg font-bold text-base-content">
                LikeHome
              </span>
            </div>
          </Link>
          {/* Searh Bar */}
          <div className="flex-1 mx-5 relative">
            <LocationCombobox />
          </div>
          <div className="flex flex-grow-0 items-center justify-center gap-8 ">
            {/* Navigation Links */}
            <Link className="flex items-center gap-8" href="/about">
              {/* Flex container for navigation items */}
              <div className="text-base-content hover:text-accent cursor-pointer">
                About
              </div>
            </Link>
            {!loginStatus ? (
              <>
                <SigninButton className="text-base-300-content" />
              </>
            ) : (
              <>
                <Link
                  className="btn w-fit px-4 py-2 btn-primary text-secondary-content rounded"
                  href="/profile"
                >
                  Profile
                </Link>
                <Link href="/profile">
                  <Avatar
                    image={session?.user.image ?? undefined}
                    size={"3.4em"}
                  />
                </Link>
                <SignOutButton className="text-base-300-content" />
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
