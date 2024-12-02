"use client";

import { Reservation } from "@prisma/client";
import { Elements } from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/lib/convertPrice";
import { loadStripe } from "@stripe/stripe-js";
import PayDifferenceConfirmation from "./PayDifferenceConfirmation";

// Ensure the Stripe public key is defined
if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
  throw new Error("Stripe Public Key is not defined in environment variables.");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

type PayDifferenceProps = {
  reservation: Reservation;
};

const PayDifferenceForm: React.FC<PayDifferenceProps> = ({ reservation }) => {
  const subcurrencyAmount = convertToSubcurrency(reservation.cost_difference);

  return (
    <div className="p-6 bg-white dark:bg-slate-800 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-red-600 mb-4">
        Action Required: Pay the Difference
      </h2>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        To keep your reservation after the recent changes, please pay the
        outstanding difference.
      </p>
      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: subcurrencyAmount,
          currency: "usd",
        }}
      >
        <PayDifferenceConfirmation reservation={reservation} />
      </Elements>
    </div>
  );
};

export default PayDifferenceForm;
