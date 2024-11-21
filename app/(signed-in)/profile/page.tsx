"use client";
import React, { useState, ChangeEvent } from "react";
import AccountInformation from "@/components/ProfilePage/AccountInformation";
import Rewards from "@/components/ProfilePage/Rewards";
import { useSession } from "next-auth/react";
import Image from "next/image";


const ProfilePage: React.FC = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const [activeSection, setActiveSection] = useState<string>("account");

  return (
    <div className="min-h-screen flex dark:text-gray-100 text-gray-900 select-none">
      {/* Left Side Section */}
      <div className="flex flex-col w-1/4 p-6 bg-gray-100 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="flex justify-center">
          <Image
            src={user?.image || "/default-avatar.png"}
            alt="Profile"
            width={500}
            height={500}
            quality={100}
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600 mb-6"
            style={{ width: "10em", height: "10em" }}
          />
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
            <AccountInformation userName={user?.name as string} userEmail={user?.email as string} />
          ) : (
            <Rewards />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
