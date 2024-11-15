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
import { useState } from "react";

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
  // User information in a single state object
  const [userInfo, setUserInfo] = useState<FINAL_PAYMENT_INFO>({
    firstName: "",
    lastName: "",
    billingAddress: "",
    city: "",
    state: "",
    zipCode: "",
    email: "",
  });

  // Calculate total amount
  const totalAmount = pricePerDay * numberOfDays;

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
      <div className="mb-10 text-white">
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
          Total Amount Due:
          <span className="font-bold">
            {" "}
            {currencySymbol}
            {totalAmount}{" "}
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
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={userInfo.email}
          onChange={handleUserInfoChange}
          className="w-full p-2 mb-4 rounded-md text-white"
        />
      </div>

      {/* Stripe Payment Elements */}
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
    </div>
  );
}
