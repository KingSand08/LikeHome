"use client";

import {
  APIHotelRoomOffersJSONFormatted,
  HotelRoomOffer,
} from "@/app/api/hotels/search/rooms/route";
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

    redeemFreeStay(session?.user.email, PrismaReservationDB);
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
    <div className="flex flex-col">
      <div className="mb-10 text-black">
        <h1 className="text-3xl font-bold mb-2">Payment</h1>
        <h2 className="text-2xl">
          <span className="font-bold"> {numberOfDays} days </span> at
          <span className="font-bold">
            {" "}
            {currencySymbol}
            {pricePerDay} per day
          </span>
        </h2>
        <h2 className="text-2xl">
          Total Amount due with 10% tax included:
          <span className="font-bold">
            {" "}
            {currencySymbol}
            {roundedTotalAmount}{" "}
          </span>
        </h2>
      </div>

      {/* User Information Fields */}
      <div className="mb-6">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={userInfo.firstName}
          onChange={handleUserInfoChange}
          className="w-full p-2 mb-4 rounded-md text-white"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={userInfo.lastName}
          onChange={handleUserInfoChange}
          className="w-full p-2 mb-4 rounded-md text-white"
        />
        <input
          type="text"
          name="billingAddress"
          placeholder="Billing Address"
          value={userInfo.billingAddress}
          onChange={handleUserInfoChange}
          className="w-full p-2 mb-4 rounded-md text-white"
        />
        <div className="flex flex-row gap-2">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={userInfo.city}
            onChange={handleUserInfoChange}
            className="w-full p-2 mb-4 rounded-md text-white"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={userInfo.state}
            onChange={handleUserInfoChange}
            className="w-full p-2 mb-4 rounded-md text-white"
          />
        </div>
        <input
          type="text"
          name="zipCode"
          placeholder="ZIP Code"
          value={userInfo.zipCode}
          onChange={handleUserInfoChange}
          className="w-full p-2 mb-4 rounded-md text-white"
        />
      </div>

      {/* Stripe Payment Elements */}
      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(roundedTotalAmount),
          currency: currencyCode.toLowerCase(),
        }}
      >
        <CheckoutConfirmation
          totalAmount={roundedTotalAmount}
          hotelRoomOffer={hotelRoomOffer}
          bookingDetails={bookingDetails}
          paymentInfo={userInfo}
        />
      </Elements>

      {rewardPoints >= pretax && (
        <RainbowButton onClick={redeemPoints}>Redeem Points</RainbowButton>
      )}
    </div>
  );
}
