"use client";
import Link from "next/link";
import React from "react";

const BookingDetailsPageError = () => {
  return (
    <>
      <div>Oops... We couldn&apos;t find this booking</div>
      <Link href="/bookings">Go back to the bookings list</Link>
    </>
  );
};

export default BookingDetailsPageError;
