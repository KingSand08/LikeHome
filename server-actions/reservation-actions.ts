"use server";
import { Reservation } from "@prisma/client";

export type PartialReservation = Omit<
  Reservation,
  "id" | "userId" | "verified"
> & {
  userEmail: string;
};

// Point modifier for rewards
const POINT_MODIFIER = 0.1;
// const pointChange = POINT_MODIFIER * reservation.room_cost;
