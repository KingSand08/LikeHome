import Image from "next/image";
import React from "react";
import { auth } from "../../auth";
import Link from "next/link";

export default async function Header() {
  const session = await auth();
  console.log("Session:", session);

  const user = session?.user;

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
              </span>
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
              <div className="text-base-content hover:text-accent cursor-pointer">
                About
              </div>
            </Link>
            {!user ? (
              <>
                <Link
                  className="btn px-4 py-2 btn-secondary text-secondary-content rounded"
                  href="/signin"
                >
                  SIGN IN
                </Link>
                <button className="btn px-4 py-2 btn-primary text-primary-content rounded ">
                  REGISTER
                </button>
              </>
            ) : (
              <>
                {/* Avatar as Profile Button */}
                <Link href="/profile">
                  <div className="flex flex-col items-center gap-2 cursor-pointer">
                    {/* Avatar */}
                    {user?.image && (
                      <Image
                        src={user.image}
                        alt="User Avatar"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    )}
                    {/* Username below the avatar */}
                    <span className="text-sm font-semibold text-base-content text-center whitespace-nowrap">
                      {displayName}
                    </span>
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
