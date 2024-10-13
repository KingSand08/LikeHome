import React from "react";
import Image from "next/image";
import ReviewSummary from "./components/ReviewSummary";
import PriceSummary from "./components/PriceSummary";
import AmenitiesSummary from "./components/AmenititesSummary";
import RefundableSummary from "./components/RefundableSummary";

interface HotelRoomCardProps {
  // needs to be defined based on available DB data
  // include refundable summary too (check current date)
}

const HotelRoomCard = () => {
  return (
    <div className="flex flex-col rounded border border-black">
      <div className="w-full h-64">
        <Image
          src={"/hotelExample.jpg"}
          alt={"hotel image"}
          height={100}
          width={100}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="px-2">
        <h1 className="text-2xl">ROOM TITLE AND VIEW</h1>
        <ReviewSummary />
        <AmenitiesSummary amenitiesList={[]} layout={"col"} />
        <RefundableSummary isRefundable={true} />
      </div>
      <div className="flex flex-row justify-between items-end">
        <p className="text-red-500">We have 2 left</p>
        <PriceSummary />
      </div>
      <button className="bg-purple-600 text-white text-xl font-bold p-3 rounded-full m-2 hover:bg-purple-800">
        Reserve
      </button>
    </div>
  );
};

export default HotelRoomCard;
