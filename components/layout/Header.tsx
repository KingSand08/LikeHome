import Image from "next/image";
import React from "react";
import { auth } from "@/auth";
import Link from "next/link";
import SignOutButton from "@/components/auth/SignOutButton";
import SigninButton from "@/components/auth/SigninButton";
import Avatar from "@/components/auth/Avatar";
import LocationCombobox from "../ui/location-combobox";
import HamburgerMenu from "./HamburgerMenu";

export default async function Header() {
  const session = await auth();
  const user = !session?.user;

  var loginStatus = false;

  if (!user) {
    loginStatus = true;
  }

  return (
    <header className="bg-base-100 text-base-300-content border-b-2 dark:border-black dark:border-opacity-15 border-b-slate-300">
      <div className="container mx-auto bg-base-100">
        {/* Top Header Section */}
        <div className="flex items-center justify-between py-5">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-5">
            <Image
              src="/icons/app/stellarHorizons.png"
              alt="LikeHome Logo"
              width={55}
              height={20}
              priority
              className="w-auto h-auto"
            />
            <span className="text-lg font-bold text-base-content">LikeHome</span>
          </Link>

          {/* Search Bar */}
          <div className="hidden min-[1200px]:flex flex-1 mx-4 max-w-full">
            <LocationCombobox />
          </div>

          {/* Mobile Dropdown */}
          <div className="dropdown dropdown-end min-[1200px]:hidden ml-8">
            <HamburgerMenu />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden min-[1200px]:flex items-center gap-8 ml-4">
            <Link href="/about" className="text-base-content hover:text-accent">
              About
            </Link>
            {!loginStatus ? (
              <SigninButton className="text-base-300-content" />
            ) : (
              <>
                <Link
                  className="btn w-fit px-4 py-2 btn-primary text-secondary-content rounded"
                  href="/profile"
                >
                  Profile
                </Link>
                <SignOutButton className="text-base-300-content" />
                <HamburgerMenu />
              </>
            )}
          </div>
        </div>

        {/* Search Bar (Visible Only on Mobile) */}
        <div className="block min-[1200px]:hidden w-full px-4 pb-4">
          <LocationCombobox />
        </div>
      </div>
    </header>
  );
}
