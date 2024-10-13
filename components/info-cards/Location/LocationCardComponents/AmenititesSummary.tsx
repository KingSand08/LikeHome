import React from "react";
import { MdPool } from "react-icons/md";
import { FaHotTub } from "react-icons/fa";

const AmenitiesDict = {
  pool: <MdPool />,
  hottub: <FaHotTub />,
};

interface AmenitiesSummaryProps {
  amenitiesList: String[] | [];
}

const AmenitiesSummary = () => {
  return <div>Amenities</div>;
};

export default AmenitiesSummary;
