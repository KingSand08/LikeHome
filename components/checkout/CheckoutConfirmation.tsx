"use client";

import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/lib/convertPrice";
import { HotelRoomOffer } from "@/app/api/hotels/search/rooms/route";
import { BookingDetailsType } from "@/app/hotels/[hotelId]/[roomId]/page";
import {
  FINAL_BOOKING_INFO,
  FINAL_PAYMENT_INFO,
} from "@/lib/rapid-hotel-api/api-setup";
import {
  createReservation,
  PartialReservation,
} from "@/server-actions/reservation-actions";
import { useSession } from "next-auth/react";

type CheckoutConfirmationProps = {
  paymentInfo: FINAL_PAYMENT_INFO;
  totalAmount: number;
  hotelRoomOffer: HotelRoomOffer;
  bookingDetails: BookingDetailsType;
};

const CheckoutConfirmation = ({
  paymentInfo,
  totalAmount,
  hotelRoomOffer,
  bookingDetails,
}: CheckoutConfirmationProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubcurrency(totalAmount) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [totalAmount]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    if (!session || typeof session.user.email !== "string") {
      console.error("Email not found");
      return;
    }

    // Create reservation in DB
    const PrismaReservationDB: PartialReservation = {
      userEmail: session?.user.email!,
      checkin_date: bookingDetails.checkin_date,
      checkout_date: bookingDetails.checkout_date,
      adults_number: Number(bookingDetails.adults_number),
      numDays: Number(bookingDetails.numDays),
      hotel_id: hotelRoomOffer.hotel_id,
      room_id: hotelRoomOffer.hotel_room_id,
      payment_info: {
        ...paymentInfo,
        email: session.user.email,
      },
      transaction_info: {
        dateCreated: new Date().toISOString(),
        stripePaymentId: "", // Placeholder for actual Stripe payment ID
      },
      room_cost: totalAmount,
    };

    try {
      console.log("Create a reservation....");
      const booking = await createReservation(PrismaReservationDB);

      const currentUrl =
        typeof window !== "undefined" ? window.location.origin : "";
      const returnUrl = `${currentUrl}/payment?bookingId=${booking.bookingId}`;

      console.log("Create a reservation....");
      await createReservation(PrismaReservationDB);

      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          // Custom booking URL
          return_url: returnUrl,
        },
      });

      if (error) {
        console.error("Error during payment confirmation:", error);
        throw new Error("Payment confirmation failed.");
      }
    } catch (error) {
      console.error("Error in reservation and payment flow:", error);
      alert(`Error in payment and reservation flow: ${error}`);
    }

    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex space-x-2">
          <div className="h-4 w-4 bg-white rounded-full animate-bounce"></div>
          <div className="h-4 w-4 bg-white rounded-full animate-bounce"></div>
          <div className="h-4 w-4 bg-white rounded-full animate-bounce"></div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
      {clientSecret && <PaymentElement />}

      {errorMessage && <div>{errorMessage}</div>}

      <button
        disabled={!stripe || loading}
        className="text-white w-full p-5 bg-black mt-2 rounded-md 
        font-bold disabled:opacity-50 disabled:animate-pulse"
      >
        {!loading ? `Pay $${totalAmount}` : "Processing..."}
      </button>
    </form>
  );
};

export default CheckoutConfirmation;
