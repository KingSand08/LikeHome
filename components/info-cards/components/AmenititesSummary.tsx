import React from "react";
import { MdPool } from "react-icons/md";
import { FaHotTub } from "react-icons/fa";

const AmenitiesDict = {
  pool: <MdPool />,
  hottub: <FaHotTub />,
};

interface AmenitiesSummaryProps {
  amenitiesList: String[] | [];
  layout: "row" | "col";
}

const AmenitiesSummary = ({
  amenitiesList = [],
  layout = "row",
}: AmenitiesSummaryProps) => {
  return (
    <div className={`flex flex-${layout} gap-x-2 p-1`}>
      <div className="flex flex-row items-center">
        <MdPool />
        <p>Pool</p>
      </div>
      <div className="flex flex-row items-center">
        <FaHotTub />
        <p>Hot Tub</p>
      </div>
    </div>
  );
};

export default AmenitiesSummary;
