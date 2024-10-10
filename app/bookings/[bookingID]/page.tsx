import React from "react";

const UniqueBookingPage = ({ params }: { params: { slug: string } }) => {
  return <div>{params.slug}</div>;
};

export default UniqueBookingPage;
