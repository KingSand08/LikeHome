import Image from "next/image";
import ThemeSwitch from "./ThemeSwitch";
import React from "react";
import SignOutButton from "../SignOutButton";
import { auth } from "../../auth";

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
    <header className="py-6 shadow-md mb-5">
      <div className="container mx-auto h-25">
        <div className="flex flex-col text-center md:flex-row md:justify-between gap-6">
          {/* logo */}
          <div className="flex items-center gap-5 justify-center xl:w-max">
            {/* Replace with product logo later */}
            <Image
              src="/stellarHorizons.png"
              alt="LikeHome Logo"
              width={55}
              height={20}
            />
            <span className="ml-2 text-lg font-bold">LikeHome</span>{" "}
            {/* Text displayed next to image */}
          </div>
          <div className="flex items-center gap-8 ">
            {/* Navigation Links */}
            <nav className="flex items-center gap-8">
              {" "}
              {/* Flex container for navigation items */}
              <a className="text-black-700 hover:text-purple-600 cursor-pointer"
                href={homePageURL}
              >
                Home
              </a>
              <div className="text-black-700 hover:text-purple-600 cursor-pointer">
                Rooms
              </div>
              <div className="text-black-700 hover:text-purple-600 cursor-pointer">
                Contact
              </div>
            </nav>
            {/* sign in & register */}

            {user && (
              <a className="px-4 py-2 bg-black text-white rounded bg-purple-600 hover:bg-purple-900 duration-150"
                href={loginPageURL}
              >
                {/* Sign In Button */}
                SIGN IN
              </a>
            )}
            {!user && (
              <div className="flex flex-row items-center">
                <div className="bg-black bg-opacity-40 flex space-x-4 items-center mr-7 px-5 py-3 rounded-lg text-white hover:text-purple-300 hover:bg-opacity-85 cursor-pointer">
                  <Image
                    src={session?.user?.image ?? "/default-avatar.png"}
                    alt="User Avatar"
                    width={1000}
                    height={1000}
                    className="w-4 h-4 md:w-[2.8rem] md:h-[2.8rem] lg:w-[2.8rem] lg:h-[2.8rem] rounded-full"
                  />
                  <p className="text-lg">
                    {session.user?.name}
                  </p>
                </div>
                <SignOutButton />
              </div>
            )}
            <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
              {" "}
              {/* Register Button */}
              REGISTER
            </button>
            {/* <ThemeSwitch /> */}
          </div>
        </div>
      </div>
    </header>
  );
};