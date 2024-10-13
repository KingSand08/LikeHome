"use client";
import Link from "next/link";
import React from "react";

const HotelError = () => {
  return (
    <>
      <div>Oops... We couldn&apos;t find this hotel</div>
      <Link href="/">Go back to the hotel list</Link>
    </>
  );
};

export default HotelError;
