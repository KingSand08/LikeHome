"use client";
import React, { useState } from "react";
import AccountInformation from "@/components/ProfilePage/AccountInformation";
import Rewards from "@/components/ProfilePage/Rewards";
import Avatar from "@/components/auth/Avatar";
import User from "@/types/User";
import DropDownBtn from "@/public/drop-down-btn";
import Bookings from "./BookingsPage";

const ProfilePage = ({ user }: { user: User }) => {
  const [activeSection, setActiveSection] = useState<string>("account");
  const [showContent, setShowContent] = useState<boolean>(true);

  return (
    <div className="min-h-screen flex flex-col min-[1300px]:flex-row dark:text-gray-100 text-gray-900 select-none">
      {/* Left Navigation Panel */}
      <div
        className="flex flex-col w-full min-[1300px]:w-1/4 bg-gradient-to-tr dark:from-gray-900 dark:to-[#0f1318] from-gray-200 to-gray-300
        min-[1300px]:border-r-[5px] border-opacity-25 border-base-300 shadow-md"
      >
        {/* Profile Avatar */}
        <div className="flex flex-col items-center py-8">
          <Avatar
            image={user.image ?? undefined}
            size={"8em"}
            className="ring-4 ring-primary ring-offset-2 dark:ring-offset-gray-900"
          />
          <h1 className="mt-4 text-lg font-bold text-base-content">
            {user.name ?? "User Name"}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {user.email ?? "user@example.com"}
          </p>
        </div>

        {/* Navigation */}
        <div className="w-full px-6 pb-8">
          <h2 className="text-xl font-semibold text-base-content mb-4">
            Profile Navigation
          </h2>
          <div className="w-full">

            {/* Toggle Button for Mobile */}
            <button
              className="btn btn-primary w-full min-[1300px]:hidden mb-4 flex items-center justify-between"
              onClick={() => setShowContent(!showContent)}
            >
              <div className="w-5 mt-1 mx-auto">
                <DropDownBtn rotated={showContent} color={"red dark:white"} />
              </div>
            </button>

            {/* Medium+ Screen View */}
            <div className="hidden min-[1300px]:block">
              <ul className="space-y-4">
                <li
                  className={`btn btn-outline w-full text-left ${activeSection === "account" ? "btn-secondary" : ""
                    }`}
                  onClick={() => setActiveSection("account")}
                >
                  Account Information
                </li>
                <li
                  className={`btn btn-outline w-full text-left ${activeSection === "rewards" ? "btn-secondary" : ""
                    }`}
                  onClick={() => setActiveSection("rewards")}
                >
                  Rewards
                </li>
                <li
                  className={`btn btn-outline w-full text-left ${activeSection === "bookings" ? "btn-secondary" : ""
                    }`}
                  onClick={() => setActiveSection("bookings")}
                >
                  Bookings
                </li>
              </ul>
            </div>

            {/* Mobile Screen View */}
            <div className="block min-[1300px]:hidden">
              {/* Navigation Items */}
              {showContent && (
                <ul className="space-y-4">
                  <li
                    className={`btn btn-outline w-full text-left ${activeSection === "account" ? "btn-secondary" : ""
                      }`}
                    onClick={() => setActiveSection("account")}
                  >
                    Account Information
                  </li>
                  <li
                    className={`btn btn-outline w-full text-left ${activeSection === "rewards" ? "btn-secondary" : ""
                      }`}
                    onClick={() => setActiveSection("rewards")}
                  >
                    Rewards
                  </li>
                  <li
                    className={`btn btn-outline w-full text-left ${activeSection === "bookings" ? "btn-secondary" : ""
                      }`}
                    onClick={() => setActiveSection("bookings")}
                  >
                    Bookings
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-grow p-6">
        <div className="max-w-4xl mx-auto bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md p-6">
          {activeSection === "account" ? (
            <AccountInformation user={user} />
          ) : activeSection === "rewards" ? (
            <Rewards user={user} />
          ) : (
            <Bookings user={user} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
