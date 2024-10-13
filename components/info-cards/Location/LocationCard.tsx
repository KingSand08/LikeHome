import Image from "next/image";
import React from "react";
import AmenitiesSummary from "./LocationCardComponents/AmenititesSummary";
import ReviewSummary from "./LocationCardComponents/ReviewSummary";
import PriceSummary from "./LocationCardComponents/PriceSummary";

interface LocationCardProps {
  // needs to be defined based on available DB data
}

const LocationCard = () => {
  return (
    <div className="flex flex-row rounded border border-black max-w-[1000px] gap-4">
      <Image
        src={"/hotelExample.jpg"}
        alt={"hotel image"}
        height={100}
        width={100}
        className="w-1/3"
      />
      <div className="flex flex-col justify-between">
        <div>
          <h1>BusinessName</h1>
          <h2>GeneralLocationName</h2>
          <AmenitiesSummary />
        </div>
        <div className="flex flex-row items-end justify-between">
          <ReviewSummary />
          <PriceSummary />
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
