"use client";

import React, { useState } from "react";
import AccountInformation from "@/components/ProfilePage/AccountInformation";
import Rewards from "@/components/ProfilePage/Rewards";

interface ProfileContentProps {
    user: {
        name?: string;
        email?: string;
    } | null;
}

const ProfileContent: React.FC<ProfileContentProps> = ({ user }) => {
    const [activeSection, setActiveSection] = useState<string>("account");

    return (
        <div className="p-6">
            <ul className="flex space-x-4 mb-4">
                <li
                    className={`py-2 px-4 rounded-lg cursor-pointer ${activeSection === "account"
                        ? "bg-blue-600 text-white"
                        : "hover:bg-blue-100 dark:hover:bg-gray-700"
                        }`}
                    onClick={() => setActiveSection("account")}
                >
                    Account Information
                </li>
                <li
                    className={`py-2 px-4 rounded-lg cursor-pointer ${activeSection === "rewards"
                        ? "bg-blue-600 text-white"
                        : "hover:bg-blue-100 dark:hover:bg-gray-700"
                        }`}
                    onClick={() => setActiveSection("rewards")}
                >
                    Rewards
                </li>
            </ul>
            <div className="max-w-4xl mx-auto mt-4 p-6 bg-gray-200 dark:bg-gray-800 rounded-lg dark:shadow light:shadow-xl">
                {activeSection === "account" ? (
                    <AccountInformation
                        userName={user?.name || "Anonymous"}
                        userEmail={user?.email || "example@example.com"}
                    />
                ) : (
                    <Rewards />
                )}
            </div>
        </div>
    );
};

export default ProfileContent;
