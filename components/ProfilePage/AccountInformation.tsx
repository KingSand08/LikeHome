import React, { Dispatch, SetStateAction } from "react";

interface AccountInformationProps {
  userName: string;
  userEmail: string;
  setUserName: Dispatch<SetStateAction<string>>;
  setUserEmail: Dispatch<SetStateAction<string>>;
  editNameMode: boolean;
  setEditNameMode: Dispatch<SetStateAction<boolean>>;
  editEmailMode: boolean;
  setEditEmailMode: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string>>;
}

const AccountInformation: React.FC<AccountInformationProps> = ({
  userName,
  userEmail,
  setUserName,
  setUserEmail,
  editNameMode,
  setEditNameMode,
  editEmailMode,
  setEditEmailMode,
  setError,
}) => {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">Account Information</h3>

      {/* Editable Name Section */}
      <div className="mb-4">
        <label className="block text-lg font-medium text-gray-700">Name</label>
        
        {/* Container for Name input and button */}
        <div className="mt-2 flex items-center space-x-2">
          {/* Name input container */}
          <div
            className="flex-1 border border-gray-300 rounded-lg p-2 bg-white"
            style={{ width: "250px" }}
          >
            {editNameMode ? (
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-md"
                placeholder="Enter your name"
              />
            ) : (
              <span className="text-lg font-medium text-gray-800">{userName}</span>
            )}
          </div>

          {/* Edit button for Name */}
          <button
            onClick={() => setEditNameMode(!editNameMode)} // Toggle Name edit mode
            className="px-4 py-2 text-white bg-black rounded-lg ml-4"
          >
            {editNameMode ? "Save" : "Edit"}
          </button>
        </div>
      </div>

      {/* Editable Email Section */}
      <div className="mb-4">
        <label className="block text-lg font-medium text-gray-700">Email</label>
        
        {/* Container for Email input and button */}
        <div className="mt-2 flex items-center space-x-2">
          {/* Email input container */}
          <div
            className="flex-1 border border-gray-300 rounded-lg p-2 bg-white"
            style={{ width: "250px" }}
          >
            {editEmailMode ? (
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-md"
                placeholder="Enter your email"
              />
            ) : (
              <span className="text-lg font-medium text-gray-800">{userEmail}</span>
            )}
          </div>

          {/* Edit button for Email */}
          <button
            onClick={() => setEditEmailMode(!editEmailMode)}
            className="px-4 py-2 text-white bg-black rounded-lg ml-4"
          >
            {editEmailMode ? "Save" : "Edit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountInformation;
