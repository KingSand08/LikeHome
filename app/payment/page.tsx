"use client";

import CheckoutPage from "@/components/checkout/checkoutPage";
import convertToSubcurrency from "@/lib/convertPrice";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

// Need to connect the reveservation components to this page in order to get amount
// Webiste to do that: https://www.geeksforgeeks.org/how-to-pass-data-from-one-component-to-other-component-in-reactjs/#approach-3-passing-data-between-siblings

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("Public Key not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Home() {

  // Need to change to make it dynamic for based on the reservation
  const [pricePerDay, setPricePerDay] = useState(100);
  const [numberOfDays, setNumberOfDays] = useState(1);

  const amount = pricePerDay * numberOfDays; 

  return (
    <main className="max-w-xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-teal-500 to-purple-500">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Payment</h1>
        <h2 className="text-2xl">
          Amount Due: 
          <span className="font-bold"> ${amount}</span>
        </h2>
      </div>

      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(amount),
          currency: "usd",
        }}
      >
        <CheckoutPage amount={amount} />
      </Elements>
    </main>
  );
}