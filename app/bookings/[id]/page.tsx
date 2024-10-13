import React from "react";

const BookingDetailsPage = ({ params }: { params: { slug: string } }) => {
  return <div>BookingDetailsPage {params.slug}</div>;
};

export default BookingDetailsPage;
