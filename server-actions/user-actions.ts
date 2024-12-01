"use server";
import prisma from "@/prisma/client";

// Rewards
const DEFAULT_REWARDS_MULTIPLIER: number = 0.1 as const;

export async function createUser(email: string) {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    console.log("LOG: existing user", existingUser);
    return existingUser;
  }

  return await prisma.user.create({
    data: {
      email,
      rewardPoints: 0,
    },
  });
}

export async function getUserRewards(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { rewardPoints: true, redeemedPoints: true },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}

/**
 * Adds or subtracts reward points based on the total price of the booking.
 * To subtract points, pass a negative number.
 * @param email User's email to identify the user
 * @param payment total price of the booking to determine the reward points
 */
export async function updateUserRewards(email: string, payment: number) {
  return prisma.user.update({
    where: { email },
    data: {
      rewardPoints: {
        increment: Math.floor(payment * DEFAULT_REWARDS_MULTIPLIER),
      },
    },
  });
}

//TODO: @ryanhtang use this function along with getUserRewards to conditionally render a redeem free stay button
/**
 * Moves `points` from `rewardPoints` to `redeemedPoints`
 * @param email User's email to identify the user
 * @param points Number of points to redeem
 */
export async function redeemRewards(email: string, points: number) {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { rewardPoints: true },
  });

  if (!user) {
    throw new Error("User not found");
  }
  if (user.rewardPoints < points) {
    throw new Error("Not enough points to redeem");
  }

  return prisma.user.update({
    where: { email },
    data: {
      rewardPoints: {
        decrement: points,
      },
      redeemedPoints: {
        increment: points,
      },
    },
  });
}

export async function updateUserCancellationDebt(
  email: string,
  payment: number
) {
  const DEFAULT_CANCELLATION_CHARGE_MULTIPLIER = 1.2;

  const user = await prisma.user.findUnique({
    where: { email },
    select: { cancellationDebt: true },
  });

  const currentDebt = user?.cancellationDebt ?? 0;

  return prisma.user.update({
    where: { email },
    data: {
      cancellationDebt:
        currentDebt - payment * DEFAULT_CANCELLATION_CHARGE_MULTIPLIER,
    },
  });
}
