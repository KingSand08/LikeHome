import React from "react";

const BookingDetailsPage = ({ params }: { params: { id: string } }) => {
  return <div>Information about booking: {params.id}</div>;
};

export default BookingDetailsPage;
