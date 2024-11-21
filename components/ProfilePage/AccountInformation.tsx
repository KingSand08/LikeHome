import React from "react";
import SignOutButton from "../auth/SignOutButton";

interface AccountInformationProps {
  userName: string;
  userEmail: string;
}

const AccountInformation: React.FC<AccountInformationProps> = ({ userName, userEmail }) => {
  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Account Information</h3>
      <div className="space-y-4">
        {/* Display Name */}
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{userName}</p>
        </div>

        {/* Display Email */}
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{userEmail}</p>
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
