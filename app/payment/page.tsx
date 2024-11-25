"use client";

import { CUSTOM_HOTEL_BOOKINGS_URL } from "@/lib/rapid-hotel-api/constants/ROUTES";
import { updateReservationPaymentAndRewards } from "@/server-actions/reservation-actions";
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const PaymentRedirectPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const payment_intent = searchParams.get("payment_intent");
  const payment_intent_client_secret = searchParams.get(
    "payment_intent_client_secret"
  );
  const bookingId = searchParams.get("bookingId");
  const { data: session, status } = useSession();

  useEffect(() => {
    const handlePaymentRedirect = async () => {
      try {
        console.log("Updating reservation with payment intent...");
        const results = await updateReservationPaymentAndRewards(
          session?.user.email!,
          bookingId!,
          payment_intent!
        );

        if (!results.success) {
          throw new Error(`Failed to update reservation: ${results.message}`);
        }

        router.replace(
          `${CUSTOM_HOTEL_BOOKINGS_URL.replace(
            "{bookingId}",
            bookingId!
          )}?success=true`
        );
      } catch (error) {
        console.error("Error during payment processing:", error);
        router.push("/error");
      }
    };

    if (
      payment_intent &&
      payment_intent_client_secret &&
      bookingId &&
      status === "authenticated" &&
      session?.user?.email
    ) {
      handlePaymentRedirect();
    }
  }, [
    payment_intent,
    payment_intent_client_secret,
    bookingId,
    router,
    session,
    status,
  ]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <div className="mb-4">
          {/* Loading spinner */}
          <svg
            className="animate-spin h-12 w-12 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
            ></path>
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-gray-700">
          Processing your payment...
        </h2>
        <p className="text-gray-500">
          Please do not refresh or close this page.
        </p>
      </div>
    </div>
  );
};

export default PaymentRedirectPage;
