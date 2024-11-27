"use server";

import React from "react";
import ProfilePageClient from "@/components/ProfilePage/ProfilePage";
import { auth } from "@/auth";
import User from "@/types/User";

const ProfilePage = async () => {
  const session = await auth();

  if (!session) {
    throw Error("User not authenticated but accessing the profile page.");
  }

  const user = session.user as User;

  return <ProfilePageClient user={user} />;
};

export default ProfilePage;
