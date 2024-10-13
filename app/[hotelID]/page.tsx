import React from "react";

const HotelPage = ({ params }: { params: { hotelID: string } }) => {
  return <div>Hotel {params.hotelID}</div>;
};

export default HotelPage;
