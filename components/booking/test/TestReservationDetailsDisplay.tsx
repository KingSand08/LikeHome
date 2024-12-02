"use client";

import React from "react";
import { Reservation } from "@prisma/client";

type ReservationDetailsProps = {
  reservation: Reservation;
};

const TestReservationDetailsDisplay: React.FC<ReservationDetailsProps> = ({
  reservation,
}) => {
  const { payment_info, transaction_info, ...otherFields } = reservation;

  return (
    <div className="reservation-details p-4 border rounded-lg bg-gray-50">
      <h3 className="font-bold text-lg mb-4">Reservation Details</h3>
      <div className="mb-4">
        <h4 className="font-semibold">General Information</h4>
        <ul className="list-disc ml-4">
          {Object.entries(otherFields).map(([key, value]) => (
            <li key={key}>
              <strong>{key.replace(/_/g, " ")}:</strong> {String(value)}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h4 className="font-semibold">Payment Information</h4>
        <ul className="list-disc ml-4">
          {Object.entries(payment_info).map(([key, value]) => (
            <li key={key}>
              <strong>{key.replace(/_/g, " ")}:</strong> {String(value)}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h4 className="font-semibold">Transaction Information</h4>
        <ul className="list-disc ml-4">
          {Object.entries(transaction_info).map(([key, value]) => (
            <li key={key}>
              <strong>{key.replace(/_/g, " ")}:</strong> {String(value)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TestReservationDetailsDisplay;
