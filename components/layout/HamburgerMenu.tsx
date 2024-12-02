"use client";

import { useSession } from "next-auth/react";
import React from "react";
import NavButton from "../buttons/NavButton";
import SignOutButton from "../auth/SignOutButton";
import SignInButton from "../auth/SigninButton";
import Avatar from "../auth/Avatar";


export default function HamburgerMenu() {
    const { data: session } = useSession();

    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="mr-4">
                {session?.user?.image ? (
                    <Avatar
                        image={session?.user.image ?? "/icons/app/stellarHorizons.png"}
                        size={"3.4em"}
                    />
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block h-8 w-8 stroke-black dark:stroke-white" //change stroke-white to stroke-current to auto adapt based on theme setting once custom theme is in place
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                    </svg>
                )}
            </div>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[100] mt-3 w-48 p-3 shadow">
                {session && session.user ? (
                    <>
                        <li><SignOutButton className='w-full' /></li>
                        <hr className='opacity-25 my-2 border-base' />
                    </>
                ) : (
                    <>
                        <li><SignInButton className='w-full' /></li>
                        <hr className='opacity-25 my-2 border-base' />
                    </>
                )}
                <li><NavButton page="Home" route="/" className='block text-center' /></li>
                <hr className='opacity-25 my-2 border-base' />
                {session && (
                    <>
                        <li><NavButton page="Profile" route="/profile" className='block text-center' /></li>
                        <hr className='opacity-25 my-2 border-white' />
                    </>
                )}
            </ul>
        </div >

    );
}
