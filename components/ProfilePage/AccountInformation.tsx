import React from "react";
import SignOutButton from "../auth/SignOutButton";
import Avatar from "../auth/Avatar";
import User from "@/types/User";


const AccountInformation = ({ user }: { user: User }) => {
  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Account Information</h3>
      <div className="max-[1300px]:flex hidden items-center justify-center pt-2 pb-6">
        <Avatar
          image={user?.image ?? undefined}
          size={"8em"}
          className="ring-primary ring-4"
        />
      </div>
      <div className="space-y-4">
        {/* Display Name */}
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Name
          </p>
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {user?.name}
          </p>
        </div>

        {/* Display Email */}
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Email
          </p>
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {user?.email}
          </p>
        </div>

        {/* Sign Out Button */}
        <div>
          <SignOutButton className="w-full" />
        </div>
      </div>
    </div >
  );
};

export default AccountInformation;
