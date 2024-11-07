import React from "react";
import Image from "next/image";
import Link from "next/link";
import ProfileMenu from "../ProfileMenu"; // Import ProfileMenu

export default function Header() {
  return (
    <header className="py-5 bg-base-100">
      <div className="container mx-auto bg-base-100">
        <div className="flex flex-col md:flex-row md:justify-between gap-6">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-5 justify-center xl:w-max">
              <Image
                src="/stellarHorizons.png"
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

            {/* About Link */}
            <Link href="/about" className="text-base-content hover:text-accent cursor-pointer">
              About
            </Link>

            {/* Profile Menu with Conditional Options */}
            <ProfileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
