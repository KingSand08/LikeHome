"use client";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const { bookingId: bookingIdSlug } = useParams();
  const searchParams = useSearchParams();
  const isBookingSuccessful = searchParams.get("success") === "true";

  useEffect(() => {
    // Retrieve booking information from DB.
    // Call hoteldetails and hotelroom API for hotel information.
  }, [bookingIdSlug, searchParams]);

  return (
    <div>
      <h1>
        Dynamic booking page. This is the specific booking ID: {bookingIdSlug}
      </h1>
      <div className="mb-10">
        {isBookingSuccessful ? (
          <div>
            <h1 className="text-3xl font-extrabold mb-2">
              Booking Successful!
            </h1>
            <h2 className="text-2xl">Thank you for your booking!</h2>
            <p>Your stay is confirmed. We hope you enjoy your time with us!</p>
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-extrabold mb-2">
              Thank you! Here are your reservation details.
            </h1>
            <h2 className="text-2xl">Enjoy Your Stay!</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
