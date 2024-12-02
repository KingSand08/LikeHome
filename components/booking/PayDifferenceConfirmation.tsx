"use client";

import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/lib/convertPrice";
import { useSession } from "next-auth/react";
import { Reservation } from "@prisma/client";
import prisma from "@/prisma/client";
import { resetReservation } from "@/server-actions/reservation-actions";

type PayDifferenceConfirmationProps = {
  reservation: Reservation;
};

const PayDifferenceConfirmation = ({
  reservation,
}: PayDifferenceConfirmationProps) => {
  const totalAmount = reservation.cost_difference;
  const id = reservation.id;

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

    const paidReservation = await resetReservation(id);

    try {
      const currentUrl =
        typeof window !== "undefined" ? window.location.origin : "";
      const returnUrl = `${currentUrl}/bookings/${reservation.id}`;

      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
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

export default PayDifferenceConfirmation;
