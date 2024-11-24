"use client";
import SignOutButton from "@/components/auth/SignOutButton";
import { createUser } from "@/server-actions/user-actions";
import { useSession } from "next-auth/react";
import React from "react";

const Page = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>; // Show a loading message while the session is being fetched
  }

  if (!session) {
    return <p>You are not signed in. Use the navbar sign-in above.</p>; // Display a message for unauthenticated users
  }

  const { user } = session;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-semibold">
        Welcome, {user?.name || "Guest"}!
      </h1>
      <p className="mt-2">Email: {user?.email || "Not provided"}</p>
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Placeholder Button
      </button>
      <button
        onClick={() => createUser(user?.email!, user?.name!)}
        className="bg-red-500 p-2 text-white"
      >
        Create an account in DB
      </button>
      <SignOutButton />
    </div>
  );
};

export default Page;
