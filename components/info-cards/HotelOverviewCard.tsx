import Image from "next/image";
import React from "react";
import AmenitiesSummary from "./components/AmenititesSummary";
import ReviewSummary from "./components/ReviewSummary";
import PriceSummary from "./components/PriceSummary";

interface HotelOverviewCardProps {
  // needs to be defined based on available DB data
}

const HotelOverviewCard = () => {
  return (
    <div className="flex flex-row rounded border border-black max-w-[1000px] gap-2">
      <div className="w-1/3">
        <Image
          src={"/hotelExample.jpg"}
          alt={"hotel image"}
          height={100}
          width={100}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-2xl">BusinessName</h1>
          <h2 className="text-lg">GeneralLocationName</h2>
          <AmenitiesSummary amenitiesList={[]} layout={"row"} />
        </div>
        <div className="flex flex-row items-end justify-between">
          <ReviewSummary />
          <PriceSummary />
        </div>
      </div>
    </div>
  );
};

export default HotelOverviewCard;
