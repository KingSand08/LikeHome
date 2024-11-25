"use client";
import React, { useState, ChangeEvent } from "react";
import AccountInformation from "@/components/ProfilePage/AccountInformation";
import Rewards from "@/components/ProfilePage/Rewards";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Avatar from "@/components/auth/Avatar";

const ProfilePage: React.FC = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const [activeSection, setActiveSection] = useState<string>("account");

  return (
    <div className="min-h-screen flex dark:text-gray-100 text-gray-900 select-none">
      {/* Left Side Section */}

      {/* Right Side Section */}
      <div className="flex-grow p-6">
        <div className="max-w-4xl mx-auto mt- p-6 bg-gray-200 dark:bg-gray-800 rounded-lg dark:shadow light:shadow-xl">
          {activeSection === "account" ? (
            <AccountInformation
              userName={user?.name as string}
              userEmail={user?.email as string}
            />
          ) : (
            <Rewards />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
