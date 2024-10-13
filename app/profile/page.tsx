import AccountInformation from "@/components/ProfilePage/AccountInformation";
import Rewards from "@/components/ProfilePage/Rewards";
import React from "react";

const ProfilePage = () => {
  return (
    <>
      <h1>Profile</h1>
      <AccountInformation />
      <Rewards />
    </>
  );
};

export default ProfilePage;
