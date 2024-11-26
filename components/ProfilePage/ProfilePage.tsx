"use client";
import React, { useState } from "react";
import AccountInformation from "@/components/ProfilePage/AccountInformation";
import Rewards from "@/components/ProfilePage/Rewards";
import Avatar from "@/components/auth/Avatar";
import User from "@/types/User";


const ProfilePage = ({ user }: { user: User }) => {
    const [activeSection, setActiveSection] = useState<string>("account");

    return (
        <div className="min-h-screen flex max-[1300px]:flex-col flex-row dark:text-gray-100 text-gray-900 select-none">

            {/* Left Side Section */}
            <div className="flex flex-col max-[1300px]:w-screen w-1/4 max-[1300px]:h-fit max-[1300px]:py-12 p-6 
                            bg-gradient-to-tr dark:from-gray-800 dark:to-gray-900 from-gray-200 to-gray-300
                            max-[1300px]:border-b-4 max-[1300px]:border-r-0 border-r-[5px] border-opacity-25 border-base-300">
                <div className="flex justify-center">
                    <div className="min-[1300px]:flex hidden flex-col mb-6">
                        <Avatar
                            image={user.image ?? undefined}
                            size={"17em"}
                        />
                    </div>
                </div>
                <ul className="space-y-4">
                    <li
                        className={`py-3 px-4 rounded-lg cursor-pointer ${activeSection === "account"
                            ? "bg-blue-600 text-white"
                            : "hover:bg-blue-100 dark:hover:bg-gray-700"
                            }`}
                        onClick={() => setActiveSection("account")}
                    >
                        Account Information
                    </li>
                    <li
                        className={`py-3 px-4 rounded-lg cursor-pointer ${activeSection === "rewards"
                            ? "bg-blue-600 text-white"
                            : "hover:bg-blue-100 dark:hover:bg-gray-700"
                            }`}
                        onClick={() => setActiveSection("rewards")}
                    >
                        Rewards
                    </li>
                </ul>
            </div>

            {/* Right Side Section */}
            <div className="flex-grow p-6">
                <div className="max-w-4xl mx-auto mt- p-6 bg-gray-200 dark:bg-gray-800 rounded-lg dark:shadow light:shadow-xl">
                    {activeSection === "account" ? (
                        <AccountInformation user={user as User} />
                    ) : (
                        <Rewards />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;