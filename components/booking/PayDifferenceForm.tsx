"use client";

import { Reservation } from "@prisma/client";
import { Elements } from "@stripe/react-stripe-js";
import { userInfo } from "os";
import convertToSubcurrency from "@/lib/convertPrice";
import { loadStripe } from "@stripe/stripe-js";
import PayDifferenceConfirmation from "./PayDifferenceConfirmation";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("Public Key not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

type PayDifferenceProps = {
  reservation: Reservation;
};

const PayDifferenceForm = ({ reservation }: PayDifferenceProps) => {
  return (
    <div>
      <h1 className="text-2xl text-red-500">
        Please pay the difference to keep this reservation from your changes.
      </h1>
      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(reservation.cost_difference),
          currency: "usd",
        }}
      >
        <PayDifferenceConfirmation reservation={reservation} />
      </Elements>
    </div>
  );
};

export default PayDifferenceForm;
