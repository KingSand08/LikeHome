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
import { generateBookingId } from "@/lib/BookingFunctions";
import { PartialReservation } from "@/server-actions/reservation-actions";
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

    const FINAL_BOOKING_DETAILS: FINAL_BOOKING_INFO = {
      email: session?.user.email!,
      bookingId: generateBookingId(),
      checkin_date: bookingDetails.checkin_date,
      checkout_date: bookingDetails.checkout_date,
      adults_number: bookingDetails.adults_number,
      numDays: bookingDetails.numDays,
      hotel_id: hotelRoomOffer.hotel_id,
      room_id: hotelRoomOffer.hotel_room_id,
      payment_info: {
        firstName: paymentInfo.firstName,
        lastName: paymentInfo.lastName,
        billingAddress: paymentInfo.billingAddress,
        city: paymentInfo.city,
        state: paymentInfo.state,
        zipCode: paymentInfo.zipCode,
        email: paymentInfo.email,
      },
      transaction_info: {
        dateCreated: new Date().toISOString(),
        stripePaymentId: "",
      },
    };

    // Create reservation in DB
    const PrismaReservationDB: PartialReservation = {
      userEmail: FINAL_BOOKING_DETAILS.email,
      bookingId: FINAL_BOOKING_DETAILS.bookingId,
      checkin_date: FINAL_BOOKING_DETAILS.checkin_date,
      checkout_date: FINAL_BOOKING_DETAILS.checkout_date,
      adults_number: Number(FINAL_BOOKING_DETAILS.adults_number),
      numDays: Number(FINAL_BOOKING_DETAILS.numDays),
      hotel_id: FINAL_BOOKING_DETAILS.hotel_id,
      room_id: FINAL_BOOKING_DETAILS.room_id,
      payment_info: {
        firstName: FINAL_BOOKING_DETAILS.payment_info.firstName,
        lastName: FINAL_BOOKING_DETAILS.payment_info.lastName,
        billingAddress: FINAL_BOOKING_DETAILS.payment_info.billingAddress,
        city: FINAL_BOOKING_DETAILS.payment_info.city,
        state: FINAL_BOOKING_DETAILS.payment_info.state,
        zipCode: FINAL_BOOKING_DETAILS.payment_info.zipCode,
        email: FINAL_BOOKING_DETAILS.payment_info.email,
      },
      transaction_info: {
        dateCreated: FINAL_BOOKING_DETAILS.transaction_info.dateCreated,
        stripePaymentId: FINAL_BOOKING_DETAILS.transaction_info.stripePaymentId,
      },
      room_cost: totalAmount,
    };

    try {
      // use reservation-actions.ts functions to call the DB

      const currentUrl =
        typeof window !== "undefined" ? window.location.origin : "";
      const returnUrl = `${currentUrl}/payment?bookingId=${FINAL_BOOKING_DETAILS.bookingId}`;

      console.log("before redir");

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

      console.log("after redir");
    } catch (error) {
      console.error("Error in reservation and payment flow:", error);
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
