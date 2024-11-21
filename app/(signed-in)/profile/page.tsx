"use client";
import React, { useState, ChangeEvent } from "react";
import AccountInformation from "@/components/ProfilePage/AccountInformation";
import Rewards from "@/components/ProfilePage/Rewards";
import { useSession } from "next-auth/react";

const ProfilePage: React.FC = () => {
  const { data: session } = useSession(); // Get session data
  const user = session?.user;
  const [userName, setUserName] = useState<string>(user?.name || "Anonymous");
  const [userEmail, setUserEmail] = useState<string>(user?.email || "example@example.com");
  const [editNameMode, setEditNameMode] = useState<boolean>(false);
  const [editEmailMode, setEditEmailMode] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("account");

  const handlePhotoUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfilePhoto(reader.result as string);
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="flex">
      {/* Left Side Section: Profile Photo and Navigation */}
      <div className="flex flex-col w-1.5/4 p-6 border-gray-300" style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
        <label htmlFor="profilePhoto" style={{ cursor: "pointer" }}>
          {profilePhoto ? (
            <img
              src={profilePhoto}
              alt="Profile"
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #ccc",
                marginBottom: "20px",
                marginLeft: "50px",
              }}
            />
          ) : (
            <div
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                backgroundColor: "#f0f0f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#999",
                fontSize: "16px",
                border: "2px solid #ccc",
                marginBottom: "20px",
                marginLeft: "20px",
              }}
            >
              Upload Photo
            </div>
          )}
        </label>
        <input
          type="file"
          id="profilePhoto"
          accept="image/*"
          onChange={handlePhotoUpload}
          style={{ display: "none" }}
        />
        {/* Account Information and Rewards Section */}
        <div
          className="flex-grow w-full max-w-xs border border-gray-300 rounded-lg p-6 bg-blue-50"
          style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "calc(100vh - 230px)" }}
        >
          <ul className="space-y-4 text-left">
            <li
              className="cursor-pointer hover:bg-blue-200 active:bg-blue-300 focus:bg-blue-200 focus:ring-2 focus:ring-blue-500 py-2 px-4"
              onClick={() => {
                setActiveSection("account");
              }}
            >
              Account Information
            </li>
            <li
              className="cursor-pointer hover:bg-blue-200 active:bg-blue-300 focus:bg-blue-200 focus:ring-2 focus:ring-blue-500 py-2 px-4"
              onClick={() => {
                setActiveSection("rewards");
              }}
            >
              Rewards
            </li>
          </ul>
        </div>
      </div>
      {/* Right Side Section: Content Area */}
      <div className="flex-grow p-6 gray" style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
        <div className="w-2.5/4 bg-gray-50">
          {activeSection === "account" ? (
            <div className="mb-6">
              <AccountInformation
            userName={userName}
            userEmail={userEmail}
            setUserName={setUserName}
            setUserEmail={setUserEmail}
            editNameMode={editNameMode}
            setEditNameMode={setEditNameMode}
            editEmailMode={editEmailMode}
            setEditEmailMode={setEditEmailMode}
            setError={setError}
              />
              </div>
          ) : (
            <div className="mb-6">
              <Rewards />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;