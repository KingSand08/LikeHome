import Image from "next/image";
import ThemeSwitch from "./ThemeSwitch";
import React from "react";
import SignOutButton from "../SignOutButton";
import { auth } from "../../auth";
import Link from "next/link";

const loginPageURL = "/signin";
const homePageURL = "/";
const contactPageURL = "/";
const roomsPageURL = "/";

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
              {" "}
              {/* Flex container for navigation items */}
              <div className="text-base-content hover:text-accent cursor-pointer">
                About
              </div>
            </Link>
            {!loginStatus ? (
              <>
                <Link
                  className="btn px-4 py-2 btn-secondary text-secondary-content rounded"
                  href="/signin"
                >
                  {" "}
                  {/* Sign In Button */}
                  SIGN IN
                </Link>
                <button className="btn px-4 py-2 btn-primary text-primary-content rounded ">
                  {" "}
                  {/* Register Button */}
                  REGISTER
                </button>
              </>
            ) : (
              <Link
                className="btn px-4 py-2 btn-primary text-primary-content rounded"
                href="/profile"
              >
                {" "}
                {/* Register Button */}
                Profile
              </Link>
            )}
            {/* sign in & registe4r */}

            {/* <ThemeSwitch /> */}
          </div>
        </div>
      </div>
    </header>
  );
}
