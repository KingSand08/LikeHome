"use client";

import { HotelRoomOffer } from "@/app/api/hotels/search/rooms/route";
import { BookingDetailsType } from "@/app/hotels/[hotelId]/[roomId]/page";
import CheckoutConfirmation from "@/components/checkout/CheckoutConfirmation";
import convertToSubcurrency from "@/lib/convertPrice";
import { FINAL_PAYMENT_INFO } from "@/lib/rapid-hotel-api/api-setup";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import {
  PartialReservation,
  redeemFreeStay,
} from "@/server-actions/reservation-actions";
import { getUserRewards } from "@/server-actions/user-actions";
import { RainbowButton } from "../ui/rainbow-button";
import { useRouter } from "next/navigation";

// Check for the Stripe public key
if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("Public Key not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

type CheckoutInfoProps = {
  pricePerDay: number;
  numberOfDays: number;
  currencySymbol?: string;
  currencyCode?: string;
  hotelRoomOffer: HotelRoomOffer;
  bookingDetails: BookingDetailsType;
};

export default function CheckoutInfo({
  pricePerDay,
  numberOfDays,
  currencySymbol = "$",
  currencyCode = "usd",
  hotelRoomOffer,
  bookingDetails,
}: CheckoutInfoProps) {
  const { data: session } = useSession();
  const [userInfo, setUserInfo] = useState<FINAL_PAYMENT_INFO>({
    firstName: "",
    lastName: "",
    billingAddress: "",
    city: "",
    state: "",
    zipCode: "",
  });

  // Calculate total amount
  const pretax = pricePerDay * numberOfDays;
  const totalAmount = pretax * 1.1;
  const roundedTotalAmount = parseFloat(totalAmount.toFixed(2));

  // Redeem points
  const [rewardPoints, setRewardPoints] = useState(0);

  useEffect(() => {
    const checkUserRewardPoints = async () => {
      if (session?.user.email) {
        const userRewards = await getUserRewards(session?.user.email);
        setRewardPoints(userRewards.rewardPoints);
      }
    };
    checkUserRewardPoints();
  }, [session?.user.email, roundedTotalAmount]);

  const router = useRouter();

  const redeemPoints = async () => {
    if (!session || typeof session?.user.email !== "string") {
      // add toast / sonar alerting user that the email couldn't be found
      console.error("Email not found");
      return;
    }

    const PrismaReservationDB: PartialReservation = {
      userEmail: session?.user.email!,
      checkin_date: bookingDetails.checkin_date,
      checkout_date: bookingDetails.checkout_date,
      adults_number: Number(bookingDetails.adults_number),
      numDays: Number(bookingDetails.numDays),
      hotel_id: hotelRoomOffer.hotel_id,
      room_id: hotelRoomOffer.hotel_room_id,
      payment_info: {
        ...userInfo,
        email: session?.user.email,
      },
      transaction_info: {
        dateCreated: new Date().toISOString(),
        stripePaymentId: "free stay",
      },
      room_cost: pretax,
    };

    const res = await redeemFreeStay(session?.user.email, PrismaReservationDB);
    if (!res) {
      // add toast / sonar alerting user that the reservation failed
      console.error("Reservation failed");
      return;
    }

    router.push("/bookings/" + res.id);
  };

  // Handle input change for user information fields
  const handleUserInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col space-y-10">
      {/* Payment Details */}
      <div className="mb-2 rounded-lg">
        <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-6">
          Payment
        </h1>
        <h2 className="text-xl text-gray-700 dark:text-gray-300">
          <span className="font-bold">{numberOfDays} days</span> at{" "}
          <span className="font-bold">
            {currencySymbol}
            {pricePerDay} per day
          </span>
        </h2>
        <h2 className="text-xl mt-2 text-gray-700 dark:text-gray-300">
          Total Amount (including 10% tax):{" "}
          <span className="font-bold text-blue-700 dark:text-blue-400">
            {currencySymbol}
            {totalAmount}
          </span>
        </h2>
      </div>

      {/* User Information Fields */}
      <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-700 dark:to-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Your Information
        </h2>
        <div className="grid grid-cols-1 gap-6">
          {["firstName", "lastName", "billingAddress", "city", "state", "zipCode"].map(
            (field, idx) => (
              <input
                key={idx}
                type="text"
                name={field}
                placeholder={field
                  .replace(/([A-Z])/g, " $1")
                  .replace(/\b\w/g, (char) => char.toUpperCase())}
                value={userInfo[field as keyof FINAL_PAYMENT_INFO]}
                onChange={handleUserInfoChange}
                className="w-full p-2 mb-4 rounded-md bg-slate-200 dark:text-black placeholder-slate-700"
              />
            )
          )}
        </div>
      </div>

      {/* Stripe Payment */}
      <div className="w-full flex flex-col items-center justify-center bg-white p-2 rounded-md">
        <Elements
          stripe={stripePromise}
          options={{
            mode: "payment",
            amount: convertToSubcurrency(totalAmount),
            currency: currencyCode.toLowerCase(),
          }}
        >
          <CheckoutConfirmation
            totalAmount={totalAmount}
            hotelRoomOffer={hotelRoomOffer}
            bookingDetails={bookingDetails}
            paymentInfo={userInfo}
          />
        </Elements>

        {/* Redeem Points Button */}
        {rewardPoints >= pretax && (
          <RainbowButton
            onClick={redeemPoints}
            className="w-full text-center py-3"
          >
            Redeem Points
          </RainbowButton>
        )}
      </div>
    </div>
  );
}
