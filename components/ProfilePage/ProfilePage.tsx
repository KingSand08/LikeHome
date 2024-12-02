"use client";
import React, { Suspense, useState } from "react";
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
    <div className="min-h-screen flex max-[1300px]:flex-col flex-row dark:text-gray-100 text-gray-900 select-none">
      {/* Left Side Section */}
      <div
        className="flex flex-col max-[1300px]:w-screen w-1/4 max-[1300px]:h-fit max-[1300px]:py-6 p-6 
                            bg-gradient-to-tr dark:from-gray-900 dark:to-[#0f1318] from-gray-200 to-gray-300
                            max-[1300px]:border-b-4 max-[1300px]:border-r-0 border-r-[5px] border-opacity-25 border-base-300"
      >
        <div className="flex justify-center ">
          <div className="min-[1300px]:flex hidden flex-col mb-6">
            <Avatar
              image={user.image ?? undefined}
              size={"10em"}
              className="ring-4 ring-primary ring-offset-2 ring-offset-gray-900"
            />
          </div>
        </div>
        <div className="flex flex-col space-y-3 justify-center items-center w-full">
          <h2 className="text-xl text-base-content font-semibold">
            Profile Navigation
          </h2>
          <div className="flex items-center justify-center w-full">
            <button
              className="flex items-center justify-center btn btn-primary w-full p-2 rounded-lg shadow-md dark:shadow-lg"
              onClick={() => {
                setShowContent(!showContent);
              }}
            >
              <div className="w-5 mt-1">
                <DropDownBtn rotated={showContent} color={"red dark:white"} />
              </div>
            </button>
          </div>
          {showContent && (
            <ul className="space-y-4 w-full bg-gray-600 p-4 rounded-lg bg-opacity-10">
              <li
                className={`btn w-full px-4 py-2 rounded-lg cursor-pointer ${activeSection === "account"
                  ? "btn-secondary"
                  : "bg-blue-200 border-blue-200 hover:border-blue-400 hover:bg-blue-400 shadow-md dark:bg-slate-800 dark:border-slate-800 dark:hover:border-slate-700 dark:hover:bg-slate-700 dark:shadow-lg"
                  }`}
                onClick={() => setActiveSection("account")}
              >
                Account Information
              </li>
              <li
                className={`btn w-full px-4 py-2 rounded-lg cursor-pointer ${activeSection === "rewards"
                  ? "btn-secondary"
                  : "bg-blue-200 border-blue-200 hover:border-blue-400 hover:bg-blue-400 shadow-md dark:bg-slate-800 dark:border-slate-800 dark:hover:border-slate-700 dark:hover:bg-slate-700 dark:shadow-lg"
                  }`}
                onClick={() => setActiveSection("rewards")}
              >
                Rewards
              </li>
              <li
                className={`btn w-full px-4 py-2 rounded-lg cursor-pointer ${activeSection === "bookings"
                  ? "btn-secondary"
                  : "bg-blue-200 border-blue-200 hover:border-blue-400 hover:bg-blue-400 shadow-md dark:bg-slate-800 dark:border-slate-800 dark:hover:border-slate-700 dark:hover:bg-slate-700 dark:shadow-lg"
                  }`}
                onClick={() => setActiveSection("bookings")}
              >
                Bookings
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* Right Side Section */}
      <div className="flex-grow p-6">
        <div className="max-w-4xl mx-auto mt- p-6 bg-gray-300 dark:bg-gray-900 rounded-lg dark:shadow light:shadow-xl">
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
