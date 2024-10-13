"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const RoomError = () => {
  const path = usePathname();
  const hotelID = path.split("/")[1];
  return (
    <>
      <div>Oops... We couldn&apos;t find this room</div>
      <Link href={"/" + hotelID}>
        Go back to the hotel {hotelID}&apos;s room list
      </Link>
    </>
  );
};

export default RoomError;
