import { useRouter } from "next/router";
import React from "react";

const router = useRouter();

const BookingDetailsPage = () => {
  return <div>BookingDetailsPage {router.query.id}</div>;
};

export default BookingDetailsPage;
