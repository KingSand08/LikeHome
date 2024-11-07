"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth } from "@/auth"; // Assuming `auth` checks session
import { handleSignOut } from "@/lib/auth-actions"; // Import the server action

export default function ProfileMenu() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch session data on component mount
    const fetchSession = async () => {
      const session = await auth();
      if (session?.user) {
        setIsAuthenticated(true);
        setUserName(session.user.name || "User");
      } else {
        setIsAuthenticated(false);
      }
    };

    fetchSession();
  }, []);

  const handleLogout = async () => {
    await handleSignOut(); // Call server action for logout
    router.refresh(); // Refresh the page to reflect logged-out state
  };

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt={`${userName || "Profile"}'s avatar`}
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
      >
        {isAuthenticated ? (
          <>
            <li>
              <Link href="/profile" className="justify-between">
                Profile
              </Link>
            </li>
            <li>
              <Link href="/bookings">Bookings</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/signin">Sign In</Link>
            </li>
            <li>
              <Link href="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
