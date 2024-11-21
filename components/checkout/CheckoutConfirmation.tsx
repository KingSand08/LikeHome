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
import { createReservation, PartialReservation } from "@/server-actions/reservation-actions";
import { auth } from "@/auth";

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

    const bookingId = generateBookingId();
    
    // Create reservation in DB
    const partialReservation: PartialReservation = {
      bookingId,
      checkin_date: bookingDetails.checkin_date, 
      checkout_date: bookingDetails.checkout_date, 
      adults_number: Number(bookingDetails.adults_number),
      numDays: Number(bookingDetails.numDays), 
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
        dateCreated: Date.toString(),
        stripePaymentId: "",
      },
      room_cost: totalAmount,
    }

    const reservation = await createReservation(partialReservation);

    const currentUrl =
      typeof window !== "undefined" ? window.location.origin : "";
    const returnUrl = `${currentUrl}/payment?bookingId=${bookingId}`;
    console.log("before redir")
    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        // Custom booking URL
        return_url: returnUrl,
      },
    });
    console.log("after redir")

    if (error) {
      setErrorMessage(error.message);
      return;
    } else {
      // The payment UI automatically closes
      console.log("DOES THIS WORK????????????????????????????????????????????????????????????????????");
      // IF successful, call to API and rewrite
      const FINAL_BOOKING_DETAILS: FINAL_BOOKING_INFO = {
        // Need to retrieve accountId using NextAuth? Link LikeHome account with this booking
        account_id: "", // we need to retrieve LikeHome account identifier to link this transaction too
        bookingId: bookingId,
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
          dateCreated: Date.toString(),
          stripePaymentId: "", // Will be updated in payment page
        },
      };
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
